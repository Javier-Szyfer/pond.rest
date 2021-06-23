import firebase from "./firebase";

const firestore = firebase.firestore();

export function subscribeUser(email) {
  return firestore.collection("subscribers").doc().set({ email: email });
}
