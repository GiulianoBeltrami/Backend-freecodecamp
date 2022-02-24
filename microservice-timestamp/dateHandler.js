const moment = require('moment');

class DateHandler{
  constructor(date){
    this.date = date;
  }

  isValidUnix(){
    return moment(this.date,'X',true).isValid();
  }
  
  isValidDate(){
    return moment(this.date,'YYYY-MM-DD',true).isValid();
  }
  
  convertUnixToDate(){
    return new Date(parseInt(this.date)).toUTCString();
  }
  
  convertDateToUnix(){
    return new Date(this.date).getTime();
  }

  convertDateToUtc(){
    return new Date(this.date).toUTCString();
  }
  
}

module.exports = DateHandler;