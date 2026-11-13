import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { Waves } from '../components/Waves'
import { HeroArt } from '../components/HeroArt'
import { Magnets } from '../components/Magnets'
import './Home.css'

export function Home() {
  return (
    <main id="main" className="yk-home yk-grain">
      <div className="yk-home__sun" aria-hidden="true" />

      <div className="yk-home__stage">
        <section className="yk-fridge yk-grain" aria-labelledby="hero-q">
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
            <Link to="/kitchen" className="yk-btn yk-btn--primary yk-btn--lg yk-fridge__cta">
              Add Ingredients
              <ArrowRight size={26} />
            </Link>
          </div>
        </section>

        <figure className="yk-home__photo">
          <HeroArt />
          <figcaption>Breakfast Set</figcaption>
        </figure>
      </div>

      <Waves className="yk-waves yk-home__waves" />
    </main>
  )
}
