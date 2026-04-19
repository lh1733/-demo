import axios from 'axios';

// 百度文心一言API配置
const WENXIN_AGENT_ID = 'jtt1luMsurJmRRdBpIIixbYpstFj8R78';
const WENXIN_SECRET_KEY = 'n0XBVhPNbLyVMDCaeBIxjvSTdETbPkGO';
const WENXIN_BASE_URL = 'https://agentapi.baidu.com/assistant';

// 计算重试延迟时间（指数退避策略）
const calculateRetryDelay = (retryCount) => {
  return Math.min(1000 * Math.pow(2, retryCount), 10000); // 最大10秒
};

// 获取访问令牌（简化版，移除网络检查）
export const getAccessToken = async () => {
  try {
    console.log('正在获取访问令牌...');
    // 在实际应用中，这里应该调用真实的API获取令牌
    console.log('访问令牌获取成功');
    return Promise.resolve('agent_token');
  } catch (error) {
    console.error('获取访问令牌失败:', error);
    throw new Error('无法获取访问令牌，请稍后重试');
  }
};

// 发送消息到文心一言Agent（带重试机制）
export const sendMessageToAgent = async (message, accessToken = 'agent_token', retryCount = 0) => {
  // 根据消息长度设置不同的超时时间
  const timeout = message.length > 100 ? 45000 : 25000; // 长消息45秒，短消息25秒
  
  // 记录请求开始时间
  const startTime = Date.now();
  
  try {
    const requestData = {
      message: {
        content: {
          type: "text",
          value: {
            showText: message
          }
        }
      },
      source: WENXIN_AGENT_ID,
      from: "openapi",
      openId: "user_123456" // 在实际应用中应该使用真实的用户ID
    };

    const response = await axios.post(
      `${WENXIN_BASE_URL}/conversation?appId=${WENXIN_AGENT_ID}&secretKey=${WENXIN_SECRET_KEY}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: timeout
      }
    );
    
    const responseTime = Date.now() - startTime;
    console.log(`API响应时间: ${responseTime}ms`);
    
    // 如果响应时间过长，记录警告
    if (responseTime > 15000) {
      console.warn('API响应时间较长，可能需要优化');
    }
    
    if (response.data.errorCode !== 0) {
      throw new Error(`API错误: ${response.data.errorMsg}`);
    }
    
    return response.data;
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`API请求失败，耗时: ${responseTime}ms`, error);
    
    // 超时或网络错误时重试
    if ((error.code === 'ECONNABORTED' || error.message.includes('timeout')) && retryCount < 3) {
      const delay = calculateRetryDelay(retryCount);
      console.log(`请求超时，${delay}ms后进行第${retryCount + 1}次重试...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return sendMessageToAgent(message, accessToken, retryCount + 1);
    }
    
    // 其他错误处理
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('认证失败，请重新登录');
      }
      if (error.response.status === 429) {
        throw new Error('请求过于频繁，请稍后再试');
      }
      if (error.response.status >= 500) {
        throw new Error('服务器错误，请稍后重试');
      }
      throw new Error(`发送消息失败: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络设置');
    } else {
      throw new Error('请求配置错误');
    }
  }
};
