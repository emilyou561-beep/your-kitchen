import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { Waves } from '../components/Waves'
import { useKitchen } from '../state/KitchenContext'
import { INGREDIENT_BY_ID } from '../data/ingredients'
import './Home.css'

export function Home() {
  const { inventory } = useKitchen()
  const note =
    inventory.length > 0
      ? inventory
          .slice(0, 3)
          .map((i) => INGREDIENT_BY_ID[i.ingredientId]?.name ?? i.ingredientId)
          .join(' · ')
      : 'egg · tofu · scallion'

  return (
    <main id="main" className="yk-home yk-grain">
      <div className="yk-home__sun" aria-hidden="true" />

      <div className="yk-home__stage">
        <section className="yk-fridge yk-grain" aria-labelledby="hero-q">
          <div className="yk-fridge__freezer" aria-hidden="true">
            <div className="yk-fridge__note">
              <span>{note}</span>
              <i className="yk-fridge__magnet" />
            </div>
            <div className="yk-fridge__stamp">夜</div>
            <div className="yk-fridge__handle yk-fridge__handle--short" />
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
          <img
            src="/images/hero-nikujaga.jpg"
            alt="A blue-and-white ceramic bowl of nikujaga — braised potatoes, beef, carrot and snap peas — steaming on a wooden counter"
            fetchPriority="high"
          />
          <figcaption>Nikujaga</figcaption>
        </figure>
      </div>

      <Waves className="yk-waves yk-home__waves" />
    </main>
  )
}
