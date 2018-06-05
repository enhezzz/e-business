<template>
    <div class="address-info">
        <div class="current-addrs">
            <div class="addr" v-for="(addr,index) of addrs" :key="index">
                <div class="property clearfix">
                    <div class="name">{{addr}}</div>
                    <div class="opera">
                        <a href="javascript:;" @click.prevent="editAddr(index)">编辑</a>
                        <a href="javascript:;">删除</a>
                    </div>
                </div>
                <div class="editor-box" :class="{hidden: hiddenEditor[index]}">
                    <textarea name="" id="" cols="30" rows="10" width=500 class="editor" :value="addr"
                     @change="updateEditedVal($event,index)">
                    </textarea>
                    <button @click="updateAddr(index)">修改</button>
                    <button @click="cancleEdit(index)">取消</button>
                </div>

            </div>
        </div>
        <div class="add-addrs">
            <div class="addr-input" :class="{hidden: hiddenAddr}">
                <textarea class="newAddr" v-model="newAddr"></textarea>
                <button @click="ensureAddAddr">添加</button>
                <button @click="cancelAdd">取消</button>
            </div>
            <a href="javascript:;" @click.prevent="addAddress">添加新的收货地址</a>
        </div>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      hiddenAddr: true,
      hiddenEditor: [],
      newAddr: '请输入新的地址...',
      editedVal: [],
      addrs: [],
    };
  },
  beforeRouteEnter(to, from, next){
     if(fetch){
         let request = new Request('/personalCenter/address');
         fetch(request,{
             credentials: 'same-origin'
         }).then(response=>{
             return response.json();
         }).then(addrs=>{
             next(vm=>{
                vm.addrs = addrs;
                vm.editedVal = [].concat(addrs);
                vm.hiddenEditor = (new Array(addrs.length)).fill(true);
                console.log(vm.hiddenEditor)
             })
         }).catch(err=>{
             console.log(err)
             if(err){
                 next(vm=>{
                 vm.$router.push({name: 'login'});
             })
             };
             
         })
     }
  },
  methods: {
    addAddress() {
      this.hiddenAddr = false;
    },
    cancelAdd(index) {
       this.hiddenAddr = true;
    },
    editAddr(index){
        this.hiddenEditor.splice(index,1,false);
        // this.hiddenEditor[index] = false;
    },
    cancleEdit(index){
        this.hiddenEditor.splice(index,1,true);
    },
    ensureAddAddr(){
        if(fetch){
            console.log(this.newAddr)
            let request = new Request('/personalCenter/address');
            let formData = new FormData();
            formData.append('newAddr',this.newAddr);
            fetch(request,{
                credentials: 'same-origin',
                method: 'post',
                body: formData
            }).then(response=>{
                return response.text();
            }).then((newAddr)=>{
                this.addrs.push(newAddr);
                console.log(this.addrs)
            }).catch((err)=>{
                if(err) throw err;
            })
        }
    },
    updateEditedVal(event,index){
        event = event || window.event;
        let target = event.target || event.srcElement;
        this.editedVal[index] = target.value;
        // this.editedVal = target.value;
    },
    updateAddr(index){
        let initVal = this.addrs[index];
        let editedVal = this.editedVal[index];
        if(initVal == editedVal){
            alert('你还未修改');
        }else{
            if(fetch){
                let request = new Request('/personalCenter/address');
                let formData = new FormData();
                formData.append('index',index);
                formData.append('editedVal',editedVal);
                fetch(request,{
                    method: 'put',
                    credentials: 'same-origin',
                    body: formData
                }).then(response=>{
                    console.log(response)
                    return response.text();
                }).then((editedVal)=>{
                    this.addrs.splice(index,1,editedVal)
                    this.hiddenEditor.splice(index,1,true)
                    // this.addrs[index] = editedVal;
                    console.log(this.addrs)
                }).catch(err=>{
                    if(err){
                        alert('修改失败')
                        throw err;
                    } 
                })
            }
        }
        
    }
  }
};
</script>
<style scoped>
.address-info {
  margin-left: 50px;
}
.address-info .current-addrs {
  border: 1px solid #ccc;
}
.address-info .current-addrs > .addr {
  /* border-bottom: 1px solid #eee; */
}
.address-info .current-addrs > .addr .property{
  border-bottom: 1px solid #eee;
}
.address-info .current-addrs > .addr .name {
  float: left;
  width: 500px;
  height: 35px;
  border-right: 1px solid #eee;
}
.address-info .current-addrs > .addr .opera {
  float: left;
  margin-left: 10px;
}
.address-info .current-addrs > .addr>.editor-box.hidden{
    display: none
}
.address-info .current-addrs > .addr>.editor-box>.editor  {
    width: 500px
}
.address-info .add-addrs .addr-input.hidden {
  display: none;
}
.address-info .add-addrs .addr-input .newAddr {
  width: 500px;
  height: 100px;
}
</style>
