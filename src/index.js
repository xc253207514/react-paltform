import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { AppContainer } from 'react-hot-loader';
import Page from './Page';
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
console.log(store.getState());




ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Page store={store} />
        </Provider>
    </AppContainer>
 ,
  document.getElementById('root')
);

serviceWorker.unregister();