import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonList, IonInput, IonItemDivider, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import Equation from '../components/Equation';
import MButton from '../components/mButton';
import Lose from '../components/Lose';
import './Main.css';
import {fireSubmit, FireGet} from '../components/access';

export function Main(props) {

  let [valueA, setValueA] = useState(1);
  let [valueB, setValueB] = useState(1);
  let [myOperator, setMyOperator] = useState(0);
  const [nbrSolved, setNbrSolved] = useState(0);
  let [isOK, setIsOK] = useState(false);
  const [result, setResult] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [answer, setAnswer] = useState(0);
  const [hideLose, setHideLose] = useState(true);
  const [pseudo, setPseudo] = useState("toto");
  let [leaderBoards, setLeaderBoards] = useState([]);

/*
  var admin = require("firebase-admin");
  var db = admin.database();
  var ref = db.ref("https://jojo-s-random-equation-default-rtdb.europe-west1.firebasedatabase.app/");

  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
*/
  if (firstLoad) {
    get_all();
    setEquation();
    setFirstLoad(false);
  }

  function dice(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function isSolve() {
    let result = 0;

    if (myOperator === 0) {
      result = valueA + valueB;
    } else if (myOperator === 1) {
      result = valueA * valueB;
    } else if (myOperator === 2) {
      result = valueA - valueB;
    } else if (myOperator === 3) {
      result = valueA / valueB;
    }

    if (result == answer) {
      console.log("CORRECT");
      setEquation();
      setAnswer();
      setNbrSolved(nbrSolved + 1);
    } else {
      console.log("PERDU");
      setHideLose(false);

    }
    setResult(result);
    setIsOK(false);
  }

  function reset() {
    get_all();
    setHideLose(true);
    setAnswer();
    setEquation();
    setNbrSolved(0);
    setPseudo(' ');
  }

  function validate() {
    fireSubmit(pseudo, nbrSolved);
  }


  function setEquation() {
    while (isOK === false) {
      const newA = dice(15);
      const newB = dice(15);
      const newOper = dice(4);

      valueA = newA;
      valueB = newB;
      myOperator = newOper;

      if (myOperator === 0) {
        setResult(valueA + valueB);
        isOK = true;

      } else if (myOperator === 1) {
        setResult(valueA * valueB);
        isOK = true;

      } else if (myOperator === 2) {

        const subValue = (valueA - valueB);
        if (subValue >= 0) {
          isOK = true;
        }

      } else if (myOperator === 3) {
        const divValue = (valueA / valueB);
        if (divValue % 1 == 0) {
          isOK = true;
        }
      } else {
        console.log("error", valueA, myOperator, valueB);
      }

      setValueA(newA);
      setValueB(newB);
      setMyOperator(newOper);
    }
  }

 async function get_all(){
  leaderBoards = await FireGet();
  setLeaderBoards(leaderBoards);
}

function setBoard (){
  console.log(leaderBoards.reverse());
}


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jojo's Random Equation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="score">
        <h3>Score: {nbrSolved}</h3>
      </IonContent>
      <IonContent>
        <Equation valueA={valueA} valueB={valueB} myOperator={myOperator} />
        <IonContent hidden={hideLose}>
          <Lose g_reponse={result} u_reponse={answer} />
        </IonContent>
      </IonContent>
      <IonContent hidden={hideLose} className="medium_max_height">
        <IonItem>
          <IonLabel>Entrer un pseudo:</IonLabel>
          <IonInput autofocus={true} type="text" value={pseudo} placeholder="Votre pseudo" onIonChange={(e) => {
            setPseudo(e.detail.value);
          }}></IonInput>
        </IonItem>
        <IonButton className="center" onClick={() => {
          reset();
          validate();
        }}>
          Recommencer
        </IonButton>

      </IonContent>
      <IonContent hidden={!hideLose} className="lower_max_height">
        <form onSubmit={(e) => {
          e.preventDefault();
          isSolve();
        }}>
          <IonItem>
            <IonInput autofocus={true} type="number" value={answer} placeholder="Votre reponse" onIonChange={(e) => {
              setAnswer(e.detail.value);
            }}></IonInput>
          </IonItem>
        </form>
      </IonContent>
      <IonContent>
        <IonLabel className="center">Leader Boards</IonLabel>
            {

              leaderBoards.reverse().slice(0,4).map((e, index)=> {
                console.log(e);

                return (
                  <IonItem key={index}><p>{index + 1}. {e.pseudo} - {e.score}</p></IonItem>
                )

              })

            }
      </IonContent>
    </IonPage>
  );
};

export default Main;
