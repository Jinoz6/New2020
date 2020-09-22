import PaginationModel from '../../../models/functions/Pagination'

const paginateController = (
    table_name,
    field_arr,
    join_arr,
    condition_arr,
    title,
    target_view,
    render_params,
    req,
    res,
    next
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

    PaginationModel.getTotalRowCount(table_name, condition_arr, (error, result) => {
        if(error){
            next(error)
        }
        else{
    
            let totalPage = (result[0].row / count)
        
            if (totalPage < 1) {
                totalPage = 1
            }
        
            PaginationModel.getPaginateItems(table_name, field_arr || ['*'], join_arr || [], condition_arr || [], count, current_page, (dError, dResult) => {
                if(dError){
                    next(dError)
                }
                else{
                    res.render(
                        target_view,
                        { 
                            title: title, 
                            data: dResult, 
                            totalPage: totalPage,
                            count: count,
                            currentPage: current_page,
                            fullpath: req.baseUrl + req.path,
                            query_string: query_string,
                            params: render_params,
                        }
                    )
                }
            })
        }
    })

}

export default paginateController