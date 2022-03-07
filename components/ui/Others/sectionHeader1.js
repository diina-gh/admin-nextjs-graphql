import React from "react";

export default function SectionHeader1(props) {

  return (
    <div className="">
        <h5 className="w-full text-xl sm:text-2xl md:text-3xl tracking-tight font-semibold text-gtblack truncate">{props.text}</h5>
        <div style={{height: '2.25px'}} className="w-36 md:w-44 gt-bg-gradient mt-2"></div>
    </div>
  );
}
