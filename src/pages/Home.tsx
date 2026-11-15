import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { MouseEvent, PointerEvent } from 'react'
import { ArrowRight } from '../components/Icons'
import { Waves } from '../components/Waves'
import { HeroArt } from '../components/HeroArt'
import { Magnets } from '../components/Magnets'
import './Home.css'

export function Home() {
  const navigate = useNavigate()
  const [opening, setOpening] = useState(false)
  const homeRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const navigateTimerRef = useRef<number | null>(null)

  const setScene = (x: number, y: number) => {
    const stage = stageRef.current
    if (!stage) return
    const spotX = `${((x + 1) * 50).toFixed(1)}%`
    const spotY = `${((y + 1) * 50).toFixed(1)}%`
    stage.style.setProperty('--scene-x', x.toFixed(3))
    stage.style.setProperty('--scene-y', y.toFixed(3))
    stage.style.setProperty('--spot-x', spotX)
    stage.style.setProperty('--spot-y', spotY)
    homeRef.current?.style.setProperty('--spot-x', spotX)
    homeRef.current?.style.setProperty('--spot-y', spotY)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !stageRef.current) return
    const bounds = stageRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2))
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setScene(x, y))
  }

  const handlePointerLeave = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setScene(0, 0))
  }

  const handleKitchenOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (opening) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate('/kitchen')
      return
    }
    setOpening(true)
    navigateTimerRef.current = window.setTimeout(() => {
      const transitionDocument = document as Document & {
        startViewTransition?: (update: () => void) => void
      }
      const goToKitchen = () => navigate('/kitchen')
      if (transitionDocument.startViewTransition) transitionDocument.startViewTransition(goToKitchen)
      else goToKitchen()
    }, 580)
  }

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      if (navigateTimerRef.current !== null) window.clearTimeout(navigateTimerRef.current)
    }
  }, [])

  return (
    <main ref={homeRef} id="main" className="yk-home yk-grain" data-opening={opening ? 'true' : undefined}>
      <div className="yk-home__sun" aria-hidden="true" />

      <div ref={stageRef} className="yk-home__stage" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <section className="yk-fridge yk-grain" aria-labelledby="hero-q" data-opening={opening ? 'true' : undefined}>
          <div className="yk-fridge__interior" aria-hidden="true" />
          <div className="yk-fridge__front">
            <div className="yk-fridge__freezer">
              <Magnets />
              <div className="yk-fridge__handle yk-fridge__handle--short" aria-hidden="true" />
            </div>
            <div className="yk-fridge__door">
              <div className="yk-fridge__handle yk-fridge__handle--long" aria-hidden="true" />
              <h1 id="hero-q" className="yk-fridge__title">
                What’s in your fridge?
              </h1>
              <svg className="yk-fridge__swash" viewBox="0 0 250 18" aria-hidden="true" focusable="false">
                <path d="M4 12C60 3 150 2 246 9" fill="none" stroke="#D6A642" strokeWidth="7" strokeLinecap="round" />
              </svg>
              <Link
                to="/kitchen"
                className="yk-btn yk-btn--primary yk-btn--lg yk-fridge__cta"
                onClick={handleKitchenOpen}
                aria-busy={opening}
              >
                Add Ingredients
                <ArrowRight size={26} />
              </Link>
            </div>
          </div>
        </section>

        <figure className="yk-home__photo">
          <HeroArt />
          <figcaption>Shoyu Ramen</figcaption>
        </figure>
      </div>

      <Waves className="yk-waves yk-home__waves" />
    </main>
  )
}
