import { NavLink } from 'react-router-dom'
import { ArrowLeftRight, History, Info } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const { history } = useAppContext()

  const links = [
    { to: '/',         label: 'Converter', icon: ArrowLeftRight },
    { to: '/history',  label: 'History',   icon: History,  badge: history.length > 0 ? history.length : null },
    { to: '/about',    label: 'About',     icon: Info },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-dark/90 backdrop-blur-xl border-b border-dark-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
            <span className="text-dark font-black text-sm">M</span>
          </div>
          <span className="text-xl font-black text-white tracking-tight">MOVO</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 relative ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={15} strokeWidth={2.5} />
              <span>{label}</span>
              {badge !== null && badge !== undefined && (
                <span className="absolute -top-1 -right-1 bg-lime text-dark text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {badge > 99 ? '99' : badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
