import { useState, useEffect, useRef } from 'react';

export const useArNavigation = () => {
  // 控制面板状态
  const [treasureMode, setTreasureMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('online'); // online, weak, offline
  const [mapView, setMapView] = useState('ar'); // 'ar' or 'map'
  
  // 底部信息栏状态
  const [showNearby, setShowNearby] = useState(false);
  
  // AR视图状态
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBuildingLabel, setShowBuildingLabel] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  
  // 用户位置状态
  const [userPosition, setUserPosition] = useState(null);
  const [targetPosition, setTargetPosition] = useState([40.1512, 116.2555]); // 北京邮电大学沙河校区
  
  // 模拟数据
  const languages = ['普通话', '粤语', '四川话', '上海话', '闽南语'];
  
  const treasureProgress = {
    found: 3,
    total: 15
  };
  
  // 周边设施数据，包含坐标信息用于地图显示
  const nearbyFacilities = [
    {
      category: "餐厅",
      items: [
        { name: "学生餐厅", distance: 50, position: [40.1515, 116.2550] },
        { name: "清真餐厅", distance: 120, position: [40.1518, 116.2560] },
        { name: "咖啡厅", distance: 200, position: [40.1520, 116.2545] }
      ]
    },
    {
      category: "商店",
      items: [
        { name: "校园超市", distance: 80, position: [40.1510, 116.2555] },
        { name: "书店", distance: 150, position: [40.1505, 116.2565] }
      ]
    },
    {
      category: "学习",
      items: [
        { name: "自习室A区", distance: 30, position: [40.1513, 116.2548] },
        { name: "实验室大楼", distance: 250, position: [40.1525, 116.2570] }
      ]
    }
  ];

  // 模拟双指缩放
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // 双指触摸开始
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      // 保存初始距离
      e.currentTarget.setAttribute('data-initial-distance', distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // 双指触摸移动
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const initialDistance = parseFloat(e.currentTarget.getAttribute('data-initial-distance'));
      if (initialDistance > 0) {
        const scale = distance / initialDistance;
        setZoomLevel(prev => Math.min(Math.max(0.5, prev * scale), 3));
      }
    }
  };

  // 模拟接近目标时显示建筑标签
  useEffect(() => {
    // 模拟距离计算
    const distance = userPosition ? 
      Math.sqrt(
        Math.pow(userPosition[0] - targetPosition[0], 2) + 
        Math.pow(userPosition[1] - targetPosition[1], 2)
      ) * 10000 : 120;
      
    if (distance < 50) {
      setShowBuildingLabel(true);
    } else {
      setShowBuildingLabel(false);
    }
  }, [userPosition, targetPosition]);

  // 模拟获取用户位置
  useEffect(() => {
    // 模拟初始用户位置（在北京邮电大学沙河校区附近）
    setUserPosition([40.1520, 116.2540]);
    
    // 模拟位置更新
    const positionInterval = setInterval(() => {
      setUserPosition(prev => {
        if (!prev) return [40.1520, 116.2540];
        // 微小移动模拟
        return [
          prev[0] + (Math.random() - 0.5) * 0.0001,
          prev[1] + (Math.random() - 0.5) * 0.0001
        ];
      });
    }, 5000);
    
    return () => clearInterval(positionInterval);
  }, []);

  // 计算距离和方向
  const calculateDistanceAndDirection = () => {
    if (!userPosition) return { distance: 0, direction: "未知" };
    
    // 简化的距离计算（实际应用中应使用更精确的地理距离计算）
    const distance = Math.sqrt(
      Math.pow(userPosition[0] - targetPosition[0], 2) + 
      Math.pow(userPosition[1] - targetPosition[1], 2)
    ) * 100000;
    
    // 简化的方向计算
    const direction = 
      userPosition[0] < targetPosition[0] ? 
      (userPosition[1] < targetPosition[1] ? "东北" : "东南") :
      (userPosition[1] < targetPosition[1] ? "西北" : "西南");
      
    return { distance: Math.round(distance), direction };
  };

  const { distance, direction } = calculateDistanceAndDirection();

  // 获取所有周边设施的坐标点
  const getAllFacilityPositions = () => {
    return nearbyFacilities.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.category
      }))
    );
  };

  return {
    // 状态
    treasureMode,
    setTreasureMode,
    currentLanguage,
    setCurrentLanguage,
    networkStatus,
    setNetworkStatus,
    mapView,
    setMapView,
    showNearby,
    setShowNearby,
    zoomLevel,
    setZoomLevel,
    showBuildingLabel,
    setShowBuildingLabel,
    cameraActive,
    setCameraActive,
    userPosition,
    setUserPosition,
    targetPosition,
    setTargetPosition,
    languages,
    treasureProgress,
    nearbyFacilities,
    
    // 方法
    handleTouchStart,
    handleTouchMove,
    distance,
    direction,
    getAllFacilityPositions
  };
};
