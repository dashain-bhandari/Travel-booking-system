import React from "react";

export default function IconPending({ props }:any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      >
      <path
        fill="currentColor"
        d="M17 22q-2.075 0-3.537-1.463T12 17t1.463-3.537T17 12t3.538 1.463T22 17t-1.463 3.538T17 22m.5-5.2v-2.3q0-.2-.15-.35T17 14t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v4q0 .425-.288.713T20 10t-.712-.288T19 9V5h-2v2q0 .425-.288.713T16 8H8q-.425 0-.712-.288T7 7V5H5v14h4.5q.425 0 .713.288T10.5 20t-.288.713T9.5 21zm7-16q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
      />
    </svg>
  );
}
