"use client";
import { FC, PropsWithChildren } from "react";
import { useStore } from "../store/useStore";
import { shallow } from "zustand/shallow";

export const DropZone: FC<PropsWithChildren & { id: string }> = ({
  children,
  id,
}) => {
  const { dragging } = useStore(
    (state) => ({ dragging: !!state.dragItem }),
    shallow
  );
  return (
    <div className={`flex-1 flex h-screen justify-center items-center `}>
      {dragging ? (
        <div
          onDrop={(e) => {
            useStore.getState().removeTodo();
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={() => useStore.setState({ dropZone: id })}
          onDragLeave={() => useStore.setState({ dropZone: null })}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
