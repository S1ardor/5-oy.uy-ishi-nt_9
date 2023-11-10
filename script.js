const form = document.querySelector('.form'),
    SubmitkBtn = document.querySelector('.btn'),
    boxContent = document.querySelector('.box'),
    pswInp = document.querySelector('.psw-input'),
    iconEl = document.querySelector('.eye-clicker');
async function createPost() {
    const lastName = document.querySelector('.lastName').value.trim().toLowerCase();
    const firstName = document.querySelector('.firstName').value.trim().toLowerCase();
    const password = document.querySelector('.password').value.trim().toLowerCase();
    const email = document.querySelector('.email').value.trim().toLowerCase();
    const userID = new Date().getMilliseconds();
    const students = {
        lastName: lastName,
        firstName: firstName,
        password: password,
        email: email,
        userID: userID
    }
    const respons = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(students)
    });
    async function render(data) {
        console.log(data);
        if (data.ok) {
            const newPost = await data.json();
            const postWrapper = document.createElement('div');
            postWrapper.classList.add('col');
            const postID = document.createElement('id');
            postID.textContent = newPost.userID;
            const lName = document.createElement('h3');
            lName.textContent = newPost.lastName;
            const fName = document.createElement('h3');
            fName.textContent = newPost.firstName;
            const pasSword = document.createElement('h3');
            pasSword.textContent = newPost.password;
            const eMail = document.createElement('h3');
            eMail.textContent = newPost.email;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.classList.add('delete_btn');
            deleteBtn.value = userID;
            postWrapper.appendChild(lName);
            postWrapper.appendChild(fName);
            postWrapper.appendChild(pasSword);
            postWrapper.appendChild(eMail);
            postWrapper.appendChild(deleteBtn);
            boxContent.appendChild(postWrapper);
            deleteBtn.addEventListener('click', async(e) => {
                e.preventDefault();
                const id = e.target.value;
                let = fetch(`https://reqres.in/api/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                postWrapper.remove();
            });
        }
    };
    render(respons);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    createPost();
    form.reset();
});
iconEl.addEventListener("click", () => handleChangeTypeInput(pswInp))

function handleChangeTypeInput(pswInp) {
    if (pswInp.type == "password") {
        pswInp.type = "text"
        toggleIcon("hide")
    } else if (pswInp.type == "text") {
        pswInp.type = "password"
        toggleIcon("show")
    }
}

function toggleIcon(option) {
    iconEl.src = `./images/${option}.png`;
};