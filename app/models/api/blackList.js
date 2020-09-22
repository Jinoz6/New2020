import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   blist_id, ' +
        '   project_id, ' +
        '   ip_address, ' +
        '   mac_address, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM black_list ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (blist_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   blist_id, ' +
        '   project_id, ' +
        '   ip_address, ' +
        '   mac_address, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM black_list ' +
        'WHERE blist_id = ? AND deleted_at IS NULL',

        [blist_id],
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

        'INSERT INTO black_list' +
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
        blist_id,
        project_id,
        ip_address,
        mac_address
    } = body

    return connect.query(
        'UPDATE black_list SET ' +
        '   project_id = ?  ,' +
        '   ip_address = ?  ,' +
        '   mac_address = ?  ' +
        'WHERE blist_id = ?',
        [
            project_id,
            ip_address,
            mac_address,
            blist_id
        ],
        callback
    )
}


export const remove = (blist_id, callback) => {

    return connect.query(

        'UPDATE black_list SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE blist_id = ?',

        [blist_id],
        callback
    )
}


