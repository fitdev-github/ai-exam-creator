"use client";
import React, { useState } from "react";
import QuizTopicSelector from "./QuizTopicSelector";
import { specialExamTopics } from "@/content";
import { useRouter } from "next/navigation";

export default function SpecialExam() {
  const router = useRouter();
  // const [topic, setTopic] = useState("");
  // console.log({ topic });
  const fetchQuiz = async (topic) => {
    router.push(`/quiz?topic=${topic}&type=special-exam`);
  };
  return (
    <div className="">
      <QuizTopicSelector
        close={() => {}}
        data={specialExamTopics}
        setTopic={fetchQuiz}
        type="special-exam"
      />
    </div>
  );
}
