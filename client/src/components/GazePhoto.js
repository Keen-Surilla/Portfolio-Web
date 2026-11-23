import { useEffect, useRef, useState } from "react";
import "./GazePhoto.css";

// ONE grid image: client/public/gaze.jpg  (3x3: rows up/middle/down, cols left/center/right)
const SRC = `${process.env.PUBLIC_URL || ""}/gaze.jpg`;

export default function GazePhoto({ alt = "Me", className = "", fallback }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ col: 1, row: 1 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.35); // eyes ~ upper third
      const dead = 60; // px around the face where he looks straight
      const col = dx > dead ? 2 : dx < -dead ? 0 : 1;
      const row = dy > dead ? 2 : dy < -dead ? 0 : 1;
      setPos((p) => (p.col === col && p.row === row ? p : { col, row }));
    };
    const onLeave = () => setPos({ col: 1, row: 1 });
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const box = { position: "relative", overflow: "hidden" };

  if (failed) {
    return (
      <div ref={ref} className={`gaze-photo ${className}`} style={box}>
        <img
          src={fallback}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`gaze-photo ${className}`} style={box} role="img" aria-label={alt}>
      <img
        src={SRC}
        alt=""
        draggable="false"
        onError={() => {
          console.warn("GazePhoto: could not load " + SRC + ". Put gaze.jpg in client/public/");
          setFailed(true);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300%",
          height: "300%",
          maxWidth: "none",
          transform: `translate(${-pos.col * 33.3333}%, ${-pos.row * 33.3333}%)`,
          userSelect: "none",
        }}
      />
    </div>
  );
}