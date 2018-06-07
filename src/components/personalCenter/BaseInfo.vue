<template>
    <div class="info-box">
        <div class="info">
            <div class="avatar" :style="avatarStyle">
                <div class="tip" @click="updateAvatar">修改头像</div>
                <input type="file" class="selectAvatar" accept="image/*" @change="ensureUpdate">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            avatarPath: '',
        }
    },
      computed: {
            avatarStyle(){
                console.log(this.avatarPath)
                return {
                backgroundImage: 'url('+this.avatarPath+')'
            }
            }
        },
    methods: {
        updateAvatar(event){
            event = event || window.event;
            let srcTarget = event.target || event.srcElement;
            let fileSelector = srcTarget.nextElementSibling;
            fileSelector.click();
        },
        ensureUpdate(event){
            event = event || window.event;
            let target = event.target || event.srcElement;
            let avatar = target.files[0];
            let formData = new FormData();
            formData.append('avatar',avatar);
            if(fetch){
                let request = new Request('/updateInfo');
                fetch(request,{
                    method: 'put',
                    credentials: 'same-origin',
                    body: formData
                }).then(response=>{
                  return response.text()  
                }).then(avatarPath=>{
                    this.avatarPath = avatarPath;
                }).catch(err=>{
                    if(err) throw err;
                })
            }
        },
    },
        beforeRouteEnter(to, from, next) {
         if(fetch){
             let request = new Request('/getInfo');
             fetch(request,{
                 credentials: 'same-origin'
             }).then(response=>{
                 return response.text();
             }).then(avatarPath=>{
                 next(vm=>{
                     vm.avatarPath = avatarPath;
                 });
             }).catch(err=>{
                 next()
             })
         } 
            
        }
    
}
</script>
<style>
.info-box {
  display: flex;
  justify-content: center;
}
.info-box > .info {
  width: 500px;
}
.info-box > .info > .avatar {
  width: 150px;
  height: 150px;
  margin: 50px auto;
  border: 1px solid #cccccc;
  border-radius: 50%;
  position: relative;
  z-index: 99;
  overflow: hidden;
  background: url() no-repeat center/cover;
}
.info-box > .info > .avatar > .tip {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: rgb(233, 233, 233);
  text-align: center;
  display: none;
  cursor: pointer;
}
.info-box > .info > .avatar:hover > .tip {
  display: block;
}
.info-box > .info > .avatar > .selectAvatar {
  display: none;
}
</style>
