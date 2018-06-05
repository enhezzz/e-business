<template>
  <div id="app">
    <header class="header">
      <div class="nav-box clearfix">
        <div class="nav clearfix">
            <div class="nav-left">
            <div class="item">
              <router-link to="/login" class="active">{{personalInfo.id}}</router-link>
              <div class="simple-info">
                <div class="avatar"></div>
                <div class="setup"></div>
              </div>
              </div>
            <div class="item">
              <router-link to="/register" :class="{hidden: isLogin}">注册</router-link>
              <router-link to="/exit" :class="{hidden: !isLogin}">退出</router-link>
              </div>
          </div>
          <div class="nav-right">
            <div class="item">
              <router-link :to="{name: 'personalCenter'}">
                我的center
              </router-link>
            </div>
            <div class="item">
              <router-link to="2" class="cart">
                <span>订单</span>
                <div class="num-in-cart" v-if="personalInfo.num_in_cart">
                  {{personalInfo.num_in_cart}}
                </div>
              </router-link>
            </div>
            <div class="item">
              <router-link to="3">
                收藏
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="detail-box">
          <div class="logo">
           <router-link to="/">
            <img src="../src/assets/login.jpg" alt="" width="100%" height="100%">
           </router-link>
          </div>
        <div class="search-bar">
          <div class="search">
            <form action="" @submit.prevent="searchProds">
              <input type="text" name="p_keyword">
              <button>搜索</button>
            </form>
          </div>
          <div class="hot">
            <div class="keywords">
              <router-link to="1">1123</router-link>
              <router-link to="1">2123</router-link>
              <router-link to="1">3123</router-link>
            </div>
            <div class="more">
              <router-link to="more">more>></router-link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
    <div class="main">
       <router-view class="detail"></router-view>
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
  name: "App",
  computed: {
    personalInfo: function() {
      console.log(this.$store.state.id)
      return {
        id: this.$store.state.id,
        num_in_cart: this.$store.state.num_in_cart
      }
    },
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  methods: {
    searchProds: function(event) {
      event = event || window.event;
      let form = event.target;
      let searchVal = form.p_keyword.value.trim();
      this.$router.push({path: 'productList',query: {p_keyword: searchVal}});
      // if (fetch) {
      //   let request = new Request("/prodList?p_keyword=" + searchVal);
      //   fetch(request)
      //     .then(response => {
      //       return response.json();
      //     })
      //     .then()
      //     .catch(err => {
      //       if (err) throw err;
      //     });
      // }
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}
body {
  color: #666;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  color: #666;
}
.hidden{
  display: none !important
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.container {
  padding: 0 2%;
}
.header {
  font-size: 12px;
  margin-bottom: 50px;
}
.header .nav-box {
  width: 100%;
  background: #f5f5f5;
}
.header .nav-box .nav {
  width: 1190px;
  margin: 0 auto;
  background: #f5f5f5;
}
.header .nav-box .nav-left {
  float: left;
}
.header .nav-box .nav-left .item {
  float: left;
  position: relative;
}
.header .nav-box .nav-left .item .simple-info {
  position: absolute;
  width: 260px;
  height: 120px;
  top: 100%;
  left: 0;
  background: #f5f5f5;
  display: none;
}
.header .nav-box .nav-left .item:hover .simple-info {
  display: block;
}
.header .nav-box .nav-left .item a {
  display: block;
  padding: 0 8px;
  height: 36px;
  line-height: 36px;
  color: #9999cc;
}
.header .nav-box .nav-left .item a:hover {
  color: #9999ee;
}
.header .nav-box .nav-left .item a.active {
  color: #9999ee;
}

.header .nav-box .nav-right {
  float: right;
}
.header .nav-box .nav-right .item {
  float: left;
}
.header .nav-box .nav-right .item a {
  display: block;
  padding: 0 8px;
  height: 36px;
  line-height: 36px;
  color: #9999cc;
}
.header .nav-box .nav-right .item a:hover {
  color: #9999ee;
}
.header .nav-box .nav-right .item a.cart {
  position: relative;
}
.header .nav-box .nav-right .item a.cart>.num-in-cart {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 1px solid rgb(68, 135, 189);
  border-radius: 50%;
  top: 2px;
  right: -5px;
  line-height: 15px;
  text-align: center
}

.header .detail .detail-box {
  width: 1190px;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
}
.header .detail .logo {
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
}
.header .detail .logo a {
  width: 100%;
  height: 100%;
  display: block;
}
.header .detail .search-bar {
  flex: 0 0 600px;
  margin-left: 100px;
}
.header .detail .search-bar .search {
  width: 100%;

  margin-top: 45px;
}
.header .detail .search-bar .search > form {
  display: flex;
}
.header .detail .search-bar .search input {
  flex: 1 1 88%;
  height: 42px;
  border-radius: 15px 0 0 15px;
  outline: none;
  border: 2px solid #9999ee;
  padding-left: 5px;
  align-self: center;
}
.header .detail .search-bar .search button {
  height: 42px;
  flex: 1 1 12%;
  margin: 0;
  border: none;
  border-radius: 0 15px 15px 0;
  background: #9999ee;
}
.header .detail .search-bar .hot {
  margin-top: 5px;
}
.header .detail .search-bar .hot .keywords {
  float: left;
}
.header .detail .search-bar .hot .keywords {
  float: left;
}
.header .detail .search-bar .hot .more {
  float: right;
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
  /* background: rgb(61, 123, 160); */
}
</style>
