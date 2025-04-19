import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // Build-time import of generated HTML slides
  const htmlModules = import.meta.glob("../dist/**/*.html", {
    eager: true,
    as: "raw",
  });
  const slides = Object.entries(htmlModules).map(([filePath, content]) => {
    const route = filePath.replace(/^\.\./, "");
    const path = route.replace(/index\.html$/, "") || "/";
    const match = content.match(/<title>([^<]+)<\/title>/);
    const title = match ? match[1] : path;
    return { path, title };
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <section>
        <h2>Slides</h2>
        <ul>
          {slides.map((slide) => (
            <li key={slide.path}>
              <a href={slide.path}>{slide.title}</a>
            </li>
          ))}
        </ul>
      </section>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
