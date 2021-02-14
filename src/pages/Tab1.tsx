import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonFooter,
  IonList,
  IonLabel,
  IonCheckbox,
  IonIcon,
  IonButton,
} from "@ionic/react";
import "./Tab1.css";
import { useTodoList } from "../hooks/useTodoList";
import { closeCircleOutline } from "ionicons/icons";

interface ContainerProps {
  filtered: boolean;
}

const Tab1: React.FC<ContainerProps> = ({ filtered }) => {
  const [text, setText] = useState<string>();
  const {
    todoElements,
    createTodoElement,
    updateTodoElement,
    removeTodoElement,
  } = useTodoList();

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonList>
          {todoElements
            .filter((todoElement) =>
              filtered ? todoElement.checked !== true : todoElement
            )
            .map((todoElement) => (
              <IonItem key={todoElement.key}>
                <IonLabel className={todoElement.checked ? "item-done" : ""}>
                  {todoElement.label}
                </IonLabel>
                <IonCheckbox
                  checked={todoElement.checked}
                  onIonChange={(e) =>
                    updateTodoElement({
                      ...todoElement,
                      checked: e.detail.checked,
                    })
                  }
                  slot="start"
                />
                <IonButton
                  color="danger"
                  size="small"
                  onClick={() => removeTodoElement(todoElement)}
                  slot="end"
                >
                  <IonIcon icon={closeCircleOutline}></IonIcon>
                </IonButton>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonInput
            placeholder="Qu'avez vous en tête ?"
            onInput={(event) => setText((event.target as any).value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                createTodoElement(text);
              }
            }}
          ></IonInput>
          <IonItem
            button
            onClick={() => createTodoElement(text)}
            slot="end"
            color="primary"
          >
            Créer
          </IonItem>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Tab1;
