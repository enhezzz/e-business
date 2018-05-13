<template>
  <div class="carousel">
    <div class="item">
    </div>
    <div class="item">
    </div>
    <div class="item">
    </div>
    <div class="item">
    </div>
    <ul class="controler">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .main .carousel{
  position: relative;
  height: 550px;
}
.main .carousel .item:nth-child(1){
  background: url(../assets/carousel1.png) center/cover;
  max-width: 1190px;
  height: 550px;
  position: absolute;
  opacity: 1;
}
.main .carousel .item:nth-child(2){
  background: url(../assets/carousel2.png) center/cover;
  width: 1190px;
  height: 550px;
  position: absolute;
  opacity: 0;
}
.main .carousel .item:nth-child(3){
  background: url(../assets/carousel2.png) center/cover;
  width: 1190px;
  height: 550px;
  position: absolute;
  opacity: 0;
}
.main .carousel .controler{
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translatex(-50%);
  width: 100px;
}
.main .carousel .controler li{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ccc;
} */
</style>
