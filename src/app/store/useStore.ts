import { createWithEqualityFn } from "zustand/traditional";

export const useStore = createWithEqualityFn<TodoStore>((set, get) => {
  return {
    todos: [],
    dropZone: null,
    dragItem: null,
    editing: false,
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: () =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== get().dragItem),
        dragItem: null,
        dropZone: null,
      })),
  };
});

export const useForm = createWithEqualityFn<Partial<Todo>>((set) => {
  return {};
});
