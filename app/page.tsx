import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-col justify-between">
      <div></div>
      <div className="bg-cream1 lg:grid">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Create Forms with Ease.
          </h1>

          <p className="mt-4 text-gray-700 sm:text-lg/relaxed">
            tesssssssssssssssssssssssss
          </p>

          <div className="mt-4 flex gap-4 mt-6">
            <Link href="/login" className="inline-block rounded border bg-blue1 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue3">
              Formulate Now
            </Link>

            <Link href="" className="bg-white inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div>dasdada</div>
        
      </div>
  );
}
