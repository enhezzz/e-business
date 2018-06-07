<template>
    <div class="cart-box">
        <div class="cart">
          <div class="prod" v-for="(prodInfo,index) of prodInfos" :key="prodInfo.prodId">
            <div class="checkedBox">
              <input type="checkbox" name="" id="" :data-index="index" @change="toggleSelect($event,index)">
            </div>
            <div class="info">
              <div class="left">
                <div class="name">{{prodInfo.prodName}}</div>
                <div class="store-num">{{prodInfo.prodNum}}</div>
              </div>
              <div class="price">{{prodInfo.prodPrice}}</div>
            </div>
            <div class="buy-num">
              <button @click="substract(index)">-</button>
              <input type="text" :value="prodInfo.prodSum">
              <button @click="add(index)">+</button>
            </div>
          </div>
          <div class="error-msg" v-if="prodInfos.length == 0">
            <span>还未有相关信息哦~</span> 
          </div>
          <div class="sum">
            <div class="price">
              $:{{sumPrice}}
            </div>
            <div class="pay">
              <a href="javascript:;" @click="pay">下单💗</a>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      prodInfos: [],
      selectedItems: []
    };
  },
  computed: {
    sumPrice() {
      return this.selectedItems.reduce((prev, next) => {
        let price = prev.prodSum * prev.prodPrice + next.prodSum * next.prodPrice;
        return {
          prodSum: 1,
          prodPrice: price
        }
      },{
        prodSum: 0,
        prodPrice: 0
      }).prodPrice;
      
    // return this.prodInfos;
  
    }
  }
  ,
  methods: {
    add(index) {
      if (this.prodInfos[index].prodSum < this.prodInfos[index].prodNum)
        this.prodInfos[index].prodSum++;
    },
    substract(index) {
      if (this.prodInfos[index].prodSum > 1) this.prodInfos[index].prodSum--;
    },
    toggleSelect(event, index) {
      event = event || window.event;
      let target = event.target || event.srcElement;
      if (target.checked) {
        this.selectedItems.push(this.prodInfos[index]);
        console.log(this.selectedItems);
      } else {
        let i = this.selectedItems.findIndex(element => {
          return element.prodId == this.prodInfos[index].prodId;
        });
        console.log(i);
        this.selectedItems.splice(i, 1);
        console.log(this.selectedItems);
      }
    },
    pay(){
      if(this.selectedItems.length!=0){
        sessionStorage.order = JSON.stringify(this.selectedItems);
      this.$router.push({name: 'order'});
      }else{
        alert('你还未选择商品~')
      }
      
    }
  },
  beforeRouteEnter(to, from, next) {
    if (fetch) {
      let request = new Request("/sessionInfo");
      fetch(request, {
        credentials: "same-origin"
      })
        .then(response => {
          if (response.status == 500) {
            throw new Error("你还未登陆");
          }
          if (response.status == 200) {
            let cartRequest = new Request("/product/cart");
            return fetch(cartRequest, {
              credentials: "same-origin"
            }).then(response => {
              return response.json();
            });
          }
        })
        .then(prod => {
          next(vm => {
            prod.prodInfo.forEach(element => {
              element.prodSum = 1;
            });
            console.log(prod);
            vm.prodInfos = prod.prodInfo;
          });
        })
        .catch(err => {
          if (err.message == "你还未登陆") {
            next("/login");
          }
          next();
        });
    }
  }
};
</script>
<style>
.cart-box {
  width: 100%;
}
.cart-box > .cart {
  width: 1190px;
  margin: 0 auto 50px;
}
.cart-box > .cart > .prod {
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding: 45px 0;
  border: 1px solid rgb(212, 212, 212);
  justify-content: center;
  margin-bottom: 5px;
  transition: border 0.4s;
}
.cart-box > .cart > .prod:hover {
  border: 1px solid rgb(189, 45, 199);
}
.cart-box > .cart > .prod > .checkedBox {
  /* display: flex; */
  margin-right: 25px;
  display: flex;
  align-items: center;
}
.cart-box > .cart > .prod > .checkedBox > input {
}
.cart-box > .cart > .prod > .info {
  padding: 15px;
  width: 500px;
  background: rgb(219, 205, 217);
  margin-right: 25px;
}
.cart-box > .cart > .prod > .info > .left {
  float: left;
  width: 80%;
}
.cart-box > .cart > .prod > .info > .left > .name {
  margin-bottom: 5px;
  font-size: 22px;
}
.cart-box > .cart > .prod > .info > .left > .store-num {
  margin-bottom: 5px;
}
.cart-box > .cart > .prod > .info > .price {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
}
.cart-box > .cart > .prod > .buy-num {
  display: flex;
  align-items: center;
}
.cart-box > .cart > .prod > .buy-num > input[type="text"] {
  width: 31px;
  text-align: center;
}
.cart-box > .cart > .sum {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgb(233, 233, 233);
  display: flex;
  justify-content: space-around;
}
.cart-box > .cart > .sum > .price {
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
}
.cart-box > .cart > .sum > .pay {
  align-self: center;
}
.cart-box > .cart > .sum > .pay > a {
  display: block;
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid rgb(201, 175, 233);
}
.cart-box > .cart > .sum > .pay > a:hover {
  background: rgb(211, 177, 219);
  color: #fff;
}
.error-msg{
  font-size: 22px;
  text-align: center
}
</style>
