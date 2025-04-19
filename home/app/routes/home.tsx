import { slides } from "slides";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Slides | newt239.dev" }];
}

export async function loader() {
  return { slides };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { slides } = loaderData;
  return (
    <>
      <main>
        <h1>slides.newt239.dev</h1>
        <ul>
          {slides.map((slide) => (
            <li key={slide.id}>
              <a href={`/slides/${slide.id}`}>{slide.title}</a>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <small>
          Copyright 2025 <a href="https://newt239.dev">newt239.dev</a>
        </small>
      </footer>
    </>
  );
}
