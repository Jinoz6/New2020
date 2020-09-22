import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   wlist_id, ' +
        '   project_id, ' +
        '   ip_address, ' +
        '   mac_address, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM white_list ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (wlist_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   wlist_id, ' +
        '   project_id, ' +
        '   ip_address, ' +
        '   mac_address, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM white_list ' +
        'WHERE wlist_id = ? AND deleted_at IS NULL',

        [wlist_id],
        callback
    )

}

export const insert = (body, callback) => {

    const {
        project_id,
        ip_address,
        mac_address
    } = body

    return connect.query(

        'INSERT INTO white_list' +
        '   (' +
        '       project_id, ' +
        '       ip_address, ' +
        '       mac_address, ' +
        '       created_at ' +
        '   ) ' +
        'VALUES ( ?, ?, ?, CURRENT_TIMESTAMP )',

        [
            project_id,
            ip_address,
            mac_address
        ],
        callback
    )
}


export const update = (body, callback) => {

    const {
        wlist_id,
        project_id,
        ip_address,
        mac_address
    } = body

    return connect.query(
        'UPDATE white_list SET ' +
        '   project_id = ?  ,' +
        '   ip_address = ?  ,' +
        '   mac_address = ?  ' +
        'WHERE wlist_id = ?',
        [
            project_id,
            ip_address,
            mac_address,
            wlist_id
        ],
        callback
    )
}


export const remove = (wlist_id, callback) => {

    return connect.query(

        'UPDATE white_list SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE wlist_id = ?',

        [wlist_id],
        callback
    )
}


