import { useState, useRef, useEffect } from 'react';
import { CozeAPI } from '@coze/api';

export const useVirtualAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      content: '你好！我是你的智能助手"邮爱仙贝"，有什么问题我可以帮你解答吗？',
      timestamp: new Date(),
      avatar: 'https://nocode.meituan.com/photo/search?keyword=assistant,avatar&width=40&height=40'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [translateMode, setTranslateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // 初始化扣子API客户端，添加allowPersonalAccessTokenInBrowser选项
  const apiClient = new CozeAPI({
    token: 'pat_2GEof5LqNr4gChFod1gQvrij9XHulmCDzhVmczO0gZ63LkgQUNJxEEiIePpdfajE',
    baseURL: 'https://api.coze.cn',
    allowPersonalAccessTokenInBrowser: true
  });

  const quickQuestions = [
    '宿舍规则',
    '课程表',
    '食堂营业时间'
  ];

  const scrollToBottom = () => {
    const messagesEnd = document.getElementById('messages-end');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    // 验证输入
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) {
      console.log('发送被阻止：输入为空或正在加载中');
      return;
    }

    console.log('开始发送消息:', trimmedInput);

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: trimmedInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      console.log('调用扣子API...');
      
      // 调用扣子API
      const res = await apiClient.workflows.runs.create({
        workflow_id: '7534319349071347748',
        parameters: {
          "input": trimmedInput
        },
      });

      console.log('API响应:', res);

      // 处理API响应，提取output1内容
      let assistantContent = '抱歉，我没有理解您的问题。请再解释得清楚一些。';
      
      if (res) {
        // 尝试多种可能的数据结构
        if (res.data) {
          try {
            // 如果 data 是字符串，尝试解析JSON
            if (typeof res.data === 'string') {
              const parsedData = JSON.parse(res.data);
              if (parsedData.output1) {
                assistantContent = parsedData.output1;
              } else if (parsedData.output) {
                assistantContent = parsedData.output;
              } else if (parsedData.message) {
                assistantContent = parsedData.message;
              } else {
                assistantContent = res.data;
              }
            } 
            // 如果 data 是对象
            else if (typeof res.data === 'object') {
              if (res.data.output1) {
                assistantContent = res.data.output1;
              } else if (res.data.output) {
                assistantContent = res.data.output;
              } else if (res.data.message) {
                assistantContent = res.data.message;
              } else {
                // 尝试将整个对象转为字符串显示
                assistantContent = JSON.stringify(res.data);
              }
            }
          } catch (parseError) {
            console.warn('解析API响应失败:', parseError);
            // 如果解析失败，尝试直接使用
            if (typeof res.data === 'string') {
              assistantContent = res.data;
            }
          }
        } else if (res.message) {
          assistantContent = res.message;
        } else if (res.output) {
          assistantContent = res.output;
        }
      }

      console.log('助手回复内容:', assistantContent);

      // 添加助手回复
      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
        avatar: 'https://nocode.meituan.com/photo/search?keyword=assistant,avatar&width=40&height=40'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('API调用失败:', err);
      
      // 根据错误类型提供更具体的错误信息
      let errorMessage = '发送消息失败，请稍后重试';
      
      // 处理扣子API特定的错误码
      if (err.code === 4100 || (err.message && err.message.includes('4100'))) {
        errorMessage = '认证失败：API密钥无效或已过期，请联系管理员更新配置';
      } else if (err.code === 4000 || (err.message && err.message.includes('4000'))) {
        errorMessage = '请求参数错误，请检查输入内容';
      } else if (err.code === 4200 || (err.message && err.message.includes('4200'))) {
        errorMessage = '请求过于频繁，请稍后再试';
      } else if (err.code === 5000 || (err.message && err.message.includes('5000'))) {
        errorMessage = '服务器内部错误，请稍后重试';
      } else if (err.message && err.message.includes('timeout')) {
        errorMessage = '请求超时，请检查网络连接后重试';
      } else if (err.message && err.message.includes('network')) {
        errorMessage = '网络连接失败，请检查网络设置';
      } else if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          errorMessage = '认证失败，请联系管理员更新API配置';
        } else if (err.response.status === 429) {
          errorMessage = '请求过于频繁，请稍后再试';
        } else if (err.response.status >= 500) {
          errorMessage = '服务器错误，请稍后重试';
        }
      } else if (err.message && err.message.includes('authentication is invalid')) {
        errorMessage = 'API认证失败，请联系管理员更新访问令牌';
      }
      
      setError(errorMessage);
      
      // 添加错误提示消息到聊天中
      const errorMessageObj = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: `抱歉，${errorMessage}`,
        timestamp: new Date(),
        avatar: 'https://nocode.meituan.com/photo/search?keyword=assistant,avatar&width=40&height=40',
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // 找到最后一条用户消息
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
    if (lastUserMessage) {
      console.log('重试发送消息:', lastUserMessage.content);
      // 直接将内容设置到输入框并发送
      setInputValue(lastUserMessage.content);
      // 使用 setTimeout 确保状态更新后再发送
      setTimeout(() => {
        handleSend();
      }, 100);
    } else {
      console.log('没有找到可重试的用户消息');
    }
  };

  const handleQuickQuestion = (question) => {
    console.log('使用快捷问题:', question);
    setInputValue(question);
    // 延迟发送以确保状态更新
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleEmergency = () => {
    const emergencyMessage = {
      id: Date.now(),
      sender: 'assistant',
      content: '正在为您联系辅导员，请稍等...',
      timestamp: new Date(),
      avatar: 'https://nocode.meituan.com/photo/search?keyword=assistant,avatar&width=40&height=40',
      isEmergency: true
    };
    
    setMessages(prev => [...prev, emergencyMessage]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // 实际应用中这里会调用语音识别API
    if (!isRecording) {
      console.log('开始录音...');
    } else {
      console.log('停止录音');
    }
  };

  const handlePhotoQuestion = () => {
    // 实际应用中这里会调用摄像头API
    console.log('拍照提问功能已触发');
    alert('拍照提问功能已触发');
  };

  const toggleTranslate = () => {
    setTranslateMode(!translateMode);
    console.log('翻译模式:', !translateMode ? '开启' : '关闭');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('按下回车键，触发发送');
      handleSend();
    }
  };

  return {
    // 状态
    messages,
    inputValue,
    setInputValue,
    isRecording,
    translateMode,
    isLoading,
    error,
    messagesEndRef,
    quickQuestions,
    
    // 方法
    handleSend,
    handleRetry,
    handleQuickQuestion,
    handleEmergency,
    toggleRecording,
    handlePhotoQuestion,
    toggleTranslate,
    handleKeyPress,
    scrollToBottom
  };
};
