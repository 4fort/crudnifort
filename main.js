let form = document.getElementById('form');
let input = document.getElementById('input');
let errorText = document.getElementById('errorText');
let postsFeed = document.getElementById('postsFeed');
let button = document.getElementById('button');
let clearButton = document.getElementById('clearAll');

let feed = [];
let buttonMethod = 'post';
var post;
var postID;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(formValidation()){
        if(buttonMethod === 'post'){

            feed.push({
                id: Math.random(),
                postContent: input.value
            });
            displayPost();

            input.value = '';
        }
        else if(buttonMethod === 'edit'){
            editPost();
            displayPost();
        }
    }
});

let formValidation = () => {
    if(input.value === '') {

        errorText.style.transform = 'translateY(0)';

        setTimeout(() => {
            errorText.style.transform = 'translateY(100px)'
        }, 3000);
        return false
    }
    else {
        errorText.style.transform = 'translateY(100)';
        return true;
    }
};

let displayPost = () => {
    posts.innerHTML = '';

    feed.map(element => {
        return posts.innerHTML += `
        <div>
            <pre>${element.postContent}</pre>
            <span id="${element.id}" class="options">
                <i onClick="editPost(this)" class="fas fa-edit"></i>
                <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `;
    });

    if(feed.length !== 0) {
        clearButton.style.transform = 'translateY(0)';
    }
    else{
        clearButton.style.transform = 'translateY(200px)';
    }
};

let deletePost = (e) => {
    postID = e.parentElement.id;
    let deletePost = feed.findIndex(element => element.id == postID);
    
    feed.splice(deletePost, 1);
    displayPost();
};

let editPost = (e) => {
    if(buttonMethod === 'post'){
        post = e.parentElement.parentElement;
        postID = e.parentElement.id;
        postID = Number(postID);
        
        let editPost = feed.find(element => element.id == postID).postContent;
        input.value = editPost;

        post.classList.add('editActive');
        
        buttonMethod = 'edit';
        button.innerText = 'Edit';
    }
    else if(buttonMethod === 'edit'){
        let editPost = feed.findIndex(element => element.id == postID);
        feed.splice(editPost, 1, {id: postID, postContent: input.value});

        post.classList.remove('editActive');
        
        buttonMethod = 'post';
        button.innerText = 'Post';
        input.value = '';
    }
};

let clearAll = () => {
    feed.length = 0;
    
    console.log('test');
    displayPost();
}