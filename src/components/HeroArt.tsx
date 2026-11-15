/** Homepage cover illustration — a new AI-generated Showa-style shoyu ramen poster. */
export function HeroArt() {
  return (
    <img
      className="yk-hero-art"
      src={`${import.meta.env.BASE_URL}images/home-shoyu-hero.jpg`}
      alt="Showa-style illustration of a bowl of shoyu ramen with chashu, egg, menma, narutomaki and scallions"
    />
  )
}
