import React, { useRef, useState } from "react";

export default function Console(props) {

  return (
    <div className="h-6 flex flex-row">
        <div className="h-full w-6 flex flex-row justify-center bg-gray-200 border border-gray-800 rounded-md gt-shadow1 btn-effect1 cursor-pointer mr-1">
            <div className="self-center text-base font-semibold text-gray-800">-</div>
        </div>
        <div className="h-full w-12 h-6 self-center border border-gray-500">
            <input type="number" min={0} defaultValue={1} className="border-0 focus:ring-0 w-full h-full text-center text-sm font-medium bg-gray-100 bg-opacity-60 text-gray-900" readOnly/>
        </div>
        <div className="h-full w-6 flex flex-row justify-center bg-gray-200 border border-gray-800 rounded-md gt-shadow1 btn-effect1 cursor-pointer ml-1">
            <div className="self-center text-base font-semibold text-gray-800">+</div>
        </div>
    </div>
  );
}