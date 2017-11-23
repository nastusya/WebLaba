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
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            news = JSON.parse(localStorage.getItem('n' + k));
            var img = localStorage.getItem('i' + k);
            var parentElem = document.getElementById('news-list');
            var out = document.createElement('div');
            out.id = 'news';
            out.innerHTML =
                "<div class='responsive'>" +
                "<div class='card'> " +
                "<a href='#'> " +
                "<img src='" + img + "' width='100%'>" +
                "<div class='caption'><p>" + news[0].name + "</p></div>" +
                " <p>" + news[0].text + "</p>" +
                "</a></div></div>";
            parentElem.appendChild(out);
        }

}
