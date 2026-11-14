import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useKitchen } from '../state/KitchenContext'
import { BowlIcon, FridgeIcon, LogoMark, MenuIcon, ReceiptIcon, Close } from './Icons'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { inventory, grocery } = useKitchen()
  const toBuy = grocery.filter((g) => !g.checked).length

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="yk-header">
      <div className="yk-awning" aria-hidden="true" />
      <div className="yk-header__inner">
        <Link to="/" className="yk-logo" aria-label="Yoru Kitchen, home">
          <LogoMark />
          <span className="yk-logo__word">Yoru Kitchen</span>
          <span className="yk-logo__stamp" aria-hidden="true">
            家庭料理
          </span>
        </Link>

        <button
          type="button"
          className="yk-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="yk-main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={24} /> : <MenuIcon size={24} />}
        </button>

        <nav id="yk-main-nav" className="yk-nav" aria-label="Main" data-open={open}>
          <NavLink to="/kitchen" className="yk-nav__link" data-nav="kitchen">
            <FridgeIcon />
            My Kitchen
            {inventory.length > 0 && (
              <span key={inventory.length} className="yk-badge yk-pop" aria-label={`${inventory.length} ingredients`}>
                {inventory.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/recipes" className="yk-nav__link">
            <BowlIcon />
            Ramen
          </NavLink>
          <NavLink to="/list" className="yk-nav__link">
            <ReceiptIcon />
            Grocery List
            {toBuy > 0 && (
              <span key={toBuy} className="yk-badge yk-pop" aria-label={`${toBuy} items to buy`}>
                {toBuy}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
