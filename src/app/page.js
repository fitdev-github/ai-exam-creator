"use client";

import NormalExam from "@/components/NormalExam";
import SpecialExam from "@/components/SpecialExam";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [examType, setExamType] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-12 md:max-w-[500px] mx-auto">
      <h1 className="font-bold text-2xl">AI Exam Creator</h1>
      {!examType && (
        <div className="flex flex-col gap-2 pt-6 w-full">
          <button
            onClick={() => setExamType("normal-exam")}
            className="btn btn-success text-success-content text-xl btn-xl btn-block"
          >
            ความรู้ทั่วไป
          </button>
          <button
            onClick={() => setExamType("special-exam")}
            className="btn btn-warning text-warning-content text-xl btn-xl btn-block"
          >
            ความเฉพาะทาง
          </button>
        </div>
      )}
      {examType === "normal-exam" && <NormalExam />}
      {examType === "special-exam" && <SpecialExam />}

      {examType && (
        <div className="w-full px-3">
          <button
            onClick={() => setExamType("")}
            className="btn btn-primary btn-block mt-6"
          >
            เลือกหัวข้อใหม่
          </button>
        </div>
      )}
    </div>
  );
}
