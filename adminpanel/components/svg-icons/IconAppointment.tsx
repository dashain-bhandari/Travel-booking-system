import React from "react";
import type { SVGProps } from "react";

export function IconAppointment(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
        <path d="M11.102 17.957Q6.297 17.495 3 12q3.6-6 9-6t9 6a20 20 0 0 1-.663 1.032M15 19l2 2l4-4"></path>
      </g>
    </svg>
  );
}
