import { db } from "./firebase-admin";

export async function getAllData() {
  const snapshot = await db
    .collection("performances")
    .orderBy("createdAt", "desc")
    .get();

  const tracks = [];

  snapshot.forEach((doc) => {
    tracks.push({ id: doc.id, ...doc.data() });
  });

  return tracks;
}

export async function getAllSubmissions() {
  const snapshot = await db
    .collection("submissions")
    .orderBy("createdAt", "desc")
    .get();

  const submissions = [];

  snapshot.forEach((doc) => {
    submissions.push({ id: doc.id, ...doc.data() });
  });

  return submissions;
}

export async function getTrackByID(uid) {
  const snapshot = await db.collection("performances").doc(uid).get();
  const trackById = { ...snapshot.data() };
  return trackById;
}
