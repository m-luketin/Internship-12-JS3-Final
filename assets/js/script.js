"use strict";

$("#signup, form").submit(function(event) 
{
    event.preventDefault();
});

function ToggleVisibility(element)
{
    element.toggleClass("display__none");
}

if(localStorage.length !== 0)
{
    ToggleVisibility($(".signup__wrapper"));
}

$("#loginSecondary").bind("click", function() 
{
    ToggleVisibility($(".signup__wrapper"));
});

$("#signupSecondary").bind("click", function() 
{
    ToggleVisibility($(".signup__wrapper"));
});

$("#login").bind("click", function() 
{    
    let username = $("#loginUsername").val();
    let password = $("#loginPassword").val();

    if(!localStorage.getItem(username))
    {
        alert("User does not exist!");
    }
    else if(localStorage.getItem(username) !== password)
    {
        alert("Wrong password!");
    }
    else 
    {
        ToggleVisibility($("#users"));
        ToggleVisibility($(".login__wrapper"));
    }
});

$("#signup").bind("click", function() 
{    
    let username = $("#signupUsername").val();
    let password = $("#signupPassword").val();
    let email = $("#email").val();
    let repeatedPassword = $("#repeat").val();
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    
    if(username.length < 5 || username.length > 10)
    {
        alert("Username needs to be between 5 and 10 characters!");
    }
    else if(!email.match(emailRegex)) 
    {
        alert("Email not valid!");
    }
    else if(password.length < 5 || password.length > 10)
    {
        alert("Password needs to be between 5 and 10 characters!");
    }
    else if(repeatedPassword !== password)
    {
        alert("Passwords do not match!");
    }
    else if(!$("#terms").is(":checked")) 
    {
        alert("You need to agree to the terms!");
    }
    else
    {
        localStorage.setItem(username, password);
        ToggleVisibility($("#users"));
        ToggleVisibility($(".login__wrapper"));
        ToggleVisibility($(".signup__wrapper"));
    }
});

let users;
fetch("https://jsonplaceholder.typicode.com/users")
.then( data => 
{
   return data.json();
})
.then( res => 
{
    users = res;
    let main = $(".users");

    users.forEach(function(user) 
    {
        let childNode = document.createElement("div");
        childNode.className = "users__user";
        childNode.innerHTML = `<img src="./assets/images/profile_picture.jpg" class="user__picture" onclick="ViewProfile(${user.id})">
                               <span class="user__username">${user.username}</span><br>
                               <span class="user__id"><b>ID</b>: #${user.id}</span><br>
                               <span class="user__name"><b>Name:</b> &nbsp;&nbsp;${user.name}</span><br>
                               <span class="user__mail"><b>e-mail:</b> &nbsp;${user.email}</span><br>
                               <span class="user__city"><b>City:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${user.address.city}</span><br>
                               <button class="user__posts" onclick="ViewPosts(${user.id})">POSTS</button>`;
        main.append(childNode);
    });  
    main.append(`<button class="posts__to-top display__none">Back to top</button>`);
    
    let button = $(".posts__to-top");
    window.addEventListener("scroll", function() {
        if(window.scrollY > 100)
        {
            button.removeClass("display__none");
        }
        else
        {
            button.addClass("display__none");
        }
    });
    
    button.click( function() {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});    
    });
});

function ViewProfile(id) 
{
    users.forEach(function(user) 
    {
        if(user.id === id) 
        {
            $("#profile").append(`<br><br><br><br><br><br><br>
            <h2>Name:${user.name}</h2><br>
            <span><b>Username</b>: ${user.username}</span><br>
            <span><b>e-mail:</b> ${user.email}</span><br>
            <span><b>Phone:</b> ${user.phone}</span><br>
            <span><b>Web:</b> ${user.website}</span><br>
            <h3>Adress:</h3>
            <span><b>Street</b>: ${user.address.street}</span><br>
            <span><b>City:</b> ${user.address.city}</span><br>
            <span><b>Zipcode:</b> ${user.address.zipcode}</span><br>
            <span><b>Latitude:</b> ${user.address.geo.lat}</span><br>
            <span><b>Longitude:</b> ${user.address.geo.lng}</span><br>
            <h3>Company:</h3>
            <span><b>Name</b>: ${user.company.name}</span><br>
            <span><b>Phrase:</b> ${user.company.catchPhrase}</span><br>
            <span><b>bs:</b> ${user.company.bs}</span><br>
            <button class="profile-button">Close</button>`);
        }
                
        $("#profile").removeClass("display__none");

        $(".profile-button").bind("click", function() 
        {
            $("#profile").addClass("display__none");
            $("#profile").empty();
        });
    });
}


let posts;
let postUserId;
let childNode;
function ViewPosts(id) 
{
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    .then( data => 
    {
       return data.json();
    })
    .then( res => 
    {
        posts = res;
        let container = $(".posts");

        posts.forEach(function(post) 
        {
            childNode = document.createElement("div");
            childNode.className = "posts__post";
            if(post.userId === id) 
            {
                childNode.innerHTML = `<span class="post__title"><b>Title</b>: ${post.title}</span><br>
                                       <span class="post__user-id"><b>User ID</b>: #${post.userId}</span><br>
                                       <span class="user__name"><b>ID:</b> ${post.id}</span><br>
                                       <span class="post__body"><b>Post:</b>${post.body}</span><br><br>`; 
                container.append(childNode);
            }
        });

        if(sessionStorage.getItem(id))
        {
            console.log(sessionStorage.getItem(id));
            
            let storedPost = (sessionStorage.getItem(id).replace('"', '').replace('"', '')).split("|");
            console.log(storedPost);
            childNode.innerHTML = `<span class="post__title"><b>Title</b>: ${storedPost[0]}</span><br>
                                   <span class="post__user-id"><b>User ID</b>: #${id}</span><br>
                                   <span class="user__name"><b>ID:</b> ${storedPost[2]}</span><br>
                                   <span class="post__body"><b>Post:</b>${storedPost[1]}</span><br><br>`; 
            container.append(childNode);
        }

        let numberRegex = /\d{1,2}$/;
        let userIdHtml = $(".post__user-id").html();
        postUserId = userIdHtml.match(numberRegex);

        container.append(`<div class="posts__buttons">
                          <button class="post__new" onclick="NewPost(${postUserId})">New post</button>
                          <button class="post__close">Close</button></div>`);
        $("#posts").removeClass("display__none");
        
        $(".post__close").bind("click", function() 
        {
            $("#posts").addClass("display__none");
            $("#posts").empty();
        });
    });
}

function NewPost()
{
    ToggleVisibility($(".new-post"));
}

function SubmitPost() 
{
    let newPostTitle = $(".new-post__title").val();
    let newPostBody = $(".new-post__body").val();
    console.log(newPostTitle);
    console.log(newPostBody);
    fetch('https://jsonplaceholder.typicode.com/posts', 
    {
        method: 'POST',
        body: JSON.stringify(
        {
           title: newPostTitle,
           body: newPostBody,
           userId: postUserId[0]
        }),
        headers: 
        {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json =>
    {
        console.log(json);
        let value = `${json.title} | ${json.body} | ${json.id}`;
        sessionStorage.setItem(json.userId, JSON.stringify(value));
        $(".post__new").remove();
        $(".post__close").remove();
        ViewPosts(json.userId);
    });
    $(".new-post__title").val("");
    $(".new-post__body").val("");
    NewPost();
}