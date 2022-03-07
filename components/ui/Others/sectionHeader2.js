import React from "react";

export default function SectionHeader2(props) {

  return (
    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">

        <h2 className={"max-w-lg mb-2 text-2xl sm:text-3xl font-bold leading-none tracking-tight md:mx-auto" + ' ' + props.textColor}>

            <span className="relative inline-block z-0">
                <svg viewBox="0 0 52 24" fill="currentColor" className="absolute -top-2 left-0 z-0 hidden w-32 -mt-8 -ml-20 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                    <defs>
                        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="45%" stopColor="#2564eb1e"/>
                            <stop offset="55%" stopColor="#6d27d769"/>
                        </linearGradient>
                        <pattern id="70326c9b-4a0f-429b-9c76-792941e326d5" x="0" y="0" width=".135" height=".30">
                            <circle cx="2" cy="1" r=".75" fill="url(#Gradient2)" />
                        </pattern>
                    </defs>
                    <rect fill="url(#70326c9b-4a0f-429b-9c76-792941e326d5)" width="52" height="16" />
                </svg>
            </span>

            <span className="z-10 ">{props.text}</span>

        </h2>

        { props.description != null &&
            <p className="text-sm md:text-base text-gray-500 leading-4">{props.description}</p>
        }

    </div>
  );
}
