import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Triangle as Translate, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ChatWindow = ({ 
  messages, 
  onSend, 
  onRetry, 
  error, 
  isLoading,
  quickQuestions,
  onQuickQuestion,
  onEmergency,
  translateMode,
  onToggleTranslate,
  isRecording,
  onToggleRecording,
  onPhotoQuestion
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              重试
            </Button>
          </div>
        </div>
      )}

      {/* 聊天记录区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'assistant' && (
              <img
                src={message.avatar}
                alt="助手头像"
                className="w-8 h-8 rounded-full mr-2 self-start mt-1 mx-auto object-cover"
              />
            )}
            <div
              className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gray-200 text-gray-800 rounded-tr-none'
                  : 'bg-blue-500 text-white rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.isEmergency && (
                <p className="text-xs mt-1 italic">紧急求助已发送</p>
              )}
              {isLoading && message.sender === 'user' && (
                <p className="text-xs mt-1 italic">正在思考中...</p>
              )}
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">我</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 快捷功能栏 */}
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

      {/* 输入面板 */}
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
              placeholder={translateMode ? "输入中英文问题..." : "输入你的问题..."}
              onChange={(e) => onQuickQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
              disabled={isLoading}
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-7 w-7"
              onClick={onSend}
              disabled={isLoading}
            >
              <Send className="h-3 w-3" />
            </Button>
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
    </div>
  );
};

export default ChatWindow;
