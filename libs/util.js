import firebase from "../config/firebase"
import { uid } from 'uid';


export const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};
  
export const truncate = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
};

export const filterInt = (value) => {
    if(value == null) return null
    if (/^(-|\+)?(\d+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function bool(value) {
  if(value == null || value == false ) return false
  if(value == true) return true
}

export function jsonResponse(status= number, data= any, init = ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  })
}

