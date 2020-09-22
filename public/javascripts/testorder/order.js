// let lst_price = []
// let count_qty = 0

// let detals_pdobj = {
//     'product_name': [],
//     '': [],
//     '':[]
// }
const getColor = (selected) => {

    if (selected.value) {

        fetch('/api/product-colors/products?' + 'product_id=' + selected.value)
            .then(res => res.json())
            .then((data) => {

                var resp = data.data
                var count_pcolor_option = $("select[name='pcolor_id'] option")
                count_pcolor_option.map((cpc, cpc_index) => {
                    count_pcolor_option.remove()
                })

                var pcolor_selection = $("select[name='pcolor_id']")
                pcolor_selection.append(`<option value=''> Select Color`)
                resp.map((pc, pd_index) => {

                    var pcolor_option = `<option value=${resp[pd_index].pcolor_id}> ${resp[pd_index].color_name}`
                    pcolor_selection.append(pcolor_option)
                })
            });
    }
}


const getSize = (selected) => {

    var size_btn_elem = $("#size-value tr")
    if (size_btn_elem.length > 0) {
        size_btn_elem.map((cpc, cpc_index) => {
            size_btn_elem.remove()
        })
    }

    if (selected.value) {
        fetch('/api/product-sizes/pcolors?' + 'pcolor_id=' + selected.value)
            .then(res => res.json())
            .then(data => {

                var resp = data.data
                var product_detail_table = $(`#product-table-detail`)
                var table_detial_body = "<tbody id='product-detials'>"

                var btn_size_id = $(`#modalsize-btn`)
                var table = `<table class='table table-hover'>`
                var table_modal_body = "<tbody id='size-value'>"

                btn_size_id.append(table + table_modal_body)
                product_detail_table.append(table_detial_body)

                resp.map((pc, pd_index) => {

                    var table_body_detialid = $('#product-detials')

                    var table_body_id = $(`#size-value`)
                    var size_checkbox =
                        `<td><label class='form-group form-checkbox' style='width: 100%'>
                <input class='form-checkbox' style='width: 100%' type='checkbox' id='chb${resp[pd_index].psize_id}' name='psize_id' value=${resp[pd_index].psize_id} onclick='enable(this)'>
                <i class='form-icon'></i> Size ${resp[pd_index].size_name}`

                    var qty_input =
                        `<td><input class='form-input' type='number' style='width:100%' id='qty${resp[pd_index].psize_id}' name='qty' placeholder='Quantity Per Price${resp[pd_index].price}' disabled>`

                    table_body_id.append("<tr>" + size_checkbox + qty_input)
                    table_body_detialid.append(`<tr> ${resp[pd_index].size_name}`)

                })
            });
    }
}

const enable = (input) => {

    var qty_val = 'qty' + input.value
    if (input.checked === true) {
        $(`#${qty_val}`).removeAttr("disabled")

    } else {
        $(`#${qty_val}`).attr(`disabled`, `disabled`)
    }
}

$(`#close-outside`).click(() => {
    $(`#modalsize-id`).removeClass('active')

})

const activeModal = (input) => {
    console.log(input)

    $(`#modalsize-id`).addClass('active')


}

const closeModal = (input) => {
    console.log(input)

    $(`#modalsize-id`).removeClass('active')

}

const submit = () => {

    fetch('/api/orders/order-stockout')
        .then(res => res.json())
        .then(data => {

            alert(data)

        });

}

// let obj_psize = {}
// const addQty = (size_value) => {

    //     var qty_val = 'qty' + size_value.value
    //     var obj_qty = obj_psize.qty += 1

    //     $(`#${qty_val}`).val(obj_qty)
    //     console.log(size_value)
    // }

    // const fisze = (selected) => {

        //     var size_btn_elem = $("#size-value tr")
        //     if (size_btn_elem.length > 0) {
            //         size_btn_elem.map((cpc, cpc_index) => {
//             size_btn_elem.remove()
//         })
//     }

//     fetch('/api/product-sizes/pcolors?' + 'pcolor_id=' + selected.value)
//         .then(res => res.json())
//         .then((data) => {

//             var resp = data.data
//             var btn_size_id = $(`#modalsize-btn`)
//             var table = `<table class='table table-hover'>`
//             var table_modal_body = "<tbody id='size-value'>"
//             btn_size_id.append(table + table_modal_body)

//             resp.map((pc, pd_index) => {

//                 // lst_price.push(resp[pd_index].price)
//                 var psize_name = `${resp[pd_index].size_name}${resp[pd_index].psize_id}`
//                 // var count_qty = 0
//                 obj_psize.psize_name = psize_name
//                 obj_psize.price = resp[pd_index].price
//                 obj_psize.qty = 0
//                 var table_body_id = $(`#size-value`)

//                 var size_checkbox =
//                     `<td><label class='form-group form-checkbox' style='width: 100%'>
//                     <input class='form-checkbox' style='width: 100%' type='checkbox' id='chb${resp[pd_index].psize_id}' name='psize_id' value=${resp[pd_index].psize_id} onclick='enable(this)'>
//                     <i class='form-icon'></i> Size ${resp[pd_index].size_name}`

//                 var size_btn =
//                     `<td><button class='btn btn-success' type='button' style='width: 100%' id='btn${resp[pd_index].size_name}${resp[pd_index].psize_id}' name='psize_id' value=${resp[pd_index].psize_id} onclick='addQty(this)'> Size ${resp[pd_index].size_name}</button>`

//                 var qty_input =
//                     `<td><input class='form-input' type='number' style='width:100%' id='qty${resp[pd_index].psize_id}' name='qty' placeholder='Quantity Per Price${resp[pd_index].price}' disabled>`

//                 table_body_id.append("<tr>" + size_checkbox + qty_input)

//             })
//         });
// }