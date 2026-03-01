import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-col justify-between">
      <div className="bg-cream1 lg:grid">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Create Forms with Ease.
          </h1>

          <p className="mt-4 text-gray-700 sm:text-lg/relaxed">
            Build, share, and analyze custom forms in minutes. Start collecting data seamlessly with Formula today.
          </p>

          <div className="mt-4 flex gap-4 mt-6">
            <Link href="/dashboard" className="inline-block rounded border bg-blue1 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue3">
              Formulate Now
            </Link>

            <Link href="#learn-more" className="bg-white inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
      <div id="learn-more" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Formula?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Setup</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Create and publish your forms in minutes.
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to fill.</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  A friendly design that guarantees a smooth experience for your respondents.
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant insights</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  View, manage, and analyze your form responses in real-time.
                </p>
              </div>
              
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
