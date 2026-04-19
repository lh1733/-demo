import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ErrorMessage = ({ error, onRetry }) => {
  const getErrorIcon = () => {
    if (error.includes('超时')) return '⏱️';
    if (error.includes('频繁')) return '⚡';
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getErrorIcon()}
          <p className="text-red-700 text-sm ml-2">{error}</p>
        </div>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            重试
          </Button>
        )}
      </div>
    </div>
  );
};
