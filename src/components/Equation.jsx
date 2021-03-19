import './Equation.css';
import { IonLabel } from '@ionic/react';
import { useState } from 'react';

export function Equation(props) {

  const { valueA, valueB, myOperator } = props;
  let operator = "";

  if (myOperator === 0) {
    operator = ("+");
  } else if (myOperator === 1) {
    operator = ("x");
  } else if (myOperator === 2) {
    operator = ("-");
  } else if (myOperator === 3) {
    operator = ("/");
  }

  return (
    <div className="container">
      <IonLabel>Combien fait</IonLabel>
      <h6 className="main">{valueA} {operator} {valueB} = ?</h6>
    </div>
  );
};

export default Equation;
