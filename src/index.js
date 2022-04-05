import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Apply from './components/Apply';
import Closed from './components/Closed';

console.log(
  'REACT_APP_VOTING_START_DATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_START_DATE, null, 2)
);
console.log(
  'REACT_APP_VOTING_END_DATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_END_DATE, null, 2)
);

let votingStart = new Date(process.env.REACT_APP_VOTING_START_DATE).valueOf();
let votingEnd = new Date(process.env.REACT_APP_VOTING_END_DATE).valueOf();
let now = Date.now();

// guarding against the possible NaN condition
let started = now - votingStart >= 0;
let ended = votingEnd - now < 0;

let app = <Closed />;
if (!started) {
  app = <Apply />;
} else if (!ended) {
  app = <App />;
}

function runCountdown() {
  let $stamp = document.querySelector('[data-time-remaining]');
  if (!$stamp) {
    setTimeout(runCountdown, 1000);
    return;
  }

  let getDiff = window.Countdown.create(
    new Date(process.env.REACT_APP_VOTING_END_DATE)
  );
  let stamp = getDiff();
  if (stamp.timeout >= 1) {
    setTimeout(runCountdown, stamp.timeout);
  }

  if (!stamp.msg) {
    console.info('Voting is closed');
    return;
  }
  console.info('Voting ends in', stamp.msg);

  $stamp.innerText = stamp.msg;
}

runCountdown();

ReactDOM.render(app, document.querySelector('#root'));
