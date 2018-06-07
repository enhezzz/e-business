<template>
    <div class="order-box">
        <div class="order">
            <div class="center">
                <div class="prod clearfix" v-for="(prod,index) of prods" :key="index">
                    <h3 class="title">{{prod.prodName}}</h3>
                    <div class="store-num" style="float:left;width:100%">{{'库存:'+prod.prodNum}}</div>
                    <div class="mountManager">
                        <span>总数：</span>
                        <button @click="substract(index)">-</button>
                        <input type="text" :value="prod.prodSum">
                        <button @click="add(index)">+</button>
                    </div>
                </div>
                <div class="address">
                    <div class="title">
                        <span>选择收获地址：</span>
                    </div>
                    <div class="option" v-for="(addr,index) of receivedAddr" :key="index">
                        <input type="radio" name="receiveAddr" id="" checked>
                        <div class="name">{{addr}}</div>
                    </div>
                    <router-link to="/personalCenter/receivedAddr">管理收货地址</router-link>
                </div>
                <div class="summary clearfix">
                    <div class="price">
                        <span>{{'$:'+sumPrice}}</span>
                    </div>
                    <div class="pay">
                        <router-link to="/pay">结算</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>y
<script>
export default {
  data: function() {
    return {
      prods: [],
      receivedAddr: []
    };
  },
  computed: {
    sumPrice: {
      get: function() {
        return this.prods.reduce(
          (prevProd, nextProd) => {
            let price =
              prevProd.prodSum * prevProd.prodPrice +
              nextProd.prodSum * nextProd.prodPrice;
            return {
              prodSum: 1,
              prodPrice: price
            };
          },
          {
            prodSum: 0,
            prodPrice: 0
          }
        ).prodPrice;
        // return this.prods[0].prodSum
      }
    }
  },
  created: function() {
    // console.log(this.$store.state.order)
    // this.prodName = this.$store.state.order.prodName;
    // this.prodSum = this.$store.state.order.prodSum;
    // this.prodPrice = this.$store.state.order.prodPrice*this.$store.state.order.prodSum;
    console.log();
    this.prods = JSON.parse(sessionStorage.order);
    JSON.parse(sessionStorage.order);
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.params.id);
    // console.log(from.params.id)

    // let prodId = from.params.id;
    if (fetch) {
      let request = new Request("/order");
      fetch(request, {
        credentials: "same-origin"
      })
        .then(response => {
          return response.json();
        })
        .then(obj => {
          next(vm => {
            // vm.prodName = obj.prodInfo.p_name;
            // vm.prodPrice = obj.prodInfo.p_price;
            vm.receivedAddr = obj.addrInfo.addrs;
            next();
          });
        })
        .catch(err => {
          if (err) {
            next({ name: "login" });
            throw err;
          }
        });
    }
  },
  methods: {
    substract(index) {
      if (this.prods[index].prodSum > 1) {
        this.prods[index].prodSum--;
      }
    },
    add(index) {
      if (this.prods[index].prodSum < this.prods[index].prodNum)
        this.prods[index].prodSum = this.prods[index].prodSum + 1;
    }
  }
};
</script>
<style scoped>
.order-box {
  width: 100%;
  margin-top: 100px;
}
.order-box .order {
  width: 1190px;
  margin: 0 auto;
}
.order-box .order .center {
  width: 750px;
  margin: 0 auto;
}
.order-box .order .center {
  width: 750px;
  margin: 0 auto;
}
.order-box .order .center .prod {
  border: 1px solid rgb(211, 211, 211);
  padding: 10px;
  margin-bottom: 15px;
}
.order-box .order .center .prod > .title {
  float: left;
  margin: 0;
  width: 65%;
}
.order-box .order .center .prod > .mountManager {
  float: right;
}
.order-box .order .center .address {
  margin-bottom: 15px;
}
.order-box .order .center .address .title {
  margin-bottom: 15px;
}
.order-box .order .center .address .option {
  display: flex;
  margin-bottom: 8px;
}
.order-box .order .center .summary .price {
  float: left;
  color: #9999ee;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.order-box .order .center .summary .pay {
  float: right;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid rgb(211, 211, 211);
  background: #9999ee;
}
.order-box .order .center .summary .pay > a {
  color: #fff;
}
.order-box .order .center .summary .pay:hover {
  background: rgb(140, 140, 230);
}
</style>
