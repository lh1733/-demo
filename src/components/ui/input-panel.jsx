import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Camera } from 'lucide-react';

const InputPanel = ({ 
  inputValue, 
  setInputValue, 
  onSend, 
  isLoading, 
  isRecording, 
  onToggleRecording, 
  onPhotoQuestion 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${isRecording ? 'bg-red-100' : ''}`}
          onClick={onToggleRecording}
          disabled={isLoading}
        >
          <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500' : 'text-gray-500'}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={onPhotoQuestion}
          disabled={isLoading}
        >
          <Camera className="h-5 w-5 text-gray-500" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="输入你的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-10"
            disabled={isLoading}
          />
          {inputValue && (
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-7 w-7"
              onClick={onSend}
              disabled={isLoading}
            >
              <Send className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  );
};

export default InputPanel;
