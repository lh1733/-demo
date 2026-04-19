import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

// 检查用户是否已登录
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// 登录页面不需要保护
const PublicRoute = ({ children }) => {
  return children;
};

const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <HashRouter>
        <Routes>
        {navItems.map(({ to, page }) => {
          // 登录页面不需要保护
          if (to === '/login') {
            return <Route key={to} path={to} element={<PublicRoute>{page}</PublicRoute>} />;
          }
          // 其他页面需要登录保护
          return (
            <Route 
              key={to} 
              path={to} 
              element={<ProtectedRoute>{page}</ProtectedRoute>} 
            />
          );
        })}
        {/* 默认路由重定向到首页 */}
        <Route path="/" element={<ProtectedRoute><Navigate to="/login" replace={!isAuthenticated()} /></ProtectedRoute>} />
        </Routes>
    </HashRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
