import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonFooter,
  IonList,
} from "@ionic/react";
import TodoListItem from "../components/TodoListItem";
import { useTodoList } from "../hooks/useTodoList";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();

  const { createTodoElement, todoElements } = useTodoList();

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonList>
          {todoElements.map((element) => (
            <TodoListItem
              key={element.key}
              todoItem={element.label}
            ></TodoListItem>
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
