import { useState, useEffect } from "react";
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ToDoElement } from "../interfaces/ToDoElement";

const TODOLIST_STORAGE = "todolist";
export function useTodoList() {

  const [todoElements, setTodoElements] = useState<ToDoElement[]>([]);
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  
  const createTodoElement = async (text: string | undefined) => {
    const newTodoElement = {
      label: text,
      status: false,
      key: todoElements.length
    };
    const fileName = `${new Date().getTime()} + ${newTodoElement.key}`;
    const savedToDoElements = await saveToDoElement(newTodoElement, fileName);
    const newTodoElements = [savedToDoElements, ...todoElements];
    setTodoElements(newTodoElements)
  };

  const saveToDoElement = async (todoElement: ToDoElement, fileName: string): Promise<ToDoElement> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await readFile({
        path: todoElement.filepath!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(todoElement.webviewPath!);
    }
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  
    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        label: todoElement.label,
        status: todoElement.status,
        key: todoElement.key,
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        label: todoElement.label,
        status: todoElement.status,
        key: todoElement.key,
        filepath: fileName,
        webviewPath: todoElement.webviewPath
      };
    }

  }
  return {
    todoElements,
    createTodoElement
  };
}