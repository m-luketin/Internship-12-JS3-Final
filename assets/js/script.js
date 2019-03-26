"use strict";

$("#signup, form").submit(function(event) {
    event.preventDefault();
});

$("#signup").bind("click", function() {    
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
        //open users
    }
});

$("#login").bind("click", function() {    
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
        //open users
    }
});


let users;
let usersPromise = fetch("https://jsonplaceholder.typicode.com/users")
.then( data => {
   return data.json();
})
.then( res => {
    users = res;
    console.log(users);
    let main = $(".users");
    users.forEach(function(user) {
        let childNode = document.createElement("div");
        childNode.className = "users__user";
        childNode.innerHTML = `<img src="./assets/images/profile_picture.jpg" class="user__picture">
                               <span class="user__username">${user.username}</span><br>
                               <span class="user__id"><b>ID</b>: #${user.id}</span><br>
                               <span class="user__name"><b>Name:</b> &nbsp;&nbsp;${user.name}</span><br>
                               <span class="user__mail"><b>e-mail:</b> &nbsp;${user.email}</span><br>
                               <span class="user__city"><b>City:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${user.address.city}</span><br>`;
        main.appendChild(childNode);

        localStorage.setItem(user.username, "password");
    });
});



    $(".user").bind("click", function() {
        //open post
    });

