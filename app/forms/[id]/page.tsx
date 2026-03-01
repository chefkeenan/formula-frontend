"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/lib/utils';
import Button from '@/components/FormulaButton';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../components/FormField';

export default function ViewFormPage() {
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchFormDetail();
  }, [id]);

  const fetchFormDetail = async () => {
    try {
      const response = await axiosInstance.get(`/api/forms/${id}/`);
      setForm(response.data);
    } catch (err: any) {
      setError("Form not found or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  const dynamicSchema = useMemo(() => {
    if (!form) return z.object({});
    
    const shape: Record<string, z.ZodTypeAny> = {};
    
    form.questions?.forEach((q: any) => {
      const key = q.id.toString();
      if (q.type === 'checkbox') {
        shape[key] = q.required 
        ? z.array(z.string()).min(1, "Please select at least one option") 
        : z.array(z.string()).optional().default([]);
      } else {
        shape[key] = q.required 
        ? z.string().min(1, "This field is required") 
        : z.string().optional().or(z.literal(""));
      }
    })
    
    return z.object(shape);
  }, [form])

  const { register, handleSubmit, control, formState: { errors } } = useForm<Record<string, any>>({
    resolver: zodResolver(dynamicSchema as any),
  })

  const onSubmitForm = async (data: Record<string, any>) => {
    setIsSubmitting(true);

    const formattedAnswers = Object.entries(data).map(([qId, answerValue]) => {
      const answer_text = Array.isArray(answerValue) 
        ? JSON.stringify(answerValue) 
        : (answerValue as string || "")
      
      return {
        question: parseInt(qId),
        answer_text
      }
    })

    try {
      await axiosInstance.post('/api/submissions/', {
        form: id,
        answers: formattedAnswers
      });
      setIsSubmitted(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link href="/" className="text-blue1 font-medium hover:underline">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex justify-center bg-cream1 p-4">
        <div className="max-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col">
          <div className="mb-8 mt-9">
            <Link href={"/"}>
              <Image src={"/logo.svg"} width={30} height={40} alt='logo' />
            </Link>
            <h1 className="text-4xl font-extrabold mb-2 mt-3 text-gray-900">{form?.title}</h1>
            <p className="text-gray-500 font-medium text-md">Your response has been submitted.</p>
          </div>
          <div className="mt-15 pt-4 flex justify-start">
            <button onClick={() => window.location.reload()} className="text-blue1 font-medium hover:underline">
              Submit another response
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isClosed = form?.is_accepting_responses === false;

  return (
    <div className="min-h-screen flex justify-center bg-cream1 p-4">
      <div className="min-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col">
        
        <div className="mt-8">
          <Link href={"/"}>
            <Image src={"/logo.svg"} width={30} height={40} alt='logo' />
          </Link>
        </div>

        {isClosed ? (
          <div className="py-4 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Form is closed</h1>
            <p className="text-gray-500 text-base max-w-md">
              This form is no longer accepting responses.
            </p>

          </div>
        ) : (
          <>
            <div className="mt-3 mb-8">
              <h1 className="text-3xl font-extrabold mb-2 text-gray-900">
                {form?.title}
              </h1>
              <p className="text-gray-500 font-medium text-sm">
                {form?.description}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 w-full">
              <fieldset className="space-y-6">
                {form?.questions?.map((q: any) => (
                  <FormField
                    key={q.id} 
                    question={q} 
                    register={register} 
                    control={control} 
                    errors={errors} 
                  />
                ))}
              </fieldset>

              <div className="pt-4 flex justify-end">
                <div className="sm:w-auto">
                  <Button className="p-4" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}