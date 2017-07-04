<style scoped>
    .loading-box{
        color: red;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>

<template>
    <div class="loading-box">
        <img :src='url' :alt="loadinginfo" width="75" height="75">
        <strong>{{loadinginfo}}</strong>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'加载中...',
            url:'/components/loading/images/loading.gif'
        }
    },
    props:['title'],
    computed:{
        loadinginfo(){
            if(this.title)
                return this.title;
            else
                return this.msg;
        }
    }
}
</script>


