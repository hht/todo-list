type P = 1 | 2 | 3 | 4;

type Todo = {
  title: string;
  content: string;
  part?: P;
  tag: string;
  id: string;
};

interface TodoStore {
  todos: Todo[];
  dropZone: string | null;
  dragItem: string | null;
  addTodo: (todo: Todo) => void;
  removeTodo: () => void;
  editing: boolean;
}
