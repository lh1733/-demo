import React from 'react';
import { Home, User, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-1 rounded-full">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">智邮迎新</h1>
            <p className="text-xs text-blue-100">北京邮电大学新生服务平台</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-blue-100 hover:text-white transition-colors">
            <HelpCircle className="h-5 w-5 mr-1" />
            <span>帮助</span>
          </button>
          <button className="flex items-center text-blue-100 hover:text-white transition-colors">
            <User className="h-5 w-5 mr-1" />
            <span>登录</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
