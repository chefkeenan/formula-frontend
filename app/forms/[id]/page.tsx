import Button from '@/components/FormulaButton';
import Input from '@/components/Input';
import Textarea from '@/components/TextArea';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewFormPage() {

  return (
    <div className="min-h-screen flex justify-center bg-cream1 p-4">
        <div className="min-h-100 w-full mt-10 md:mt-15 mb-10 md:mb-30 max-w-195 shadow bg-white py-8 px-6 md:px-22 rounded-xl flex flex-col">
            
            <div className="mb-8">
                <Link href={"/"}>
                    <Image src={"/logo.svg"} width={30} height={40} alt='logo' />
                </Link>
                <h1 className="text-3xl font-bold mb-2 mt-3 text-gray-900">
                  Form 1
                </h1>
                <p className="text-gray-500 font-medium text-sm">
                  Please share your thoughts.
                </p>
            </div>

            <form className="space-y-6 w-full">
              
              <Input label="Name" name="name" placeholder="Enter your name"/>
              <Input label="Email" type="email" name="email" placeholder="Enter your email"/>

              <Textarea label="1. What food do you enjoy the most?" placeholder="Your answer" rows={3}/>
              <Textarea label="2. Where's your dream destination to travel?" placeholder="Your answer" rows={3}/>
              <Textarea label="3. What's your favourite place you've ever visited? " placeholder="Your answer" rows={3}/>

              <div className="pt-4 flex justify-end">
                <div className="sm:w-auto">
                  <Button className="p-4" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
              
            </form>
        </div>
    </div>
  )
}