import React, { useRef, useState } from "react";


export default function VariantType2(props) {

  return (
    <div className="flex flex-row">
        {props.variant_types.map((item, i) => (
            <div key={i} className="flex flex-row justify-center w-8 h-8 mr-3 rounded-full border-2 border-gray-200 border-opacity-40" style={{backgroundColor: item.value}}></div>
        ))}
    </div>
  );
}
