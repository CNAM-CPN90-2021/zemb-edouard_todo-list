import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonFooter,
} from "@ionic/react";
import { useTodoList } from "../hooks/useTodoList";
import "./Tab1.css";
import TodoList from "../components/TodoList";

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();

  const { createTodoElement, todoElements } = useTodoList();

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <TodoList todoElements={todoElements}></TodoList>
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
