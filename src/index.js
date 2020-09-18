import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const houses = [
  {
    id: 0,
    name: "House 1",
    biome: "Forest",
    npcs: [
      { id: 0, type: "Guide", happy: 0 },
      { id: 1, type: "Zoo", happy: 0 },
    ],
  },
  {
    id: 1,
    name: "House 2",
    biome: "Hallow",
    npcs: [
      { id: 0, type: "Golfer", happy: 0 },
      { id: 1, type: "Wizard", happy: 0 },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App houses={houses}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
