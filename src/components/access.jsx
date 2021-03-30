import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/database';
import firebase from "firebase/app";




    var config = {
        apiKey: "AIzaSyCBUQo3FszolCAxDj2Sj1U1Dvogp8husL0",
        authDomain: "jojo-s-random-equation.firebaseapp.com",
        projectId: "jojo-s-random-equation",
        databaseURL: "https://jojo-s-random-equation-default-rtdb.europe-west1.firebasedatabase.app/"
    };
    const firebaseApp = firebase.initializeApp(config);

    export function fireSubmit(thisPseudo,  thisScore) {

        firebase.database().ref('leaderboards/').push({
            "pseudo": thisPseudo,
            "score": thisScore
        }
        );

    }

    export function fireGet() {
        const userRef = firebase.database().ref('leaderboards/');

        userRef.on('value', (snapshot) => {
            let newUser = [];
            snapshot.forEach(data => {
                const dataValue = data.val();
                console.log("data Value: ", dataValue);
            });
        });
    }


