<template>
    <div class="prod-manager-box">
        <div class="prod-manager">
        <div class="manager-actions">
            <div class="action">
                <router-link to="publishing" append>发布宝贝</router-link>
            </div>
        </div>
        <div class="manager-main">
            <h3 class="title">1.宝贝基本信息</h3>
            <form  @submit.prevent="publishProd" name="p_form">
                <div class="input-box">
                    <label for="p_name">宝贝标题：</label>
                    <input type="text" name="p_name" id="p_name">
                </div>
                <div class="input-box">
                    <label for="">宝贝属性：</label>
                    <div class="input-group-box clearfix">
                        <div class="input-group clearfix">
                            <div class="title">
                                品牌
                            </div>
                            <div class="content">
                                <input type="text" id="cloth_brand" name="p_brand" @focus="focusBrand" @blur="blurBrand" :value="brand">
                                <div class="optional-input">
                                    <div class="item" v-for="brand of brands" @click="selectBrand">{{brand}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="input-group clearfix">
                            <div class="title">
                                风格
                            </div>
                            <div class="content">
                                <input type="text" id="cloth_style" name="p_style">
                            </div>
                        </div>
                        <div class="input-group clearfix">
                            <div class="title">
                                价格
                            </div>
                            <div class="content">
                                <input type="text" name="p_price">
                            </div>
                        </div>
                        <div class="input-group clearfix">
                            <div class="title">
                                库存
                            </div>
                            <div class="content">
                                <input type="text"  name="p_num">
                            </div>
                        </div>
                        <div class="input-group clearfix">
                            <div class="title">
                                类别
                            </div>
                            <div class="content">
                                <input type="text"  name="p_type">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <label for="">宝贝图片：</label>
                    <div class="pic-box">
                        <div class="pics">
                            <div class="pic">
                                <input type="file" class="file-input" name="p_pic1">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input" name="p_pic2">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input" name="p_pic3">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input" name="p_pic4">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <label for="">宝贝描述：</label>
                    <div class="editor-box">
                        <div id="editor">
                             <p>宝贝描述...</p>
                        </div>
                        <textarea name="p_desc" id="sync_editor" cols="30" rows="10">1</textarea>
                    </div>
                </div>
                <div class="input-box">
                    <div id="submit_box">
                        <input type="submit" value="发布">
                    </div>
                    
                </div>
            </form>
        </div>
        </div>
    </div>
</template>
<script src="/static/wangEditor.js">
</script>

<script>
export default {
    beforeRouteEnter (to, from, next) {
    next(vm => {
        console.log(vm.$store.state.auth)
        if(!vm.$store.state.auth)
        next({path: '/errorAccess'});
  })
  },
    data () {
        return {
            brands: [],
            first: true,  //判断是否是第一次选择
            brand: ''      
        }
    },
    mounted () {
        // var script=document.createElement("script");
        // script.src = '/static/wangEditor.min.js';
        // document.querySelector('body').append(script)
        var E = window.wangEditor;
        var editor2 = new E('#editor');
        editor2.customConfig.uploadImgServer = '/upload';
        editor2.customConfig.onchange = function (html) {
            // 监控变化，同步更新到 textarea
            sync_editor.value = html;
        }
        editor2.create();
        let sync_editor = document.querySelector('#sync_editor');
        sync_editor.value = editor2.txt.html();
        // document.querySelector('.pic').addEventListener('click',function(){
        //     this.children[0].click();
        //     this.children[0].addEventListener('change',function(){
        //         let fileReader = new FileReader();
        //         console.log(1)
        //         fileReader.readAsDataURL(this.files[0]);
        //         fileReader.onload = function(){
                    
        //             // console.log(fileReader.result)
        //         }
        //     })
        // })
    },
    methods: {
        selectionPic(event){
            event.target.previousElementSibling.click();
            event.target.previousElementSibling.addEventListener('change',function(){
                let fileReader = new FileReader();
                fileReader.readAsDataURL(this.files[0]);
                fileReader.onload = function(){
                    event.target.src = fileReader.result;
                }
            })
        },
        publishProd(event){
            console.log(event.target)
           let formData = new FormData(event.target);
            if(fetch){
                fetch('/product',{
                    method:'post',
                    body: formData
                });
            }
        },
        focusBrand(event){
            event = event || window.event;
            if(fetch&&this.first){
                fetch('/admin/brand').then(response=>{
                    response.text().then(brands=>{
                        this.brands = JSON.parse(brands);
                        this.first = false
                    })
                })
            }
            event.target.nextElementSibling.style.display = "block";
        },
        blurBrand(event){
            event = event || window.event;
            setTimeout(() => {
                event.target.nextElementSibling.style.display = "none";
            }, 200);
        },
        selectBrand(event){
            event = event || window.event;
            this.brand = event.target.innerText;
        }
    }
};
</script>
<style scoped>
.prod-manager {
  width: 1190px;
  margin: 0 auto;
  display: flex;
}
.prod-manager .manager-actions {
  flex: 0 1 150px;
}
.prod-manager .manager-actions .action {
  text-align: center;
  height: 32px;
  line-height: 32px;
}
.prod-manager .manager-actions .action a:hover {
  color: #9999ee;
}
.prod-manager .manager-main {
  flex: 1;
  margin-left: 66px
}
.prod-manager .manager-main .input-box{
    margin-bottom: 35px
}
.prod-manager .manager-main #submit_box{
    background: #EEEEEE;
    width: 720px;
    margin: 0 80px;
    text-align: center
}
.prod-manager .manager-main #submit_box>input{
    width: 90px;
    height: 50px;
    background: #9999EE;
    border: none;
    margin: 15px 0

}
.prod-manager .manager-main #submit_box>input:hover{
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0,.3)
}
.prod-manager .manager-main .input-box .input-group-box{
    background: #F9F9F9;
    width: 662px;
    height: 300px;
    border:1px solid rgba(200, 200, 200,.6);
    margin-left: 80px
}
.prod-manager .manager-main .input-box .input-group{
   float: left;
   margin-bottom: 15px；
}
.prod-manager .manager-main .input-box .input-group .title{
    width: 100px;
    text-align: right;
    float: left;
}
.prod-manager .manager-main .input-box .input-group .content{
    width: 230px;
    text-align: left;
    float: left;
    position: relative;
}
.prod-manager .manager-main .input-box .input-group .content .optional-input{
    width: 100%;
    position: absolute;
    height: 80px;
    overflow-y: auto;
    z-index: 3;
}
.prod-manager .manager-main .input-box .input-group .content .optional-input .item:nth-child(2n){
    width: 100%;
    height: 20px;
    background: rgb(230, 230, 230)
}
.prod-manager .manager-main .input-box .input-group .content .optional-input .item:nth-child(2n+1){
    width: 100%;
    height: 20px;
    background: rgb(255, 255, 255)
}
.prod-manager .manager-main .input-box .pic-box .pics{
    margin-left: 80px;
    display: flex;
}
.prod-manager .manager-main .input-box .pic-box .pics .pic:not(:first-child){
    margin-left: 8px;
}
.prod-manager .manager-main .input-box .pic-box .pics .pic{
    width: 120px;
    height: 120px;
    background: #eee;
    cursor: pointer;
}
.prod-manager .manager-main .input-box .pic-box .pics .pic .file-input{
   display: none
}
.prod-manager .manager-main .input-box .pic-box .pics .pic img{
   width: 100%;
   height: 100%;
}
.prod-manager .manager-main .input-box .editor-box #editor{
   margin-left: 80px;
   width: 720px
}
.prod-manager .manager-main .input-box .editor-box #sync_editor{
    display: none
}

</style>
