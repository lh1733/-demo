import React, { useState, useEffect } from 'react';
import ProgressSection from '@/components/ProgressSection';
import RegistrationSteps from '@/components/RegistrationSteps';
import QuickActions from '@/components/QuickActions';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WelcomeSection from '@/components/WelcomeSection';
import StudentRegistrationForm from '@/components/StudentRegistrationForm';
import FeedbackForm from '@/components/FeedbackForm';
import UsefulLinks from '@/components/UsefulLinks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Index = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [registrationSteps, setRegistrationSteps] = useState([
    {
      id: 1,
      title: "学籍注册",
      status: "completed",
      location: "行政楼一层101室",
      materials: ["录取通知书", "身份证", "照片"],
      time: "15分钟",
      expanded: false
    },
    {
      id: 2,
      title: "宿舍分配",
      status: "in-progress",
      location: "学生宿舍管理中心",
      materials: ["住宿申请表", "体检报告"],
      time: "20分钟",
      expanded: false
    },
    {
      id: 3,
      title: "校园卡办理",
      status: "unstarted",
      location: "校园卡服务中心",
      materials: ["身份证", "一寸照片"],
      time: "10分钟",
      expanded: false
    },
    {
      id: 4,
      title: "缴费确认",
      status: "unstarted",
      location: "财务处",
      materials: ["缴费凭证", "银行卡"],
      time: "10分钟",
      expanded: false
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // 使用 useQuery 获取API数据，支持流式响应
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      // 模拟API调用，实际应用中替换为真实API端点
      const response = await axios.get('/api/dashboard', {
        responseType: 'stream' // 启用流式响应
      });
      
      // 处理流式数据
      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let result = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // 解码接收到的数据块
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          
          // 实时更新UI（这里可以根据需要处理数据）
          console.log('Received chunk:', chunk);
        }
        
        // 返回完整结果
        return JSON.parse(result);
      } catch (err) {
        console.error('流式数据处理错误:', err);
        throw err;
      } finally {
        reader.releaseLock();
      }
    },
    enabled: false, // 默认不自动加载，通过refetch手动触发
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5分钟
  });

  // 处理API响应数据
  useEffect(() => {
    if (data) {
      console.log('API响应数据:', data);
      // 根据API响应更新UI状态
      // 这里可以根据实际API响应结构来更新组件状态
    }
  }, [data]);

  const handleMaterialUpload = () => {
    setShowRegistrationForm(true);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    // 这里可以调用API提交反馈数据
    console.log('反馈已提交:', feedbackData);
    
    // 模拟API调用
    // try {
    //   await apiClient.post('/feedback', feedbackData);
    // } catch (error) {
    //   console.error('提交反馈失败:', error);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar registrationSteps={registrationSteps} showFeedbackForm={showFeedbackForm} setShowFeedbackForm={setShowFeedbackForm} />
      
      <main className="container mx-auto px-4 py-6 pt-24 md:pt-32">
        <WelcomeSection />
        
        {showRegistrationForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">新生信息登记</h2>
              <button 
                onClick={() => setShowRegistrationForm(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                返回首页
              </button>
            </div>
            <StudentRegistrationForm />
          </div>
        ) : showFeedbackForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">问题反馈</h2>
              <button 
                onClick={() => setShowFeedbackForm(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                返回首页
              </button>
            </div>
            <FeedbackForm 
              onSubmit={handleFeedbackSubmit} 
              onCancel={() => setShowFeedbackForm(false)} 
            />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">报到进度</h2>
              <ProgressSection />
            </div>
            <RegistrationSteps 
              registrationSteps={registrationSteps} 
              setRegistrationSteps={setRegistrationSteps} 
            />
            <QuickActions onMaterialUpload={handleMaterialUpload} />
            <UsefulLinks />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Index;
