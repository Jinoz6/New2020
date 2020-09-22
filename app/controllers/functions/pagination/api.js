import PaginationModel from '../../../models/functions/Pagination'

const paginateController = (
    table_name,
    field_arr,
    join_arr,
    condition_arr,
    orderby,
    req,
    res,
    next,
    callback,
) => {
    var count = 10; 
    var current_page = 1;
    var query_string = ''
    
    if (req.query) {

        if (req.query.count){
            count = req.query.count
        }
    
        if (req.query.page) {
            current_page = req.query.page
        }

        query_string = '&&count='+count

        Object.keys(req.query).forEach(q => {
            if (q !== 'page' && q !== 'count') {
                query_string += `&&${q}=${encodeURIComponent(req.query[q])}`
            }
        });
        
    }

    PaginationModel.getTotalRowCount(field_arr[0] || '*', table_name, condition_arr, orderby, (error, result) => {
        if(error){
            next(error)
        }
        else{
    
            let totalPage = parseInt((result[0].row / count)) + parseInt( (result[0].row % count) > 0 ? 1 : 0 )
        
            if (totalPage < 1) {
                totalPage = 1
            }
        
            PaginationModel.getPaginateItems(table_name, field_arr || ['*'], join_arr || [], condition_arr || [], orderby || '', count, current_page, (dError, dResult) => {
                if(dError){
                    next(dError)
                }
                else{

                    let res_body = { 
                        data: dResult, 
                        totalRows: result[0].row || 0,
                        totalPage: totalPage,
                        count: parseInt(count),
                        currentPage: parseInt(current_page),
                    }

                    callback(res_body)

                    // return res.json(res_body)
                }
            })
        }
    })

}

export default paginateController