"use client";
import React, { FC, useEffect } from "react";
import { useForm, useStore } from "../store/useStore";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Cancel from "~/assets/cancel.svg";
import Submit from "~/assets/submit.svg";
import Add from "~/assets/add.svg";
import { animated, useSpring } from "@react-spring/web";
import { uuid } from "../utils";

const Input: FC<
  { value: string; onChange: (v: string) => void } & Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  >
> = ({ value, onChange, ...props }) => {
  return (
    <input
      className="appearance-none focus:outline-none w-full px-3 h-11 rounded border border-gray-100 text-gray-500 placeholder:text-slate-200 text-xs font-medium"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    ></input>
  );
};

const TextArea: FC<
  { value: string; onChange: (v: string) => void } & Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "onChange"
  >
> = ({ value, onChange, ...props }) => {
  return (
    <textarea
      className="appearance-none focus:outline-none w-full px-3 py-3 rounded border border-gray-100 text-gray-500 placeholder:text-slate-200 text-xs font-medium"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    ></textarea>
  );
};

const Part: FC<{ value: P }> = ({ value }) => {
  const part = useForm((state) => state.part);
  return (
    <div
      className={`w-9 h-[35px] flex justify-center items-center rounded border border-gray-100 text-gray-400 text-base font-medium ${
        part === value ? "bg-rose-50 text-rose-600" : "bg-transparent"
      }`}
      onClick={() => useForm.setState({ part: value })}
    >
      {value}
    </div>
  );
};

export const FormButton: FC<{
  children: string | StaticImport;
  onClick: () => void;
}> = ({ children, onClick }) => (
  <div className="p-4 cursor-pointer" onClick={onClick}>
    <Image src={children} alt="" width={36} height={36} />
  </div>
);

export const TodoForm: FC = () => {
  const { title = "", content = "", tag = "", part } = useForm();
  const editing = useStore((state) => state.editing, shallow);
  useEffect(() => {
    return () => {
      useForm.setState({ title: "", content: "", tag: "", part: undefined });
    };
  }, []);
  const [{ scale }, api] = useSpring(() => ({ scale: 0 }));
  useEffect(() => {
    api.start({
      scale: editing ? 1 : 0,
    });
  }, [editing]);
  return (
    <animated.div
      className="z-20"
      style={{
        scale,
      }}
    >
      <div className="bg-white grid p-10 gap-3 w-[455px]">
        <Input
          placeholder="Take dog out on walk"
          value={title}
          onChange={(v) => useForm.setState({ title: v })}
        />

        <TextArea
          placeholder="He needs vaccine shot too"
          value={content}
          rows={4}
          onChange={(v) => useForm.setState({ content: v })}
        />
        <Input
          placeholder="Tags"
          value={tag}
          onChange={(v) => useForm.setState({ tag: v })}
        />
        <div className="flex flex-row cursor-pointer gap-[18px]">
          {[1, 2, 3, 4].map((it) => (
            <Part key={it} value={it as P} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center p-8">
        <FormButton onClick={() => useStore.setState({ editing: false })}>
          {Cancel}
        </FormButton>
        <FormButton
          onClick={() => {
            if (title) {
              useStore.getState().addTodo({
                title,
                content,
                tag,
                part: part,
                id: uuid(),
              });
            }
            useStore.setState({ editing: false });
          }}
        >
          {Submit}
        </FormButton>
      </div>
    </animated.div>
  );
};

export const Form: FC = () => {
  const editing = useStore((state) => state.editing, shallow);
  const { opacity } = useSpring({
    opacity: editing ? 0.4 : 0,
  });

  return editing ? (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-end items-center">
      <animated.div
        className="bg-gray-50 absolute left-0 right-0 top-0 bottom-0"
        style={{
          opacity,
        }}
      ></animated.div>
      <div className="absolute left-0 bottom-0 bg-gray-50 h-[224px] w-screen"></div>
      <TodoForm />
    </div>
  ) : (
    <div className="h-[224px] mt-[-224px]">
      <div className="h-[112px] bg-gradient-to-t from-white"></div>
      <div className="bg-white h-[112px] flex justify-center items-center">
        <FormButton onClick={() => useStore.setState({ editing: true })}>
          {Add}
        </FormButton>
      </div>
    </div>
  );
};
