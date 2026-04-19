import React, { useState } from 'react';
import { Upload, Phone, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VolunteerChat from '@/components/VolunteerChat';

const QuickActions = ({ onMaterialUpload }) => {
  const navigate = useNavigate();
  const [showVolunteerChat, setShowVolunteerChat] = useState(false);
  
  const actions = [
    { 
      icon: Upload, 
      label: "材料一键上传", 
      color: "from-blue-500 to-blue-600",
      onClick: onMaterialUpload || (() => console.log("材料一键上传功能"))
    },
    { 
      icon: Phone, 
      label: "呼叫志愿者", 
      color: "from-green-500 to-green-600",
      onClick: () => setShowVolunteerChat(true)
    },
    { 
      icon: Map, 
      label: "查看地图", 
      color: "from-purple-500 to-purple-600",
      onClick: () => navigate('/campus-map')
    }
  ];

  return (
    <>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">快捷功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              className={`flex flex-col items-center justify-center rounded-2xl shadow-lg p-6 bg-gradient-to-br ${action.color} text-white hover:shadow-xl transition-shadow`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onClick={action.onClick}
            >
              <action.icon className="h-10 w-10 mb-3" />
              <span className="text-lg font-semibold">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 志愿者聊天弹窗 */}
      {showVolunteerChat && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md h-[70vh] flex flex-col">
            <VolunteerChat onBack={() => setShowVolunteerChat(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;
