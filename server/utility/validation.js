const ContentFilter = require('./content-filter');

class ValidationUtil {
    static MIN_PASSWORD_LENGTH = 8;
    static MAX_PASSWORD_LENGTH = 50;
    static MAX_NAME_LENGTH = 50;

    static isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return email && email.trim().length > 0 && emailRegex.test(email);
    }

    static isValidPassword(password) {
        if (!password || password.trim().length === 0) {
            return false;
        }
        
        return password.length >= ValidationUtil.MIN_PASSWORD_LENGTH && 
               password.length <= ValidationUtil.MAX_PASSWORD_LENGTH;
    }

    static isValidName(name) {
        if (!name || name.trim().length === 0) {
            return false;
        }
        
        if (ContentFilter.containsInappropriateContent(name)) {
            return false;
        }
        
        return name.length <= ValidationUtil.MAX_NAME_LENGTH;
    }

    static userDetailsAreValid(email, password, lname, fname) {
        return (
            this.isValidEmail(email) &&
            this.isValidPassword(password) &&
            this.isValidName(lname) &&
            this.isValidName(fname)
        );
    }
}

module.exports = ValidationUtil;
