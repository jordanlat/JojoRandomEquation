import './mButton.css';
import { IonButton } from '@ionic/react';

export function MButton(props) {

    const { number } = props;

    function clicked() {
        console.log(number);
        return number;
    }


    return (
        <div>
            <IonButton
                className="center"
                onClick={() => clicked()}
            >{number}</IonButton>
        </div>
    );
};

export default MButton;