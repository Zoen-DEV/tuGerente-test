// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDTXLW7rxJO_i8GgR5ZdwIqTNWHRJI6IDU",
//   authDomain: "tugerente-test-ae1b1.firebaseapp.com",
//   projectId: "tugerente-test-ae1b1",
//   storageBucket: "tugerente-test-ae1b1.appspot.com",
//   messagingSenderId: "582726863766",
//   appId: "1:582726863766:web:6e6632fe0ed0d8fa002bb7"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBvtDnf0cS9ZI4M5GKIlBgspu9nd4V0vq8",
  authDomain: "tugerente-enzoholgado.firebaseapp.com",
  projectId: "tugerente-enzoholgado",
  storageBucket: "tugerente-enzoholgado.appspot.com",
  messagingSenderId: "345991713708",
  appId: "1:345991713708:web:8b7501b9efc5482c8a2009",
  measurementId: "G-2C8SZGG75V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export default app
