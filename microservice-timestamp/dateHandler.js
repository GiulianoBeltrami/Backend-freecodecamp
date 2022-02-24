class DateHandler {
  constructor(date) {
    this.date = date;
  }

  isNumber() {
    return /^\d+$/.test(this.date);
  }

  getUnix() {
    if (this.isNumber()) {
      return new Date(parseInt(this.date)).getTime();
    }
    return new Date(this.date).getTime();
  }

  getUTC() {
    if (this.isNumber()) {
      return new Date(parseInt(this.date)).toUTCString();
    }
    return new Date(this.date).toUTCString();
  }

  getUnixAndUTC() {
    return {
      unix: this.getUnix(),
      utc: this.getUTC()
    }
  }
}

module.exports = DateHandler;