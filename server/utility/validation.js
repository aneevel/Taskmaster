const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 50;

const isEmpty = (value) => {
    return !value || value.trim() === "";
}

const userCredentialsAreValid = (email, password) => {
    return isValidEmailAddress(email) && isValidPassword(password);
};

const isValidPassword = (password) => {
    return password && password.trim().length >= MIN_PASSWORD_LENGTH;
};

const isValidName = (name) => {
    return name && name.trim().length <= MAX_NAME_LENGTH;
};

const userDetailsAreValid = (email, password, lname, fname) => {
    return (
        userCredentialsAreValid(email, password) &&
        !isEmpty(lname) &&
        !isEmpty(fname)
    );
}

const emailIsConfirmed = (email, confirmEmail) => {
    return email === confirmEmail;
}

const isValidEmailAddress = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = {
    isEmpty: isEmpty,
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed,
    isValidEmailAddress: isValidEmailAddress,
    isValidPassword: isValidPassword,
    isValidName: isValidName
}
