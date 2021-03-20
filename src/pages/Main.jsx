import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonList, IonInput, IonItemDivider, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import Equation from '../components/Equation';
import MButton from '../components/mButton';
import Lose from '../components/Lose';
import './Main.css';
/*
let valueA = 0;
let valueB = 0;
let myOperator = "";
*/
export function Main(props) {

  let [valueA, setValueA] = useState(1);
  let [valueB, setValueB] = useState(1);
  let [myOperator, setMyOperator] = useState(0);
  const [mbrSolved, setNbrSolved] = useState();
  let [isOK, setIsOK] = useState(false);
  const [result, setResult] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [answer, setAnswer] = useState(0);
  const [hideLose, setHideLose] = useState(true);


  if (firstLoad) {
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
      //reset();
    } else {
      console.log("PERDU");
      setHideLose(false);
      
    }
    setResult(result);
    setIsOK(false);
  }

  function reset() {
    setHideLose(true);
    setAnswer();
    setEquation();
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jojo's Random Equation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Equation valueA={valueA} valueB={valueB} myOperator={myOperator} />
      </IonContent>
      <IonContent hidden={hideLose}>
        <div>
          <Lose g_reponse={result} u_reponse={answer} />
        </div>
        <div>
          <IonButton onClick={() => {
            reset();
          }}>
            Recommencer
        </IonButton>
        </div>

      </IonContent>
      <IonContent hidden={!hideLose}>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log()
          isSolve();
        }}>
          <IonItem>
            <IonInput autofocus={true} type="number" value={answer} placeholder="Votre reponse" onIonChange={(e) => {
              setAnswer(e.detail.value);
            }}></IonInput>
            <IonButton>OK</IonButton>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Main;
