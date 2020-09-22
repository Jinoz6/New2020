import bcrypt from 'bcryptjs'

import { getUserForVerifyByUsername } from '../../models/User'

const VerifyToken = (username, password, callback) => {

    getUserForVerifyByUsername(username, (err, result) => {

        if (err) {

            return callback(true, null, err)
        }

        if (result.length > 0) {

            const first = result[0]

            bcrypt.compare(password, first.password, (err, res) => {

                if (res) {
                    
                    return callback(false, {username: result[0].username, fullname: result[0].fullname}, {message: 'Success.'})

                } else {

                    return callback(true, null, {message: 'Incorrect Username Or Password.'})
                    
                }

            })
            
        } else {

            return callback(false, null, {message: 'Not Matched Username.'})
            
        }

    })

}

export default VerifyToken