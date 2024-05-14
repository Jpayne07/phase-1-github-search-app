document.addEventListener("DOMContentLoaded",() => {
    githubForm = document.getElementById('github-form')

    githubForm.addEventListener("submit",(e) =>{
        e.preventDefault();
        let enter = githubForm.querySelector('#search').value
        fetch(`https://api.github.com/search/users?q=${enter}`)
        .then((response) => response.json())
        .then((data) => {       
            if (Array.isArray(data.items)) {
                createLi(data.items);
              }
            })
            
          });
    })

    function createLi(objectArray) {
        objectArray.forEach(obj => {
          console.log(obj.login);
          let userList = document.getElementById('user-list');   
          let sublist = document.createElement('li')
          userList.appendChild(sublist)
          let image = document.createElement('img')
          let avatar = obj.avatar_url
            //username
          let userName = obj.login;
          sublist.textContent = userName;
          image.setAttribute('src', avatar)
            //avatar
            
            sublist.textContent = userName;
            sublist.appendChild(image);
            openRepo(sublist)
        })}

    function openRepo(liElement){
      liElement.addEventListener("click",(e) =>{
        e.preventDefault();
        let enter = liElement.textContent
        fetch(`https://api.github.com/users/${enter}/repos`)
        .then((response) => response.json())
        .then((data) => {
          let userList = document.getElementById('user-list');
          let repoList = document.createElement('ul');
          repoList.id = `${enter}-repo-list`; // Give it a unique identifier
          let backButton = document.createElement('button');
          backButton.textContent = 'Back';
          userList.appendChild(repoList);
          userList.appendChild(backButton);
          backButton.addEventListener('click', () => {
            userList.removeChild(repoList);
            userList.removeChild(backButton);
          });
          createRepoLi(data, repoList);
            })
            
          });
    }


    function createRepoLi(objectArray, repoList) {
      objectArray.forEach(repo => {
        let repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        repoList.appendChild(repoItem);
      });
    }
       

