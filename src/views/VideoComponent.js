import React from "react"
import ReactDOM from "react-dom"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducer';
import App from "../App"
import axios from 'axios';

// central store
const store = createStore(reducer);

// axios config
axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use(request => {
	console.log(request);
	return request;
}, error => {
	console.log(error);
	return Promise.reject(error);
});

axios.interceptors.response.use(response => {
	console.log(response);
	return response;
}, error => {
	console.log(error);
	return Promise.reject(error);
})


ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
)