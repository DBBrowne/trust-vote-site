import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Apply from './components/Apply';
import Closed from './components/Closed';

console.log(
  'REACT_APP_VOTING_STATE:',
  JSON.stringify(process.env.REACT_APP_VOTING_STATE, null, 2)
);

let app;
switch (process.env.REACT_APP_VOTING_STATE) {
  case 'pre':
    app = <Apply />;
    break;
  case 'open':
    app = <App />;
    break;
  case 'closed':
  /* falls through */
  default:
    app = <Closed />;
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
