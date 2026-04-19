import axios from 'axios';

// 扣子API配置
const COZE_BASE_URL = 'https://api.coze.cn/v3/chat';
const PERSONAL_ACCESS_TOKEN = 'pat_2GEof5LqNr4gChFod1gQvrij9XHulmCDzhVmczO0gZ63LkgQUNJxEEiIePpdfajE';
const AGENT_ID = '7534202372286087220';

// 创建axios实例
const apiClient = axios.create({
  baseURL: COZE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000 // 30秒超时
});

// 添加重试机制
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    
    // 如果没有配置重试次数，默认为0
    if (!config?._retryCount) {
      config._retryCount = 0;
    }
    
    // 最大重试次数
    const maxRetries = 2;
    
    // 如果是超时错误且重试次数未达到上限
    if ((error.code === 'ECONNABORTED' || error.message?.includes('timeout')) && 
        config._retryCount < maxRetries) {
      config._retryCount += 1;
      
      // 延迟重试，递增延迟时间
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      await delay(1000 * config._retryCount);
      
      return apiClient(config);
    }
    
    // 如果是网络错误且重试次数未达到上限
    if (!error.response && config._retryCount < maxRetries) {
      config._retryCount += 1;
      
      // 延迟重试
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      await delay(1000 * config._retryCount);
      
      return apiClient(config);
    }
    
    return Promise.reject(error);
  }
);

// 发送消息到扣子Agent（支持流式和非流式）
export const sendMessageToCozeAgent = async (message, userId = 'user_123456', stream = false) => {
  try {
    const requestData = {
      bot_id: AGENT_ID,
      user_id: userId,
      stream: stream,
      auto_save_history: true,
      additional_messages: [
        {
          role: "user",
          content: message,
          content_type: "text"
        }
      ]
    };

    console.log('发送请求到Coze API:', requestData);

    const response = await apiClient.post('', requestData);
    
    console.log('Coze API响应:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('发送消息到扣子Agent失败:', error);
    
    // 更详细的错误信息
    if (error.response) {
      console.error('错误状态码:', error.response.status);
      console.error('错误响应:', error.response.data);
      
      // 特别处理权限错误
      if (error.response.status === 403) {
        throw new Error('权限不足，无法访问该资源，请检查API密钥和Agent ID配置');
      }
      
      throw new Error(`API错误: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络设置');
    } else {
      throw new Error(`请求配置错误: ${error.message}`);
    }
  }
};

// 流式发送消息到扣子Agent
export const sendStreamMessageToCozeAgent = async (message, userId = 'user_123456', onChunk) => {
  try {
    const requestData = {
      bot_id: AGENT_ID,
      user_id: userId,
      stream: true,
      auto_save_history: true,
      additional_messages: [
        {
          role: "user",
          content: message,
          content_type: "text"
        }
      ]
    };

    console.log('发送流式请求到Coze API:', requestData);

    // 使用 fetch API 处理流式响应
    const response = await fetch(COZE_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // 保留最后一行（可能是不完整的）
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (onChunk) {
                onChunk(data);
              }
            } catch (e) {
              console.warn('解析流数据时出错:', e);
            }
          }
        }
      }

      // 处理剩余的缓冲区数据
      if (buffer.startsWith('data:')) {
        try {
          const data = JSON.parse(buffer.slice(5));
          if (onChunk) {
            onChunk(data);
          }
        } catch (e) {
          console.warn('解析流数据时出错:', e);
        }
      }
    } finally {
      reader.releaseLock();
    }

    return { success: true };
  } catch (error) {
    console.error('流式发送消息到扣子Agent失败:', error);
    throw error;
  }
};

// 获取访问令牌（简化版）
export const getCozeAccessToken = async () => {
  // 在实际应用中，这里应该调用真实的API获取令牌
  return Promise.resolve(PERSONAL_ACCESS_TOKEN);
};
