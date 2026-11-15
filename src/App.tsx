import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { KitchenProvider, useKitchen } from './state/KitchenContext'
import { Home } from './pages/Home'
import { MyKitchen } from './pages/MyKitchen'
import { Recipes } from './pages/Recipes'
import { RecipeDetail } from './pages/RecipeDetail'
import { GroceryList } from './pages/GroceryList'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Toast() {
  const { toast, dismissToast } = useKitchen()
  return (
    <div aria-live="polite" role="status">
      {toast && (
        <div className="yk-toast" key={toast.id}>
          <span>{toast.message}</span>
          {toast.action && (
            <button
              type="button"
              className="yk-toast__action"
              onClick={() => {
                toast.action!.run()
                dismissToast()
              }}
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <KitchenProvider>
        <a href="#main" className="yk-skip">
          Skip to content
        </a>
        <ScrollReset />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kitchen" element={<MyKitchen />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/list" element={<GroceryList />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Toast />
      </KitchenProvider>
    </BrowserRouter>
  )
}
