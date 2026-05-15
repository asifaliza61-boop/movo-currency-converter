# MOVO — Real-Time Currency Converter

A production-grade React + Vite + Tailwind CSS multi-page currency converter with live exchange rates, custom hooks, and persistent history.

## 🚀 Quick Start

```bash
# 1. Clone / download the project
cd movo-currency-converter

# 2. Install dependencies
npm install

# 3. Add your API key
# Open src/hooks/useExchangeRates.js and replace YOUR_API_KEY_HERE
# Get a free key at https://www.exchangerate-api.com (1,500 requests/month free)

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```
movo-currency-converter/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                  # Static assets
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Sticky nav with active NavLink states
│   │   ├── Footer.jsx           # Footer with API attribution
│   │   ├── LiveBadge.jsx        # Animated live rate status badge
│   │   ├── ErrorBanner.jsx      # Dismissible error display
│   │   └── CurrencySelect.jsx   # Currency dropdown component
│   ├── context/
│   │   └── AppContext.jsx       # Global state (history) via React Context
│   ├── hooks/
│   │   └── useExchangeRates.js  # ⭐ Custom hook — all API + conversion logic
│   ├── pages/
│   │   ├── ConverterPage.jsx    # Main converter UI
│   │   ├── HistoryPage.jsx      # Conversion history + stats + CSV export
│   │   ├── AboutPage.jsx        # Architecture overview + setup guide
│   │   └── NotFoundPage.jsx     # 404 fallback
│   ├── utils/
│   │   ├── currencies.js        # Currency codes, names, flags, formatters
│   │   └── storage.js           # localStorage helpers (history + rate cache)
│   ├── App.jsx                  # React Router setup + AppProvider
│   ├── main.jsx                 # ReactDOM.createRoot entry point
│   └── index.css                # Tailwind directives + custom component classes
├── index.html                   # HTML shell + Google Fonts
├── vite.config.js               # Vite + React plugin
├── tailwind.config.js           # Theme: lime, dark, urbanist, animations
├── postcss.config.js            # Autoprefixer
└── package.json
```

---

## 🧩 Key Technical Deliverables

### Custom Hook: `useExchangeRates`
- `useEffect` — fetches rates on mount and when `baseCurrency` changes
- `useRef` — holds `AbortController` (safe cleanup) + nothing leaks into state
- `useCallback` — memoizes `convert`, `getRate`, `refetch` to prevent re-renders
- Auto-refresh every 10 minutes via `setInterval` inside `useEffect`
- 10-minute localStorage cache layer via `useRef`-adjacent storage utility

### API Integration
- **Endpoint:** `https://v6.exchangerate-api.com/v6/{KEY}/latest/PKR`
- **Base currency:** PKR (Pakistani Rupee)
- **Coverage:** 160+ currencies
- **Free tier:** 1,500 requests/month

### React Router v6
| Route | Page |
|-------|------|
| `/` | Converter |
| `/history` | History |
| `/about` | About |
| `*` | 404 |

### Persistent History
- Stored in `localStorage` via `AppContext`
- Up to 100 entries per session
- CSV export available
- Survives page refresh

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#CFF008` (MOVO Lime) |
| Background | `#131313` |
| Card | `#1A1A1A` |
| Border | `#2A2A2A` |
| Muted text | `#8F8F8F` |
| Font | Urbanist (Google Fonts) |

---

## 🔧 Build for Production

```bash
npm run build
npm run preview
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react + react-dom | UI framework |
| react-router-dom v6 | Client-side routing |
| lucide-react | Icon library |
| tailwindcss | Utility-first CSS |
| vite | Build tool |
