import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, UsersIcon, HelpCircleIcon } from 'lucide-react';

const ResponsiveNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: "首页",
      to: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      title: "AR导航",
      to: "/ar-navigation",
      icon: <MapIcon className="h-5 w-5" />,
    },
    {
      title: "社交破冰",
      to: "/social-icebreaker",
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      title: "问答助手",
      to: "/virtual-assistant",
      icon: <HelpCircleIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* 桌面端导航栏 - 顶部 */}
      <div className="hidden md:flex md:items-center md:justify-center md:space-x-8 md:py-3 md:bg-white md:shadow-md md:fixed md:top-0 md:left-0 md:right-0 md:z-50">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
              location.pathname === item.to
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
            }`}
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </div>

      {/* 移动端导航栏 - 底部 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                location.pathname === item.to
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-xs">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavbar;
