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

export function uploadImage(image){
    var imageref = image.name + uid(32)
    const uploadTask = firebase.storage().ref(`images/${imageref}`).put(image);
    uploadTask.on("state_changed",snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("progress ..", progress);
      },error => {console.log(error);},
      () => {
          firebase.storage().ref("images").child(imageref).getDownloadURL().then(url => {
            let imageInfo = {url, imageref}
            return imageInfo
          });
      }
    );
  };
  