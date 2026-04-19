import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Users, HelpCircle, User, Bell, MessageSquare } from 'lucide-react';
import NotificationPanel from '@/components/NotificationPanel';

const Navbar = ({ registrationSteps, showFeedbackForm, setShowFeedbackForm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // 检查登录状态
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentId');
    setIsLoggedIn(false);
    navigate('/login');
  };
  
  const navItems = [
    { name: '首页', href: '/', icon: Home },
    { name: 'AR导航', href: '/ar-navigation', icon: Map },
    { name: '社交破冰', href: '/social-icebreaker', icon: Users },
    { name: '问答助手', href: '/virtual-assistant', icon: HelpCircle },
  ];

  return (
    <>
      <header className="bg-gradient-to-b from-blue-600 to-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
        <div className="container mx-auto">
          {/* 统一导航样式 - 在所有设备上使用相同的导航 */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1 rounded-full">
                <img 
                  src="https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E5%8C%97%E9%82%AE%E6%A0%A1%E5%BE%BD-8phvlgzi5g849k1tcmt7yuqbmm5q41.webp" 
                  alt="北京邮电大学校徽" 
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">智邮迎新</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 hover:text-white transition-colors ${
                      location.pathname === item.href ? 'text-white' : 'text-blue-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center text-blue-100 hover:text-white transition-colors relative"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className="h-5 w-5" />
                <span className="ml-1 hidden md:inline">消息</span>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button 
                className="flex items-center text-blue-100 hover:text-white transition-colors"
                onClick={() => setShowFeedbackForm(true)}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="ml-1 hidden md:inline">反馈</span>
              </button>
              <button className="flex items-center text-blue-100 hover:text-white transition-colors">
                <HelpCircle className="h-5 w-5" />
                <span className="ml-1 hidden md:inline">帮助</span>
              </button>
              {isLoggedIn ? (
                <Link 
                  to="/personal-center" 
                  className="flex items-center text-blue-100 hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="ml-1 hidden md:inline">个人中心</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center text-blue-100 hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="ml-1 hidden md:inline">登录</span>
                </Link>
              )}
            </div>
          </div>
          
          {/* 移动端导航菜单 */}
          <div className="md:hidden bg-white bg-opacity-90 px-4 py-2">
            <nav className="flex justify-between">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.name}
                    to={item.href}
                    className={`flex flex-col items-center hover:text-blue-600 transition-colors px-2 py-1 ${
                      location.pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs mt-1">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)}
        registrationSteps={registrationSteps}
      />
    </>
  );
};

export default Navbar;
