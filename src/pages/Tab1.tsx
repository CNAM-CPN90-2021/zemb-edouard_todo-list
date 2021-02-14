import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import "./Tab1.css";
import { useStorage } from "@capacitor-community/react-hooks/storage";
import { ToDoElement } from "../interfaces/ToDoElement";

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();
  const [todoElements, setTodoElements] = useState<ToDoElement[]>([]);
  const { get, set } = useStorage();

  // ce code s'executera seulement à l'initialisation du composant
  useEffect(() => {
    async function getListFromStorage() {
      const jsonList = await get("list");
      if (jsonList) {
        setTodoElements(JSON.parse(jsonList));
      }
    }
    getListFromStorage();
  }, []);

  // ce code s'executera seulement à chaque fois que la liste est mise à jour
  useEffect(() => {
    set("list", JSON.stringify(todoElements));
  }, [todoElements]);

  function createTodoElement(text: string | undefined) {
    const newTodoElements = [
      {
        label: text,
        checked: false,
        key: todoElements.length,
      },
      ...todoElements,
    ];
    setTodoElements(newTodoElements);
  }

  function updateTodoElement(todoElement: ToDoElement) {
    const newtodoElements = todoElements.map((item) => {
      if (item.key === todoElement.key) {
        return todoElement;
      }
      return item;
    });

    setTodoElements(newtodoElements);
  }

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonList>
          {todoElements.map((todoElement) => (
            <IonItem key={todoElement.key}>
              <IonLabel className={todoElement.checked ? "item-done" : ""}>
                {todoElement.label}
              </IonLabel>
              <IonCheckbox
                checked={todoElement.checked}
                onIonChange={(e) => updateTodoElement({
                  ...todoElement,
                  checked: e.detail.checked,
                })}
                slot="start"
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonInput
            value={text}
            placeholder="Qu'avez vous en tête ?"
            onInput={(event) => setText((event.target as any).value)}
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
