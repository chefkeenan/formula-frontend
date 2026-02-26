"use client";
import Button from '@/app/_components/Button'
import Input from '@/app/_components/Input'
import Image from 'next/image'
import Link from 'next/link'
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/app/lib/utils';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("/api/auth/register/", {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      if (response.status === 200 || response.status === 201) {
        toast.success("Account created successfully!")
        router.push("/login")
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      if (errorData) {
        const errorKey = Object.keys(errorData)[0]
        toast.error(errorData[errorKey][0])
      } else {
        toast.error("Something went wrong. Please try again")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[90vh] h-screen flex bg-cream1 items-center justify-center">
      <div className="w-full max-w-sm bg-cream1p-8 rounded-xl ">
        <Link href={"/"}>
            <Image src={"/logo.svg"} width={30} height={40} alt="logo" />
        </Link>
        <h1 className="text-[27px] font-bold mb-2 mt-3">Create your Formula Account</h1>
        <br className="border" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
              className="rounded-xl shadow-md bg-white" 
              label="Email" 
              type="email" 
              placeholder="Enter your email" 
              {...register("email")}
              error={errors.email?.message}
            />

          <Input 
            className="rounded-xl shadow-md bg-white" 
            label="Username" 
            type="text" 
            placeholder="Choose a username" 
            {...register("username")}
            error={errors.username?.message}
          />

          <Input 
            className="rounded-xl shadow-md bg-white" 
            label="Password" 
            type="password" 
            placeholder="Create password" 
            {...register("password")}
            error={errors.password?.message}
          />

          <Input 
            className="rounded-xl shadow-md bg-white" 
            label="Confirm Password" 
            type="password" 
            placeholder="Confirm password" 
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          
          <Button className="w-full" type="submit">Sign Up</Button>
        </form>

        <p className="mt-6  text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue1 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      </div>
  )
}
