import React, { useRef, useState } from "react";

export default function BadgeType0(props) {

  return (
    <div className='w-max px-5 py-1 text-base font-medium gt-bg-type1 rounded-sm'>
        <div className='gt-text-gradient'>{props.text}</div>
    </div>
  );
}
