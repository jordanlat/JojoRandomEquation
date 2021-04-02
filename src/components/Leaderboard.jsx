import { useEffect, useState } from 'react';
import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonList, IonInput, IonItemDivider, IonItem, IonLabel } from '@ionic/react';
import './Leaderboard.css';

export default function List(props) {
    //let [newList, setNewList] = useState([]);
    let newList = [];
    const thisList = props.list;
    thisList.reverse().map((e, index) => {
        console.log(e, index);
        newList[index] = e;
    })

    


    return (
        <IonContent>
            <IonLabel className="center">Leader Boards</IonLabel>
            {

                newList.slice(0,4).map((e, index) => {
                    console.log(e);
                    return (
                        <IonItem key={index}><p  className='center_text'>{index + 1}. {e.pseudo} - {e.score}</p></IonItem>
                    )

                })

            }
        </IonContent>
    )
}