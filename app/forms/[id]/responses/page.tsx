"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ResponsesPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [form, setForm] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const formRes = await axiosInstance.get(`/api/forms/${id}/`)
      setForm(formRes.data);

      const subRes = await axiosInstance.get(`/api/forms/${id}/submissions/`)
      setSubmissions(subRes.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("You don't have permission to view these responses.")
      } else {
        setError("Form not found or an error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center bg-cream1 p-4">
        <div className="min-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col justify-center items-center">
          <p className="text-blue1 font-semibold">Loading</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center bg-cream1 p-4">
        <div className="min-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col">
          <div className="mb-8">
            <Link href={"/"}>
              <Image src={"/logo.svg"} width={30} height={40} alt='logo' />
            </Link>
            <h1 className="text-3xl font-bold mb-2 mt-3 text-gray-900">{error}</h1>
          </div>
          <div className="pt-4 flex justify-start">
            <Link href="/dashboard" className="text-blue1 font-medium hover:underline">Return to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-cream1 p-4">
      <div className="min-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col">
        
        <div className="mt-8 mb-3 flex items-center justify-between">
          <Link href={"/"}>
            <Image src={"/logo.svg"} width={30} height={40} alt='logo' />
          </Link>
          
          <Link href={`/forms/${id}/edit`} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue1 transition-colors">
            <ChevronLeft size={20} />
            Back to Editor
          </Link>
        </div>

        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900">
            {form?.title}
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            {submissions.length} {submissions.length === 1 ? 'Response' : 'Responses'}
          </p>
        </div>

        <div className="space-y-8 w-full">
          {submissions.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 font-medium">No responses yet.</p>
            </div>
          ) : (
            submissions.map((sub, index) => (
              <div key={sub.id} className="p-6 bg-gray-50 shadow mb-20 relative">
                
                <div className="flex justify-between items-start mb-6 pb-4">
                   <span className="font-bold text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-md text-sm shadow-sm">
                    Respondent {submissions.length - index}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    {new Date(sub.submitted_at).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-6">
                  {form?.questions.map((q: any, qIndex: number) => {
                    const answer = sub.answers.find((a: any) => a.question === q.id);
                    
                    let displayAnswer = answer?.answer_text || <em className="text-gray-400">No answer</em>;
                    
                    if (q.type === 'checkbox' && answer?.answer_text) {
                      try {
                        const parsed = JSON.parse(answer.answer_text);
                        displayAnswer = Array.isArray(parsed) ? parsed.join(", ") : answer.answer_text;
                      } catch (e) {
                        displayAnswer = answer.answer_text;
                      }
                    }

                    return (
                      <div key={q.id}>
                        <p className="font-semibold text-gray-800 mb-2 text-sm">
                          {q.question_text || "Untitled Question"}
                        </p>
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-md text-gray-700 text-sm whitespace-pre-wrap shadow-sm">
                          {displayAnswer}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}