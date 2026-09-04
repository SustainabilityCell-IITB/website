import React from "react";

/* The Sustainability Cell mark, inline.

   Same geometry and colours as public/images/Scell-Logo.svg - kept inline rather
   than loaded as an <img> so the load film can stroke-draw the two halves and
   then flood them with colour. The <img> cannot be animated from the outside.

   Because the intro overlay and the navbar render THIS component at the same
   viewBox, the film's landing is a plain rect-to-rect move and the handover
   between the two is seamless. */

// Blue half: the left link of the mark.
export const LEFT_POINTS =
  "250,196.44 250,303.56 210.69,371.67 70.21,371.67 0,250 70.21,128.33 210.69,128.33 235.82,171.85 " +
  "205.38,226.34 179.76,181.93 101.18,181.93 61.87,250 101.18,318.07 179.76,318.07 219.07,250";

// Green half: the right link.
export const RIGHT_POINTS =
  "500,250 429.76,371.67 289.31,371.67 262.76,325.69 293.98,272.59 320.24,318.07 398.82,318.07 " +
  "438.13,250 398.82,181.93 320.24,181.93 280.93,250 250,303.56 250,196.44 289.31,128.33 429.76,128.33";

export const LOGO_BLUE = "#7CB7E3";
export const LOGO_GREEN = "#9CCC5A";

export default function ScellLogo({ className = "", title, ...rest }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
      {...rest}
    >
      <polygon points={LEFT_POINTS} fill={LOGO_BLUE} />
      <polygon points={RIGHT_POINTS} fill={LOGO_GREEN} />
    </svg>
  );
}
