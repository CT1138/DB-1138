import {con} from './constants.js'
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
});