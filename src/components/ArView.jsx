import React from 'react';
import { MapPin, Gift, Camera, Home } from 'lucide-react';

const ArView = ({ 
  zoomLevel, 
  showBuildingLabel, 
  cameraActive, 
  treasureMode, 
  handleTouchStart, 
  handleTouchMove 
}) => {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-green-900 to-blue-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* 模拟AR导航路径 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-96 h-96">
          {/* 导航箭头 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-16 border-r-16 border-b-32 border-l-transparent border-r-transparent border-b-yellow-400"></div>
          </div>
          
          {/* 目标点标记 */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <MapPin className="h-12 w-12 text-red-500" />
          </div>
          
          {/* 建筑标签 (当距离<50米时显示) */}
          {showBuildingLabel && (
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span>图书馆</span>
            </div>
          )}
          
          {/* 寻宝点标记 (寻宝模式开启时显示) */}
          {treasureMode && (
            <>
              <div className="absolute top-24 left-1/4 transform -translate-x-1/2">
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="absolute top-32 right-1/4 transform translate-x-1/2">
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* 视角灵敏度指示器 */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        缩放: {zoomLevel.toFixed(1)}x
      </div>
      
      {/* 摄像头状态指示器 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
        <Camera className="h-4 w-4 mr-1" />
        {cameraActive ? "摄像头开启" : "摄像头关闭"}
      </div>
    </div>
  );
};

export default ArView;
