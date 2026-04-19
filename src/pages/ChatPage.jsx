import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Bot } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      content: '你好！我是你的智能助手，有什么我可以帮助你的吗？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟助手回复
    setTimeout(() => {
      const assistantResponses = [
        '感谢你的提问，我已经记录下来了。',
        '这是一个很好的问题！让我想想如何帮助你...',
        '我理解你的需求，我会尽力为你提供帮助。',
        '根据你的问题，我建议你可以查看帮助中心的相关内容。',
        '请稍等，我正在为你查找相关信息...'
      ];
      
      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: assistantResponses[Math.floor(Math.random() * assistantResponses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24 md:pt-32">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-0">
            {/* 聊天标题 */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-t-lg">
              <h1 className="text-2xl font-bold text-white">智能助手聊天</h1>
              <p className="text-blue-100">随时为您解答问题和提供帮助</p>
            </div>
            
            {/* 聊天记录区 */}
            <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'assistant' && (
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow max-w-[80%] md:max-w-[70%]">
                        <p className="text-gray-800">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {message.sender === 'user' && (
                    <div className="flex items-start">
                      <div className="bg-blue-500 p-4 rounded-2xl rounded-tr-none shadow max-w-[80%] md:max-w-[70%]">
                        <p className="text-white">{message.content}</p>
                        <p className="text-xs text-blue-100 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-full ml-3 flex-shrink-0">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="输入你的问题..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                按 Enter 发送消息，Shift + Enter 换行
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
