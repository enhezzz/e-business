<template>
    <div class="register-box">
        <div class="register">
            <div class="register-main">
                 <h3 class="title">register</h3>
            <form action="" id="register_form" @submit="doregister">
                <div class="input-box">
                    <label for="username">用户名：</label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="input-box">
                    <label for="password">密码：</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="input-box">
                    <label for="ensure_password">确认密码</label>
                    <input type="password" name="ensure_password" id="ensure_password">
                </div>
                <div class="input-box">
                    <button class="doregister">注册</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    doregister: function(event) {
      let formData = new FormData(),
        username = document.querySelector(".regist .input-box #username"),
        password = document.querySelector(".regist .input-box #password"),
        submit = document.querySelector(".regist .input-box .doregister");
      event = event || window.event;
      if (event.preventDefault) event.preventDefault();
      else event.returnValue = false;
      formData.append("username", username.value);
      formData.append("password", password.value);
      let xhr = new XMLHttpRequest();
      xhr.open("post", "/register");
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
          alert("succeed");
        }
      };
    }
  }
};
</script>
<style>
.register-box {
  height: 504px;
  background: url(../assets/login.jpg) no-repeat center/cover;
}
.register-box .register {
  width: 1190px;
  height: 100%;
  display: flex;
}
.register-box .register .register-main {
  width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.4);
  align-self: center;
}
.register-box .register .register-main .title {
  padding-left: 12px;
}
.register-box .register .register-main #register_form {
  text-align: center;
}
.register-box .register #register_form .input-box {
  margin-bottom: 12px;
}
.register-box .register #register_form .input-box input {
  width: 45%;
  height: 45px;
}
.register-box .register #register_form .input-box .doregister {
  width: 38%;
  height: 38px;
  background: rgba(153, 153, 238, 0.7);
  outline: none;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
}
.register-box .register #register_form .input-box .doregister:hover {
  background: #9999ee;
}
</style>
    