<template>
    <div class="info-box">
        <div class="info">
            <div class="avatar">
                <div class="tip" @click="updateAvatar">修改头像</div>
                <input type="file" class="selectAvatar">
            </div>

        </div>
    </div>
</template>
<script>
export default {
    methods: {
        updateAvatar(event){
            event = event || window.event;
            let srcTarget = event.target || event.srcElement;
            let fileSelector = srcTarget.nextElementSibling;
            fileSelector.click();
        }
    }
}
</script>
<style>
.info-box{
    display: flex;
    justify-content: center
}
.info-box>.info{
    width: 500px;
}
.info-box>.info>.avatar{
    width: 150px;
    height: 150px;
    margin: 50px auto;
    border: 1px solid #cccccc;
    border-radius: 50%;
    position: relative;
    z-index: 99;
    overflow: hidden;
}
.info-box>.info>.avatar>.tip{
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
.info-box>.info>.avatar:hover>.tip{
    display: block;
}
.info-box>.info>.avatar>.selectAvatar{
    display: none;
}

</style>
