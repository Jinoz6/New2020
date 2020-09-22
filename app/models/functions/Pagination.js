import connect from '../../../config/connect'

const query = (table_name, field_arr, join_arr, condition_arr, orderby) => (
    `SELECT ${field_arr.join(', ')} ` +
    `FROM ${table_name} ` +
    `
        ${
            join_arr.map(j => (
                `${j} `
            )).join('')
        } 
    ` + 
    `
        ${
            condition_arr.map((c, i) => {
                if (i === 0) {
                    return `WHERE ${c} `
                } else {
                    return `AND ${c} `
                }
            }).join('')
        }
    ` + 
    ` ${orderby} ` +
    ` LIMIT ? OFFSET ?`
)

export default {

    getPaginateItems: (table_name, field_arr, join_arr, condition_arr, orderby, count, page, callback) => {

        return connect.query(
            query(table_name, field_arr, join_arr, condition_arr, orderby), 
            [parseInt(count), (parseInt(page) - 1) * count],
            callback
        )
    },

    getTotalRowCount: (first_field, table_name, condition_arr, orderby, callback) => {
        return connect.query(
            `SELECT COUNT(${first_field}) AS row FROM ` + table_name + " " +
            `
                ${
                    condition_arr.map((c, i) => {
                        if (i === 0) {
                            return `WHERE ${c} `
                        } else {
                            return `AND ${c} `
                        }
                    }).join('')
                }
            ` + 
            " " + orderby + " "
            , 
            [], 
            callback
        )
    },

}