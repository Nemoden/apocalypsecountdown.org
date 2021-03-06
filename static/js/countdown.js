/**
 * I was really in hurry writing this
 * So, sorry - the code quality isn't perfect and no comments for you :(
 * Although, the code is pretty straightforward.
 *
 * Use this super jquery plugin like this:
 *
 * $('#counter').apocalypseCountdown();
 */
!function($,d,undefined) {
  var default_settings = {
        from : new Date(),
        to : new Date("21 Dec 2012 18:00")
      };

  function getTimestamp(date) {
    return date.getTime() / 1000;
  }

  function getSecondsDiff(from, to) {
    return Math.floor((to - from) / 1000);
  }

  function secondsToDate(s) {
    var m = 60,
        h = 3600,
        d = 86400,
        days = Math.floor(s / d),
        no_days = s - days * d,
        hours = Math.floor( no_days / h ),
        no_hours = no_days  - hours * h,
        minutes = Math.floor(no_hours / m),
        no_minutes = no_hours - minutes * m,
        seconds = no_minutes;
    return {
      d: days,
      h: hours,
      m: minutes,
      s: seconds
    };
  }

  function dateToSeconds(date) {
    return date.s + date.m * 60 + date.h * 3600 + ( date.d * 86400 );
  }

  function formatTimeElement(el) {
    return parseInt(el,10) < 10 ? "0" + el : el;
  }
  function formatDayElement(el) {
    var intEl = parseInt(el,10);
    return intEl < 10 ? "00" + el : (intEl < 100 ? "0" + el : el);
  }

  function dateToStr(date) {
    return formatTimeElement(date.d) + " Days, " + formatTimeElement(date.h) + ":" + formatTimeElement(date.m) + ":" + formatTimeElement(date.s);
  }


  /**
   * Settings are:
   * - from: current date
   * - to: the end of the world date
   */
  $.fn.apocalypseCountdown  = function(settings) {
    var $this = $(this),
        timer = $('.timer', $this),
        container = {
          days: $('.timer-days', timer),
          hours: $('.timer-hours', timer),
          minutes: $('.timer-minutes', timer),
          seconds: $('.timer-seconds', timer),
        },
        settings  = $.extend(default_settings, settings || {}),
        timestamps = {
          to_ts: getTimestamp(settings.to),
          from_ts: getTimestamp(settings.from)
        },
        post_apocalypse = timestamps.from_ts > timestamps.to_ts;
    if (post_apocalypse && d.location.pathname != '/post-apocalypse/') {
      d.location.replace('/post-apocalypse/');
    }
    else if (!post_apocalypse && d.location.pathname == '/post-apocalypse/') {
      d.location.replace('/');
    }
    settings = $.extend(settings, timestamps);

    var updateCounter = (function() {
      var current = $this.data('current'),
          next = {};
      if (current == undefined) { // no data yet assigned to the container
        if (post_apocalypse) {
          next.seconds  = getSecondsDiff(settings.to, settings.from);
        }
        else {
          next.seconds  = getSecondsDiff(settings.from, settings.to);
        }
      }
      else {
        if (post_apocalypse) {
          next = { seconds: ++current.seconds };
        }
        else {
          next = { seconds: --current.seconds };
        }
      }
      next = $.extend(next, {date: secondsToDate(next.seconds)}  );
      $this.data('current', next);
      with (container) { with (next.date) {
        days.html(formatDayElement(d));
        hours.html(formatTimeElement(h));
        minutes.html(formatTimeElement(m));
        seconds.html(formatTimeElement(s));
      }}
      //$this.html(dateToStr(next.date));
    })

    interval = setInterval(function() {
      updateCounter();
    }, 1000);

  };

}(jQuery, document);
