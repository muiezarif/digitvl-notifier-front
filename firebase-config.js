import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyA7T_-3uPCC7f4OEpuGAz8UsKxgxrhexFk",
    authDomain: "digitvl-notifier.firebaseapp.com",
    projectId: "digitvl-notifier",
    storageBucket: "digitvl-notifier.appspot.com",
    messagingSenderId: "1081955786400",
    appId: "1:1081955786400:web:03ebdc82d62f9c808df3c5"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)