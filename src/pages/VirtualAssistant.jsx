import React from 'react';
import { Send, Mic, Camera, Triangle as Translate, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useVirtualAssistant } from '@/hooks/useVirtualAssistant';
import { ErrorMessage } from '@/components/ErrorMessage';
import MessageBubble from '@/components/ui/message-bubble';

const VirtualAssistant = () => {
  const {
    // 状态
    messages,
    inputValue,
    setInputValue,
    isRecording,
    translateMode,
    isLoading,
    error,
    quickQuestions,
    
    // 方法
    handleSend,
    handleRetry,
    handleQuickQuestion,
    handleEmergency,
    toggleRecording,
    handlePhotoQuestion,
    toggleTranslate,
    handleKeyPress
  } = useVirtualAssistant();

  // 处理发送按钮点击
  const onSendClick = () => {
    console.log('点击发送按钮');
    handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-0">
      <Navbar />
      
      {/* 头部标题 */}
      <header className="bg-white shadow-sm p-4 sticky top-16 md:top-0 z-10">
        <div className="flex items-center">
          <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">智能问答助手</h1>
        </div>
      </header>

      {/* 错误提示 */}
      {error && (
        <div className="mx-4 mt-4">
          <ErrorMessage error={error} onRetry={handleRetry} />
        </div>
      )}

      {/* 助手开场白 - 顶部居中显示 */}
      <div className="text-center py-4 px-4">
        <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2">
          <img
            src="https://nocode.meituan.com/photo/search?keyword=assistant,avatar&width=40&height=40"
            alt="助手头像"
            className="w-10 h-10 rounded-full mr-2 mx-auto object-cover"
          />
          <p className="text-blue-800 font-medium">
            你好！我是你的智能助手"邮爱仙贝"，有什么问题我可以帮你解答吗？
          </p>
        </div>
      </div>

      {/* 聊天记录区 - 居中显示 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col items-center">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-center'}`}
            style={{ maxWidth: '80%' }}
          >
            <MessageBubble message={message} isUser={message.sender === 'user'} />
          </div>
        ))}
        <div id="messages-end" />
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
              onClick={() => handleQuickQuestion(question)}
              disabled={isLoading}
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
              onClick={toggleTranslate}
              className="flex items-center"
              disabled={isLoading}
            >
              <Translate className="h-4 w-4 mr-1" />
              翻译
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEmergency}
              className="flex items-center"
              disabled={isLoading}
            >
              紧急求助
            </Button>
          </div>
        </div>
      </div>

      {/* 输入面板 */}
      <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 md:bottom-16">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? 'bg-red-100' : ''}`}
            onClick={toggleRecording}
            disabled={isLoading}
          >
            <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500' : 'text-gray-500'}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handlePhotoQuestion}
            disabled={isLoading}
          >
            <Camera className="h-5 w-5 text-gray-500" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={translateMode ? "输入中英文问题..." : "输入你的问题..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
              disabled={isLoading}
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-7 w-7"
              onClick={onSendClick}
              disabled={isLoading || !inputValue.trim()}
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
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default VirtualAssistant;
