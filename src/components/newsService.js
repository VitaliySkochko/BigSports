

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Функция для добавления новости в Firestore
const addNews = async (news) => {
  try {
    const docRef = await addDoc(collection(db, "news"), {
      ...news,
      createdAt: Timestamp.now()
    });
    console.log("News added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding news: ", e);
  }
};

export { addNews };
