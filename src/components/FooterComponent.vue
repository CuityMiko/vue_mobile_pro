<style>
</style>

<template>
    <mt-tabbar v-model="selected" v-show="isfooter" :fixed="isfooter">
        <mt-tab-item id="1">
            <router-link to='/home' tag="div" slot="icon">
            <img src="../assets/images/home.ico" width="27" height="27">
            </router-link>
            首页
        </mt-tab-item>
        <mt-tab-item id="2">
            <router-link to='/movie/in_theaters' tag="div" slot="icon">
            <img src="../assets/images/list.ico" width="27" height="27">
            </router-link>
            电影列表
        </mt-tab-item>
        <mt-tab-item id="3">
            <router-link to='/user' tag="div" slot="icon">
            <img src="../assets/images/user.ico" width="27" height="27">
            </router-link>
            我的
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            selected:'1'
        }
    },
    computed:{
        ...mapGetters(['isfooter']) // 是否显示底部
    },
    methods:{
        // 是否显示底部操作
        changefooter(path){
            // guide 隐藏底部
            if(path.indexOf('guide')>-1)
                this.$store.dispatch('hidefooter');
            else
                this.$store.dispatch('showfooter');
        }
    },
    watch:{
        $route(to,from){
            this.changefooter(to.path)
        }
    }
}
</script>

