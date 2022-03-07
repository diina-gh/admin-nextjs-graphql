import React, { useRef, useState } from "react";
import UserIcon from "../ui/icons/userIcon";
import HeartIcon from "../ui/icons/heartIcon";
import LogoutIcon from "../ui/icons/logoutIcon";
import BoxIcon from "../ui/icons/boxIcon";
import BellIcon from "../ui/icons/bellIcon";
import TimePastIcon from "../ui/icons/timePastIcon";

export default function Sidebar(props) {

  return (
    <div className="w-64 h-max border border-gray-700 border-opacity-60 rounded-lg py-6 px-6 sticky top-20">

        <div className="border-b border-slate-200 border-opacity-20 pb-4">
            <div className="w-full flex flex-row justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 bg-opacity-20 animate-pulse">
                    {/* <img src="" /> */}
                </div>
            </div>
            <div className="w-full text-center text-sm text-gray-300 font-semibold truncate mt-3">Seydina GUEYE</div>
            <div className="w-full text-center text-xs text-gray-400 text-opacity-60 font-medium truncate mt-1">dina3903@gmail.com</div>
        </div>

        <div className="mt-3 border-b border-slate-200 border-opacity-20 pb-2">

            <div className="flex flex-row hover:bg-purple-600 hover:bg-opacity-20 p-2 mb-1 rounded-lg cursor-pointer">
                <UserIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Mon Profil</div>
            </div>

            <div className="flex flex-row hover:bg-purple-600 hover:bg-opacity-20 p-2 mb-1 rounded-lg cursor-pointer">
                <HeartIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Favoris</div>
            </div>

            <div className="flex flex-row hover:bg-purple-600 hover:bg-opacity-20 p-2 mb-1 rounded-lg cursor-pointer">
                <BoxIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Commandes</div>
            </div>

            <div className="flex flex-row hover:bg-purple-600 hover:bg-opacity-20 p-2 mb-1 rounded-lg cursor-pointer">
                <BellIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Notifications</div>
            </div>

            <div className="flex flex-row hover:bg-purple-600 hover:bg-opacity-20 p-2 mb-1 rounded-lg cursor-pointer">
                <TimePastIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Vus récemments</div>
            </div>

        </div>

        <div className="mt-3">

            <div className="flex flex-row hover:bg-red-400 hover:bg-opacity-20 p-2 rounded-lg cursor-pointer">
                <LogoutIcon customClass="w-4 h-4 self-center text-gray-400 mr-3" />
                <div className="text-sm text-gray-300 font-semibold">Déconnexion</div>
            </div>

        </div>


    </div>
  );
}
