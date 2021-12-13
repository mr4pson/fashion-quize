import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from "./redux/ReduxStore";
import reportWebVitals from './reportWebVitals';

import "antd/dist/antd.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';

import * as smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

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

declare global {
  interface String {
    replaceAt(index: number, replacement: string) : string;
  }
}

// eslint-disable-next-line no-extend-native
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}