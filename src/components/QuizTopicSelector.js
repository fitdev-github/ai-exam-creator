"use client";

import { useState } from "react";
import { quizTopics } from "@/content";
export default function QuizTopicSelector({ close, setTopic }) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [inputTopic, setInputTopic] = useState("");

  // หาหัวข้อย่อยของ topic ที่เลือก
  const currentTopic = quizTopics.find((t) => t.topic === selectedTopic);

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    setSelectedSubtopic(""); // reset subtopic เมื่อเปลี่ยน topic
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubtopic && !inputTopic) {
      alert("ต้องมีหัวข้อ");
      return;
    }
    setTopic(selectedSubtopic ? selectedSubtopic : inputTopic);
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4  rounded-lg">
      <div>
        <label className="block mb-1 font-medium">เลือกหัวข้อ</label>
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          className="select rounded-2xl text-lg select-warning bg-warning"
        >
          <option value="">-- กรุณาเลือกหัวข้อ --</option>
          {quizTopics.map((t) => (
            <option key={t.topic} value={t.topic}>
              {t.topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">เลือกหัวข้อย่อย</label>
        <select
          value={selectedSubtopic}
          onChange={(e) => setSelectedSubtopic(e.target.value)}
          className="select rounded-2xl text-lg select-error bg-error"
          disabled={!selectedTopic}
        >
          <option value="">-- กรุณาเลือกหัวข้อย่อย --</option>
          {currentTopic &&
            currentTopic.subtopics.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>
      <div className="pt-1">
        <label className="block mb-1 font-medium">พิมพ์หัวข้อเอง</label>
        <input
          type="text"
          className="input validator input-secondary bg-secondary rounded-2xl text-lg ring-2 ring-offset-2 outline-2 outline-offset-2 outline-accent-content ring-accent-content"
          placeholder="หัวข้อ"
          onChange={(e) => setInputTopic(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-success rounded-2xl text-lg mt-6 w-full"
      >
        บันทึก
      </button>
    </form>
  );
}
