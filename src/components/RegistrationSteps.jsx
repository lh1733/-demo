import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle,
  Circle,
  Loader,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const RegistrationSteps = ({ registrationSteps, setRegistrationSteps }) => {
  const toggleCardExpansion = (id) => {
    setRegistrationSteps(steps => 
      steps.map(step => 
        step.id === id 
          ? { ...step, expanded: !step.expanded } 
          : { ...step, expanded: false }
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Loader className="h-6 w-6 text-blue-500 animate-spin" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">报到环节</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {registrationSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div 
              className={`rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${getStatusColor(step.status)}`}
              onClick={() => toggleCardExpansion(step.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.location}</p>
                </div>
                {getStatusIcon(step.status)}
              </div>
              
              {step.expanded && (
                <motion.div 
                  className="mt-3 pt-3 border-t border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-700">所需材料:</p>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      {step.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">预计耗时: {step.time}</p>
                </motion.div>
              )}
              
              <div className="flex justify-center mt-2">
                {step.expanded ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RegistrationSteps;
