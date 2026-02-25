"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/app/_components/Input'
import Button from '@/app/_components/Button'
import Image from 'next/image'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/app/lib/utils';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("/api/token/", {
        username: data.email, 
        password: data.password,
      })

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem("refresh_token", response.data.refresh)
        localStorage.setItem("username", response.data.username)
        
        toast.success("Logged in!")
        router.push("/dashboard")
      }
    } catch (err: any) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-[90vh] h-screen flex bg-cream1 items-center justify-center">
      <div className="w-full max-w-sm bg-cream1 p-8 rounded-xl ">
        <Link href={"/"}>
            <Image src={"/logo.svg"} width={30} height={40} alt="logo" />
        </Link>
        <h1 className="text-3xl font-bold mb-2 mt-3">Welcome back</h1>
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
            label="Password" 
            type="password" 
            placeholder="Enter your password" 
            {...register("password")}
            error={errors.password?.message}
          />
          
          <Button type="submit">Sign In</Button>
        </form>

        <p className="mt-6  text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue1 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}