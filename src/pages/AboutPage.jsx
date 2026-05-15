import { Zap, Globe, RefreshCw, Clock, Code, Shield } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'Custom Hook — useExchangeRates',
      desc: 'Encapsulates all API logic using useEffect for fetching, useRef for abort control and caching, and useCallback for memoized convert/getRate functions. Reusable across any component.',
    },
    {
      icon: Globe,
      title: 'Live API Integration',
      desc: 'Pulls real-time rates from ExchangeRate-API (v6) with PKR as base. Supports 160+ currencies. Automatic abort via AbortController keeps cleanup safe.',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Refresh Every 10 Minutes',
      desc: 'A setInterval inside useEffect refreshes rates automatically. Cached responses via localStorage prevent redundant API calls within the 10-minute TTL window.',
    },
    {
      icon: Clock,
      title: 'Persistent History via LocalStorage',
      desc: 'Every conversion is logged through React Context and persisted to localStorage. History survives page refreshes, with up to 100 entries stored.',
    },
    {
      icon: Code,
      title: 'Multi-Page with React Router v6',
      desc: 'Three pages (Converter, History, About) wired with react-router-dom v6 <Routes> and NavLink. Active states and badge count update dynamically.',
    },
    {
      icon: Shield,
      title: 'Optimised Rendering',
      desc: 'useCallback wraps convert/handleConvert/handleSwap to prevent re-renders. useRef manages the AbortController and DOM focus without triggering state changes.',
    },
  ]

  const techStack = [
    { label: 'React 18',         highlight: true  },
    { label: 'Vite 5',           highlight: true  },
    { label: 'Tailwind CSS 3',   highlight: true  },
    { label: 'React Router v6',  highlight: true  },
    { label: 'useEffect',        highlight: true  },
    { label: 'useCallback',      highlight: true  },
    { label: 'useRef',           highlight: true  },
    { label: 'Context API',      highlight: true  },
    { label: 'ExchangeRate-API', highlight: true  },
    { label: 'LocalStorage',     highlight: false },
    { label: 'Lucide Icons',     highlight: false },
    { label: 'Urbanist Font',    highlight: false },
    { label: 'AbortController',  highlight: false },
    { label: 'ES Modules',       highlight: false },
  ]

  const codeSnippets = [
    {
      title: 'Custom Hook Signature',
      code: `const { rates, loading, error, convert, refetch }
  = useExchangeRates('PKR')`,
    },
    {
      title: 'Memoized Conversion',
      code: `const convert = useCallback(
  (amount, from, to, rates) => amount * rates[to],
  []
)`,
    },
    {
      title: 'Abort + Cleanup',
      code: `useEffect(() => {
  fetchRates(base)
  return () => abortRef.current?.abort()
}, [base])`,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-4">
          Built for <span className="text-lime">Modern</span><br />Finance.
        </h1>
        <p className="text-muted text-lg font-medium max-w-xl leading-relaxed">
          MOVO Currency Converter is a full React showcase — real custom hooks, live API integration, multi-page routing, and persistent state. No shortcuts.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="feature-card">
            <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center mb-4">
              <Icon size={18} className="text-dark" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-white text-sm mb-2 leading-tight">{title}</h3>
            <p className="text-muted text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Code snippets */}
      <div className="mb-12">
        <h2 className="text-2xl font-black tracking-tight mb-5">
          Key <span className="text-lime">Patterns</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {codeSnippets.map(({ title, code }) => (
            <div key={title} className="card p-5">
              <p className="text-xs font-bold text-lime uppercase tracking-widest mb-3">{title}</p>
              <pre className="text-xs text-white/70 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="mb-12">
        <h2 className="text-2xl font-black tracking-tight mb-5">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map(({ label, highlight }) => (
            <span key={label} className={highlight ? 'tech-pill-highlight' : 'tech-pill'}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* API Info */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-muted font-bold uppercase tracking-widest mb-2">API Source</p>
            <h3 className="text-lg font-black text-white mb-1">ExchangeRate-API v6</h3>
            <p className="text-muted text-sm">
              <code className="text-lime/80 bg-lime/10 px-1.5 py-0.5 rounded font-mono text-xs">
                https://v6.exchangerate-api.com/v6/&#123;KEY&#125;/latest/PKR
              </code>
            </p>
            <p className="text-muted text-xs mt-3">
              Free plan: 1,500 requests/month · Updated daily · 160+ currencies · No CORS issues
            </p>
          </div>
          <a
            href="https://www.exchangerate-api.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-lime text-dark text-sm font-bold rounded-xl hover:bg-lime-hover transition-colors shrink-0"
          >
            Get Free API Key →
          </a>
        </div>
      </div>

      {/* Setup instructions */}
      <div className="mt-6 card p-6 border-lime/20">
        <p className="text-xs font-bold text-lime uppercase tracking-widest mb-4">
          ⚡ Quick Setup (3 steps)
        </p>
        <ol className="space-y-3">
          {[
            <>Get a free API key at <code className="text-lime text-xs">exchangerate-api.com</code></>,
            <>Open <code className="text-lime text-xs">src/hooks/useExchangeRates.js</code> and replace <code className="text-lime text-xs">YOUR_API_KEY_HERE</code></>,
            <>Run <code className="text-lime text-xs">npm install && npm run dev</code> — done!</>,
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 bg-lime/10 border border-lime/30 rounded-full flex items-center justify-center text-lime text-xs font-black shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-muted text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default AboutPage
