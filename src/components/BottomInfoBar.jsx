import React from 'react';
import { MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Utensils, ShoppingCart, BookOpen } from 'lucide-react';

// 图标映射
const iconMap = {
  "餐厅": Utensils,
  "商店": ShoppingCart,
  "学习": BookOpen
};

const BottomInfoBar = ({ 
  distance, 
  direction, 
  treasureProgress, 
  showNearby, 
  setShowNearby, 
  nearbyFacilities 
}) => {
  // 获取分类图标组件
  const getCategoryIcon = (category) => {
    const IconComponent = iconMap[category] || Utensils;
    return <IconComponent className="h-5 w-5 text-blue-500 mr-2" />;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm rounded-t-2xl shadow-lg">
      <div className="p-4">
        {/* 当前目标信息 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-red-500 mr-2" />
            <span className="font-medium">图书馆</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">{distance}米</div>
            <div className="text-xs text-gray-500">方向: {direction}</div>
          </div>
        </div>
        
        {/* 寻宝进度条 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>寻宝进度</span>
            <span>{treasureProgress.found}/{treasureProgress.total}</span>
          </div>
          <Progress value={(treasureProgress.found / treasureProgress.total) * 100} />
        </div>
        
        {/* 周边发现折叠面板 */}
        <div className="border-t border-gray-200 pt-3">
          <button 
            onClick={() => setShowNearby(!showNearby)}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="font-medium">周边发现</span>
            {showNearby ? 
              <ChevronDown className="h-5 w-5" /> : 
              <ChevronUp className="h-5 w-5" />
            }
          </button>
          
          {showNearby && (
            <div className="mt-2 grid grid-cols-1 gap-3">
              {nearbyFacilities.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    {getCategoryIcon(category.category)}
                    <span className="font-medium">{category.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-gray-500">{item.distance}m</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomInfoBar;
