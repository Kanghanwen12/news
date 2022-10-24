// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import App from './App';
import './common/styles/common.css';
// @ts-ignore
import zhCN from 'antd/es/locale/zh_CN';
// 进行国际化配置
// @ts-ignore
import { ConfigProvider } from 'antd';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={ zhCN }>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ConfigProvider>
);


