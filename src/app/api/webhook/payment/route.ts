import { NextResponse } from "next/server";
// In a real app, you would import firebase-admin here to securely update Firestore
// import * as admin from 'firebase-admin';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Example Payload from a Payment Gateway (ABA PayWay, KHQR, Stripe)
    // {
    //   "transactionId": "txn_12345",
    //   "userId": "user_abc",
    //   "movieId": "movie_xyz",
    //   "status": "SUCCESS",
    //   "amount": 4000
    // }

    console.log("Received Webhook Payload:", data);

    if (data.status !== "SUCCESS") {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    if (!data.userId || !data.movieId) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // IMPORTANT: Verify the signature of the webhook here to ensure it came from the bank!

    // Using Firebase Admin SDK (server-side)
    // await admin.firestore().collection('users').doc(data.userId).update({
    //   purchased: admin.firestore.FieldValue.arrayUnion(data.movieId)
    // });
    
    // Also save transaction to a 'transactions' collection for Admin Dashboard
    // await admin.firestore().collection('transactions').add({
    //   transactionId: data.transactionId,
    //   userId: data.userId,
    //   movieId: data.movieId,
    //   amount: data.amount,
    //   date: admin.firestore.FieldValue.serverTimestamp()
    // });

    return NextResponse.json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
