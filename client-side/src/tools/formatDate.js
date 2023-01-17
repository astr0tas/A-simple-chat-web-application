const padTo2Digits = (num) =>
{
      return num.toString().padStart(2, '0');
}

const formatDate_DDMMYYYY = (date) => // DD/MM/YYYY
{
      return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
      ].join('/');
}

export { padTo2Digits, formatDate_DDMMYYYY };

const formatDate_YYYYMMDD = (date) => // YYYY-MM-DD
{
      var dateFormat = date.getFullYear() + "-" + ((date.getMonth() + 1).length !== 2 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate().length !== 2 ? "0" + date.getDate() : date.getDate());
      return dateFormat;
}

export { formatDate_YYYYMMDD };