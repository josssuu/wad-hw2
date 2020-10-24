$(function () {
    let dropdownmenu_showing = false

    $(".avatar").click(function () {
        console.log("Avatar clicked!")
        if (dropdownmenu_showing) {
            $(".dropdown-menu").remove()
            dropdownmenu_showing = false
        } else {
            // TODO Peab user info sellelt lehelt võtma:  https://wad20postit.docs.apiary.io/#reference/0/users-collection/get-user-information
            let nameVal = "nimi"
            let emailVal = "email"

            let name = $("<tr>").append($("<td>").append($("<p id='name'>").text(nameVal)))
            let email = $("<tr>").append($("<td>").append($("<p id='email'>").text(emailVal)))
            let browse = $("<tr>").append($("<td>").append($("<a href='browse.html'>").text("Browse")))
            let logout = $("<tr>").append($("<td>").append($("<a href='login.html'>").text("Log Out")))

            let dropdownmenu = $("<div class='dropdown-menu'>")

            dropdownmenu.append(name, email, browse, logout)

            $("header").append(dropdownmenu)

            dropdownmenu_showing = true
        }
    })


    $(".like-button").click(function () {
        $(this).toggleClass("liked");
    })
})







function addPost(postData) {
    // Variables from post.
    let postIDVal = postData.id
    let authorData = postData.author
    let createTimeVal = postData.createTime
    let textVal = postData.text
    let mediaData = postData.media
    let likesVal = postData.likes

    // Creating post div.
    let post = $("<div class='post'>")

    // Creating post-author div.
    let postAuthor = $("<div class='post-author'>")
    let postAuthorInfo = $("<span class='post-author-info'>")
    let postAuthorAvatar = $("<img alt='Post author'>").src(authorData.avatar)
    let postAuthorName = $("<small>").text(authorData.firstname + " " + authorData.lastname)
    postAuthorInfo.append(postAuthorAvatar, postAuthorName)
    let postCreateTime = $("<small>").text(createTimeVal)
    postAuthor.append(postAuthorInfo, postCreateTime)
    post.append(postAuthorInfo)

    // Creating post-image div.
    if (mediaData !== null) {
        // Creates media div.
        // TODO implement for image and video media.
    }

    // Creating post-title div.
    let postTitle = $("<div class='post-title'>")
    let text = $("<h3>").text(textVal)
    postTitle.append(text)
    post.append(postTitle)

    // Creating post-actions div.
    let postActions = $("<div class='post-actions'>")
    let likeButton = $("<button type='button' name='like' class='like-button'>").text(likesVal)
    postActions.append(likeButton)
    post.append(postActions)

    // Adding post to main-container div.
    $(".main-container").append(post)
}