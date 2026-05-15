import { getCurrencyList } from '../utils/currencies'

const CurrencySelect = ({ value, onChange, label, exclude }) => {
  const currencies = getCurrencyList().filter((c) => c.code !== exclude)

  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="input-wrap">
        <select
          className="currency-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {getCurrencyList().map(({ code, name, flag }) => (
            <option key={code} value={code} style={{ background: '#1A1A1A' }}>
              {flag} {code} — {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CurrencySelect
