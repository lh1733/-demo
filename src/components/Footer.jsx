import React from 'react';
import { RefreshCw, MessageSquare, MapPin } from 'lucide-react';

const Footer = () => {
  const handleRefresh = () => {
    // 这里可以调用API获取最新状态
    console.log("刷新状态");
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-400" />
              <span className="font-semibold">北京邮电大学</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">© 2023 北京邮电大学新生服务平台</p>
          </div>
          
          <div className="flex space-x-6">
            <button 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-5 w-5 mr-1" />
              <span>刷新状态</span>
            </button>
            <button className="flex items-center text-gray-300 hover:text-white transition-colors">
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>问题反馈</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
