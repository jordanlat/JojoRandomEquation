import './Equation.css';
import { IonLabel } from '@ionic/react';
import { useState } from 'react';

export function Lose(props) {
  console.log("Props", props);
  const user_reponse = props.u_reponse;
  const good_reponse = props.g_reponse;
  console.log("Lose");

  return (
    <div className="container">
      <h6 className="main">Perdu</h6>
      <h6 className="main">Vous avez répondu {user_reponse}.</h6>
      <h6 className="main">Mais la réponse était {good_reponse}.</h6>
    </div>
  );
};

export default Lose;
