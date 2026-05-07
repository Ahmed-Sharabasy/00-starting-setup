import express from "express";
import mysql2 from "mysql2";

import admin from "firebase-admin";
import serviceAccount from "./config/to-b-healthy-firebase-adminsdk-fbsvc-103ade8d6b.json" with { type: "json" };
import { protect } from "./middlewares/authMeddleware.js";
console.log(serviceAccount);

// const database = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   password: "0000",
//   database: "to_b_healthy",
// });
// console.log(database);
// database.execute("SELECT * FROM users");

const app = express();
const router = express.Router();

// initialize firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// console.log(admin.app()); // "[DEFAULT]"

// connect to firestore (Flutter database)
const db = admin.firestore();

// get all users from firestore
const snapshot = await db.collection("users").get();
snapshot.forEach((doc) => {
  console.log(doc.data());
});

async function getAllCollections() {
  const collections = await db.listCollections();

  collections.forEach((collection) => {
    console.log("Collection Name:", collection.id);
  });
}

getAllCollections();

// const collections = new Promise((resolve, reject) => {
//   db.listCollections()
//     .then((collections) => {
//       resolve(
//         collections.forEach((collection) => {
//           console.log("Collection Name:", collection.id);
//         }),
//       );
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

// const collectionsPromise = db
//   .listCollections()
//   .then((collections) => {
//     collections.forEach((collection) => {
//       console.log("Collection Name:", collection.id);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Routes
router.route("/getMe").get(protect, async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
