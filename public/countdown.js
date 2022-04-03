(function () {
  window.Countdown = {};

  let C = window.Countdown;

  // Adapted from https://www.digitalocean.com/community/tutorials/js-building-countdown-timer
  C.create = function (d) {
    return function _getDiff() {
      let diff = d - Date.now();
      let remaining = "Time's up!";

      if (diff <= 0) {
        return { msg: '', timeout: -1 };
      }

      let parts = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };

      if (parts.days >= 2) {
        return {
          msg: `${parts.days} days ${parts.hours} hours`,
          timeout: 15 * 60 * 1000,
        };
      }

      if (parts.days >= 1) {
        return {
          msg: `${parts.days} days ${parts.hours} hours`,
          timeout: 15 * 60 * 1000,
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
})();
