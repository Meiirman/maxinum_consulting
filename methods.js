function get_payment(id){
    let payment_table = localStorage.getItem('payment_table');
    if (payment_table){
        payment_table = JSON.parse(payment_table)
        let payment = {}
        payment_table.forEach(element => {
            if (element.id == id) payment = element
        });
        if (payment == {}) return {}
        return payment
    }
    return {}
}

function add_payment(payment){
    let payment_table = localStorage.getItem('payment_table');
    payment_table = JSON.parse(payment_table)

    // Запись нового payment
    if (payment.payment_id=='0'){
        let id_max = 0
        payment_table.forEach(element => {
            if (element.id > id_max) id_max = element.id
        });
        payment['id'] =  id_max + 1
        payment_table.push(payment)
        localStorage.setItem('payment_table', JSON.stringify(payment_table))
        return payment
        
    // Перезапись старого payment
    } else {
        payment_table.forEach((element, index) => {
            if (element.id == payment.id){
                payment['created'] = payment_table[index]['created'] 
                payment_table[index] = payment 
                
                localStorage.setItem('payment_table', JSON.stringify(payment_table))
            }
        });
    }

    window.location.reload()
}

function payment_delete(id) {
    let payment_table = localStorage.getItem('payment_table');
    payment_table = JSON.parse(payment_table);

    payment_table.forEach((element, index) => {
        if (element.id == id) {
            payment_table.splice(index, 1);
        }
    });
    localStorage.setItem('payment_table', JSON.stringify(payment_table));
}
