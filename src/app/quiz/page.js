"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import QuizForm from "@/components/QuizForm";

// ✨ Component แยกส่วนที่ใช้ useSearchParams ออกมา
function QuizContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [quizData, setQuizData] = useState({
    answers: {},
    difficulty: "",
    html: "",
    topic: "",
  });
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const fetchQuiz = async () => {
    const obj = Object.fromEntries(searchParams.entries());
    setLoading(true);
    setProgress(0);

    // เพิ่ม progress จำลองระหว่างโหลด
    const timer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : 90));
    }, 500);

    try {
      const { data } = await axios.post(
        "/api/openai",
        { ...obj },
        { headers: { "Content-Type": "application/json" } }
      );
      clearInterval(timer);
      setProgress(100);
      setQuizData(JSON.parse(data.data));
    } catch (error) {
      console.error("❌ Error fetching quiz:", error);
      clearInterval(timer);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading progress={progress} />
  ) : (
    <div className="max-w-[80%] mx-auto flex items-center justify-center min-h-screen">
      <QuizForm quizData={quizData} />
    </div>
  );
}

// 🧠 ตัว component หลัก ใช้ Suspense ครอบเพื่อรองรับ useSearchParams()
export default function Quiz() {
  return (
    <Suspense fallback={<Loading progress={0} />}>
      <QuizContent />
    </Suspense>
  );
}
