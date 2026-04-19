import React from 'react';
import { 
  Gift, 
  Volume2, 
  Wifi, 
  WifiOff, 
  Signal,
  Camera,
  Map as MapIcon
} from 'lucide-react';

const ArControlPanel = ({ 
  treasureMode, 
  setTreasureMode, 
  mapView, 
  setMapView, 
  currentLanguage, 
  setCurrentLanguage, 
  languages, 
  networkStatus 
}) => {
  return (
    <div className="absolute top-4 left-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <div className="flex flex-col space-y-3">
        {/* 寻宝模式开关 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">寻宝模式</span>
          <button 
            onClick={() => setTreasureMode(!treasureMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              treasureMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                treasureMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {/* 视图切换按钮 */}
        <button 
          onClick={() => setMapView(mapView === 'ar' ? 'map' : 'ar')}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
        >
          {mapView === 'ar' ? <MapIcon className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
          <span className="text-sm">{mapView === 'ar' ? "切换地图" : "切换AR"}</span>
        </button>
        
        {/* 语音按钮 */}
        <button 
          onClick={() => setCurrentLanguage((currentLanguage + 1) % languages.length)}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
        >
          <Volume2 className="h-5 w-5" />
          <span className="text-sm">{languages[currentLanguage]}</span>
        </button>
        
        {/* 网络状态指示灯 */}
        <div className="flex items-center space-x-2">
          {networkStatus === 'online' && (
            <>
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="text-xs text-green-500">在线</span>
            </>
          )}
          {networkStatus === 'weak' && (
            <>
              <Signal className="h-5 w-5 text-yellow-500" />
              <span className="text-xs text-yellow-500">弱网</span>
            </>
          )}
          {networkStatus === 'offline' && (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-xs text-red-500">离线</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArControlPanel;
