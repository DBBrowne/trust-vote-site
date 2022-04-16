import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Apply from './components/Apply';
import Closed from './components/Closed';

console.info(
  'REACT_APP_VOTING_START_DATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_START_DATE, null, 2)
);
console.info(
  'REACT_APP_VOTING_END_DATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_END_DATE, null, 2)
);
console.info(
  'REACT_APP_VOTING_END_DATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_RESULT_DATE, null, 2)
);

let votingStart = new Date(process.env.REACT_APP_VOTING_START_DATE).valueOf();
let votingEnd = new Date(process.env.REACT_APP_VOTING_END_DATE).valueOf();
//let announceStart = new Date(process.env.REACT_APP_VOTING_RESULT_DATE).valueOf();

let now = Date.now();

// guarding against the possible NaN condition
let started = now - votingStart >= 0;
let ended = votingEnd - now < 0;
//let announced = announceStart - now < 0;

let app = <Closed />;
if (!started) {
  app = <Apply />;
} else if (!ended) {
  app = <App />;
}

ReactDOM.render(app, document.querySelector('#root'));
