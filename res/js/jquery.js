function initButtonToggle() {
    $(".like-button").click(function () {
        $(this).toggleClass("liked");
    })
}

$(function () {

    loadUserInfo().then(function (response) {
        $(".avatar").attr("src", response.avatar)
        createDropdownmenu(response)
    }).catch(function () {
        alert("Error loading user info!")
    })

    loadPostsInfo().then(function (response) {
        for (let post of response) {
            addPost(post)
        }
        initButtonToggle();
    }).catch(function () {
        alert("Error loading posts info!")
    })

    loadProfilesInfo().then(function (response) {
        for (let profile of response) {
            addProfile(profile)
        }
    }).catch(function () {
        alert("Error loading profiles info!")
    })

    $(".avatar").click(function () {
        $(".dropdownmenu").toggle()
    })



})

function loadUserInfo() {
    return $.get({
        url: "https://private-anon-f06dcd018e-wad20postit.apiary-mock.com/users/1",
        success: function (response) {
            return response
        },
        error: function () {
            alert("error")
        }
    })
}

function loadPostsInfo() {
    return $.get({
        url: "https://private-anon-f06dcd018e-wad20postit.apiary-mock.com/posts",
        success: function (response) {
            return response
        },
        error: function () {
            alert("error")
        }
    })
}

function loadProfilesInfo() {
    return $.get({
        url: "https://private-anon-44b5c293a1-wad20postit.apiary-mock.com/profiles",
        success: function (response) {
            return response
        },
        error: function () {
            alert("error")
        }
    })
}

function createDropdownmenu(user) {
    let nameVal = user.firstname + " " + user.lastname
    let emailVal = user.email

    let name = $("<tr>").append($("<td>").append($("<p id='name'>").text(nameVal)))
    let email = $("<tr>").append($("<td>").append($("<p id='email'>").text(emailVal)))
    let browse = $("<tr>").append($("<td>").append($("<a href='browse.html'>").text("Browse")))
    let logout = $("<tr>").append($("<td>").append($("<a href='login.html'>").text("Log Out")))

    let dropdownmenu = $("<div class='dropdownmenu'>")

    dropdownmenu.append(name, email, browse, logout)
    dropdownmenu.hide()

    $("header").append(dropdownmenu)
}

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
    let postAuthorAvatar = $("<img alt='Post author'>").attr("src", authorData.avatar)
    let postAuthorName = $("<small>").text(authorData.firstname + " " + authorData.lastname)
    postAuthorInfo.append(postAuthorAvatar, postAuthorName)
    let postCreateTime = $("<small>").text(createTimeVal)
    postAuthor.append(postAuthorInfo, postCreateTime)
    post.append(postAuthor)

    // Creating post-image div.
    if (mediaData !== null) {
        if (mediaData.type === "image") {
            let postImage = $("<div class='post-image'>")
            let image = $("<img alt=''>").attr("src", mediaData.url)
            postImage.append(image)
            post.append(postImage)
        } if (mediaData.type === "video") {
            let postVideo = $("<div class='post-image'>")
            let video = $("<video controls>").attr("src", mediaData.url).text("Not supported")
            postVideo.append(video)
            post.append(postVideo)
        }
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

function addProfile(profileData) {
    // Variables from profile data.
    let firstName = profileData.firstname
    let lastName = profileData.lastname
    let avatar = profileData.avatar

    // Creating post div.
    let profileTab = $("<div class='profileTab'>")

    // Creating profile-picture div.
    let profilePictureDiv = $("<div class='profilePicture'>")
    let picture = $("<img alt='Profile picture'>").attr("src", avatar)
    profilePictureDiv.append(picture)
    profileTab.append(profilePictureDiv)

    // Creating name div.
    let nameDiv = $("<div class='nameDiv'>")
    let nameValue = $("<span class='profile_name'>")
    nameValue.append(firstName, lastName)
    nameDiv.append(nameValue)
    profileTab.append(nameDiv)

    // Creating Subscribe-button
    let subscribeDiv = $("<div class='subscribeDiv'>")
    let subscribeButton = $("<button type='button' name='subscribe' class='subscribe-button'>").text("Follow")
    subscribeDiv.append(subscribeButton)
    profileTab.append(subscribeDiv)

    // Adding post to main-container div.
    $(".profiles-container").append(profileTab)
}