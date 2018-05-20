<template>
    <div class="product-box">
        <div class="product">
            <div class="base">
                <div class="show-box">
                    <div class="show">
                        <div class="big-pic">
                            <a href="">
                                <img src="" alt="">
                            </a>
                        </div>
                        <div class="small-pic">
                            <div class="pic" v-for="pic of product.base.show.pics">
                                <a href="">
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
                    <h3 class="title">asdsa</h3>
                    <div class="record clearfix">
                        <div class="price-info">
                            价格：<span class="price">$148</span>
                        </div>
                        <div class="result">
                            <div class="comment">
                                <a href=""><span class="num">1</span><br> 累计评论</a>
                            </div>
                            <div class="traded">
                                <a href=""><span class="num">1</span><br> 交易成功</a>
                            </div>
                        </div>
                    </div>
                    <div class="number">
                        <span>数量</span>
                        <button class="subtract" @click="subNum">-</button>
                        <input type="text" :value="buyNum">
                        <button class="add" @click="addNum">+</button>
                    </div>
                    <div class="opera">
                        <button>立即购买</button>
                        <button>加入购物车</button>
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
                    <div class="prod-detail" v-html="product.detail.content"></div>
                    <div class="comment">2</div>
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
                        pics: []
                    },
                    info: {
                        title: '',
                        price: 0,
                        comment: 0,
                        traded: 0
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
            buyNum: 1
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
            if(!event.target.parentNode.classList.contains('selected'))
            this.product.detail.nav.selected = !this.product.detail.nav.selected;
        },
        addNum(){
            this.buyNum++;
        },
        subNum(){
            if(this.buyNum>1)
            this.buyNum--;
        }
    }
};
</script>
<style>
.product-box {
  position: relative;
  font-size: 12px
}
.product-box .product {
  width: 1190px;
  margin: 0 auto;
}
.product-box .buy-cart-box {
  position: absolute;
  width: 100%;
  height: 40px;
  background: rgb(245, 245, 245);
}
.product-box .buy-cart-box .buy-cart {
  background: rgb(245, 245, 245);
  width: 1190px;
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
  
}
.product-box .product .base .show-box .show{
  width: 100%;
  height: 100%;
}
.product-box .product .base .show-box .show .big-pic{
  height: 60%;
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
</style>
