const {format} = require('date-fns');

console.log(format(new Date(), 'yyyyMMdd'));
console.log(format(new Date(), 'yyyyMMdd HH:mm:ss'));