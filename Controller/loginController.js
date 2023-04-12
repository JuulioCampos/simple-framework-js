

const login = localStorage.getItem("AUTH")
if (login) {
    $json = JSON.parse(decrypt(login))
    email = $json.email
    senha = $json.senha
    $("#email-input").val(String(email))
    $("#password-input").val(String(senha))
    $("#remember").prop('checked', true)
}

function rememberUser() {
    if ($("#remember").is(':checked')) {
        email = $("#email-input").val()
        senha = $("#password-input").val()
        console.log(email, senha)
        if (email && senha) {
            jsonSave = {
                email: email,
                senha: senha
            }
            localStorage.setItem('AUTH', encrypt(JSON.stringify(jsonSave)))
            return true
        }
        return false
    } else {
        localStorage.clear();
    }
}

form = $("#loginForm")
form.submit(function (event) {
    event.preventDefault();
    jsonData = {}
    $.each(form.serializeArray(), function () {
        jsonData[this.name] = this.value;
    });
    rememberUser()
        
});