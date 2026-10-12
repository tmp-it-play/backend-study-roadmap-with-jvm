export function ArrowIcon({ direction = 'right', className = '' }: { direction?: 'right' | 'up-right'; className?: string }) {
  return <svg className={`arrow-icon ${className}`} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    {direction === 'up-right'
      ? <path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M3 9h11V4l9 8-9 8v-5H3z" fill="currentColor" />}
  </svg>;
}

// Twemoji v16.0.1, Twitter, Inc. and contributors (CC BY 4.0).
// Source and license: /emoji/ATTRIBUTION.txt and /emoji/LICENSE-GRAPHICS.txt.
export function CoffeeEmoji() {
  return <img className="emoji-image" src="/emoji/hot-beverage.svg" width="20" height="20" alt="" aria-hidden="true" />;
}
