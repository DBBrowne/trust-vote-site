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

ReactDOM.render(app, document.querySelector('#root'));
