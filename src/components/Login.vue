<template>
    <div class="login-box">
        <div class="wrap">
             <div class="login">
            <h3 class="title">login</h3>
            <form action="" @submit.prevent="login">
                <div class="input-box">
                    <label for="username">账号：
                    </label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="input-box">
                    <label for="password">密码：</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="input-box">
                    <button class="dologin">login</button>
                </div>
            </form>
            <div class="helper">

            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        login: function(){
            let username = document.querySelector('.login .input-box #username'),
                password = document.querySelector('.login .input-box #password');
            let formData = new FormData();
            formData.append('username',username.value);
            formData.append('password',password.value);
            let xhr = new XMLHttpRequest();
            xhr.open('post','/login',true);
            xhr.onreadystatechange = ()=>{
                if(xhr.status == 200 && xhr.readyState == 4){
                    this.$store.commit('updateUsername',this.transformResponseText(xhr.responseText).username);
                }
            }
            xhr.send(formData)
        },
        transformResponseText(responseText){ //parse 响应数据
            return JSON.parse(responseText);
        }
    }
}
</script>
<style scoped>
.login-box {
    height: 494px;
    background: url(../assets/login.jpg) no-repeat center/cover;
}
.login-box .wrap{
    width: 1190px;
    height: 100%;
    position: relative;
}
.login-box .wrap .login{
    position: absolute;
    width: 420px;
    height: 300px;
    border: 1px solid pink;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, .4)
}
.login-box .wrap .login .title{
    padding-left: 15px
}
.login-box .wrap .login .input-box{
    text-align: center;
    margin-bottom: 15px
}
.login-box .wrap .login .input-box input{
    width: 60%;
    height: 50px;
    padding-left: 12px;
    border-radius: 5px;
}
.login-box .wrap .login .input-box .dologin{
    width: 47%;
    height: 47px;
    background: rgba(153, 153, 238,.7);
    outline: none;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
}
.login-box .wrap .login .input-box .dologin:hover{
    background: #9999EE;
}
</style>
