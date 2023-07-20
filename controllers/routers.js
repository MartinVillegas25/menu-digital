const { response } = require('express');
 

const homeGet = (req, res = response) => {
    console.logo('get home')
}
const loginGet = (req, res = response) => {
    console.log('get login')
}
module.exports = {
    homeGet,
    loginGet,
}