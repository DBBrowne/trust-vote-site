import React from 'react';

const closedMessage = 'Voting is closed';
const fifteenMinutes = 15 * 60 * 1000;

// Adapted from https://www.digitalocean.com/community/tutorials/js-building-countdown-timer
function countdown (d) {
  return function _getDiff() {
    const diff = d - Date.now();
    let remaining = 'Time\'s up!';

    if (diff <= 0) {
      return { msg: '', timeout: -1 };
    }

    const parts = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    if (parts.days >= 1) {
      return {
        msg: `${parts.days} days ${parts.hours} hours`,
        timeout: fifteenMinutes,
      };
    }

    remaining = Object.keys(parts)
      .map(function (part) {
        let t = parts[part];

        if ('days' === part) {
          return '';
        }

        if (!t && 'seconds' !== part) {
          return '';
        }

        if (['seconds', 'minutes'].includes(part)) {
          t = t.toString().padStart(2, '0');
        }

        return `${t} ${part}`;
      })
      .filter(Boolean)
      .join(' ');

    return { msg: remaining, timeout: 1000 };
  };
};

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