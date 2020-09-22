import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   dict_id, ' +
        '   project_id, ' +
        '   hash, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM dictionaries ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (dict_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   dict_id, ' +
        '   project_id, ' +
        '   hash, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM dictionaries ' +
        'WHERE dict_id = ? AND deleted_at IS NULL',

        [dict_id],
        callback
    )

}

export const insert = (body, callback) => {

    const {
        project_id,
        hash
    } = body

    return connect.query(

        'INSERT INTO dictionaries' +
        '   (' +
        '       project_id, ' +
        '       hash, ' +
        '       created_at ' +
        '   ) ' +
        'VALUES ( ?, ?, CURRENT_TIMESTAMP )',

        [
            project_id,
            hash
        ],

        callback
    )
}


export const update = (body, callback) => {

    const {
        dict_id,
        project_id,
        hash
    } = body

    return connect.query(
        'UPDATE dictionaries SET ' +
        '   project_id = ?  ,' +
        '   hash = ?  ' +
        'WHERE dict_id = ?',

        [
            dict_id,
            project_id,
            hash
        ],

        callback
    )
}


export const remove = (dict_id, callback) => {

    return connect.query(

        'UPDATE dictionaries SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE dict_id = ?',

        [dict_id],
        callback
    )
}


