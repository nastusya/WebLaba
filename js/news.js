
window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineNews();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}

function readOfflineNews() {
    if (useLocalStorage) {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            news = JSON.parse(localStorage.getItem('n' + k));
            var img = localStorage.getItem('i' + k);
            var parentElem = document.getElementById('news-list');
            var out = document.createElement('div');
            out.id = 'news';
            out.innerHTML =
                "<div class='col-md-4'>" +
                "<div class='card'> " +
                "<a href='#'> " +
                "<div class='caption'><p>" + news[0].name + "</p></div>" +
                " <p>" + news[0].text + "</p>" +
                "</a></div></div>";
            parentElem.appendChild(out);
            localStorage.removeItem(k);
        }
    } else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('news-list');
                var out = document.createElement('div');
                out.id = 'news';
                out.innerHTML =
                    "<div class='col-md-4'>" +
                    "<div class='card'> " +
                    "<a href='#'> " +
                    "<div class='caption'><p>" + cursor.value.name + "</p></div>" +
                    " <p>" + cursor.value.text + "</p>" +
                    "</a></div></div>";
                parentElem.appendChild(out);
            }
        }
    }
}
