
// Moment package 
const moment = require('moment');

const now = moment();
console.log(now.format('DD-MM-YYYY HH:mm:ss'));

module.exports = {
    format_date: (date) => {
        return date.toLocalDateString();
    }
};

