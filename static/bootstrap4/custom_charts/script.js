function update_total_sum_and_count(){
    let total_sum = 0
    let total_count = 0
    let alldata = localStorage.getItem('raceData'+current_diagram);
    if (alldata) {
        alldata = JSON.parse(alldata);
        for (let i = 0; i < alldata.length; i++) {
            total_sum += alldata[i].points
            total_count += alldata[i].count
        }
    }

    document.getElementById('total_sum_span').innerHTML = total_count + " заказ " + keepMoneyFormat(total_sum) + " тг"
    // document.getElementById('total_count_span').innerHTML = total_count + " шт"

}

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function keepMoneyFormat(money) {
    var originalNumber = parseFloat(`${money}`.replace(/\s/g, '')); // Удаляем пробелы и преобразуем в число
    var formattedNumber = formatNumberWithSpaces(originalNumber);
    return formattedNumber
}


function findWorkingIframe(frameData=`${current_diagram}`) {
    const iframe = document.querySelector('#iframe_'+current_diagram);
    if (iframe)return iframe; // Возвращаем iframe, если содержимое доступно
    return document; // Возвращаем null, если подходящий iframe не найден
}
function swapContainers(data) {
    console.log("Зашел в swapContainers", data)
    let doc = findWorkingIframe();

    for (let i = 0; i < data.length; i++) {
        const barChart = doc.querySelector(`.rating-bar-chart`);
        const old_place = data[i].old_place;
        const place = data[i].place;
        
        data[i].container = barChart.querySelector(`#bar-line-${data[i].id}`)
        const container = data[i].container;
        const trasposition = (container.offsetHeight + 10) * (old_place - place);
        
        barChart.removeChild(container);
        barChart.appendChild(container);
        container.classList.remove('animate');
        container.style.transform = 'none';
        container.style.transform = `translateY(${trasposition}px)`;
        
        setTimeout(() => {
            let progress = container.querySelector('.rating-bar-line-progress');
            progress.style.width = `${(data[i].progress <= 100) ? data[i].progress : 100}%`;
            container.querySelector('.rating-bar-line-place').innerHTML = data[i].place
            
            container.querySelector('.rating-bar-line-points').innerHTML = data[i].count + ' заказ ' + `${keepMoneyFormat(data[i].points)} тг (${data[i].progress.toFixed(0)}%)`
            container.classList.add('animate');
            container.style.transform = `translateY(0px)`;
        }, 970)
    }
}

function updateData() {
    let doc = findWorkingIframe()
    let data = JSON.parse(localStorage.getItem('raceData'+current_diagram));
    data.forEach((element, index) => {
        let line = document.getElementById(`bar-line-${data[index].id}`);
        if (line == null) {
            line = createRatingBarLine(data[index], true);
            doc.querySelector('.rating-bar-chart').appendChild(line);
        }

        data[index].old_place = parseInt(line.querySelector('.rating-bar-line-place').innerHTML);
        data[index].place = index + 1;
    });
    swapContainers(data)
    update_total_sum_and_count()
}


function createRatingBarChart(data, container) {
    data.forEach(dataX => {
        const line = createRatingBarLine(dataX);
        container.appendChild(line);
    });
}

