<style scoped>
    .nofind img{
        position: fixed;
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="nofind">
        <img src="../assets/images/404.jpg" alt="404">
        <!--<mt-button type="primary" size="large" plain>返 回 首 页</mt-button>-->
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:'404'
        }
    },
    mounted(){
        // 显示返回按钮
        this.$store.dispatch('showbackbtn');
    }
}
</script>
