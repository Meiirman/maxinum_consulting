// Тут я создаю пустой payment_table или если есть записи заполняю таблицу
document.addEventListener('DOMContentLoaded', function () {
    let payment_table = localStorage.getItem('payment_table');

    if (!payment_table) {
        payment_table = [];
        localStorage.setItem('payment_table', JSON.stringify(payment_table));
        console.log('Создан пустой список payment_table');
    } else {
        payment_table = JSON.parse(payment_table);
        console.log('Загружен список payment_table:', payment_table);
    }

    payment_table.forEach(payment => {
        add_payment_row(payment)
    });

    // Это для того что бы при нажатии на input c типом date выходил сразу календарь. так намного удобнее
    let dateFields = document.querySelectorAll('input[type="date"]');
    dateFields.forEach(function (dateField) {
        dateField.addEventListener('focus', function () {
            this.showPicker();
        });
    });

    // Тут я задаю как должен вести себя форма сохранения\изменения после нажатия на сабмит
    const form = document.querySelector('#add_form'); 
    submit_form(form);

});





// Тут создание и изменения payment в одном месте
function submit_form(form){
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Чтоб все было на одной странице убираю стандартный ивент и написал свой

        const form_data = new FormData(form);
        const form_object = {};
    
        form_data.forEach((value, key) => {
            form_object[key] = value;
        });

        if (form_object.payment_id == '0') {
            form_object['created'] = new Date()
            form_object['updated'] = new Date()
            
        } else {
            form_object['updated'] = new Date()
            form_object['id'] = form_object.payment_id
            console.log(form_object)

        }

        add_payment(form_object)
        window.location.reload()

    });

}