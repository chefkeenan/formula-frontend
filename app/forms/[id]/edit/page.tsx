"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import EditorNavbar from "@/app/forms/components/EditorNavbar";
import EditorSidebar from "@/app/forms/components/EditorSidebar";
import QuestionBlock from "../../components/QuestionBlock";

type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "dropdown";

interface Question {
  id: string;
  type: QuestionType;
  question_text: string;
  required: boolean;
  options: string[]; 
}

export default function EditFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formTitle, setFormTitle] = useState("Loading...");
  const [formDescription, setFormDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (id) fetchFormDetail();
  }, [id])

  const fetchFormDetail = async () => {
    try {
      const response = await axiosInstance.get(`/api/forms/${id}/`);
      setFormTitle(response.data.title)
      setFormDescription(response.data.description || "")
      const currentQuestion = response.data.questions || []

      if (currentQuestion.length === 0) {
        setQuestions([{
          id: crypto.randomUUID(),
          type: "text",
          question_text: "",
          required: false,
          options: []
        }])
      } else {
        setQuestions(currentQuestion);
      }

    } catch (error) {
      toast.error("Failed to load form details.")
      router.push("/dashboard")
    }
  }

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type,
      question_text: "",
      required: false,
      options: (type === "radio" || type === "checkbox" || type === "dropdown") ? ["Option 1"] : [],
    }
    setQuestions([...questions, newQuestion]);
  }

const updateQuestion = (qId: string, field: keyof Question, value: any) => {
    const updatedList = questions.map((q) => {
      if (q.id === qId) {
        return { ...q, [field]: value }
      }
      return q
    })
    setQuestions(updatedList);
  }

  const deleteQuestion = (qId: string) => {
    const remainingQuestions = questions.filter((q) => q.id !== qId)
    setQuestions(remainingQuestions)
  }

  const addOption = (qId: string) => {
    const updatedList = questions.map((q) => {
      if (q.id === qId) {
        const newOptions = [...q.options, `Option ${q.options.length + 1}`]
        return { ...q, options: newOptions }
      }
      return q
    });

    setQuestions(updatedList)
  }

  const updateOption = (qId: string, optIndex: number, newValue: string) => {
    const updatedList = questions.map((q) => {
      if (q.id === qId) {
        const copyOfOptions = [...q.options]
        copyOfOptions[optIndex] = newValue
        return { ...q, options: copyOfOptions }
      }
      return q
    })

    setQuestions(updatedList);
  }

  const removeOption = (qId: string, optIndex: number) => {
    const updatedList = questions.map((q) => {
      if (q.id === qId) {
        const filteredOptions = q.options.filter((option, i) => i !== optIndex)
        return { ...q, options: filteredOptions }
      }
      return q
    })
    setQuestions(updatedList)
  }

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await axiosInstance.patch(`/api/forms/${id}/`, { title: formTitle, description: formDescription, questions: questions });
      toast.success("Form has been saved");
    } catch (error) {
      toast.error("Failed to save form");
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream1">
      <EditorNavbar onSave={handleSaveAll} />
      <div className="flex flex-1 pt-16">
        <EditorSidebar onAddQuestion={addQuestion} />

        <main className="ml-64 flex-1 p-4 md:p-10 pb-32 overflow-y-auto flex justify-center">
          <div className="w-full max-w-3xl shadow-md bg-white py-12 px-8 md:px-16 rounded-xl flex flex-col min-h-[70vh]">
            <div className="mb-10 pb-6 relative group">
              <div className="mb-4">
                 <Image src={"/logo.svg"} width={30} height={40} alt='logo' className="mb-4" />
              </div>
              <input 
                type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                className="w-full text-4xl font-extrabold text-gray-900 bg-transparent focus:outline-none pb-1 transition-colors placeholder:text-gray-300"
                placeholder="Form Title"/>
              <textarea 
                value={formDescription} onChange={(e) => setFormDescription(e.target.value)}
                className="w-full mt-3 border-b-2 text-gray-500 font-medium text-base bg-transparent focus:outline-none resize-none transition-colors placeholder:text-gray-300"
                placeholder="Form description..." rows={3}/>
            </div>

            <div className="space-y-6 w-full">
              {questions.map((q, index) => (
                <QuestionBlock
                  key={q.id}
                  index={index}
                  question={q}
                  onUpdate={updateQuestion}
                  onDelete={deleteQuestion}
                  onAddOption={addOption}
                  onUpdateOption={updateOption}
                  onRemoveOption={removeOption}
                />
              ))}
            </div>
            {questions.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm ounded-xl">
                Click any tool on the left sidebar to start building your form
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}