import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// All transactions for a user live at: users/{uid}/transactions
const txnCollection = (uid) =>
  collection(db, "users", uid, "transactions");

// Fetch all transactions for the logged-in user (newest first)
export const fetchTransactions = async (uid) => {
  const q = query(txnCollection(uid), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Add a new transaction
export const addTransaction = async (uid, txn) => {
  const docRef = await addDoc(txnCollection(uid), {
    ...txn,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// Delete a transaction by Firestore doc id
export const deleteTransaction = async (uid, txnId) => {
  await deleteDoc(doc(db, "users", uid, "transactions", txnId));
};

// Update a transaction by Firestore doc id
export const updateTransaction = async (uid, txnId, updatedFields) => {
  await updateDoc(doc(db, "users", uid, "transactions", txnId), updatedFields);
};

export const getTransactions = async (userId) => {
  const ref = collection(db, "users", userId, "transactions");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
