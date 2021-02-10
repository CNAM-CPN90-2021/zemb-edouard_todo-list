import React, { useState } from "react";
import { IonItem, IonLabel, IonCheckbox, IonList } from "@ionic/react";
import "./ItemTodo.css";
import { useTodoList } from "../hooks/useTodoList";
import ItemTodo from "./ItemTodo";
import { ToDoElement } from "../interfaces/ToDoElement";

interface ContainerProps {
  todoElements: ToDoElement[];
}

const TodoList: React.FC<ContainerProps> = ({ todoElements }) => {

  return (
    <IonList>
      {todoElements.map((element) => (
        <ItemTodo key={element.key} todoItem={element.label}></ItemTodo>
      ))}
    </IonList>
  );
};

export default TodoList;
