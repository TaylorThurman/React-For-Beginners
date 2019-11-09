import React from 'react';
import { render } from 'react-dom';
import StorePicker from "./components/StorePicker";
import Router from './components/Router';
import App from "./components/App";
import './css/style.css';

render(<Router/>, document.querySelector('#main'));
