import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDdtPwQ_CRffeyi9i03TOf3GjDagxnH7IE",
  authDomain: "whatsapp-clone-9531a.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-9531a.firebaseio.com",
  projectId: "whatsapp-clone-9531a",
  storageBucket: "whatsapp-clone-9531a.appspot.com",
  messagingSenderId: "337688022438",
  appId: "1:337688022438:web:182bd0ef689dca905cd367",
  measurementId: "G-N40D0EVRYZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
