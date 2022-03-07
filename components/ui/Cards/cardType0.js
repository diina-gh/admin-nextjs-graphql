import React, { useRef, useState } from "react";
import BadgeIcon from "../icons/badgeIcon";
import TruckIcon from "../icons/truckIcon";
import UndoAltIcon from "../icons/undoAltIcon";

export default function CardType0(props) {

  return (
    <div className="flex flex-row my-2 mr-1">

        <div className="w-7 h-7 xl:w-8 xl:h-8 flex flex-row justify-center bg-gray-200 bg-opacity-30 border border-gray-300 rounded-md self-center mr-2">
        
            {props.icon == 'badge'  &&
                <BadgeIcon customClass="self-center h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            }

            {props.icon == 'truck'  &&
                <TruckIcon customClass="self-center h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            }

            {props.icon == 'return'  &&
                <UndoAltIcon customClass="self-center h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            }

        </div>

        <div className="w-28 self-center text-xs font-medium tracking-wide text-gtblack">{props.text}</div>

    </div>
  );
}
