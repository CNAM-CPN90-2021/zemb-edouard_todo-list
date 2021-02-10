export interface ToDoElement {
    label: string | undefined;
    status: boolean;
    key: number;
    filepath?: string;
    webviewPath?: string;
  }