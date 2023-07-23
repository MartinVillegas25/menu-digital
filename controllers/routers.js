const { response } = require('express');
const pool = require('../database');


const homeGet = (req, res = response) => {
    res.json('home')
}
const loginGet = (req, res = response) => {
    res.json('login')
}
const ping = async (req, res = response) => {

    try {
        const query = `SELECT * FROM usuarios`;
        const res = await pool.query(query);
        console.log(res);
        return true;
    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    homeGet,
    loginGet,
    ping
    
}