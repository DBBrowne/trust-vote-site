import React from 'react';

import countdown from '../../lib/countdown.js';

export default function Countdown ({ target, donemsg = 'Voting is closed' }){
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
    displayMessage = donemsg;
    console.info(displayMessage);
  }

  return (
    <span>{displayMessage}</span>
  );
};
