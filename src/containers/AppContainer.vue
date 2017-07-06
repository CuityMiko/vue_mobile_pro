<style>
    body{
        margin: 0px;
    }
    .content{
        position:absolute;
        width: 100%;
        height: 100%;
        /*margin-top: 36px;*/
    }
</style>

<template>
    <div class="container">
        <!--Header-->
        <proHeader :title="title"></proHeader>
        <!--Content-->
        <div class="content">
            <router-view></router-view>
        </div>
        <!--Footer-->
        <proFooter></proFooter>
        <BackTop></BackTop>
    </div>
</template>

<script>
import proHeader from '../components/HeaderComponent.vue'
import proFooter from '../components/FooterComponent.vue'
import BackTop from '../components/BackTopComponent.vue'

export default {
    data(){
        return{
            title:'vue mobile pro'
        }
    },
    components:{
        proHeader,
        proFooter,
        BackTop
    }
}
</script>


