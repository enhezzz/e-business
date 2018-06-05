<template>
    <div class="product-box">
        <div class="product">
            <div class="base">
                <div class="show-box">
                    <div class="show">
                        <div class="big-pic">
                            <a href="">
                                <img :src="product.base.show.pics[bigIndex]" alt="">
                            </a>
                        </div>
                        <div class="small-pic">
                            <div class="pic" v-for="pic,index of product.base.show.pics">
                                <a href=""  :data-index="index" @click.prevent="togglePic">
                                    <img :src="pic" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="todo">
                            <div class="store">
                                <a href="">收藏</a>
                            </div>
                            <div class="share">
                                <a href="">分享</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h3 class="title">{{product.base.info.title}}</h3>
                    <div class="record clearfix">
                        <div class="price-info">
                            价格：<span class="price">{{'$'+product.base.info.price}}</span>
                        </div>
                        <div class="result">
                            <div class="comment">
                                <a href=""><span class="num">1</span><br> 累计评论</a>
                            </div>
                            <div class="traded">
                                <a href=""><span class="num">1</span><br> 交易成功</a>
                            </div>
                        </div>
                        <div class="store-num">
                            {{'库存:'+ product.base.info.num}}
                        </div>
                    </div>
                    <div class="number">
                        <span>数量</span>
                        <button class="subtract" @click="subNum">-</button>
                        <input type="text" :value="buyNum">
                        <button class="add" @click="addNum">+</button>
                    </div>
                    <div class="opera">
                        <button @click="buynow">立即购买</button>
                        <button @click="toCart">加入购物车</button>
                    </div>
                </div>
            </div>
            <div class="detail">
                <div class="nav">
                    <div class="item" :class="{selected: product.detail.nav.selected}" @click="selectedItem">
                        <a href="javascript:void(0)" data-content="prod-detail">商品详情</a>
                    </div>
                    <div class="item" :class="{selected: !product.detail.nav.selected}" @click="selectedItem">
                        <a href="javascript:void(0)" data-content="comment">累计评论</a>
                    </div>
                </div>
                <div class="content">
                    <div class="prod-detail" v-html="product.detail.content"  :class="{isShow: product.detail.nav.selected}"></div>
                    <div class="comment" :class="{isShow: !product.detail.nav.selected}">2</div>
                </div>
            </div>
        </div>
        <div class="buy-cart-box">
            <div class="buy-cart">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            product:{
                base: {
                    show: {
                        ['big-index']: 0,
                        pics: []
                    },
                    info: {
                        title: '',
                        price: 0,
                        comment: 0,
                        traded: 0,
                        num: 0
                    }
                    
                },
                detail: {
                    nav: {
                        selected: true
                    },
                    content: '',
                    comment: ''
                }
            },
            buyNum: 1,
            bigIndex: 0     //大照片index
        }
    },
    created(){
        if(fetch){
            let url = location.pathname
            fetch(url,{
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response=>{
                return response.json();
            }).then(prod=>{
                this.product.base.show.pics = prod.p_pics;
                this.product.base.info.title = prod.p_name;
                this.product.base.info.price = prod.p_price;
                this.product.base.info.num = prod.p_num;
                this.product.detail.content = prod.p_desc
                console.log(prod)
            }).catch(e=>{
                if(e) throw e;
            })
        }
    },
    methods: {
        selectedItem(event){
            event = event||window.event;
            if(!event.target.parentNode.classList.contains('selected')){
                this.product.detail.nav.selected = !this.product.detail.nav.selected;
            }
            
        },
        addNum(){
            if(this.buyNum<this.product.base.info.num)
            this.buyNum++;
        },
        subNum(){
            if(this.buyNum>1)
            this.buyNum--;
        },
        togglePic(event){
            event = event || window.event;
            this.bigIndex = event.currentTarget.dataset.index;
            // console.log(event.currentTarget)
        },
        buynow: function(){
            if(this.$store.state.id == '登陆'){
                this.$router.push({name: 'login'});
            }else{
                this.$store.commit('setProdName',this.product.base.info.title);
                this.$store.commit('setProdSum',this.buyNum);
                this.$store.commit('setProdPrice',this.product.base.info.price);
                sessionStorage.order = JSON.stringify([{
                    prodName: this.product.base.info.title,
                    prodSum: this.buyNum,
                    prodPrice: this.product.base.info.price,
                    prodNum: this.product.base.info.num
                }])
                // let currentFullpath = this.$route.fullPath;
                this.$router.push({path: '/product/order'});
            }
        },
        toCart(){
            if(fetch){
                let formData = new FormData();
                let prodId = this.$route.params.id;
                let prodName = this.product.base.info.title;
                let prodPrice = this.product.base.info.price;
                let prodNum = this.product.base.info.num;
                formData.append('prodId',prodId);
                formData.append('prodName',prodName);
                formData.append('prodPrice',prodPrice);
                formData.append('prodNum',prodNum);
                let request = new Request('/product/cart');
                fetch(request,{
                    method: 'post',
                    credentials: 'same-origin',
                    body: formData
                }).then(response=>{
                    if(response.status == 500) throw new Error('你还未登陆！！')
                    if(response.status == 200){
                        this.$store.commit('add_num_in_cart');
                    }else if(response.status == 502){
                        alert('你已经添加过了')
                    }
                    return response.text();
                }).then(prods=>{
                }).catch(err=>{
                    if(err){
                        this.$router.push({name: 'login'});
                        console.error(err)
                    }
                })
            }
        }
    }
};
</script>
<style scoped>
.product-box {
  position: relative;
  font-size: 12px
}
.product-box .product {
  width: 1190px;
  margin: 0 auto;
}
.product-box .buy-cart-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: rgb(245, 245, 245);
}
.product-box .buy-cart-box .buy-cart {
  background: rgb(245, 245, 245);
  width: 1190px;
  height: 100%;
}
.product-box .product .base {
  display: flex;
  padding: 15px;
  border: 1px solid rgb(230, 230, 230);
  margin-bottom: 30px
}
.product-box .product .base .show-box {
  width: 450px;
  height: 620px;
  margin-right: 38px
}
.product-box .product .base .show-box .show{
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .big-pic{
  height: 75%;
  margin-bottom: 50px
}
.product-box .product .base .show-box .show .big-pic a{
  display: block;
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .big-pic a>img{
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .small-pic{
  display: flex;
  margin-bottom: 30px
}
.product-box .product .base .show-box .show .small-pic .pic{
  width: 50px;
  height: 50px;
  border: 1px solid rgb(210, 210, 210);
  margin-right: 15px
}
.product-box .product .base .show-box .show .small-pic .pic a{
  display: block;
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .small-pic .pic img{
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .todo{
  display: flex;

}
.product-box .product .base .show-box .show .todo .store{
  height: 20px;
  padding-right: 30px;
  line-height: 20px;
  border-right: 1px solid rgb(210, 210, 210)
}
.product-box .product .base .show-box .show .todo .share{
  height: 20px;
  line-height: 20px;
  padding-left: 30px;
}
.product-box .product .info{
    width: 600px;
}
.product-box .product .info .record{
    background: rgba(153, 153, 238,.7);
    padding: 7px;
    margin-bottom: 30px
}
.product-box .product .info .record .price-info{
    float: left;
}
.product-box .product .info .record .price-info>.price{
    font-size: 25px;
    color: rgb(153, 153, 238);
}
.product-box .product .info .record .result{
    color: rgb(153, 153, 238);
    float: right;
    font-size: 16px
}
.product-box .product .info .record .result>.comment{
    float: left;
}
.product-box .product .info .record .result>.traded{
   float: left;
}
.product-box .product .info .record .store-num{
   float: left;
   width: 100%
}
.product-box .product .info .number{
   padding: 7px;
   margin-bottom: 30px
}
.product-box .product .info .opera{
   padding: 7px;
   margin-bottom: 30px
}
.product-box .product .detail .nav{
   display: flex;
   background: rgb(245, 245, 245);
   border: 1px solid rgb(210, 210, 210);
   height: 42px;
}
.product-box .product .detail .nav .item>a{
   display: block;
   width: 100px;
   height: 40px;
   line-height: 40px;
   border-right: 1px solid rgb(210, 210, 210);
   text-align: center
}
.product-box .product .detail .nav .item.selected{
   height: 41px;
   background: rgb(255, 255, 255)
}
.product-box .product .detail .content{
    padding: 15px
}
.product-box .product .detail .content>.comment{
    display: none
}
.product-box .product .detail .content>.prod-detail{
    display: none
}
.product-box .product .detail .content>.isShow{
    display: block
}
</style>
