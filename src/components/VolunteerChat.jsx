import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Clock, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const VolunteerChat = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'volunteer',
      content: '你好！我是迎新志愿者，有什么问题我可以帮你解答吗？',
      timestamp: new Date(),
      avatar: 'https://nocode.meituan.com/photo/search?keyword=volunteer,avatar&width=40&height=40'
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

    // 模拟志愿者回复
    setTimeout(() => {
      const volunteerResponses = [
        '感谢你的提问，关于这个问题，我建议你先查看迎新手册第15页。',
        '这是一个很好的问题！你可以前往行政楼一层101室咨询相关老师。',
        '根据我的经验，这个问题通常可以通过以下步骤解决...',
        '我理解你的困惑，让我帮你联系相关负责人。',
        '请稍等，我需要查询一下相关信息...'
      ];
      
      const volunteerMessage = {
        id: Date.now() + 1,
        sender: 'volunteer',
        content: volunteerResponses[Math.floor(Math.random() * volunteerResponses.length)],
        timestamp: new Date(),
        avatar: 'https://nocode.meituan.com/photo/search?keyword=volunteer,avatar&width=40&height=40'
      };
      
      setMessages(prev => [...prev, volunteerMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
              ← 返回
            </Button>
            <div className="flex items-center">
              <img
                src="https://nocode.meituan.com/photo/search?keyword=volunteer,avatar&width=40&height=40"
                alt="志愿者头像"
                className="w-10 h-10 rounded-full mr-3 mx-auto object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">迎新志愿者</h3>
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>在线</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-1" />
            电话咨询
          </Button>
        </div>
      </div>

      {/* 聊天记录区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'volunteer' && (
              <img
                src={message.avatar}
                alt="志愿者头像"
                className="w-8 h-8 rounded-full mr-2 self-start mt-1 mx-auto object-cover"
              />
            )}
            <div
              className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 ml-2 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入面板 */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="输入你的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-7 w-7"
              onClick={handleSend}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>迎新期间 8:00-20:00 在线</span>
        </div>
      </div>
    </div>
  );
};

export default VolunteerChat;
