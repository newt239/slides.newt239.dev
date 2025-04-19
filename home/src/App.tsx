function App() {
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
      <h1>slides.newt239.dev</h1>
      <ul>
        {slides.map((slide) => (
          <li key={slide.path}>
            <a href={slide.path}>{slide.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
