import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHX7kBmBjmxMNQBR1yNNYUWci4Kz-WbgU",
  authDomain: "next13-blog.firebaseapp.com",
  projectId: "next13-blog",
  storageBucket: "next13-blog.appspot.com",
  messagingSenderId: "561157535880",
  appId: "1:561157535880:web:d5f33d8a67889eedb8c73d",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
