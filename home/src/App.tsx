import { slides } from "./slides";

function App() {
  return (
    <>
      <h1>slides.newt239.dev</h1>
      <ul>
        {slides.map((slide) => (
          <li key={slide.name}>
            <a href={slide.path}>{slide.title}</a>
            {slide.date && (
              <time className="slide-date" dateTime={slide.date}>
                {slide.date.replace(/-/g, "/")}
              </time>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
