import { useRef, useEffect } from "react";
import "./TiltPhoto.css";

// Photo that follows the cursor (3D tilt + subtle parallax shift).
export default function TiltPhoto({ src = "/me.jpg", alt = "Me" }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    // Cursor position relative to the photo's center, normalized to -1..1
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };
    const onLeave = () => { target = { x: 0, y: 0 }; };

    const tick = () => {
      // easing for smooth motion
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      img.style.transform =
        `perspective(900px) rotateY(${current.x * 12}deg) rotateX(${-current.y * 10}deg) ` +
        `translate(${current.x * 8}px, ${current.y * 8}px) scale(1.04)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="tilt-photo" ref={wrapRef}>
      <img ref={imgRef} src={src} alt={alt} draggable="false" />
    </div>
  );
}