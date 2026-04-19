import React, { useState } from 'react';
import { MapPin, Search, ZoomIn, ZoomOut, Home, BookOpen, Utensils, ShoppingCart, Dumbbell, Clock, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const CampusMap = () => {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  
  // 校园建筑数据，包含详细信息
  const buildings = [
    { 
      id: 1, 
      name: '图书馆', 
      x: 50, 
      y: 25, 
      icon: BookOpen, 
      description: '主图书馆，提供丰富的学习资源',
      details: {
        openTime: '8:00-22:00',
        features: '自习室、电子阅览室、研讨室',
        reservation: '研讨室需提前预约',
        contact: '电话: 010-12345678'
      }
    },
    { 
      id: 2, 
      name: '教学楼A', 
      x: 35, 
      y: 45, 
      icon: Home, 
      description: '主要教学区域',
      details: {
        openTime: '7:00-21:00',
        features: '普通教室、多媒体教室',
        reservation: '教室使用需通过教务处预约',
        contact: '电话: 010-12345679'
      }
    },
    { 
      id: 3, 
      name: '学生餐厅', 
      x: 65, 
      y: 40, 
      icon: Utensils, 
      description: '提供多样化的餐饮服务',
      details: {
        openTime: '早餐 6:30-9:00, 午餐 11:00-13:30, 晚餐 17:00-19:30',
        features: '清真窗口、素食窗口、快餐窗口',
        reservation: '团体聚餐需提前一天预约',
        contact: '电话: 010-12345680'
      }
    },
    { 
      id: 4, 
      name: '宿舍楼1', 
      x: 20, 
      y: 70, 
      icon: Home, 
      description: '学生住宿区域',
      details: {
        openTime: '全天开放',
        features: '4人间、公共洗衣房、自习区',
        reservation: '住宿分配由后勤处统一安排',
        contact: '电话: 010-12345681'
      }
    },
    { 
      id: 5, 
      name: '校园超市', 
      x: 75, 
      y: 65, 
      icon: ShoppingCart, 
      description: '日常生活用品采购',
      details: {
        openTime: '8:00-22:00',
        features: '食品、日用品、文具、快递代收',
        reservation: '无需预约',
        contact: '电话: 010-12345682'
      }
    },
    { 
      id: 6, 
      name: '体育馆', 
      x: 50, 
      y: 75, 
      icon: Dumbbell, 
      description: '体育活动和健身场所',
      details: {
        openTime: '6:00-22:00',
        features: '篮球场、羽毛球场、健身房',
        reservation: '场地使用需提前预约',
        contact: '电话: 010-12345683'
      }
    },
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const filteredBuildings = buildings.filter(building => 
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
  };

  const closeBuildingDetails = () => {
    setSelectedBuilding(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-16">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">校园地图</h1>
            <Button onClick={() => navigate('/')} variant="outline">
              返回首页
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索建筑..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleZoomOut} variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button onClick={handleZoomIn} variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 h-[700px]">
            {/* 校园地图背景 */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E6%A0%A1%E5%9B%AD%E5%9C%B0%E5%9B%BE-md83aqgswuri5nh8jm132ecbnzn193.jpg')",
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            />
            
            {/* 建筑标记 */}
            {filteredBuildings.map(building => {
              const IconComponent = building.icon;
              return (
                <div
                  key={building.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${building.x}%`, top: `${building.y}%` }}
                  onClick={() => handleBuildingClick(building)}
                >
                  <div className="relative group">
                    <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-white rounded-lg shadow-lg p-3 z-10">
                      <h3 className="font-bold text-gray-800">{building.name}</h3>
                      <p className="text-sm text-gray-600">{building.description}</p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">校园建筑列表</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBuildings.map(building => {
                const IconComponent = building.icon;
                return (
                  <div 
                    key={building.id} 
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleBuildingClick(building)}
                  >
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{building.name}</h3>
                      <p className="text-sm text-gray-600">{building.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* 建筑详情弹窗 */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedBuilding.name}</h2>
                <Button variant="ghost" onClick={closeBuildingDetails} className="text-gray-500 hover:text-gray-700">
                  <span className="text-2xl">&times;</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {React.createElement(selectedBuilding.icon, { className: "h-6 w-6 text-blue-600" })}
                  </div>
                  <p className="text-gray-600">{selectedBuilding.description}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    开放时间
                  </h3>
                  <p className="text-gray-600">{selectedBuilding.details.openTime}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Home className="h-5 w-5 mr-2 text-blue-500" />
                    功能介绍
                  </h3>
                  <p className="text-gray-600">{selectedBuilding.details.features}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    预约方式
                  </h3>
                  <p className="text-gray-600">{selectedBuilding.details.reservation}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-500" />
                    联系方式
                  </h3>
                  <p className="text-gray-600">{selectedBuilding.details.contact}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" onClick={closeBuildingDetails}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default CampusMap;
