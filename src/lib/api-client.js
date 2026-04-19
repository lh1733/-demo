import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000, // 30秒超时
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log('发送请求:', config);
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    console.log('收到响应:', response);
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('响应错误:', error);
    
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('响应错误状态:', error.response.status);
      console.error('响应错误数据:', error.response.data);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('无响应:', error.request);
    } else {
      // 发送请求时发生了某些事情
      console.error('请求配置错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// 添加重试机制
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    
    // 如果没有配置重试次数，默认为0
    if (!config._retryCount) {
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
