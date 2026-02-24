import Button from '@/app/_components/Button'
import Input from '@/app/_components/Input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="min-h-[90vh] h-screen flex bg-cream1 items-center justify-center">
      <div className="w-full max-w-sm bg-cream1p-8 rounded-xl ">
        <Link href={"/"}>
            <Image src={"/logo.svg"} width={30} height={40} alt="logo" />
        </Link>
        <h1 className="text-3xl font-bold mb-2 mt-3">Welcome back</h1>
        <br className="border" />

        <form>
          <Input className="rounded-xl shadow-md bg-white" label="Email" type="email" placeholder="Enter your email" required />
          <Input className="rounded-xl shadow-md bg-white" label="Username" type="email" placeholder="Enter your email" required />
          <Input className="rounded-xl shadow-md bg-white" label="Password" type="email" placeholder="Enter your email" required />
          <Input className="rounded-xl shadow-md bg-white" label="Confirm Password" type="password" placeholder="Enter your password" required />
          
          <Button type="button">Sign In</Button>
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
