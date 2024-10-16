function view_payment(object) {
    $('#view_payment').modal('show')
    $('#view_payment').removeClass('d-none')
    $('#modal-content').html(object)
}
function view_add_payment(object) {
    $('#add_payment_modal').modal('show')
    $('#add_payment_modal').removeClass('d-none')
}


function add_payment_row(payment){
    try{
        let tbody = document.querySelector("#payment_table tbody")
        let row = `
            <tr id="payment_${payment.id}">
            <td>${payment.created}</td>
            <td>${payment.updated}</td>
            <td>${payment.payment_date}</td>
            <td>${payment.payment_type}</td>
            <td>${payment.budget}</td>
            <td>
                <button class="btn btn-info" onclick="payment_edit(${payment.id})">
                <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="payment_delete_view(${payment.id})">
                    <i class="fas fa-trash"></i>
                    </button>
            </td>
            </tr>
        `
        tbody.innerHTML += row    
        return 200
    } catch (error){
        console.log(error.stack)
        return 500
    }
}



function payment_edit(id){
    let payment = get_payment(id)
    document.querySelector("#id_payment_date").value = payment.payment_date  
    document.querySelector("#id_budget").value = payment.budget  
    document.querySelector("#id_payment_type").value = payment.payment_type  
    document.querySelector("#id_payment_id").value = payment.id  
    view_add_payment()
}


function payment_delete_view(id){
    let DOM_obj = `
        <h1>Вы точно хотите удалить данную запись?</h1>
        <button type="button" class="btn btn-secondary" aria-label="Close">
            Отмена
        </button>
        <button type="button" class="btn btn-danger" onclick="payment_delete(${id})">
            Удалить
        </button>
    `

    view_payment(DOM_obj)
}

function payment_add(){

}



