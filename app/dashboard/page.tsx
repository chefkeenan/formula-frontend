"use client";
import React, { useEffect, useMemo, useState } from 'react';
import SideNav from './components/SideNav';
import { CheckSquare, Circle, Edit2, ExternalLink, Plus, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { axiosInstance } from '@/lib/utils';
import FormCard from './components/FormCard';

export interface FormInterface {
  id: string;
  title: string;
  description: string;
  creator: string;
  created_at: string;
  updated_at: string;
  is_accepting_responses: boolean;
  responses_count: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [forms, setForms] = useState<FormInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>("")

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredForms = useMemo(() => {
    let result = forms.filter((form: any) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (statusFilter === "accepting") {
      result = result.filter((form: any) => form.is_accepting_responses === true)
    } else if (statusFilter === "closed") {
      result = result.filter((form: any) => form.is_accepting_responses === false)
    }

    result.sort((a: any, b: any) => {
      const dateA = new Date(a.created_at).getTime(); 
      const dateB = new Date(b.created_at).getTime();

      if (sortBy === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    })

    return result;
  }, [forms, searchQuery, statusFilter, sortBy]);

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
      
      toast.success("Title updated");
      setEditId(null);
      fetchForms();
    } catch (error) {
      toast.error("Failed to update title");
    }
  }

  const startEditing = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditId(id);
    setEditTitle(currentTitle);
  }

  const handleDeleteForm = async (id: string) => {
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
        
        <div className="mb-8 flex items-center gap-10">
          <div>
            <h1 className="text-3xl text-blue1 font-bold">My Forms</h1>
            <p className="text-gray-500 mt-1">Manage your forms.</p>
          </div>

          
          <div className="relative w-full max-w-md pt-10">
            <div className="absolute top-12 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none sm:text-sm transition-colors"
              placeholder="Search forms by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-10 block w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none cursor-pointer">
            <option value="all">Status</option>
            <option value="accepting">Accepting</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-10 block w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white cursor-pointer">
            <option value="latest">Latest</option>
            <option value="earliest">Earliest</option>
          </select>

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

          {filteredForms.map((form) => (
            <FormCard 
              key={form.id}
              form={form}
              editId={editId}
              editTitle={editTitle}
              onEditTitleChange={setEditTitle}
              onStartEditing={startEditing}
              onSaveTitle={handleSaveTitle}
              onDelete={handleDeleteForm}
              onClickCard={() => router.push(`/forms/${form.id}/edit`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}