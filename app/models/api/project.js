import connect from '../../../config/connect'

export const all = (callback) => {

    return connect.query(

        'SELECT ' +
        '   project_id, ' +
        '   project_name, ' +
        '   location, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM projects ' +
        'WHERE deleted_at IS NULL ',

        [],
        callback
    )

}


export const getById = (project_id, callback) => {

    return connect.query(

        'SELECT ' +
        '   project_id, ' +
        '   project_name, ' +
        '   location, ' +
        '   created_at, ' +
        '   updated_at ' +
        'FROM projects ' +
        'WHERE project_id = ? AND deleted_at IS NULL',

        [project_id],
        callback
    )

}

export const insert = (body, callback) => {

    const {
        project_name,
        location
    } = body

    return connect.query(

        'INSERT INTO projects' +
        '   (' +
        '       project_name, ' +
        '       location, ' +
        '       created_at ' +
        '   ) ' +
        'VALUES ( ?, ?, CURRENT_TIMESTAMP )',

        [
            project_name,
            location
        ],

        callback
    )
}


export const update = (body, callback) => {

    const {
        project_id,
        project_name,
        location
    } = body

    return connect.query(
        'UPDATE projects SET ' +
        '   project_name = ?  ,' +
        '   location = ?  ' +
        'WHERE project_id = ?',
        [
            project_name,
            location,
            project_id
        ],
        callback
    )
}


export const remove = (project_id, callback) => {

    return connect.query(

        'UPDATE projects SET ' +
        '   deleted_at = CURRENT_TIMESTAMP ' +
        'WHERE project_id = ?',

        [project_id],
        callback
    )
}


