import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { LEFT_POINTS, RIGHT_POINTS, LOGO_BLUE, LOGO_GREEN } from "./ScellLogo";

/* Load film for the mark.

   1. the two halves draw themselves as bare outline
   2. colour floods in left-to-right and the outline dissolves behind the front
   3. the mark flies to the navbar slot and hands over to the real logo

   Stage 3 is a FLIP: the navbar renders the same <ScellLogo> at the same
   viewBox, so we measure that element and move to its exact rect. The handover
   is a cross-fade - the navbar logo already carries a 300ms opacity transition
   for its scrolled/unscrolled states, so revealing it there IS the fade-in. */

// The navbar logo tags itself with this so the flight knows what to aim at.
export const LOGO_TARGET_ATTR = "data-scell-logo";

// Ink the outline is drawn in - the site's dark green, same as the navbar text.
const INK = "#1B4332";

// The mark's ink sits between y=128.33 and y=371.67 of a 500x500 box, so a
// square element is mostly empty space. Height is what the eye reads as "big".
const INK_HEIGHT_RATIO = (371.67 - 128.33) / 500;

const T = {
  drawStart: 0.15,
  drawDuration: 0.95,
  drawStagger: 0.26,
  fillStart: 1.32,
  fillDuration: 0.72,
  inkFadeStart: 1.62,
  inkFadeDuration: 0.5,
  flightStart: 2.34,
  flightDuration: 0.92,
  veilStart: 2.5,
  veilDuration: 0.62,
  handover: 3.26,
  handoverDuration: 0.3
};

// Wall-clock net so a stalled film can never strand the page under the veil.
// Deliberately far past the film's own ~3.6s: the handover is driven by the
// animations finishing, not by this.
const FAILSAFE_MS = 12000;

export default function LogoIntro({ onLanding, onFinish }) {
  // null until measured. Rendering the mark before we know the viewport and the
  // landing rect would size the whole film off a 0x0 box.
  const [geo, setGeo] = useState(null);
  // Set when the flight actually lands, which starts the cross-fade.
  const [landed, setLanded] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = document.querySelector(`[${LOGO_TARGET_ATTR}]`);

    if (reduce || !target) {
      onLanding?.();
      onFinish?.();
      return undefined;
    }

    let raf = 0;
    let frames = 0;

    // A tab that is still hidden (or a pane with no box yet) reports a zero-sized
    // viewport. rAF-only on purpose: a hidden tab fires no frames, so the film
    // waits and plays properly when it is shown rather than burning its budget
    // unseen. If a real layout never arrives, give up and just show the page.
    const measure = () => {
      const rect = target.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!vw || !rect.width) {
        if (++frames > 120) {
          onLanding?.();
          onFinish?.();
          return;
        }
        raf = requestAnimationFrame(measure);
        return;
      }

      // Big enough to be the moment, never wider than the viewport can hold.
      // Bounded on height too, since the ink is a thin band inside a square box.
      const big = Math.min(vw * 0.8, (vh * 0.55) / INK_HEIGHT_RATIO, 620);

      // The element is laid out at its BIGGEST size and only ever scaled DOWN.
      // A transform scales the rasterised bitmap, not the vector: laying out at
      // 64px and scaling up ~10x rasterises at 64px and blows that bitmap up,
      // which is visibly blurry. Rasterising at `big` and minifying stays sharp,
      // and the landing hands over to the navbar logo drawn natively at 64px.
      setGeo({
        size: big,
        startX: (vw - big) / 2,
        startY: (vh - big) / 2,
        endX: rect.left,
        endY: rect.top,
        endScale: rect.width / big
      });
    };

    measure();

    // Scroll is locked for the duration: the page behind the veil is a long
    // scrolling site, and a stray wheel event would move it under the film.
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";

    // NOT a timer for the handover - the film's beats are driven by the
    // animations themselves finishing (see onAnimationComplete below), because
    // those run on rAF and a backgrounded tab would leave wall-clock timers
    // racing ahead of what is actually on screen. This is only the net.
    const failsafe = window.setTimeout(() => {
      html.style.overflow = prevOverflow;
      onLanding?.();
      onFinish?.();
    }, FAILSAFE_MS);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      html.style.overflow = prevOverflow;
    };
  }, [onLanding, onFinish]);

  const handleLanded = () => {
    if (landed) return;
    setLanded(true);
    onLanding?.();
  };

  const handleFadedOut = () => {
    if (!landed) return;
    document.documentElement.style.overflow = "";
    onFinish?.();
  };

  const ease = [0.65, 0, 0.35, 1];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: T.veilStart, duration: T.veilDuration, ease: "easeOut" }}
      />

      {geo ? (
        <motion.svg
          viewBox="0 0 500 500"
          className="absolute top-0 left-0"
          style={{
            width: geo.size,
            height: geo.size,
            transformOrigin: "0 0",
            willChange: "transform"
          }}
          initial={{ x: geo.startX, y: geo.startY, scale: 1 }}
          animate={{ x: geo.endX, y: geo.endY, scale: geo.endScale }}
          transition={{ delay: T.flightStart, duration: T.flightDuration, ease }}
          // The flight landing IS the cue to hand over - not a parallel timer.
          onAnimationComplete={handleLanded}
        >
          {/* Everything fades out together once landed, revealing the navbar
              logo underneath - same mark, same rect, so the seam is invisible. */}
          <motion.g
            animate={{ opacity: landed ? 0 : 1 }}
            transition={{ duration: T.handoverDuration, ease: "easeOut" }}
            onAnimationComplete={handleFadedOut}
          >
            {/* Colour, revealed by a left-to-right wipe. */}
            <motion.g
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: T.fillStart, duration: T.fillDuration, ease: "easeInOut" }}
            >
              <polygon points={LEFT_POINTS} fill={LOGO_BLUE} />
              <polygon points={RIGHT_POINTS} fill={LOGO_GREEN} />
            </motion.g>

            {/* Outline, drawn first and dissolved just BEHIND the colour front,
                so the ink never looks like it is erased ahead of the fill. */}
            <motion.g
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: T.inkFadeStart, duration: T.inkFadeDuration, ease: "easeIn" }}
            >
              {[LEFT_POINTS, RIGHT_POINTS].map((points, i) => (
                <motion.polygon
                  key={points}
                  points={points}
                  fill="none"
                  stroke={INK}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: T.drawStart + i * T.drawStagger,
                    duration: T.drawDuration,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.g>
          </motion.g>
        </motion.svg>
      ) : null}
    </div>
  );
}
