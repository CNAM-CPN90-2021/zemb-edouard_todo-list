import { useState, useEffect } from "react";
import { ToDoElement } from "../interfaces/ToDoElement";
import { useStorage } from "@capacitor-community/react-hooks/storage";

export const useTodoList = () => {
  const [todoElements, setTodoElements] = useState<ToDoElement[]>([]);
  const { get, set } = useStorage();

  /*
    👍
  */
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

  /*
    👍
  */
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

  /*
    👍
  */
  function updateTodoElement(updatedTodoElement: ToDoElement) {
    const newtodoElements = todoElements.map((item) => {
      if (item.key === updatedTodoElement.key) {
        return updatedTodoElement;
      }
      return item;
    });

    setTodoElements(newtodoElements);
  }

  /*
    👍
  */
  function removeTodoElement(todoElement: ToDoElement) {
    const newtodoElements = todoElements.filter(
      (item) => item.key != todoElement.key
    );
    setTodoElements(newtodoElements);
  }

  return {
    todoElements,
    createTodoElement,
    updateTodoElement,
    removeTodoElement,
  };
};
