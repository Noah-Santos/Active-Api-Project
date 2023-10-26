function getEmail(){
    let email = document.querySelector('#email').value;
    sessionStorage.setItem('currentUserEmail', email);
}