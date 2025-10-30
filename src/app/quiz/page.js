"use client";

import { useState, useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import QuizForm from "@/components/QuizForm";

export default function Quiz() {
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
  }, [pathname, searchParams]);

  const fetchQuiz = async () => {
    const obj = Object.fromEntries(searchParams.entries());
    setLoading(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : 90));
    }, 500);
    try {
      const { data } = await axios.post(
        "/api/openai",
        { ...obj },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      clearInterval(timer);
      setProgress(100);
      setQuizData(JSON.parse(data.data));
    } catch (error) {
      console.log({ error });
      setLoading(false);
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const dumbmy = {
    html: '<ol><li>หมายเลขอะตอมบอกจำนวนอะไรของอะตอม?<br><input type="radio" id="q1_1" name="q1" value="1"><label for="q1_1">โปรตอน</label><input type="radio" id="q1_2" name="q1" value="2"><label for="q1_2">อิเล็กตรอน</label><input type="radio" id="q1_3" name="q1" value="3"><label for="q1_3">นิวตรอน</label><input type="radio" id="q1_4" name="q1" value="4"><label for="q1_4">นิวคลีออน</label></li><li>สูตรเคมีของน้ำคืออะไร?<br><input type="radio" id="q2_1" name="q2" value="1"><label for="q2_1">H2O2</label><input type="radio" id="q2_2" name="q2" value="2"><label for="q2_2">H2O</label><input type="radio" id="q2_3" name="q2" value="3"><label for="q2_3">OH2</label><input type="radio" id="q2_4" name="q2" value="4"><label for="q2_4">HO</label></li><li>pH 7 เป็นกรด เบส หรือกลาง?<br><input type="radio" id="q3_1" name="q3" value="1"><label for="q3_1">กรด</label><input type="radio" id="q3_2" name="q3" value="2"><label for="q3_2">เบส</label><input type="radio" id="q3_3" name="q3" value="3"><label for="q3_3">เป็นกลาง</label><input type="radio" id="q3_4" name="q3" value="4"><label for="q3_4">ขึ้นกับสาร</label></li><li>ธาตุที่มีหมายเลขอะตอม 8 คืออะไร?<br><input type="radio" id="q4_1" name="q4" value="1"><label for="q4_1">คาร์บอน</label><input type="radio" id="q4_2" name="q4" value="2"><label for="q4_2">ออกซิเจน</label><input type="radio" id="q4_3" name="q4" value="3"><label for="q4_3">ไนโตรเจน</label><input type="radio" id="q4_4" name="q4" value="4"><label for="q4_4">ฟลูออรีน</label></li><li>พันธะใดเกิดจากการแชร์อิเล็กตรอนระหว่างอะตอม?<br><input type="radio" id="q5_1" name="q5" value="1"><label for="q5_1">พันธะไอออนิก</label><input type="radio" id="q5_2" name="q5" value="2"><label for="q5_2">พันธะโควาเลนต์</label><input type="radio" id="q5_3" name="q5" value="3"><label for="q5_3">พันธะโลหะ</label><input type="radio" id="q5_4" name="q5" value="4"><label for="q5_4">พันธะไฮโดรเจน</label></li><li>1 นาโนเมตรเท่ากับกี่เมตร?<br><input type="radio" id="q6_1" name="q6" value="1"><label for="q6_1">10^-6 เมตร</label><input type="radio" id="q6_2" name="q6" value="2"><label for="q6_2">10^-3 เมตร</label><input type="radio" id="q6_3" name="q6" value="3"><label for="q6_3">10^-9 เมตร</label><input type="radio" id="q6_4" name="q6" value="4"><label for="q6_4">10^3 เมตร</label></li><li>องค์ประกอบที่มีมากที่สุดในอากาศแห้งคือ?<br><input type="radio" id="q7_1" name="q7" value="1"><label for="q7_1">ไนโตรเจน</label><input type="radio" id="q7_2" name="q7" value="2"><label for="q7_2">ออกซิเจน</label><input type="radio" id="q7_3" name="q7" value="3"><label for="q7_3">คาร์บอนไดออกไซด์</label><input type="radio" id="q7_4" name="q7" value="4"><label for="q7_4">อาร์กอน</label></li><li>สูตรของกรดไฮโดรคลอริกคืออะไร?<br><input type="radio" id="q8_1" name="q8" value="1"><label for="q8_1">H2SO4</label><input type="radio" id="q8_2" name="q8" value="2"><label for="q8_2">HNO3</label><input type="radio" id="q8_3" name="q8" value="3"><label for="q8_3">HCl</label><input type="radio" id="q8_4" name="q8" value="4"><label for="q8_4">H2CO3</label></li><li>อิเล็กตรอนมีประจุเป็นแบบใด?<br><input type="radio" id="q9_1" name="q9" value="1"><label for="q9_1">เป็นประจุบวก</label><input type="radio" id="q9_2" name="q9" value="2"><label for="q9_2">เป็นประจุลบ</label><input type="radio" id="q9_3" name="q9" value="3"><label for="q9_3">เป็นกลาง</label><input type="radio" id="q9_4" name="q9" value="4"><label for="q9_4">ขึ้นกับธาตุ</label></li><li>หน่วยของปริมาณสารคืออะไร?<br><input type="radio" id="q10_1" name="q10" value="1"><label for="q10_1">กรัม</label><input type="radio" id="q10_2" name="q10" value="2"><label for="q10_2">ลิตร</label><input type="radio" id="q10_3" name="q10" value="3"><label for="q10_3">โมล</label><input type="radio" id="q10_4" name="q10" value="4"><label for="q10_4">อะตอม</label></li></ol>',
    answers: {
      q1: "1",
      q2: "2",
      q3: "3",
      q4: "2",
      q5: "2",
      q6: "3",
      q7: "1",
      q8: "3",
      q9: "2",
      q10: "3",
    },
    topic: "เคมีพื้นฐาน",
    difficulty: "easy",
  };

  return loading ? (
    <Loading progress={progress} />
  ) : (
    <div className="max-w-[80%] mx-auto flex items-center justify-center min-h-screen">
      <QuizForm quizData={quizData} />
    </div>
  );
}
