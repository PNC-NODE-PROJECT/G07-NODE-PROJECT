axios.get('/user/session/stored')
.then((result)=>{
    if(result.data.length>0){
        localStorage.setItem('userId', result.data);
    }else{
        localStorage.setItem('userId','');
    }
})
