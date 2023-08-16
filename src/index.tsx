import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import GlobalModal from './components/modal/GlobalModal';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalModal />
          <App />
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
