"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import QuizTopicSelector from "./QuizTopicSelector";

import { normalExamTopics } from "@/content";

export default function AppModal({ submitTopic }) {
  let [isOpen, setIsOpen] = useState(false);
  let [topic, setTopic] = useState("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (topic) {
      submitTopic(topic);
    }
  }, [topic]);

  return (
    <>
      <Button
        onClick={open}
        className="btn btn-primary rounded-2xl text-lg w-full ring-2 ring-offset-2 outline-2 outline-offset-2 outline-accent-content ring-accent-content "
      >
        <div className="w-full text-left font-normal">
          {topic ? <span>{topic}</span> : <span>เลือกหัวข้อ</span>}
        </div>
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <QuizTopicSelector
                close={close}
                setTopic={setTopic}
                data={normalExamTopics}
                type="normal-exam"
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
