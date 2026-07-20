import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export type MovieListType = "purchased" | "saved" | "downloaded" | "watching";

// Fetch a specific list for a user
export async function getUserMovies(userId: string, type: MovieListType): Promise<string[]> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data[type] || [];
    } else {
      // Create user doc if it doesn't exist
      await setDoc(docRef, {
        purchased: [],
        saved: [],
        downloaded: [],
        watching: []
      });
      return [];
    }
  } catch (error) {
    console.error("Error fetching user movies:", error);
    return [];
  }
}

// Fetch all lists for a user
export async function getAllUserMovies(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Record<MovieListType, string[]>;
    }
    return { purchased: [], saved: [], downloaded: [], watching: [] };
  } catch (error) {
    console.error("Error fetching all user movies:", error);
    return { purchased: [], saved: [], downloaded: [], watching: [] };
  }
}

// Toggle a movie in a specific list
export async function toggleUserMovie(userId: string, type: MovieListType, movieId: string, forceAdd: boolean = false): Promise<boolean> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    let isAdded = false;

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        purchased: [],
        saved: [],
        downloaded: [],
        watching: []
      });
    }

    const data = docSnap.exists() ? docSnap.data() : {};
    const list = data[type] || [];

    if (list.includes(movieId) && !forceAdd) {
      await updateDoc(docRef, {
        [type]: arrayRemove(movieId)
      });
      isAdded = false;
    } else {
      await updateDoc(docRef, {
        [type]: arrayUnion(movieId)
      });
      isAdded = true;
    }

    return isAdded;
  } catch (error) {
    console.error(`Error toggling movie in ${type}:`, error);
    return false;
  }
}
