import Vue from 'vue';
import moment from 'moment';
import IBAN from 'iban';

Vue.prototype.$resizeImage = function (str, param) {
  // ensure compatiblity with image-slideshow changes in storyblok (schema changes)
  if (str?.filename) {
    return typeof str.filename === 'undefined'
      ? ''
      : str.filename.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
  }
  return typeof str === 'undefined'
    ? ''
    : str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
};

Vue.filter('date', function (value) {
  return moment(value).format('DD.MM.YYYY');
});

Vue.filter('time', function (value) {
  return moment(value).format('HH:mm');
});

/**
 * Capitalizes the first characters of a string
 * @param {string} str
 * @returns {string}
 */
Vue.filter('capitalize', function (str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
});
Vue.filter('machinePricePerTimeText', function (machine) {
  return (
    this.machineCredits(machine) +
    ' Credits pro ' +
    this.machinePricePerTime(machine) +
    ' Minute(n)'
  );
});

export const helper = {
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  },
  isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  },
  dateIsInPast(date) {
    const currentDate = new Date();

    return date < currentDate;
  },
  dateRangeOverlaps(aStart, aEnd, bStart, bEnd) {
    if (aStart <= bStart && bStart <= aEnd) return true; // b starts in a
    if (aStart <= bEnd && bEnd <= aEnd) return true; // b ends in a
    if (bStart < aStart && aEnd < bEnd) return true; // a in b

    // No overlapping found
    return false;
  },
  multipleDateRangeOverlaps(timeEntries) {
    let i = 0;
    let j = 0;
    const timeIntervals = timeEntries.filter(
      (entry) =>
        entry.from != null &&
        entry.to != null &&
        entry.from.length === 8 &&
        entry.to.length === 8,
    );

    if (timeIntervals != null && timeIntervals.length > 1)
      for (i = 0; i < timeIntervals.length - 1; i += 1) {
        for (j = i + 1; j < timeIntervals.length; j += 1) {
          if (
            this.dateRangeOverlaps(
              timeIntervals[i].from.getTime(),
              timeIntervals[i].to.getTime(),
              timeIntervals[j].from.getTime(),
              timeIntervals[j].to.getTime(),
            )
          )
            return true;
        }
      }
    return false;
  },
  validateEmail(email) {
    if (!email) {
      return false;
    }
    const regex =
      /^(([^<>()[\],;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return regex.test(String(email).toLowerCase());
  },
  validateIban(iban) {
    if (!iban) {
      return false;
    }
    iban = iban.replace(/\s/g, ''); // Remove spaces
    return IBAN.isValid(iban);
  },
  getDifferenceInHours(fromDate, unitDate) {
    let diff = (fromDate.getTime() - unitDate.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  },
  /**
   * Get machine credits value
   * @param {object} machine
   * @returns {string|null}
   */
  machineCredits: (machine) => {
    if (!machine || !machine.pricePerTimeBusy) {
      return null;
    }
    return (machine.pricePerTimeBusy * 10).toFixed(0);
  },
  /**
   * Get formatted machine busy time
   * @param {object} machine
   * @returns {string|null}
   */
  machinePricePerTime: (machine) => {
    if (!machine || !machine.pricePerTimeBusySeconds) {
      return null;
    }
    return machine.pricePerTimeBusySeconds / 60;
  },
  addHours: (date, hours) => {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
  },
  roundToNearestHour: (date) => {
    date.setMinutes(date.getMinutes() + 30);
    date.setMinutes(0, 0, 0);

    return date;
  },
  getFirstDayOfMonth: (month) => {
    const today = new Date();
    return new Date(today.getFullYear(), month, 1);
  },
  getLastDayOfMonth: (month) => {
    const today = new Date();
    return new Date(today.getFullYear(), month + 1, 0);
  },
  getDefaultDateFormat: (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  },
  getGermanDateFormat: (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('.');
  },
  getGermanDateTimeFormat: (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return (
      [day, month, year].join('.') + ' ' + [hours, minutes, seconds].join(':')
    );
  },
};
