const admin = require('firebase-admin')
const firebaseKey = require('./firebaseKey.json');
const { initializeApp } = require('firebase-admin/app');
/* const { db } = require('../travel-planner/src/FireBaseInit'); */


admin.initializeApp( {
    credential: admin.credential.cert(firebaseKey),
    databaseURL: "https://api-project-32470662412-default-rtdb.europe-west1.firebasedatabase.app"
  } );

  const db = admin.firestore();

module.export = {db}