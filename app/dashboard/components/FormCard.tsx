import React from 'react';
import Link from 'next/link';
import { Edit2, ExternalLink, Trash2 } from 'lucide-react';
import Button from '@/components/FormulaButton';
import { FormInterface } from '@/app/dashboard/page';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FormCardProps {
  form: FormInterface;
  editId: string | null;
  editTitle: string;
  onEditTitleChange: (val: string) => void;
  onStartEditing: (id: string, currentTitle: string, e: React.MouseEvent) => void;
  onSaveTitle: (id: string, e: React.MouseEvent) => void;
  onDelete: (id: string) => void;
  onClickCard: () => void;
}

export default function FormCard({
  form,
  editId,
  editTitle,
  onEditTitleChange,
  onStartEditing,
  onSaveTitle,
  onDelete,
  onClickCard
}: FormCardProps) {
  
  return (
    <div 
      onClick={onClickCard}
      className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative group min-h-[180px] flex flex-col"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 p-1 z-10"
            title="Delete Form">
            <Trash2 size={18} />
          </button>
        </AlertDialogTrigger>
        
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this form?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(form.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-start mb-4">
        <div className="w-full pr-6">
          {editId === form.id ? (
            <div className="flex items-center gap-2 mb-2 w-60">
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => onEditTitleChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="border-b-2 border-blue1 bg-transparent py-1 flex-1 text-xl font-bold focus:outline-none min-w-0"
                autoFocus
              />
              <Button 
                onClick={(e) => onSaveTitle(form.id, e)} 
                className="w-auto mt-0 py-1 px-3 text-xs shrink-0">
                Save
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-2 group/title">
              <h3 className="text-xl font-bold text-blue2 group-hover:text-blue-800 transition-colors truncate">
                {form.title}
              </h3>
              <button 
                onClick={(e) => onStartEditing(form.id, form.title, e)} 
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
        <span>
          {form.responses_count} {form.responses_count === 1 ? 'Response' : 'Responses'}
        </span>
        <Link
          href={`/forms/${form.id}`}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-blue1 hover:bg-blue-50 hover:text-blue-700 transition-colors">
          <ExternalLink size={16} />
          View
        </Link>
      </div>
    </div> 
  );
}