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
            <form action="" @submit.prevent="publishProd">
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
                                <input type="text">
                            </div>
                        </div>
                        <div class="input-group clearfix">
                            <div class="title">
                                风格
                            </div>
                            <div class="content">
                                <input type="text">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <label for="">宝贝图片：</label>
                    <div class="pic-box">
                        <div class="pics">
                            <div class="pic">
                                <input type="file" class="file-input">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input">
                                <img  alt="" @click.self="selectionPic">
                            </div>
                            <div class="pic">
                                <input type="file" class="file-input">
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
                    </div>
                </div>
                <div class="input-box">
                    <div id="submit_box">
                        <input type="submit" value=发布>
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
    mounted () {
        // var script=document.createElement("script");
        // script.src = '/static/wangEditor.min.js';
        // document.querySelector('body').append(script)
        var E = window.wangEditor;
        var editor2 = new E('#editor');
        editor2.customConfig.uploadImgServer = '/upload'
        editor2.create();
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
            console.log(this)
            console.log(event.target)
            console.log(event.target.value)
            console.log(event.target.data)
            console.log(event.target.resule)
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

</style>
