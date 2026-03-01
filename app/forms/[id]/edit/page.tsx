"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import EditorNavbar from "@/app/forms/components/EditorNavbar";
import EditorSidebar from "@/app/forms/components/EditorSidebar";
import QuestionBlock from "../../components/QuestionBlock";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [hasSubmissions, setHasSubmissions] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isAcceptingResponses, setIsAcceptingResponses] = useState(true);

  useEffect(() => {
    if (id) fetchFormDetail();
  }, [id])

  const fetchFormDetail = async () => {
    try {
      const response = await axiosInstance.get(`/api/forms/${id}/`);
      setFormTitle(response.data.title)
      setFormDescription(response.data.description || "")
      setIsAcceptingResponses(response.data.is_accepting_responses ?? true)
      
      const isLocked = response.data.has_submissions || false
      setHasSubmissions(isLocked)
      
      if (isLocked) {
        setShowAlertDialog(true)
      }

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
    if (hasSubmissions) return; 

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
    try {
      await axiosInstance.patch(`/api/forms/${id}/`, { title: formTitle, description: formDescription, is_accepting_responses: isAcceptingResponses, questions: questions });
      toast.success("Form has been saved");
    } catch (error: any) {
      const errorData = error.response?.data?.questions;
      const errorMessage = Array.isArray(errorData) ? errorData[0] : (errorData || "Failed to save form");
      toast.error(errorMessage);
    } 
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream1">
      <EditorNavbar onSave={handleSaveAll}  id={id}/>
      <div className="flex flex-1 pt-16">
        <EditorSidebar onAddQuestion={addQuestion} />

        <main className="ml-64 flex-1 p-4 md:p-10 pb-32 overflow-y-auto flex justify-center">
          <div className="w-full max-w-3xl shadow-md bg-white py-12 px-8 md:px-16 rounded-xl flex flex-col min-h-[70vh]">
            <div className="mb-10 pb-6 relative group">

              <div className="absolute top-0 right-0 flex items-center gap-3">
                <span className={`text-sm font-medium transition-colors ${isAcceptingResponses ? 'text-blue1' : 'text-gray-400'}`}>
                  Accepting responses
                </span>
                <Switch
                  checked={isAcceptingResponses} 
                  onCheckedChange={setIsAcceptingResponses}
                  className="data-[state=checked]:bg-blue1"/>
              </div>

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

            <fieldset 
              disabled={hasSubmissions} 
              className={`space-y-6 w-full ${hasSubmissions ? 'opacity-60 pointer-events-none select-none grayscale-[20%]' : ''}`}>
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
            </fieldset>

            {questions.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm ounded-xl">
                Click any tool on the left sidebar to start building your form
              </div>
            )}
          </div>
        </main>
      </div>

      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Form is Locked</AlertDialogTitle>
            <AlertDialogDescription>
              This form already has submissions. To prevent data corruption, you can no longer edit, add, or delete the questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlertDialog(false)}>
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}