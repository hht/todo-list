"use client";
import "./globals.css";
import React from "react";
import { TodoCard } from "./components/TodoCard";
import Image from "next/image";
import Trash from "~/assets/trash.svg";
import Checked from "~/assets/checked.svg";
import { DropZone } from "~/app/components/DropZone";
import { useStore } from "~/app/store/useStore";
import { Form } from "~/app/components/TodoForm";
import { shallow } from "zustand/shallow";

export default () => {
  const todos = useStore((state) => state.todos, shallow);
  return (
    <div className="flex flex-col bg-gray-50">
      <div className="w-screen absolute top-0 z-10 left-0 h-[89px] bg-gradient-to-b from-white to-transparent" />
      <div className="flex flex-1">
        <DropZone id="trash">
          <Image src={Trash} alt="" />
        </DropZone>
        <div className="flex flex-col h-screen overflow-scroll">
          <div className="flex-1 scroll-smooth">
            <div className="scroll-behavior flex flex-col w-[489px] items-center gap-8 py-12 pb-[242px]">
              <div className="text-slate-200 text-7xl font-black">
                Daily Todo
              </div>
              {todos.map((todo) => (
                <TodoCard key={todo.id} {...todo} />
              ))}
            </div>
          </div>
        </div>
        <DropZone id="check">
          <Image src={Checked} alt="" />
        </DropZone>
      </div>
      <Form />
    </div>
  );
};
