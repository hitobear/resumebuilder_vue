let app=new Vue({
    el:"#app",
    data: {
        currentUser:{objectId:undefined,email:''},
        loginVisible:false,
        signUpVisible:false,
        signUp:{
            email:'',
            password:'',
        },
        login:{
            email:'',
            password:'',
        },
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
        },
        saveResume(){
            let {objectId}=AV.User.current().toJSON();
            let user=AV.Object.createWithoutData('User',objectId);
            user.set('resume',this.resume);;
            user.save().then(()=>{
                alert("保存成功");
            },()=>{
                alert("保存失败");
            });
        },
        getResume(){
            let query=new AV.Query('User');
            query.get(this.currentUser.objectId).then((user)=>{
                let resume=user.toJSON().resume;
                console.log(resume);
                this.resume=resume;
                console.log(resume);
            })
        },
        showLogin(){
            this.loginVisible=true;
        },
        onLogin(){
            console.log(this.login)
            AV.User.logIn(this.login.email,this.login.password).then((user)=>{
                this.currentUser=user.toJSON();
                this.loginVisible=false;
            },function(error){console.log(error)
                console.log(error.code);
                if(error.code===211){
                    alert('邮箱不存在');
                }else if(error.code===210){
                    alert('用户名密码不匹配');
                }
            })
        },
        onLogout(){
            AV.User.logOut();
            alert("注销成功");
            window.location.reload();
        },
        onSignUp(e){
            let user = new AV.User();
            user.setUsername(this.signUp.email);
            user.setPassword(this.signUp.password);
            user.setEmail(this.signUp.email);
            user.signUp().then(function(user){
                alert("注册成功，请重新登录")
            },function(error){
                alert(rawMessage);
            })
        }
    }
})

let currentUser=AV.User.current();
if(currentUser){
    app.currentUser=currentUser.toJSON();
    app.getResume();
}
