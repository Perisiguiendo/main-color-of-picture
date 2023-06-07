import ColorThief from "colorthief";
import { useMemo, useState } from "react";

const PATTERN = 3;
export function App() {
  const [bgThemes, setBgThemes] = useState<[number, number, number][]>([]);
  const colorThief = new ColorThief();

  const bgImage = useMemo(() => {
    if (!bgThemes.length) return null;
    return `linear-gradient(to bottom, ${bgThemes
      .map((v) => `rgb(${v[0]}, ${v[1]}, ${v[2]})`)
      .join(",")})`;
  }, [bgThemes]);

  const handleMouseEnter = (e: any) => {
    const image = e.target;
    const rowColors = colorThief.getPalette(image, PATTERN);
    setBgThemes(rowColors);
  };

  const handleMouseLeave = () => {
    setBgThemes([]);
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center"
      style={{
        backgroundImage: bgImage || undefined,
      }}
    >
      <div className="grid gap-20 grid-cols-3 cursor-pointer">
        {new Array(3).fill(0).map((_, index) => {
          return (
            <img
              style={{
                height: "400px",
              }}
              crossOrigin="anonymous"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              key={index}
              alt="图片"
              src={`https://picsum.photos/800/800?seed=${index}`}
            ></img>
          );
        })}
      </div>
    </div>
  );
}
