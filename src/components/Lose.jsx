import './Lose.css';
import { IonLabel } from '@ionic/react';
import { useState } from 'react';

export function Lose(props) {
  const user_reponse = props.u_reponse;
  const good_reponse = props.g_reponse;

  return (
    <div className="text">
      <p className="center">Perdu</p>
      <p className="center">Vous avez répondu {user_reponse}.</p>
      <p className="center">Mais la bonne réponse était {good_reponse}.</p>
    </div>
  );
};

export default Lose;
