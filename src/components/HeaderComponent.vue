<style>

</style>
<template>
    <mt-header :title="title" v-show="isheader" :fixed="false">
        <mt-button icon="back" v-show="isback" slot="left" @click="$router.go(-1)">返回</mt-button>
        <mt-button icon="search" v-show="issearch" slot="right" @click="$router.push('/search')"></mt-button>
    </mt-header>
</template>

<script>
// mapActions:管理所有事件的行为
// mapActions:获取数据(等同于this.$store.state.data)
import { mapActions,mapGetters } from 'vuex'

export default {
    data(){
        return{
            issearch:true // 是否显示搜索按钮
        }
    },
    computed:{
        ...mapGetters(['isheader','isback']),
    },
    props:['title'],
    methods:{
        // 是否显示头部操作
        changeHeader(path){
            // guide 隐藏头部
            if(path.indexOf('guide')>-1)
                this.$store.dispatch('hideheader');
            else
                this.$store.dispatch('showheader');
        }
    },
    watch:{
        $route(to,from){
            this.changeHeader(to.path)
        }
    }
}
</script>


