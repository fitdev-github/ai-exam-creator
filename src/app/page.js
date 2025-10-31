"use client";

import NormalExam from "@/components/NormalExam";
import SpecialExam from "@/components/SpecialExam";
import React, { useState, useEffect } from "react";
import { Bot, BookCheck, BookA } from "lucide-react";

export default function Home() {
  const [examType, setExamType] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-12 md:max-w-[500px] mx-auto">
      {!examType ? (
        <>
          <div>
            <Bot size={100} />
          </div>
          <h1 className="font-medium text-[50px] text-center text-nowrap leading-12 pt-3 pb-8">
            <span>AI Exam</span>
            <br />
            <span>Creator</span>
          </h1>
        </>
      ) : (
        <h1 className="font-medium text-2xl text-center">AI Exam creator</h1>
      )}

      {!examType && (
        <div className="flex flex-col gap-2 pt-6 w-full">
          <button
            onClick={() => setExamType("normal-exam")}
            className="btn btn-success text-success-content text-xl btn-xl btn-block btn-circle font-normal flex px-12"
          >
            <BookA /> <span>ความรู้ทั่วไป</span>
          </button>
          <button
            onClick={() => setExamType("special-exam")}
            className="btn btn-warning text-warning-content text-xl btn-xl btn-block btn-circle font-normal flex px-12"
          >
            <BookCheck /> <span>ความรู้เฉพาะทาง</span>
          </button>
        </div>
      )}
      {examType === "normal-exam" && <NormalExam />}
      {examType === "special-exam" && <SpecialExam />}

      {examType && (
        <div className="w-full px-3">
          <button
            onClick={() => setExamType("")}
            className="btn btn-primary btn-block mt-6 btn-circle"
          >
            <Bot /> เลือกหัวข้อใหม่
          </button>
        </div>
      )}
    </div>
  );
}
