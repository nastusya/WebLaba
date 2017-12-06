var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addNews() {
    if ($('#news-name').val() === "" || $('#news-text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }
    if (isOnline()) {
        document.getElementById('news-form').reset();
        alert('Новина успішно надіслана.');
    } else if (useLocalStorage){
            var name = document.getElementById('news-name').value;
            var text = document.getElementById('news-text').value;
            i++;
            var list = [];
            list.push({"name": (name), "text": (text)});
            localStorage.setItem('n' + i, JSON.stringify(list));

        } else {
            var transaction = db.transaction(["news"], "readwrite");
            var store = transaction.objectStore("news");
            var news1 = {
                name: document.getElementById('news-name').value,
                text: document.getElementById('news-text').value,
            };
            store.add(news1);
        }
        document.getElementById('news-form').reset();
    }
