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
  const [loading, setLoading] = useState(false);
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
      const res = await axios.post(
        "/api/openai",
        { ...obj },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res);

      clearInterval(timer);
      setProgress(100);
      setQuizData(JSON.parse(res.data.data));
    } catch (error) {
      console.error("❌ Error fetching quiz:", error);
      clearInterval(timer);
    } finally {
      setLoading(false);
    }
  };

  const dumbmy = {
    data: '{\n  "html": "<ol><li>การแบ่งอำนาจของรัฐในระบอบประชาธิปไตย ประกอบด้วยฝ่ายใดบ้าง?<br><input type=\\"radio\\" id=\\"q1_1\\" name=\\"q1\\" value=\\"1\\"><label for=\\"q1_1\\">นิติบัญญัติและบริหาร</label><br><input type=\\"radio\\" id=\\"q1_2\\" name=\\"q1\\" value=\\"2\\"><label for=\\"q1_2\\">บริหารและตุลาการ</label><br><input type=\\"radio\\" id=\\"q1_3\\" name=\\"q1\\" value=\\"3\\"><label for=\\"q1_3\\">นิติบัญญัติ บริหาร และตุลาการ</label><br><input type=\\"radio\\" id=\\"q1_4\\" name=\\"q1\\" value=\\"4\\"><label for=\\"q1_4\\">ทหาร ตำรวจ และพลเรือน</label></li><li>ระยะเวลาการจัดการศึกษาขั้นพื้นฐานตามพระราชบัญญัติการศึกษาแห่งชาติ ปัจจุบันคือเท่าใด?<br><input type=\\"radio\\" id=\\"q2_1\\" name=\\"q2\\" value=\\"1\\"><label for=\\"q2_1\\">6 ปี</label><br><input type=\\"radio\\" id=\\"q2_2\\" name=\\"q2\\" value=\\"2\\"><label for=\\"q2_2\\">9 ปี</label><br><input type=\\"radio\\" id=\\"q2_3\\" name=\\"q2\\" value=\\"3\\"><label for=\\"q2_3\\">12 ปี</label><br><input type=\\"radio\\" id=\\"q2_4\\" name=\\"q2\\" value=\\"4\\"><label for=\\"q2_4\\">15 ปี</label></li><li>วันพ่อแห่งชาติของไทยตรงกับวันที่ใด?<br><input type=\\"radio\\" id=\\"q3_1\\" name=\\"q3\\" value=\\"1\\"><label for=\\"q3_1\\">5 ธันวาคม</label><br><input type=\\"radio\\" id=\\"q3_2\\" name=\\"q3\\" value=\\"2\\"><label for=\\"q3_2\\">13 ตุลาคม</label><br><input type=\\"radio\\" id=\\"q3_3\\" name=\\"q3\\" value=\\"3\\"><label for=\\"q3_3\\">1 มกราคม</label><br><input type=\\"radio\\" id=\\"q3_4\\" name=\\"q3\\" value=\\"4\\"><label for=\\"q3_4\\">17 พฤษภาคม</label></li><li>เครื่องหมาย % ในทางคณิตศาสตร์ หมายถึงอะไร?<br><input type=\\"radio\\" id=\\"q4_1\\" name=\\"q4\\" value=\\"1\\"><label for=\\"q4_1\\">ต่อสิบ</label><br><input type=\\"radio\\" id=\\"q4_2\\" name=\\"q4\\" value=\\"2\\"><label for=\\"q4_2\\">ต่อร้อย</label><br><input type=\\"radio\\" id=\\"q4_3\\" name=\\"q4\\" value=\\"3\\"><label for=\\"q4_3\\">ต่อพัน</label><br><input type=\\"radio\\" id=\\"q4_4\\" name=\\"q4\\" value=\\"4\\"><label for=\\"q4_4\\">ต่อหมื่น</label></li><li>ธงชาติไทย (ธงไตรรงค์) มีสีเรียงลำดับจากขอบด้านนอกเข้ามาดังนี้ข้อใดถูกต้อง?<br><input type=\\"radio\\" id=\\"q5_1\\" name=\\"q5\\" value=\\"1\\"><label for=\\"q5_1\\">แดง - ขาว - น้ำเงิน - ขาว - แดง</label><br><input type=\\"radio\\" id=\\"q5_2\\" name=\\"q5\\" value=\\"2\\"><label for=\\"q5_2\\">ขาว - แดง - น้ำเงิน - แดง - ขาว</label><br><input type=\\"radio\\" id=\\"q5_3\\" name=\\"q5\\" value=\\"3\\"><label for=\\"q5_3\\">แดง - น้ำเงิน - ขาว - น้ำเงิน - แดง</label><br><input type=\\"radio\\" id=\\"q5_4\\" name=\\"q5\\" value=\\"4\\"><label for=\\"q5_4\\">น้ำเงิน - ขาว - แดง - ขาว - น้ำเงิน</label></li><li>หลักการพื้นฐานของรัฐธรรมนูญไทยคือข้อใด?<br><input type=\\"radio\\" id=\\"q6_1\\" name=\\"q6\\" value=\\"1\\"><label for=\\"q6_1\\">หลักประชาธิปไตย</label><br><input type=\\"radio\\" id=\\"q6_2\\" name=\\"q6\\" value=\\"2\\"><label for=\\"q6_2\\">หลักเผด็จการ</label><br><input type=\\"radio\\" id=\\"q6_3\\" name=\\"q6\\" value=\\"3\\"><label for=\\"q6_3\\">หลักสังคมนิยม</label><br><input type=\\"radio\\" id=\\"q6_4\\" name=\\"q6\\" value=\\"4\\"><label for=\\"q6_4\\">หลักคอมมิวนิสต์</label></li><li>ผู้ใดมีสิทธิเสนอร่างพระราชบัญญัติได้ตามปกติในระบบรัฐสภาไทย?<br><input type=\\"radio\\" id=\\"q7_1\\" name=\\"q7\\" value=\\"1\\"><label for=\\"q7_1\\">คณะรัฐมนตรีเท่านั้น</label><br><input type=\\"radio\\" id=\\"q7_2\\" name=\\"q7\\" value=\\"2\\"><label for=\\"q7_2\\">สมาชิกสภาผู้แทนราษฎรเท่านั้น</label><br><input type=\\"radio\\" id=\\"q7_3\\" name=\\"q7\\" value=\\"3\\"><label for=\\"q7_3\\">ประชาชนโดยตรง</label><br><input type=\\"radio\\" id=\\"q7_4\\" name=\\"q7\\" value=\\"4\\"><label for=\\"q7_4\\">ทั้งคณะรัฐมนตรีและสมาชิกสภาผู้แทนราษฎร</label></li><li>พระมหากษัตริย์ไทยทรงเป็นประมุขของประเทศภายใต้ระบอบใด?<br><input type=\\"radio\\" id=\\"q8_1\\" name=\\"q8\\" value=\\"1\\"><label for=\\"q8_1\\">ราชาธิปไตยภายใต้รัฐธรรมนูญ</label><br><input type=\\"radio\\" id=\\"q8_2\\" name=\\"q8\\" value=\\"2\\"><label for=\\"q8_2\\">ราชาธิปไตยแบบสมบูรณาญาสิทธิราช</label><br><input type=\\"radio\\" id=\\"q8_3\\" name=\\"q8\\" value=\\"3\\"><label for=\\"q8_3\\">ประชาธิปไตยทางตรง</label><br><input type=\\"radio\\" id=\\"q8_4\\" name=\\"q8\\" value=\\"4\\"><label for=\\"q8_4\\">สาธารณรัฐ</label></li><li>กฎหมายสูงสุดของประเทศคือข้อใด?<br><input type=\\"radio\\" id=\\"q9_1\\" name=\\"q9\\" value=\\"1\\"><label for=\\"q9_1\\">พระราชบัญญัติ</label><br><input type=\\"radio\\" id=\\"q9_2\\" name=\\"q9\\" value=\\"2\\"><label for=\\"q9_2\\">รัฐธรรมนูญ</label><br><input type=\\"radio\\" id=\\"q9_3\\" name=\\"q9\\" value=\\"3\\"><label for=\\"q9_3\\">กฎกระทรวง</label><br><input type=\\"radio\\" id=\\"q9_4\\" name=\\"q9\\" value=\\"4\\"><label for=\\"q9_4\\">ประกาศกระทรวง</label></li><li>คำย่อ \'ส.ส.\' หมายถึงอะไร?<br><input type=\\"radio\\" id=\\"q10_1\\" name=\\"q10\\" value=\\"1\\"><label for=\\"q10_1\\">สมาชิกสภาสูง</label><br><input type=\\"radio\\" id=\\"q10_2\\" name=\\"q10\\" value=\\"2\\"><label for=\\"q10_2\\">สมาชิกสภาผู้แทนราษฎร</label><br><input type=\\"radio\\" id=\\"q10_3\\" name=\\"q10\\" value=\\"3\\"><label for=\\"q10_3\\">สำนักงานสาธารณสุข</label><br><input type=\\"radio\\" id=\\"q10_4\\" name=\\"q10\\" value=\\"4\\"><label for=\\"q10_4\\">สื่อสารสาธารณะ</label></li></ol>",\n  "answers": {\n    "q1": 3,\n    "q2": 2,\n    "q3": 1,\n    "q4": 2,\n    "q5": 1,\n    "q6": 1,\n    "q7": 4,\n    "q8": 1,\n    "q9": 2,\n    "q10": 2\n  },\n  "topic": "สอบครูผู้ช่วย – ภาค ก ความรู้ทั่วไป",\n  "sources": [\n    "https://www.kruwandee.com",\n    "https://www.obec.go.th (สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน)",\n    "https://www.moe.go.th (กระทรวงศึกษาธิการ)",\n    "https://www.kru.ac.th",\n    "ตัวอย่างข้อสอบและแนวข้อสอบครูผู้ช่วยจากเว็บไซต์ติวออนไลน์หลายแห่ง"\n  ]\n}',
    usage: 5956,
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
