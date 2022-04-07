import React from 'react';

import countdown from '../../lib/countdown.js';

const closedMessage = 'Voting is closed';

export default function Countdown ({ target }){
  const getRemainingTime = countdown(target);
  const [stamp, setStamp] = React.useState(getRemainingTime());

  let displayMessage = '';

  React.useEffect(
    function (){
      const hasTimeRemaining = stamp.timeout > 0;

      if (!hasTimeRemaining){
        return;
      }

      const timer = setInterval(()=>{
        setStamp(getRemainingTime());
      }, stamp.timeout);
      // Clear this timer when the component unmounts
      return function () {
        clearInterval(timer);
      };
    },
    // Trigger this hook at mount, and when timeout changes
    [stamp.timeout] 
  );
  
  if (stamp.msg) {
    displayMessage = stamp.msg;
    console.info('Voting ends in', displayMessage);
  } else {
    displayMessage = closedMessage;
    console.info(displayMessage);
  }

  return (
    <span>{displayMessage}</span>
  );
};