import React from "react"
import ReactDOM from "react-dom"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducer';

import App from "../App"

// central store
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
)