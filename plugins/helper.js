import Vue from 'vue'
import moment from 'moment'
import IBAN from 'iban'
import {PACKAGES_SHORT_FORMS} from '@/services/constants.js'

Vue.prototype.$resizeImage = function (str, param) {
  if (str?.filename) {
    str = str.filename
  }
  return typeof str === 'undefined' ? '' : `${str}/m/${param}`
}

Vue.filter('date', function (value) {
  return moment(value).format('DD.MM.YYYY')
})

Vue.filter('time', function (value) {
  return moment(value).format('HH:mm')
})

/**
 * Capitalizes the first characters of a string
 * @param {string} str
 * @returns {string}
 */
Vue.filter('capitalize', function (str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
})
Vue.filter('machinePricePerTimeText', function (machine) {
  return this.machineCredits(machine) + ' Credits pro ' + this.machinePricePerTime(machine) + ' Minute(n)'
})

export const helper = {
  isAllowedToBook (memberPackages) {
    // Check only active packages
    const filteredMemberPackages = memberPackages.filter(item => !this.dateIsInPast(item?.chargedUntilDate))
    console.log('memberPackages', filteredMemberPackages)
    let isAllowed = true
    filteredMemberPackages.forEach(memberPackage => {
      //if (memberPackage?._embedded?.package?.metadata?.shortform === PACKAGES_SHORT_FORMS.smart_garage) {
      if (memberPackage?._embedded?.package?.metadata?.shortform === PACKAGES_SHORT_FORMS.smart_garage) {
        // Smart Garage member are not allowed to book machines due to https://grandgarage.eu/de/mitgliedschaften (checked on 17.1.2024)
        console.log('smartgarage detected', memberPackage?._embedded?.package?.metadata)
        isAllowed = false
        return isAllowed
      }
      if (memberPackage?._embedded?.package?.allowsBooking === false) {
        console.log('package allows booking', memberPackage?._embedded?.package?.allowsBooking)
        isAllowed = false
        return isAllowed
      }
    })
    return isAllowed
  },
  isMobile () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },
  isValidDate (date) {
    return date instanceof Date && !isNaN(date)
  },
  dateIsInPast (date) {
    let parsedDate

    // Make sure given date is in Date format
    if (typeof date === 'string') {
      parsedDate = new Date(date)
    } else if (date instanceof Date) {
      parsedDate = date
    }

    if (!this.isValidDate(parsedDate)) {
      console.log('Error dateIsInPast(): Invalid date format or type', parsedDate)
      return false
    }
    const currentDate = new Date()

    return parsedDate < currentDate
  },
  timeDifferenceInHours (startDate, endDate) {
    // Make sure given params are in date format
    const endDateTime = new Date(endDate);
    const startDateTime = new Date(startDate);
    return Math.abs(startDateTime - endDateTime) / 36e5 //36e5 is the scientific notation for 60*60*1000
  },
  dateIsBeforeCurrentInHours (date, hours = 24) {
    // Make sure given date is in Date format
    if (typeof date === 'string') {
      date = new Date(date)
    }
    if (!this.isValidDate(date)) {
      console.log('Error dateIsBeforeHours(): Invalid date format or type', date)
      return false
    }

    const currentDate = new Date()
    const timeDifference = date - currentDate
    const millisecondsInHours = hours * 36e5 // 36e5 is the scientific notation for 60*60*1000

    return timeDifference < millisecondsInHours
  },
  dateRangeOverlaps (aStart, aEnd, bStart, bEnd) {
    if (aStart <= bStart && bStart <= aEnd) return true // b starts in a
    if (aStart <= bEnd && bEnd <= aEnd) return true // b ends in a
    if (bStart < aStart && aEnd < bEnd) return true // a in b

    // No overlapping found
    return false
  },
  getEarliestStringTimeAsInt (timeStringArray) {
    // e.g. timeArray = ["09:00", "10:00", "11:00"] will return 9 as integer
    let earliestStringHour = timeStringArray.reduce((minTime, currentTime) => {
      // Convert time strings to Date objects
      const minDate = new Date(`1970-01-01T${minTime}`);
      const currentDate = new Date(`1970-01-01T${currentTime}`);

      // Compare Date objects
      return minDate < currentDate ? minTime : currentTime;
    }, timeStringArray[0]);

    return this.convertTimeStringToInteger(earliestStringHour)
  },
  getLatestStringTimeAsInt (timeStringArray) {
    // e.g. timeArray = ["17:00", "18:00", "00:00"] will return 24
    let latestStringHour = timeStringArray.reduce((maxTime, currentTime) => {
      // Convert time strings to Date objects
      const maxDate = new Date(`1970-01-01T${maxTime}`);
      const currentDate = new Date(`1970-01-01T${currentTime}`);

      // Compare Date objects
      return maxDate > currentDate ? maxTime : currentTime;
    }, timeStringArray[0]);

    return this.convertTimeStringToInteger(latestStringHour)
  },
  convertTimeStringToInteger (timeString) {
    if (timeString === "24:00" || timeString === "00:00") {
      return 24;
    } else {
      return parseInt(timeString.split(":")[0], 10);
    }
  },
  multipleDateRangeOverlaps (timeEntries) {
    let i = 0
    let j = 0
    const timeIntervals = timeEntries.filter(
      entry => entry.from != null && entry.to != null && entry.from.length === 8 && entry.to.length === 8,
    )

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
            return true
        }
      }
    return false
  },
  validateEmail (email) {
    if (!email) {
      return false
    }
    const regex =
      /^(([^<>()[\],;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    return regex.test(String(email).toLowerCase())
  },
  validateIban (iban) {
    if (!iban) {
      return false
    }
    iban = iban.replace(/\s/g, '') // Remove spaces
    return IBAN.isValid(iban)
  },
  getDifferenceInHours (fromDate, unitDate) {
    let diff = (fromDate.getTime() - unitDate.getTime()) / 1000
    diff /= 60 * 60
    return Math.abs(Math.round(diff))
  },
  /**
   * Get machine credits value
   * @param {object} machine
   * @returns {string|null}
   */
  machineCredits: machine => {
    if (!machine || !machine.pricePerTimeBusy) {
      return null
    }
    return (machine.pricePerTimeBusy * 10).toFixed(0)
  },
  /**
   * Get formatted machine busy time
   * @param {object} machine
   * @returns {string|null}
   */
  machinePricePerTime: machine => {
    if (!machine || !machine.pricePerTimeBusySeconds) {
      return null
    }
    return machine.pricePerTimeBusySeconds / 60
  },
  addHours: (date, hours) => {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000)

    return date
  },
  roundToNearestHour: date => {
    date.setMinutes(date.getMinutes() + 30)
    date.setMinutes(0, 0, 0)

    return date
  },
  getFirstDayOfMonth: month => {
    const today = new Date()
    return new Date(today.getFullYear(), month, 1)
  },
  getLastDayOfMonth: month => {
    const today = new Date()
    return new Date(today.getFullYear(), month + 1, 0)
  },
  getDefaultDateFormat: date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }

    return [year, month, day].join('-')
  },
  getGermanDateFormat: date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }

    return [day, month, year].join('.')
  },
  getGermanDateTimeFormat: date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    if (hours.length < 2) {
      hours = '0' + hours
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds
    }

    return [day, month, year].join('.') + ' ' + [hours, minutes, seconds].join(':')
  },
}
