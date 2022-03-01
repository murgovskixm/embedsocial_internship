let request = new XMLHttpRequest();
request.open("GET",'data.json', false);
request.send(null);
let jsonData = JSON.parse(request.responseText);
let currIndex = 0;

function createCard(index) {
    let element = document.createElement('div');
    element.className = 'item';
    let profilePic = document.createElement('div');
    profilePic.className = 'profilePic';
    profilePic.innerHTML = "<img style = 'border-radius: 50px' src="+jsonData[index].profile_image+ ">";
    element.appendChild(profilePic);
    let name = document.createElement('div');
    name.className = 'name';
    name.innerHTML = "<p style = 'font-weight: bold; font-family: Bahnschrift,serif'>"
        + jsonData[index].name + "</p>" + jsonData[index].date.split(" ")[0];
    element.appendChild(name);
    let insta = document.createElement('div');
    insta.className = 'insta';
    insta.innerHTML = "<img src='icons/instagram-logo.svg'>";
    element.appendChild(insta);
    let pic = document.createElement('div');
    pic.className = 'pic';
    pic.innerHTML = "<img src="+jsonData[index].image+">";
    element.appendChild(pic);
    let desc = document.createElement('div');
    desc.className = 'desc';
    desc.innerHTML = "<p style = 'font-family: Calibri,serif; text-overflow: ellipsis;'>"
        + jsonData[index].caption + "</p>";
    element.appendChild(desc);
    let heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = "<input class='like' type='image' src='icons/heart.svg' onclick='like(" + index + ")'>";
    element.appendChild(heart);
    let likes = document.createElement('div');
    likes.className = 'likes';
    likes.innerHTML = jsonData[index].likes;
    element.appendChild(likes);
    return element;
}

function like(index) {
    if (document.getElementsByClassName('like')[index].style.backgroundColor === "red") {
        document.getElementsByClassName('like')[index].style.backgroundColor = "transparent";
        document.getElementsByClassName('likes')[index].innerHTML = jsonData[index].likes;
    }
    else {
        document.getElementsByClassName('like')[index].style.backgroundColor = "red";
        document.getElementsByClassName('likes')[index].innerHTML = parseInt(jsonData[index].likes) + 1;
    }
}

function loadItems() {
    let content = document.getElementsByClassName('items')[0];
    let startIndex = currIndex;
    while (currIndex < startIndex + 4) {
        content.appendChild(createCard(currIndex));
        currIndex++;
    }
}

function loadMore() {
    loadItems();
    let element = document.getElementById('load');
    element.scrollIntoView({behavior: "smooth", inline: "end"});
    if (currIndex === jsonData.length) {
        document.getElementById("load").remove();
    }
}