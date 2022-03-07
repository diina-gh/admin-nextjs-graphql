import React, { useRef, useState } from "react";


export default function VariantType1(props) {

  return (
    <div className="flex flex-row">
        {props.variant_types.map((item, i) => (
            <div key={i} className="flex flex-row justify-center w-10 h-10 mr-3 rounded-md border border-gray-400">
                <div className="self-center text-xs font-semibold text-gray-500">{item.value}</div>
            </div>
        ))}
    </div>
  );
}
