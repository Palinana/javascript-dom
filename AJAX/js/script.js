let inputUsd = document.querySelector('#usd'),
    inputRub = document.querySelector('#rub');
    
inputRub.addEventListener('input', () => {
    parseFloat(Math.round(inputRub * 100) / 100).toFixed(2);

    let request = new XMLHttpRequest();
    request.open('GET', 'js/current.json'); //method, url (async, login, pass)
    request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.response); //server responce -> convert to JS object

            inputUsd.value = (inputRub.value / data.usd).toFixed(2);
        }
        else {
            inputUsd.value = 'Something went wrong!';
        }
    });
});
