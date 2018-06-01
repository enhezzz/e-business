<template>
    <div class="order-box">
        <div class="order">
            <div class="center">
                <div class="prod clearfix">
                    <h3 class="title">{{prodName}}</h3>
                    <div class="mountManager">
                        <span>总数：</span>
                        <button @click="substract">-</button>
                        <input type="text" :value="prodSum">
                        <button @click="add">+</button>
                    </div>
                </div>
                <div class="address">
                    <div class="title">
                        <span>选择收获地址：</span>
                    </div>
                    <div class="option">
                        <input type="radio" name="receiveAddr" id="">
                        <div class="name">地址一</div>
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
    data: function(){
        return {
            prodName: '',
            prodSum: 1,
            receivedAddr: [],
            prodPrice: 0
        }
    },
    computed: {
        sumPrice(){
            return this.prodPrice*this.prodSum;
        }
    }
    ,
    created: function(){
        // console.log(this.$store.state.order)
        // this.prodName = this.$store.state.order.prodName;
        // this.prodSum = this.$store.state.order.prodSum;
        // this.prodPrice = this.$store.state.order.prodPrice*this.$store.state.order.prodSum;
        
    },
    beforeRouteEnter(to,from,next){
        console.log(to.params.id);
        let prodId = to.params.id;
        if(fetch){
            let request = new Request('/order/'+prodId)
            fetch(request).then(response=>{
                return response.json()
            }).then(prodInfo=>{
                next(vm=>{
                    vm.prodName = prodInfo.p_name;
                    vm.prodPrice = prodInfo.p_price;
                })
            }).catch(err=>{
                if(err) throw err;
            })
        }
    },
    methods: {
        substract(){
            if(this.prodSum>1){
                this.prodSum--;
            }
        },
        add(){
            this.prodSum = this.prodSum+1
        }
    }
}
</script>
<style scoped>
.order-box{
    width: 100%;
    margin-top: 100px
}
.order-box .order{
    width: 1190px;
    margin: 0 auto;
}
.order-box .order .center{
   width: 750px;
   margin: 0 auto
}
.order-box .order .center{
   width: 750px;
   margin: 0 auto
}
.order-box .order .center .prod{
  border: 1px solid rgb(211, 211, 211);
  padding: 10px;
  margin-bottom: 15px;  
}
.order-box .order .center .prod>.title{
  float: left;
  margin: 0;
  width: 65%
}
.order-box .order .center .prod>.mountManager{
  float: right;
}
.order-box .order .center .address{
    margin-bottom: 15px;
}
.order-box .order .center .address .title{
    margin-bottom: 15px;
    
}
.order-box .order .center .address .option{
    display: flex;
    margin-bottom: 8px
}
.order-box .order .center .summary .price{
    float: left;
    color: #9999EE;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
.order-box .order .center .summary .pay{
    float: right;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid rgb(211, 211, 211);
    background: #9999EE;
}
.order-box .order .center .summary .pay>a{
    color: #fff
}
.order-box .order .center .summary .pay:hover{
    background: rgb(140, 140, 230)
}

</style>
