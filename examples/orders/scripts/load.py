#!/usr/bin/env python3
"""공개 상품 조회의 제한된 로컬 부하 실험. p95는 nearest-rank로 계산한다."""
import argparse
import concurrent.futures
import math
import time
import urllib.request

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--url",default="http://127.0.0.1:8080/api/products")
    parser.add_argument("--requests",type=int,default=100)
    parser.add_argument("--concurrency",type=int,default=8)
    args=parser.parse_args()
    if not (1 <= args.requests <= 10000 and 1 <= args.concurrency <= 64):
        parser.error("요청 수 1~10000, 동시성 1~64 범위로 지정하세요.")
    def one(_):
        start=time.perf_counter()
        try:
            with urllib.request.urlopen(args.url,timeout=10) as response:
                response.read()
                success=response.status==200
        except Exception:
            success=False
        return (time.perf_counter()-start)*1000,success
    start=time.perf_counter()
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        results=list(pool.map(one,range(args.requests)))
    elapsed=time.perf_counter()-start
    times=sorted(t for t,_ in results)
    success=sum(ok for _,ok in results)
    print(f"requests={len(results)} success={success} failed={len(results)-success} concurrency={args.concurrency}")
    print(f"elapsed={elapsed:.3f}s throughput={len(results)/elapsed:.1f}/s p95={times[math.ceil(.95*len(times))-1]:.2f}ms")
    if success != len(results):
        raise SystemExit(1)

if __name__=="__main__": main()
