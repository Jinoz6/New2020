import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   status_id, ' +
        '   service_id, ' +
        '   service_status, ' +
        '   db_connect_status, ' +
        '   cpu_load, ' +
        '   ram_use, ' +
        '   bandwidth, ' +
        '   send_time, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM status ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (status_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   status_id, ' +
        '   service_id, ' +
        '   service_status, ' +
        '   db_connect_status, ' +
        '   cpu_load, ' +
        '   ram_use, ' +
        '   bandwidth, ' +
        '   send_time, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM status ' +
        'WHERE status_id = ? AND deleted_at IS NULL',

        [status_id],
        callback
    )

}

export const insert = (body, callback) => {

    const {
        service_id,
        service_status,
        db_connect_status,
        cpu_load,
        ram_use,
        bandwidth
    } = body

    return connect.query(

        'INSERT INTO status' +
        '   (' +
        '       service_id, ' +
        '       service_status, ' +
        '       db_connect_status, ' +
        '       cpu_load, ' +
        '       ram_use, ' +
        '       bandwidth, ' +
        '       created_at ' +
        '   ) ' +
        'VALUES ( ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP )',

        [
            service_id,
            service_status,
            db_connect_status,
            cpu_load,
            ram_use,
            bandwidth
        ],

        callback
    )
}


export const update = (body, callback) => {

    const {
        status_id,
        service_id,
        service_status,
        db_connect_status,
        cpu_load,
        ram_use,
        bandwidth
    } = body

    return connect.query(

        'UPDATE status SET ' +
        '   service_id = ?  ,' +
        '   service_status = ?  ,' +
        '   db_connect_status = ?  ,' +
        '   cpu_load = ?  ,' +
        '   ram_use = ?  ,' +
        '   bandwidth = ?  ' +
        'WHERE status_id = ?',

        [
            service_id,
            service_status,
            db_connect_status,
            cpu_load,
            ram_use,
            bandwidth,
            status_id
        ],
        callback
    )
}


export const remove = (status_id, callback) => {

    return connect.query(

        'UPDATE status SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE status_id = ?',

        [status_id],
        callback
    )
}


