import React from "react";
import { Trash2, Type, AlignLeft, CircleDot, CheckSquare, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "dropdown";

export interface Question {
    id: string;
    type: QuestionType;
    question_text: string;
    required: boolean;
    options: string[]; 
}

interface QuestionBlockProps {
    question: Question;
    index: number;
    onUpdate: (id: string, field: keyof Question, value: any) => void;
    onDelete: (id: string) => void;
    onAddOption: (id: string) => void;
    onUpdateOption: (id: string, index: number, value: string) => void;
    onRemoveOption: (id: string, index: number) => void;
}

const questionIcons: Record<QuestionType, React.ReactNode> = {
    text: <Type size={18} className="text-gray-400 mt-1 shrink-0" />,
    textarea: <AlignLeft size={18} className="text-gray-400 mt-1 shrink-0" />,
    radio: <CircleDot size={18} className="text-gray-400 mt-1 shrink-0" />,
    checkbox: <CheckSquare size={18} className="text-gray-400 mt-1 shrink-0" />,
    dropdown: <ChevronDown size={18} className="text-gray-400 mt-1 shrink-0" />,
};

export default function QuestionBlock({
    question,
    index,
    onUpdate,
    onDelete,
    onAddOption,
    onUpdateOption,
    onRemoveOption,
}: QuestionBlockProps) {


  return (
    <div className="group relative flex flex-col gap-3 rounded-xl p-4 -mx-4 hover:bg-gray-50 transition-colors focus-within:bg-gray-50">
      <div className="flex items-start gap-3">
        {questionIcons[question.type]}
        <input 
          type="text" 
          value={question.question_text} 
          onChange={(e) => onUpdate(question.id, "question_text", e.target.value)}
          className="w-full bg-transparent focus:outline-none text-lg font-semibold text-gray-900 placeholder:text-gray-300 transition-colors"
          placeholder={`Question ${index + 1}`} 
          autoFocus
        />
        {question.required && <span className="text-red-500 text-lg font-bold">*</span>}
      </div>

      <div className="pl-8">
        {question.type === "text" && (
          <div className="border border-gray-200 rounded-md px- p-3 text-gray-400 text-sm w-full md:w-2/3 bg-white shadow-sm cursor-text">
            Short answer text
          </div>
        )}
        
        {question.type === "textarea" && (
          <div className="border border-gray-200 rounded-md p-3 text-gray-400 text-sm w-full h-24 bg-white shadow-sm cursor-text">
            Long answer text
          </div>
        )}
        
        {(question.type === "radio" || question.type === "checkbox" || question.type === "dropdown") && (
          <div className="space-y-3 mt-1">
            {question.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center gap-3 group/opt">
                {question.type === "radio" && <CircleDot size={18} className="text-gray-300 shrink-0"/>}
                {question.type === "checkbox" && <CheckSquare size={18} className="text-gray-300 shrink-0"/>}
                {question.type === "dropdown" && <span className="text-gray-300 shrink-0 text-sm font-medium w-5">{optIndex + 1}.</span>}

                <input 
                  type="text" 
                  value={opt} 
                  onChange={(e) => onUpdateOption(question.id, optIndex, e.target.value)}
                  className="flex-1 focus:outline-none border-b border-transparent focus:border-gray-300 py-1 text-base text-gray-700 bg-transparent placeholder:text-gray-400"
                  placeholder={`Option ${optIndex + 1}`}
                  />
                {question.options.length > 1 && (
                  <button 
                    onClick={() => onRemoveOption(question.id, optIndex)} 
                    className="text-gray-300 hover:text-red-500 opacity-0 group-hover/opt:opacity-100">
                    <Trash2 size={16}/>
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
                {question.type === "radio" && <CircleDot size={18} className="text-gray-300 shrink-0"/>}
                {question.type === "checkbox" && <CheckSquare size={18} className="text-gray-300 shrink-0"/>}
                {question.type === "dropdown" && <span className="text-gray-300 shrink-0 text-sm font-medium w-5">{question.options.length + 1}.</span>}
              <button 
                onClick={() => onAddOption(question.id)} 
                className="text-sm text-gray-400 hover:text-blue1 font-medium transition-colors">
                Add option
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-4 mt-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity pl-8">
        <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Required</span>
        <Switch
            className="data-[state=checked]:bg-blue1"
            checked={question.required} 
            onCheckedChange={(checked) => onUpdate(question.id, "required", checked)} />
        </div>
        <button 
          onClick={() => onDelete(question.id)} 
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50" 
          title="Delete block">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}