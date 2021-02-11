import { useEffect, useState } from "react";
import { useStorage } from "@capacitor-community/react-hooks/storage";
import { ToDoElement } from "../interfaces/ToDoElement";

export function useTodoList() {
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
    const newTodoElement = [{
      label: text,
      checked: false,
      key: todoElements.length,
    }, ...todoElements];

    setTodoElements(newTodoElement);
  };

  return {
    todoElements,
    createTodoElement,
  };
}
