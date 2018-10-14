import firebase from 'firebase'
require('firebase/database');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCScaJlTOqHcsOZgoMwSs_Lp8ZZUkRj94w",
    authDomain: "circle-sdhacks2018.firebaseapp.com",
    databaseURL: "https://circle-sdhacks2018.firebaseio.com",
    projectId: "circle-sdhacks2018",
    storageBucket: "circle-sdhacks2018.appspot.com",
    messagingSenderId: "825553706957"
  };

let fireBaseObject = firebase.initializeApp(config);

let auth = fireBaseObject.auth();

let db = fireBaseObject.database();

let storage = fireBaseObject.storage();


//database is passed as a prop to all of the main body componenets, which means they all can use any of these functions/variables
const database = {

  //the storage object
  storage,

  //the authorization object
  auth,

  //returns a promise that will give a url of the image on completion
  addConnection(uid, other_uid, circles, comment){
    db.ref(other_uid + '/connections/' + uid).update(circles);
    db.ref(uid + '/connected_with').update({uid:comment});
  },

  addUser(uid, circles){
    db.ref(uid + "/circles").update(circles);
  },

  getAllConnections(uid, callback) {
    db.ref(uid + '/connected_with').once('value').then((snapshot) => {
      let all_connection_data = {};
      let promises = [];
      let snapshot_val = snapshot.val();
      Object.keys(snapshot_val).forEach((other_uid) => {
        all_connection_data[other_uid] = {};
        let comment = snapshot_val[other_uid];
        all_connection_data[other_uid]["comment"] = comment;
        promises.push(db.ref(other_uid + '/connections/' + uid).once('value').then((circles_to_access) => {
          let circles_to_access_values = circles_to_access.val();
          let innerPromises = []
          Object.keys(circles_to_access_values).forEach((key) =>{
            let circle = circles_to_access_values[key];
            innerPromises.push(db.ref(other_uid + '/circles/' + circle).once('value').then((circle_data) => {
              all_connection_data[other_uid] = Object.assign({}, all_connection_data[other_uid], circle_data.val());
            }))
          })
          return innerPromises
        }));
      })
      Promise.all(promises).then((innerPromises) =>{
        let totalPromises = innerPromises.flat();
        Promise.all(totalPromises).then(() =>{
          callback(all_connection_data)
        })
      })
    });
  },

  getPersonalData(uid, callback) {
    db.ref(uid).once('value').then((snapshot) => {
      callback(snapshot.val())
    });
  },

  getConnection(uid, circle, callback) {
    db.ref(uid + '/circles/' + circle).once('value').then((circle_data) => {
      callback(circle_data.val());
    })
  }
};

//actually exports all the functions above
export default database