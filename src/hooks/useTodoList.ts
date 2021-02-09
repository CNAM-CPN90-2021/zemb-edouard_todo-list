import { useState, useEffect } from "react";
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';

export interface ToDoElement {
  label: string | undefined;
  status: boolean;
  key: number;
}

export function useTodoList() {

  const [todoElements, setTodoElements] = useState<ToDoElement[]>([]);

  const createTodoElement = (text: string | undefined) => {
    const newTodoElement = [{
      label: text,
      status: false,
      key: todoElements.length
    }, ...todoElements];
    setTodoElements(newTodoElement)
  };

  return {
    todoElements,
    createTodoElement
  };
}