import React from "react";
import { Type, AlignLeft, CircleDot, CheckSquare, ChevronDown } from "lucide-react";

type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "dropdown";

export default function EditorSidebar({ onAddQuestion }: { onAddQuestion: (type: QuestionType) => void }) {
  const elements: { type: QuestionType; label: string; icon: React.ReactNode }[] = [
    { type: "text", label: "Short Answer", icon: <Type size={18} className="text-blue1" /> },
    { type: "textarea", label: "Paragraph", icon: <AlignLeft size={18} className="text-blue1" /> },
    { type: "radio", label: "Multiple Choice", icon: <CircleDot size={18} className="text-blue1" /> },
    { type: "checkbox", label: "Checkboxes", icon: <CheckSquare size={18} className="text-blue1" /> },
    { type: "dropdown", label: "Dropdown", icon: <ChevronDown size={18} className="text-blue1" /> },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-20 bottom-0 p-4 overflow-y-auto z-40 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Add Elements</h3>
        <div className="space-y-4">
          {elements.map((el) => (
            <button 
              key={el.type}
              onClick={() => onAddQuestion(el.type)} 
              className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 font-medium bg-gray-50 hover:bg-blue-50 hover:text-blue1 border border-gray-100 hover:border-blue1/30 rounded-lg transition-all text-left">
              {el.icon} {el.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}