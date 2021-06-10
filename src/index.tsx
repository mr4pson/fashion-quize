import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from "./redux/ReduxStore";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ConfigProvider locale={ruRU}>
  <Provider store={store}>
    <App />
  </Provider>
  </ConfigProvider>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
