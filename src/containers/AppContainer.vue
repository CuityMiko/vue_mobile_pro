<style>
    body{
        margin: 0px;
    }
    .content{
        position:absolute;
        width: 100%;
        height: 100%;
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
    </div>
</template>

<script>
import proHeader from '../components/HeaderComponent.vue'
import proFooter from '../components/FooterComponent.vue'

export default {
    data(){
        return{
            title:'vue mobile pro'
        }
    },
    components:{
        proHeader,
        proFooter
    }
}
</script>


