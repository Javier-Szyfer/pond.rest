import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function subscribe(data) {
  const site = firestore.collection("subscribers").doc();
  site.set(data);

  return site;
}
