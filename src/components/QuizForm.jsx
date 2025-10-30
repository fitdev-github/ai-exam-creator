"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizForm({ quizData }) {
  const router = useRouter();
  const { html, answers } = quizData;
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // ✅ parse HTML จาก OpenAI ให้ทนต่อหลายรูปแบบ
  useEffect(() => {
    if (typeof window === "undefined" || !html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const items = doc.querySelectorAll("li");

    const parsed = Array.from(items).map((li, idx) => {
      // 🧠 ดึงข้อความคำถามก่อน <br> แรก
      const questionText = li.innerHTML.split("<br>")[0].trim();

      const radios = li.querySelectorAll('input[type="radio"]');
      const options = Array.from(radios).map((r, idx) => {
        // 1️⃣ ลองหา label ปกติ
        const labelEl = li.querySelector(`label[for="${r.id}"]`);
        let labelText = labelEl?.innerHTML;

        // 2️⃣ ถ้าไม่มี label — ลองดึงข้อความถัดจาก input แทน
        if (!labelText) {
          const nextNode = r.nextSibling;
          labelText = nextNode?.textContent?.trim() || `ตัวเลือก ${idx + 1}`;
        }

        return {
          id: r.id || `${r.name}_${r.value}`,
          name: r.name,
          value: r.value,
          label: labelText,
        };
      });

      return { questionText: `${idx + 1}. ${questionText}`, options };
    });

    setQuestions(parsed);
  }, [html]);

  const handleSelect = (qName, value) => {
    setUserAnswers((prev) => ({ ...prev, [qName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = 0;
    Object.keys(answers).forEach((key) => {
      if (userAnswers[key] === answers[key]) total++;
    });
    setScore(total);
    setSubmitted(true);
  };

  return (
    <div className="py-6">
      <div>
        <h1 className="text-xl text-center font-medium">
          หัวข้อ {quizData.topic}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full py-6">
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const qName = q.options[0]?.name;
            return (
              <div
                key={`q-${qIndex}`}
                className="card bg-base-200 shadow-md p-6"
              >
                {/* 🧠 คำถาม */}
                <p
                  className="font-semibold text-lg mb-2"
                  dangerouslySetInnerHTML={{ __html: q.questionText }}
                />

                {/* 🔘 ตัวเลือก */}
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, index) => {
                    const isCorrect = answers[qName] === opt.value;
                    const isSelected = userAnswers[qName] === opt.value;
                    return (
                      <label
                        key={`${qName}-${opt.value}-${index}`}
                        className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-green-100 text-green-800"
                              : isSelected
                              ? "bg-red-100 text-red-700"
                              : ""
                            : "hover:bg-base-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={opt.name}
                          value={opt.value}
                          className="radio radio-warning"
                          disabled={submitted}
                          checked={isSelected || false}
                          onChange={(e) =>
                            handleSelect(opt.name, e.target.value)
                          }
                        />
                        <span dangerouslySetInnerHTML={{ __html: opt.label }} />
                      </label>
                    );
                  })}
                </div>

                {/* ✅ เฉลย */}
                {submitted && userAnswers[qName] !== answers[qName] && (
                  <div className="alert alert-warning mt-4 text-sm">
                    ❌ เฉลยที่ถูกต้องคือ{" "}
                    <b
                      dangerouslySetInnerHTML={{
                        __html:
                          q.options.find((o) => o.value === answers[qName])
                            ?.label || "",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 🧾 ปุ่มส่ง / คะแนนรวม */}
        {!submitted ? (
          <div>
            <button type="submit" className="btn btn-primary btn-block mt-6">
              ส่งคำตอบ
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn btn-primary btn-block mt-6"
            >
              กลับหน้าแรก
            </button>
          </div>
        ) : (
          <div>
            <div className="alert alert-info mt-6 text-lg font-medium">
              🎯 คุณได้คะแนน {score} / {Object.keys(answers).length}
            </div>
            <div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({});
                  setScore(0);
                }}
                className="btn btn-primary btn-block mt-6"
              >
                ทำใหม่
              </button>
              <button
                onClick={() => router.push("/")}
                className="btn btn-primary btn-block mt-6"
              >
                กลับหน้าแรก
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
