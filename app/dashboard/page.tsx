"use client";
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import { CheckSquare, Circle, Edit2, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInterface } from '../lib/types';
import { axiosInstance } from '../lib/utils';
import toast from 'react-hot-toast';
import Button from '../_components/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [forms, setForms] = useState<FormInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>("")

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchForms();
    }
  }, [router])

  const fetchForms = async () => {
    try {
      const response = await axiosInstance.get("/api/forms/");
      setForms(response.data.reverse());
    } catch (error) {
      toast.error("Failed to load forms");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCreateForm = async () => {
    try {
      const response = await axiosInstance.post("/api/forms/", {
        title: `New Form ${forms.length + 1}`,
        description: "",
      })

      if (response.status === 201) {
        toast.success("New form created!");
        fetchForms(); 
      }
    } catch (error) {
      toast.error("Failed to create new form");
    }
  }

  const handleSaveTitle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await axiosInstance.patch(`/api/forms/${id}/`, {title: editTitle});
      
      toast.success("Title updated!");
      setEditId(null);
      fetchForms();
    } catch (error) {
      toast.error("Failed to update title.");
    }
  }

  const startEditing = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditId(id);
    setEditTitle(currentTitle);
  }

  const handleDeleteForm = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!window.confirm("Are you sure you want to delete this form?")) {
      return
    }
    
    try {
      await axiosInstance.delete(`/api/forms/${id}/`);
      
      toast.success("Form deleted successfully!");
      fetchForms();
    } catch (error) {
      toast.error("Failed to delete form.");
    }
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="h-screen bg-cream1 flex items-center justify-center">
        <p className="text-blue1 font-semibold">Loading</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen bg-cream1 pt-20">
      <div className="md:w-64 fixed hidden md:block">
        <SideNav onCreateForm={handleCreateForm} />
      </div>

      <div className="md:ml-64 p-8 bg-cream1 min-h-screen">
        
          <div className="mb-8">
            <h1 className="text-3xl text-blue1 font-bold">My Forms</h1>
            <p className="text-gray-500 mt-1">Manage your forms.</p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {forms.length === 0 && (
            <div 
              onClick={handleCreateForm}
              className="border-2 border-dashed border-gray-300 rounded-md p-5 flex flex-col items-center justify-center min-h-[180px] cursor-pointer hover:border-blue1 transition-all group">
              <Plus size={40} className="text-gray-400 group-hover:text-blue1 mb-2"/>
              <p className="font-semibold text-gray-500 group-hover:text-blue1">Create a New Form</p>
            </div>
          )}

          {forms.map((form) => (
          <div key={form.id} 
              onClick={() => router.push(`/forms/${form.id}/edit`)}
              className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative group min-h-[180px] flex flex-col">

              <button 
              onClick={(e) => handleDeleteForm(form.id, e)} 
              className="absolute top-5 right-3 text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 p-1 z-10"
              title="Delete Form">
              <Trash2 size={18} />
              </button>

              <div className="flex justify-between items-start mb-4">
                <div className="w-full pr-6">
                  {editId === form.id ? (
                    <div className="flex items-center gap-2 mb-2 w-60">

                      <input type="text" value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="border-b-2 border-blue1 bg-transparent py-1 flex-1 text-xl font-bold focus:outline-none min-w-0"
                        autoFocus/>
                      
                        <Button onClick={(e) => handleSaveTitle(form.id, e)} className="w-auto mt-0 py-1 px-3 text-xs shrink-0">
                          Save
                        </Button>
                    </div>
                  ) : (
                <div className="flex items-center gap-2 mb-2 group/title">
                  <h3 className="text-xl font-bold text-blue2 group-hover:text-blue-700 transition-colors truncate">
                    {form.title}
                  </h3>
                  <button 
                    onClick={(e) => startEditing(form.id, form.title, e)} 
                    className="opacity-0 group-hover/title:opacity-100 text-gray-400 hover:text-blue1 transition-opacity">
                    <Edit2 size={16} />
                  </button>
                </div>
                  )}
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {form.description || "No description."}
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-600 font-medium border-t border-gray-50">
                <span>0 Responses</span>
                <Link
                  href={`/forms/${form.id}`}
                  onClick={(e) => e.stopPropagation()}
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