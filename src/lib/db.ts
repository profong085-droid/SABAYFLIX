import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from "firebase/firestore";

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
  } catch (error: any) {
    if (error?.message?.includes("client is offline")) {
      console.warn("Firestore: Client is offline. Returning empty list.");
    } else {
      console.error("Error fetching user movies:", error);
    }
    return [];
  }
}

// Fetch all lists for a user
export async function getAllUserMovies(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Record<MovieListType, string[]> & { watchProgress?: Record<string, number> };
    }
    return { purchased: [], saved: [], downloaded: [], watching: [], watchProgress: {} };
  } catch (error: any) {
    if (error?.message?.includes("client is offline")) {
      console.warn("Firestore: Client is offline. Returning empty lists.");
    } else {
      console.error("Error fetching all user movies:", error);
    }
    return { purchased: [], saved: [], downloaded: [], watching: [], watchProgress: {} };
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
  } catch (error: any) {
    if (error?.message?.includes("client is offline")) {
      console.warn(`Firestore: Client is offline. Could not toggle movie in ${type}.`);
    } else {
      console.error(`Error toggling movie in ${type}:`, error);
    }
    return false;
  }
}

// Update the user's watch progress for a specific movie (in seconds)
export async function updateWatchProgress(userId: string, movieId: string, time: number): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        purchased: [],
        saved: [],
        downloaded: [],
        watching: [],
        watchProgress: { [movieId]: time }
      });
    } else {
      await updateDoc(docRef, {
        [`watchProgress.${movieId}`]: time
      });
    }
  } catch (error: any) {
    if (!error?.message?.includes("client is offline")) {
      console.error(`Error updating watch progress for movie ${movieId}:`, error);
    }
  }
}

// Get the user's watch progress for a specific movie (in seconds)
export async function getWatchProgress(userId: string, movieId: string): Promise<number> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.watchProgress && data.watchProgress[movieId]) {
        return data.watchProgress[movieId];
      }
    }
    return 0;
  } catch (error: any) {
    if (!error?.message?.includes("client is offline")) {
      console.error(`Error getting watch progress for movie ${movieId}:`, error);
    }
    return 0;
  }
}

// Get admin statistics (Total Users, Total Revenue)
export async function getAdminStats(): Promise<{ totalUsers: number, totalRevenue: number }> {
  try {
    const usersSnap = await getDocs(collection(db, "users"));
    let totalUsers = usersSnap.size;
    let totalPurchases = 0;

    usersSnap.forEach((doc) => {
      const data = doc.data();
      if (data.purchased && Array.isArray(data.purchased)) {
        totalPurchases += data.purchased.length;
      }
    });

    // Assume 4,000៛ per movie
    const totalRevenue = totalPurchases * 4000;
    
    return { totalUsers, totalRevenue };
  } catch (error: any) {
    if (!error?.message?.includes("client is offline")) {
      console.error("Error getting admin stats:", error);
    }
    return { totalUsers: 0, totalRevenue: 0 };
  }
}

// Update user name in Firestore
export async function updateUserName(uid: string, newName: string) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { displayName: newName }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user name:", error);
    return false;
  }
}

// Upgrade user to VIP
export async function upgradeToVip(uid: string, planName: string) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { 
      isVip: true, 
      vipPlan: planName,
      vipSince: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error upgrading to VIP:", error);
    return false;
  }
}
