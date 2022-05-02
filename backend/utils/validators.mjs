export const emailValidator = (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

export const RegInputValidator = ({ username, email, password, confirmPassword }) => {
    const errors = {};
    if (String(username).trim() === '' || String(password) === '')
        errors.fields = 'username and password fields must not be empty';
    if (String(email).trim() === '')
        errors.email = 'must be a valid email';
    else if (!emailValidator(String(email)))
        errors.email = 'must be a valid email';
    if (String(password).length < 8)
        errors.password = 'password must contain more than 8 characters';
    if (password !== confirmPassword)
        errors.confirmPassword = 'confirmed password not same as password';
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const LoginValidator = ({ email, password }) => {
    const errors = {};
    if (String(password) === '' || String(password).length < 8)
        errors.password = 'password must contain more than 8 characters';
    if (String(email).trim() === '')
        errors.email = 'must be a non-empty value';
    else if (!emailValidator(email))
        errors.email = 'must be a valid email';
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}