export const validation = (value) => {
  if (!value.topic && !value.noq && !value.difficalty && !value.langauge) {
    return { status: true, message: "กรุณาใส่ข้อมูลให้ครบถ้วน" };
  }

  if (value.topic == "") {
    return { status: true, message: "กรุณาเลือกหัวข้อ" };
  }

  if (value.noq == "") {
    return { status: true, message: "กรุณาใส่จำนวนหัวข้อ" };
  }

  if (value.noq <= "0") {
    return { status: true, message: "จำนวนข้อต้องมากกว่า 0" };
  }

  if (value.noq > "10") {
    return { status: true, message: "จำกัดจำนวนไม่เกิน 10 ข้อ" };
  }

  if (value.difficalty == "") {
    return { status: true, message: "กรุณาเลือกระดับความยาก" };
  }

  if (value.langauge == "") {
    return { status: true, message: "กรุณาเลือกภาษา" };
  }

  return { status: false };
};
