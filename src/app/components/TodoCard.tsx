"use client";
import React, { FC } from "react";
import { useStore } from "~/app/store/useStore";
import { useToggle, uuid } from "~/app/utils";

const Tag: FC<{ value?: P | string }> = ({ value }) => {
  if (!value) {
    return null;
  }
  const isNumber = typeof value === "number";
  return (
    <div
      className={`px-2 py-[5px] ${
        isNumber ? "bg-red-50" : "bg-green-50"
      } rounded-[10px] ${
        isNumber ? "text-rose-600" : "text-green-600"
      } text-xs font-bold`}
    >
      {`${isNumber ? `P${value}` : value}`}
    </div>
  );
};

export const TodoCard: FC<{
  title: string;
  content: string;
  id?: string;
  part?: P;
  tag: string;
}> = ({ title, content, part, tag, id = uuid() }) => {
  const [active, toggle] = useToggle();
  return (
    <div className="w-[489px] flex justify-center">
      <div
        draggable
        onDragStart={(e) => {
          useStore.setState({ dragItem: id });
        }}
        onMouseOver={toggle}
        onMouseOut={toggle}
        className="transition-all cursor-move duration-500 w-[445px] hover:w-[489px] bg-white rounded-lg shadow px-[34px] py-[26px] hover:px-14 hover:py-8 hover:rounded-[8.8px]"
      >
        <div className="flex-col justify-start flex gap-3">
          <div className="text-gray-700 text-2xl font-extrabold">{title}</div>
          <div
            className={`transition-all duration-500 text-gray-500 text-base font-medium ${
              active ? "line-clamp-5" : "line-clamp-2"
            } ${active ? "h-[96px]" : "h-[48px]"}`}
          >
            {content}
          </div>
          <div className="gap-3 inline-flex">
            <Tag value={part}></Tag>
            <Tag value={tag}></Tag>
          </div>
        </div>
      </div>
    </div>
  );
};
