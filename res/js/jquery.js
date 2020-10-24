$(function () {
    let dropdownmenu_showing = false

    $(".avatar").click(function () {
        console.log("Avatar clicked!")
        if (dropdownmenu_showing) {
            $(".dropdown-menu").remove()
            dropdownmenu_showing = false
        } else {
            let nameVal = "nimi"
            let emailVal = "email"

            let name = $("<tr>").append($("<td>").append($("<p id='name'>").text(nameVal)))
            let email = $("<tr>").append($("<td>").append($("<p id='email'>").text(emailVal)))
            let browse = $("<tr>").append($("<td>").append($("<a href='../../browse.html'>").text("Browse")))
            let logout = $("<tr>").append($("<td>").append($("<a href=''>").text("Log Out")))

            let dropdownmenu = $("<div class='dropdown-menu'>")

            dropdownmenu.append(name, email, browse, logout)

            $(".avatar-container").append(dropdownmenu)

            dropdownmenu_showing = true
        }
    })


})