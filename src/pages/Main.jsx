import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonList, IonInput, IonItemDivider, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';
import Equation from '../components/Equation';
import MButton from '../components/mButton';
import List from '../components/Leaderboard';
import Lose from '../components/Lose';
import './Main.css';
import { fireSubmit, FireGet } from '../components/access';

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
  const [pseudo, setPseudo] = useState('');
  let [leaderBoards, setLeaderBoards] = useState([]);
  let [tempBoard, setTempBoard] = useState([]);

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
    console.log('firstLoad');
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
      //console.log("CORRECT");
      setEquation();
      setAnswer();
      setNbrSolved(nbrSolved + 1);
    } else {
      //console.log("PERDU");
      get_all();
      setHideLose(false);

    }
    setResult(result);
    setIsOK(false);
  }

  function reset() {

    setHideLose(true);
    setAnswer();
    setEquation();
    setNbrSolved(0);
    setPseudo(' ');
    get_all();
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

  async function get_all() {
    let tempData = await FireGet();
    //leaderBoards = await FireGet();
    setTempBoard(tempData);
    //console.log('tempBoard: ',tempBoard);
    reverse();
  }

  function reverse() {
    const temparray = [];
    tempBoard.reverse().map((e, index) => {
      //console.log(e, index);
      temparray[index] = e;
    });

    setLeaderBoards(temparray);
  }

  function getNumber(number) {
     console.log(number);
     let prevAns = answer;
     if(prevAns == null || prevAns == undefined) {
      prevAns = 0;
     }
     setAnswer(prevAns + '' + number );
     console.log(answer);
  }

  function nbrRST() {
    console.log('RESETOO');
    setAnswer(0);
  }

  function chrono () {
    let time = new Date();
    console.log(time.getSeconds());
    time.setSeconds(0);
    console.log(time.getSeconds());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jojo's Random Equation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="score">
        <h1>Score: {nbrSolved}</h1>
      </IonContent>
      <IonContent>
        <Equation valueA={valueA} valueB={valueB} myOperator={myOperator} />
        <IonContent hidden={hideLose}>
          <Lose g_reponse={result} u_reponse={answer} />
        </IonContent>
      </IonContent>
      <IonContent hidden={hideLose}>
        <List list={leaderBoards} />
      </IonContent>
      <IonContent hidden={hideLose} hidden={hideLose} className="medium_max_height">
        <IonItem>
          <IonLabel>Entrer un pseudo:</IonLabel>
          <IonInput autofocus={true} type="text" value={pseudo} placeholder="Votre pseudo" onIonChange={(e) => {
            setPseudo(e.detail.value);
          }}></IonInput>
        </IonItem>
        <IonButton className="center" onClick={() => {
          console.log('reset');
          reset();
          validate();
        }}>
          Valider
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

      <IonContent hidden={!hideLose}>
        <IonGrid>
          <IonRow className="pad">
            <IonButton className='number' onClick={()=>getNumber(7)}>7</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(8)}>8</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(9)}>9</IonButton>
          </IonRow>


          <IonRow className="pad">
            <IonButton className='number'  onClick={()=>getNumber(4)}>4</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(5)}>5</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(6)}>6</IonButton>
          </IonRow>


          <IonRow className="pad">
            <IonButton className='number'  onClick={()=>getNumber(1)}>1</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(2)}>2</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(3)}>3</IonButton>
          </IonRow>

          <IonRow className="pad">
            <IonButton color="danger" className='number'  onClick={()=>nbrRST()}>X</IonButton>
            <IonButton className='number'  onClick={()=>getNumber(0)}>0</IonButton>
            <IonButton color="success" className='number'  onClick={()=>isSolve()}>OK</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonButton onClick={()=>chrono()}>OK</IonButton>
    </IonPage>
  );
};

export default Main;
