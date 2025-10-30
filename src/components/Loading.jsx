"use client";

const Loading = ({ progress }) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div className="w-11 h-11 rounded-full border-3 border-gray-300 border-t-green-500 animate-spin"></div>
      <div className="flex gap-3 items-center">
        <progress
          className="progress progress-success w-40"
          value={progress}
          max="100"
        ></progress>
        <div>{` ${progress}%`}</div>
      </div>
      <span>สร้างข้อสอบอยู่ อาจใช้เวลาสักครู่...</span>
    </div>
  );
};

export default Loading;
