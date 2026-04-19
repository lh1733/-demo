import React from 'react';
import { Button } from '@/components/ui/button';
import { Triangle as Translate } from 'lucide-react';

const QuickActions = ({ 
  quickQuestions, 
  onQuickQuestion, 
  translateMode, 
  onToggleTranslate, 
  onEmergency 
}) => {
  return (
    <div className="px-4 py-2 bg-white border-t border-gray-200">
      <div className="flex flex-wrap gap-2 mb-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onQuickQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={translateMode ? "default" : "outline"}
            size="sm"
            onClick={onToggleTranslate}
            className="flex items-center"
          >
            <Translate className="h-4 w-4 mr-1" />
            翻译
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onEmergency}
            className="flex items-center"
          >
            紧急求助
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
