import React, { useRef, useState } from "react";


export default function VariantType1(props) {

  return (
    <div className="flex flex-row">
        {props.variant_types.map((item, i) => (
            <div key={i} className="flex flex-row justify-center w-9 h-8 mr-3 rounded-md border border-gray-400 bg-gray-200 bg-opacity-50">
                <div className="self-center text-xs font-semibold text-gray-800">{item.value}</div>
            </div>
        ))}
    </div>
  );
}
