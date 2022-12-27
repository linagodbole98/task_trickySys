let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
let checkId= /^[0-9a-fA-F]{24}$/

const isValidPassword = (password) => {
    if (password.length > 7 && password.length < 16) return true
}
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidRequestBody = function (request) {
    return Object.keys(request).length > 0;
};

module.exports = {phoneRegex, emailRegex, isValid, isValidPassword, isValidRequestBody,checkId}