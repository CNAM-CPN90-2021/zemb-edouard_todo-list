import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput,
  IonTabBar, IonFooter, IonButton, IonIcon, IonLabel, IonCheckbox
} from '@ionic/react';

interface ContainerProps {
  todoItem: string | undefined;
}

const TodoListItem: React.FC<ContainerProps> = ({ todoItem }) => {

  const [checked, setChecked] = useState(false);

  return (
    <IonItem>
      <IonLabel>{todoItem}</IonLabel>
      <IonCheckbox checked={checked} onIonChange={e => {
        setChecked(e.detail.checked);
        
      }
      } slot="start" />
    </IonItem>
  )
};

export default TodoListItem;
