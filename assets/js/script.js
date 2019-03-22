let users;
let usersPromise = fetch("https://jsonplaceholder.typicode.com/users")
.then( data => {
   return data.json();
})
.then( res => {
    users = res;
});


usersPromise.then(() => {
    console.log(users);
})
.then( () => {
    let main = document.querySelector(".users");
    users.forEach(user => function(){
        let childNode = document.createElement("div");
        var nodeContent = document.createTextNode(`${user.name} ${user.email}`);
        console.log(nodeContent);
        main.appendChild(childNode);
    });    
});

