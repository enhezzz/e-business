<template>
    <div class="center-box">
        <div class="center">
            <div class="sider-options">
                <div class="option">
                    <router-link to="/personalCenter/baseInfo">个人资料</router-link>
                </div>
                <div class="option">
                    <router-link to="/personalCenter/receivedAddr">管理收货地址</router-link>
                </div>
            </div>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    beforeRouteEnter(to, from, next)  {
      next(vm=>{
          if(vm.$store.state.id == '登陆'){
              vm.$router.replace({name: 'login'})
          }
      })  
    }
}
</script>
<style scoped>
.center-box{
    width: 100%
}
.center-box>.center{
    width: 1190px;
    margin: 0 auto;
    display: flex;
    border: 1px solid #ccc
}
.center-box>.center .sider-options{
    border-right: 1px solid rgb(211, 211, 211);
    height: 670px;
}
.center-box>.center .option{
    width: 250px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid rgb(222, 222, 222)
}
.center-box>.center .option a{
   display: block;
   width: 100%;
   height: 100%;
}
.center-box>.center .option a:hover{
   background: rgb(186, 181, 230);
   color: #fff
}
.center-box>.center .main-content{
   flex: 1
}

</style>
