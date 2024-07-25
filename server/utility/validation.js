const MIN_PASSWORD_LENGTH = 8;

const isEmpty = (value) => {
    return !value || value.trim() === "";
}

const userCredentialsAreValid = (email, password) => {
    return email && email.includes("@") && password && password.trim().length >= MIN_PASSWORD_LENGTH;
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

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed 
}
