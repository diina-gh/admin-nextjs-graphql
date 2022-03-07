import React, { useRef, useState } from "react";

export default function BadgeType1(props) {

  return (
    <div className="text-2xl sm:text-4xl md:text-6xl tracking-wide leading-normal font-semibold gt-text-gradient">{props.text}</div>
  );
}
