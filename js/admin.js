var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addNews() {
    if ($('#news-name').val() === "" || $('#news-text').val() === "" ) {
        alert('Заповніть всі поля');
        return false;
    }
    if (isOnline()){
        document.getElementById('news-form').reset();
        alert('Новина успішно надіслана.');
    } else{

        var name = document.getElementById('news-name').value;
        var text = document.getElementById('news-text').value;
        i++;
        var list = [];
        list.push({"name": (name),"text": (text)});
        localStorage.setItem('n'+i, JSON.stringify(list));
        document.getElementById('news-form').reset();
    }
}
