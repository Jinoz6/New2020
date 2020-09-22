import connect from '../../config/connect'

export const getUserByUsername = (username, callback) => {
    return connect.query("SELECT employee_id AS id, firstname, lastname, mobile, email AS username FROM employees WHERE email=? AND deleted_at IS NULL", [username], callback)
}

export const getUserForVerifyByUsername = (username, callback) => {
    return connect.query("SELECT employee_id AS id, email AS username, password, firstname, lastname FROM employees WHERE email=? AND deleted_at IS NULL", [username], callback)
}

export const getUserForValidatebyUsername = (username, callback) => {
    return connect.query("SELECT employee_id AS id, email AS username, firstname, lastname FROM employees WHERE email=? AND deleted_at IS NULL", [username], callback)
}

export const getUserForValidatebyFirebaseUID = (fbuid, callback) => {
    return connect.query("SELECT employee_id AS id, email AS username, firstname, lastname, division_id FROM employees WHERE fbuid=? AND deleted_at IS NULL", [fbuid], callback)
}