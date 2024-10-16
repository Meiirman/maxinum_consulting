function getRandomInt(min = 10, max = 500) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function quickSort(arr, order = 'desc') {
    if (arr.length <= 1) {return arr;}

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    
    for (const item of arr) {
        if (order === 'asc') {
            if (item.progress < pivot.progress) {left.push(item);} 
            else if (item.progress > pivot.progress) {right.push(item);}
            else {equal.push(item);}
        }
        else if (order === 'desc') {
            if (item.progress > pivot.progress) {left.push(item);} 
            else if (item.progress < pivot.progress) {right.push(item);}
            else {equal.push(item);}
        }
    }

    return [...quickSort(left, order), ...equal, ...quickSort(right, order)];
}



function get_new_raceData(data) {
    console.log('зашел в get_new_raceData', data)
    let race_data = JSON.parse(localStorage.getItem('raceData'+current_diagram))
    if (race_data == null) {
        race_data = []
    }

    if (document.getElementById(`bar-line-${data.id}`) == null) {
        // race_data.push(data)
    } else {
        race_data.forEach(function(element, index) {
            if (data.id == element.id) {
                try{
                    if (race_data[index].points < data.points) {
                        console.log('new record')
                        var audio = new Audio('/media/default/rating_updated.mp3'); // Укажите путь к вашему звуковому файлу
                        audio.play();
                        
                        Swal.fire({
                            position: "center",
                            icon: "info",
                            title: `Поздравляем ${race_data[index].name}!\nВаш рейтинг пополнился!\nБыло ${keepMoneyFormat(race_data[index].points)} тг.\nСейчас ${keepMoneyFormat(data.points)} тг.`,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                    else if (race_data[index].points > data.points) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: `${race_data[index].name}\nВаш рейтинг понижен!\nБыло ${keepMoneyFormat(race_data[index].points)} тг.\nСейчас ${keepMoneyFormat(data.points)} тг.`,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                } catch(consoleerrorerror){
                    console.log(consoleerrorerror.stack)
                }

                race_data[index].points = data.points
                race_data[index].count = data.count
                race_data[index].progress = race_data[index].points / race_data[index].plan * 100
            }
        });
    }
    race_data = quickSort(race_data)

    race_data.forEach(function (dataX, index) {
        race_data[index].old_place = race_data[index].place
        race_data[index].place = index + 1
    })
    
    localStorage.setItem('raceData'+current_diagram, JSON.stringify(race_data))
    return race_data
}

function createRatingBarLine(data, is_last = false) {
    const line = document.createElement('div');
    line.classList.add('rating-bar-line');
    line.id = `bar-line-${data.id}`;

    const place = document.createElement('div');
    place.classList.add('rating-bar-line-place');
    place.textContent = data.place;
    line.appendChild(place);

    // const avatar = document.createElement('div');
    // const avatar_img = document.createElement('img');
    // avatar_img.src = data.avatar;
    // avatar_img.alt = data.name;
    // avatar.appendChild(avatar_img);
    // avatar.classList.add('rating-bar-line-avatar');
    // line.appendChild(avatar);

    const name = document.createElement('divф');
    name.classList.add('rating-bar-line-name');
    name.textContent = data.name;
    line.appendChild(name);

    const points = document.createElement('div');
    points.classList.add('rating-bar-line-points');
    points.textContent = data.count + ' заказ ' + keepMoneyFormat(data.points) + ' тг (' + data.progress.toFixed(0) + '%)';
    line.appendChild(points);

    const progress_core = document.createElement('div');
    progress_core.classList.add('rating-bar-line-progress-core');
    progress_core.style.width = `100%`;
    line.appendChild(progress_core);

    const progress = document.createElement('div');
    progress.classList.add('rating-bar-line-progress');
    progress.classList.add('rating-bar-fire-border');
    progress.style.width = `${(data.progress <= 100) ? data.progress : 100}%`;

    progress_core.appendChild(progress);


    return line;
}