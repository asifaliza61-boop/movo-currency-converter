const Footer = () => (
  <footer className="border-t border-dark-border mt-auto">
    <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-lime font-black">MOVO</span>
        <span className="text-dark-border">·</span>
        <span className="text-muted text-sm">Finance Simplified</span>
      </div>
      <div className="text-muted text-xs">
        Powered by{' '}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime/70 hover:text-lime transition-colors"
        >
          ExchangeRate-API
        </a>
        {' '}· Base: PKR · {new Date().getFullYear()}
      </div>
    </div>
  </footer>
)

export default Footer
