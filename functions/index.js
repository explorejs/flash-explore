const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const realTimeDB = admin.database();

exports.airlinesDataScheduledAtOneAm = functions.pubsub
  .schedule("5 01 * * *")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    const airlinesRef = realTimeDB.ref("airlines").child("today");
    const goScrape = { twa: "cool" };
    console.log("hey");
    return airlinesRef
      .update(goScrape)
      .then(() => {
        console.log("ran the airlinesRef and updated db");
        return null;
      })
      .catch((err) => {
        console.log("error runningairlinesRef" + JSON.stringify(err));
        return null;
      });
  });
