import React from 'react';
import ControlPanel from '@/components/ArControlPanel';
import ArView from '@/components/ArView';
import MapView from '@/components/MapView';
import BottomInfoBar from '@/components/BottomInfoBar';
import Navbar from '@/components/Navbar';
import { useArNavigation } from '@/hooks/useArNavigation';

const ArNavigation = () => {
  const {
    // 状态
    treasureMode,
    setTreasureMode,
    currentLanguage,
    setCurrentLanguage,
    networkStatus,
    mapView,
    setMapView,
    showNearby,
    setShowNearby,
    zoomLevel,
    showBuildingLabel,
    cameraActive,
    userPosition,
    targetPosition,
    languages,
    treasureProgress,
    nearbyFacilities,
    
    // 方法
    handleTouchStart,
    handleTouchMove,
    distance,
    direction,
    getAllFacilityPositions
  } = useArNavigation();

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-blue-50 to-white overflow-hidden md:pb-16 pt-24 md:pt-0">
      <Navbar />
      
      {mapView === 'ar' ? (
        <ArView 
          zoomLevel={zoomLevel}
          showBuildingLabel={showBuildingLabel}
          cameraActive={cameraActive}
          treasureMode={treasureMode}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
        />
      ) : (
        <div className="absolute inset-0 pt-16 pb-32 md:pb-40">
          <MapView 
            userPosition={userPosition}
            targetPosition={targetPosition}
            facilityPositions={getAllFacilityPositions()}
          />
        </div>
      )}
      
      <ControlPanel 
        treasureMode={treasureMode}
        setTreasureMode={setTreasureMode}
        mapView={mapView}
        setMapView={setMapView}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        languages={languages}
        networkStatus={networkStatus}
      />
      
      <BottomInfoBar 
        distance={distance}
        direction={direction}
        treasureProgress={treasureProgress}
        showNearby={showNearby}
        setShowNearby={setShowNearby}
        nearbyFacilities={nearbyFacilities}
      />
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default ArNavigation;
