import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/database';
import firebase from "firebase/app";




var config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    databaseURL: ""
};
const firebaseApp = firebase.initializeApp(config);

let myData = [];

export function fireSubmit(thisPseudo, thisScore) {

    firebase.database().ref('leaderboards/').push({
        "pseudo": thisPseudo,
        "score": thisScore
    }
    );

}

export function FireGet() {

    const userRef = firebase.database().ref('leaderboards');
/*
    userRef.on('value', (snapshot) => {
        let newUser = [];
        snapshot.forEach(data => {
            const dataValue = data.val();
            console.log("data Value: ", dataValue);
        });
    });
*/


    //const data =  userRef.orderByChild("score").on('value',data=>{
    //    myData.push(data.val())
        //myData = JSON.parse(JSON.stringify(data.val()));
        //newData = JSON.parse(JSON.stringify(data.val()));
        /*
        data.val().forEach(element => {
            console.log(element)
        });
        myData = {...newData};
        console.log('fetch:',myData);
        */
    //}); 
    //return myData;
    let events = [];
    userRef.orderByChild('score').limitToLast(4).on('value', (snapshot) => {
        snapshot.forEach((child) => {
         events.push(child.val());
        });
        //console.log(events);
      });

    return events;
}


