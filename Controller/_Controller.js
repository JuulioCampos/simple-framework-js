var currentPage = false


const Render = (filename) => {
    $("#content").hide(100)
    $("#content").empty()
    $("#spinner").show(100)

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText
        }
    }

    if (filename) {
        url = '/Pages/' + filename + ".html"
        directory = filename.split("/")
    }

    current_url = clearUrl()
        if (directory[1] != "login") {
        current_url += (current_url.indexOf('?') == -1 ? '?' : '&') + directory[1]
        history.pushState(null, null, current_url);
    } 
    xhttp.open("GET", url, true)
    xhttp.send();
    loadJS(directory[1])
    $("#spinner").hide(100)
    $("#content").show(500)

}

const loadJS = (filename) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', "/Controller/" + filename + "Controller.js", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            eval(xhr.responseText);
        }
    };

    xhr.send();
}
if (!currentPage) {
    Render("Login/login")
}

function encrypt(string) {
    return btoa(string)
}
function decrypt(string) {
    return decodeURIComponent(escape(window.atob(string)))
}

function clearUrl() {
    current_url = window.location.href;

    var pureUrl = current_url.split('?')[0];
    history.pushState(null, null, pureUrl);

    return pureUrl
}