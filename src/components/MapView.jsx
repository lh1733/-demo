import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Home, Utensils, ShoppingCart, BookOpen } from 'lucide-react';

// 修复Leaflet默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 图标映射
const iconMap = {
  "餐厅": Utensils,
  "商店": ShoppingCart,
  "学习": BookOpen
};

const MapView = ({ userPosition, targetPosition, facilityPositions }) => {
  // 获取设施图标组件
  const getFacilityIcon = (category) => {
    const IconComponent = iconMap[category] || Home;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="absolute inset-0">
      <MapContainer 
        center={userPosition || [40.1512, 116.2555]} 
        zoom={16} 
        style={{ height: '100%', width: '100%' }}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* 用户位置标记 */}
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>您的位置</Popup>
          </Marker>
        )}
        {/* 目标位置标记 */}
        <Marker position={targetPosition}>
          <Popup>目标位置: 图书馆</Popup>
        </Marker>
        {/* 周边设施标记 */}
        {facilityPositions.map((facility, index) => (
          <Marker key={index} position={facility.position}>
            <Popup>
              <div>
                <div className="font-bold">{facility.name}</div>
                <div className="text-sm">{facility.category}</div>
                <div className="text-sm">距离: {facility.distance}米</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
