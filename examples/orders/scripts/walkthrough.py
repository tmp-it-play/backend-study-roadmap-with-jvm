#!/usr/bin/env python3
"""실행 중인 로컬 주문 앱의 세션·CSRF·주문 계약을 검증한다."""
import argparse
import http.cookiejar
import json
import urllib.error
import urllib.parse
import urllib.request
import uuid

class Client:
    def __init__(self, base):
        self.base = base.rstrip("/")
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
        self.token = None
        self.header = None
        self.checked = 0

    def request(self, method, path, expected, body=None, headers=None, csrf=True, form=False):
        headers = dict(headers or {})
        if self.token and csrf:
            headers[self.header] = self.token
        data = None
        if body is not None:
            data = (urllib.parse.urlencode(body) if form else json.dumps(body)).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded" if form else "application/json"
        req = urllib.request.Request(self.base + path, data=data, headers=headers, method=method)
        try:
            response = self.opener.open(req, timeout=15)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            raw = response.read()
            if response.status != expected:
                raise AssertionError(f"{method} {path}: expected {expected}, got {response.status}: {raw[:300]!r}")
            self.checked += 1
            return json.loads(raw) if raw and response.headers.get("Content-Type", "").startswith("application/json") else (
                json.loads(raw) if raw and "problem+json" in response.headers.get("Content-Type", "") else None)

    def refresh_csrf(self):
        token = self.request("GET", "/api/csrf", 200)
        self.token, self.header = token["token"], token["headerName"]

    def login(self, name):
        self.refresh_csrf()
        self.request("POST", "/login", 204, {"username": name, "password": name + "-pass"}, form=True)
        self.refresh_csrf()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:8080")
    args = parser.parse_args()
    alice, bob, anonymous = (Client(args.url) for _ in range(3))
    original = alice.request("GET", "/api/products", 200)[0]["stock"]
    if original < 1:
        raise AssertionError("실습에 재고 1개 이상이 필요합니다. 기존 실습 주문을 먼저 취소하세요.")
    anonymous.request("GET", "/api/orders", 401)
    alice.login("alice")
    bob.login("bob")
    for route in ["/api/orders", "/api/kotlin/orders"]:
        key = str(uuid.uuid4())
        headers = {"Idempotency-Key": key}
        request = {"productId": 1, "quantity": 1}
        order = alice.request("POST", route, 201, request, headers)
        again = alice.request("POST", route, 201, request, headers)
        assert order["id"] == again["id"]
        assert order["total"] == 12000
        path = "/api/orders/" + order["id"]
        bob.request("GET", path, 404)
        bob.request("POST", path + "/cancel", 404)
        alice.request("POST", route, 409, {"productId": 1, "quantity": 2}, headers)
        alice.request("POST", route, 403, request, headers, csrf=False)
        alice.request("POST", route, 400, {"productId": 1, "quantity": 0}, headers)
        alice.request("POST", route, 400, {}, headers)
        alice.request("GET", path, 200)
        alice.request("POST", path + "/cancel", 200)
        alice.request("POST", path + "/cancel", 200)
        assert alice.request("GET", "/api/products", 200)[0]["stock"] == original
    alice.request("POST", "/logout", 204)
    alice.request("GET", "/api/orders", 401)
    print(f"PASS: HTTP 상태 검증 {sum(c.checked for c in [alice,bob,anonymous])}개; Java·Kotlin 생성, 멱등성, 소유권, CSRF, 취소·로그아웃 확인")
    print("재고는 시작 값으로 복구했습니다. 취소된 실습 주문 이력은 남습니다.")

if __name__ == "__main__":
    main()
