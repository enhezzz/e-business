<template>
  <div id="app">
    <header class="header container">
      <div class="nav-box clearfix">
          <div class="nav-left">
            <div class="item">
              <router-link to="login" class="active">登陆</router-link>
              </div>
            <div class="item">
              <router-link to="/register">注册</router-link>
              </div>
          </div>
          <div class="nav-right">
            <div class="search-bar">
              <label for="">
                <span>搜索：</span>
                <input type="text" class="search-input">
              </label>
            </div>
          </div>
      </div>
    </header>
    <div class="main ">
       <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="nav">
        <div class="item"></div>
      </div>
      <div class="contact">
        <div class="code"></div>
        <div class="detail"></div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  width: 100%;
}
* {
  box-sizing: border-box;
}
body {
  color: #9999CC
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
}
.clearfix:after{
  content: "";
  display: table;
  clear: both;
}
.container{
  padding: 0 2%
}
.header{
   background: rgb(199, 187, 186);
}
.header .nav-box{
  /* width: 100%; */
  
}
.header .nav-box  .nav-left{
  float: left;
}
.header .nav-box  .nav-left .item{
  float: left;
}
.header .nav-box .nav-left .item a{
  display: block;
  padding: 0 8px;
  height: 36px;
  line-height: 36px;
  color: #9999CC
}
.header .nav-box  .nav-left .item a:hover{
  color: #9999ee
}
.header .nav-box  .nav-left .item a.active{
  color: #9999ee
}

.header .nav-box  .nav-right{
  float: right
}
.header .nav-box  .nav-right .search-bar{
  height: 36px;
  line-height: 36px
}
/* .container {
  padding: 0 5%;
}
.row {
  display: flex;
}
.intro {
  height: 150px;
}
.intro .content {
  width: 990px
}
.intro .container .logo {
  float: left;
  margin-top: 32px;
}

.intro .container .desc {
  float: left;
  margin-top: 32px;
  margin-left: 2%;
}
.intro .container .other {
  float: right;
  text-align: right;
}
.intro .other .option {
  padding-top: 15px;
}
.intro .other .option ul li {
  float: left;
  border-right: 1px solid #333;
  padding: 0 5px;
  font-size: 14px;
}
.intro .other .option ul li a {
  text-decoration: none;
  color: black;
}
.intro .other .option ul li a:hover {
  text-decoration: underline;
  color: rgb(21, 123, 186);
}
.intro .other > img {
  margin-top: 15px;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.header .nav {
  background: #265e79;
}
.header .nav .items{
  width: 990px;
  margin: 0 auto;
}
.header .nav .item {
  float: left;
  border-right: 1px solid #444;
}
.header .nav .item a {
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: block;
  width: 100%;
  padding: 20px;
}
.header .nav .item a:hover {
  background: rgb(61, 123, 160);
} */
.router-link-active {
  background: rgb(61, 123, 160);
}
</style>
