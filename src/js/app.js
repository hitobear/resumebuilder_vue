let app=new Vue({
    el:"#app",
    data: {
        loginVisible:false,
        signUpVisible:false,
        resume:{
            name:'李彤',
            job_title:'前端工程师',
            birthday:'1992/01/02',
            gendor:'女',
            email:'litongthe@163.com',
            phone:'13141298942',
        }
    },
    methods:{
        onClickSave(){
            let currentUser=AV.User.current();
            if(!currentUser){
                this.showLogin();
            }else{
                this.saveResume();
            }
            //console.log(this.resume);
            //let User = AV.Object.extend('User');
            //let user = new User();
            //user.set('resume',this.resume);
            //user.save().then(function (user) {
            //  console.log('objectId is ' + user.id);
            //}, function (error) {
            //  console.error(error);
            //});
        },
        showLogin(){
            this.loginVisible=true;
        }
    }
})