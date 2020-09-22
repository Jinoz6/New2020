import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   service_id, ' +
        '   project_id, ' +
        '   service_name, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM services ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (service_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   service_id, ' +
        '   project_id, ' +
        '   service_name, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM services ' +
        'WHERE service_id = ? AND deleted_at IS NULL',

        [service_id],
        callback
    )

}

export const insert = (body, callback) => {

    const {
        project_id,
        service_name
    } = body

    return connect.query(

        'INSERT INTO services' +
        '   (' +
        '       project_id, ' +
        '       service_name, ' +
        '       created_at ' +
        '   ) ' +
        'VALUES ( ?, ?, CURRENT_TIMESTAMP )',

        [
            project_id,
            service_name
        ],

        callback
    )
}


export const update = (body, callback) => {

    const {
        service_id,
        project_id,
        service_name
    } = body

    return connect.query(

        'UPDATE services SET ' +
        '   project_id = ?  ,' +
        '   service_name = ?  ' +
        'WHERE service_id = ?',

        [
            project_id,
            service_name,
            service_id
        ],
        callback
    )
}


export const remove = (service_id, callback) => {

    return connect.query(

        'UPDATE services SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE service_id = ?',

        [service_id],
        callback
    )
}


