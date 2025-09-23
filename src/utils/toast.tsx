import React from "react";
import { toast } from "react-toastify";

const notifySuccess = (title: string, msg: string) =>
  toast(
    <div className="flex flex-col">
      <span className="font-bold text-black">{title}</span>
      <span className="text-black">{msg}</span>
    </div>,
    {
      style: {
        backgroundColor: "rgba(240, 241, 240, 1)",
        fontWeight: "400",
        borderRadius: "0.75rem",
        padding: "1rem",
      },
      position: "top-right",
      autoClose: 3000,
    }
  );

const notifyError = (title: string, msg: string) =>
  toast(
    <div className="flex flex-col">
      <span className="font-bold text-black">{title}</span>
      <span className="text-black">{msg}</span>
    </div>,
    {
      style: {
        backgroundColor: "rgba(240, 241, 240, 1)",
        fontWeight: "400",
        borderRadius: "0.75rem",
        padding: "1rem",
      },
      position: "top-right",
      autoClose: 3000,
    }
  );

export { notifySuccess, notifyError };
