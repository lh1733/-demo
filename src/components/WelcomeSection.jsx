import React from 'react';

const WelcomeSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all hover:scale-[1.01] duration-300 relative overflow-hidden">
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white z-10"></div>
      
      {/* 欢迎图片 */}
      <div className="relative z-10 -mx-6 -mt-6">
        <img 
          src="https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E8%83%8C%E6%99%AF1-7vko8aakasha6pgd5cn2a0hop84kag.jpg" 
          alt="北京邮电大学校园" 
          className="rounded-t-2xl mx-auto object-cover w-full h-64 md:h-80"
        />
        {/* 图片上的渐变文字 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white flex items-end pb-8">
          <div className="text-center w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">欢迎来到北京邮电大学</h1>
            <p className="text-gray-600 px-4">新生入学一站式服务平台</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
