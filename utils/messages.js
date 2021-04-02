const moment = require('moment');
//format wyswietlania wiadomosci
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format(' h:mm a')
  };
}

module.exports = formatMessage;
