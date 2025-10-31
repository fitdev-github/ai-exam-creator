"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import { validation } from "@/libs";

const AppModal = dynamic(() => import("@/components/AppModal"), { ssr: false });

export default function NormalExam() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [numOfQuestion, setNumofQuestion] = useState("");
  const [difficalty, setDifficalty] = useState("");
  const [langauge, setLanguage] = useState("");
  const [isValidation, setIsvalidation] = useState(false);

  const fetchQuiz = async () => {
    const dataForm = {
      topic,
      noq: numOfQuestion,
      difficalty,
      langauge,
    };

    const validate = validation(dataForm);

    if (validate.status) {
      setIsvalidation(validate);
    } else {
      router.push(
        `/quiz?topic=${dataForm.topic}&noq=${dataForm.noq}&difficalty=${dataForm.difficalty}&langauge=${dataForm.langauge}&type=normal-exam`
      );
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3 w-full pt-12">
        <AppModal submitTopic={setTopic} />
        <input
          type="number"
          className="input w-full validator input-secondary bg-secondary rounded-2xl text-lg ring-2 ring-offset-2 outline-2 outline-offset-2 outline-accent-content ring-accent-content"
          placeholder="จำนวนข้อ"
          onChange={(e) => setNumofQuestion(e.target.value)}
        />
        <select
          defaultValue="ระดับความยาก"
          className="select w-full rounded-2xl text-lg select-accent bg-accent ring-2 ring-offset-2 outline-2 outline-offset-2 outline-accent-content ring-accent-content"
          onChange={(e) => setDifficalty(e.target.value)}
        >
          <option disabled={true}>ระดับความยาก</option>
          <option value="easy">ง่าย</option>
          <option value="medium">ปานกลาง</option>
          <option value="hard">ยาก</option>
        </select>

        <select
          defaultValue="ภาษา"
          className="select w-full rounded-2xl text-lg select-warning bg-warning ring-2 ring-offset-2 outline-2 outline-offset-2 outline-accent-content ring-accent-content"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option disabled={true}>ภาษา</option>
          <option value="THAI">ไทย</option>
          <option value="ENGLISH">อังกฤษ</option>
        </select>
        {isValidation.status && (
          <div role="alert" className="alert alert-error text-error-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{isValidation.message}</span>
          </div>
        )}
        <button
          onClick={fetchQuiz}
          className="btn btn-success rounded-2xl text-lg mt-6 shadow-2xl"
        >
          สร้างข้อสอบ
        </button>
      </div>
    </div>
  );
}
