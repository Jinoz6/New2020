import mysql from 'mysql'

import {database as db_config} from '../env.config'

const conn = mysql.createConnection(db_config)

export default {

    createPool: mysql.createPool({
        host: db_config.host,
        user: db_config.user,
        password: db_config.password,
    }),

    query: (query, params, callback) => {
        return conn.query(query, params, callback)
    },

    pingCheck : (callback) => {
        conn.ping(err => {
            if (err) {
                callback(true, err)
            } else {
                callback(false, null)
            }
        })
    }
}