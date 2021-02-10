import React, { useState } from "react";
import { IonItem, IonLabel, IonCheckbox } from "@ionic/react";
import "./ItemTodo.css";

interface ContainerProps {
  todoItem: string | undefined;
}

const ItemTodo: React.FC<ContainerProps> = ({ todoItem }) => {
  const [checked, setChecked] = useState(false);
  const [className, setClassName] = useState("");

  return (
    <IonItem>
      <IonLabel className={className}>{todoItem}</IonLabel>
      <IonCheckbox
        checked={checked}
        onIonChange={(e) => {
          const checkedValue = e.detail.checked
          setChecked(checkedValue);
          setClassName(checkedValue ? "item-done" : "");
        }}
        slot="start"
      />
    </IonItem>
  );
};

export default ItemTodo;
