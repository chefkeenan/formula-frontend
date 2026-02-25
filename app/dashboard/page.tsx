"use client";
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import { Circle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-cream1 flex items-center justify-center">
        <p className="text-blue1 font-semibold">Loading</p>
      </div>
    );
  }

  const dummyData = [
    {
      id: "1",
      title: "Form 1",
      description: "testestess",
      responses: 128,
      status: "active"
    },
    {
      id: "2",
      title: "Form 2",
      description: "testestess",
      responses: 128,
      status: "active"
    },
    {
      id: "3",
      title: "Form 3",
      description: "testestess",
      responses: 128,
      status: "active"
    },
    {
      id: "4",
      title: "Form 4",
      description: "testestess",
      responses: 128,
      status: "closed"
    }
  ];

  return (
    <div className="h-screen bg-cream1 pt-20">
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>

      <div className="md:ml-64 p-8 bg-cream1 min-h-screen">
        
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-blue1 font-bold">My Forms</h1>
            <p className="text-gray-500 mt-1">Manage your forms.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {dummyData.map((form) => (
            <div 
              key={form.id} 
              onClick={() => router.push(`/forms/${form.id}/edit`)}
              className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue2 mb-2 group-hover:text-blue-700 transition-colors">
                    {form.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{form.description}</p>
                </div>

                <Circle 
                  size={16} 
                  color={form.status === "active" ? "#29ff4c" : "red"} 
                  strokeWidth={20} 
                  className="rounded-xl flex-shrink-0 mt-1"
                />
              </div>

              <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-600 font-medium border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <span>{form.responses} Responses</span>
                </div>

                <Link
                  href={`/forms/${form.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-blue1 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <ExternalLink size={16} />
                  View
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}