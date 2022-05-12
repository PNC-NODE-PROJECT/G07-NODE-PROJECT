
axios.get('/user/session/stored')
.then((result)=>{
    localStorage.setItem('userId', result.data);
})
