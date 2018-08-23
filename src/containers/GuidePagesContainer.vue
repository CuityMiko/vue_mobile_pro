<style scoped>
    .guide{
        height: 100%;
        overflow:hidden;
    }

    .guide img{
        height: 100%;
        width: 100%;
    }

    .mint-button{
        position: absolute;
        bottom: 90px;
        left: 50%;
        width: 180px;
        margin-left: -90px;
        background-color: #BEBEBE;
        border: 1px solid #fff;
        color: Green;
        font-size: 24px;
        height: 50px;
    }
</style>

<template>
    <div class="guide">
        <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
            <mt-swipe-item v-for="(movie,index) in movielist" :key="movie.id">
                <img :src="movie.images.large" :alt="movie.title">
                <mt-button v-show="(movielist.length-1)==index" type="primary" size="large" plain @click="gohome">立即体验</mt-button>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
// 电影初始化缓存数据
import movieCacheData from '../caches/movieCacheData.js'
import { Indicator } from 'mint-ui';

export default {
    data(){
        return{
            movielist:[]
        }
    },
    methods:{
        gohome(){
            this.$router.push('/home')
        },
        initdata(){ // 初始化数据
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            let that=this;
            movieCacheData.coming_soonData().then((res)=>{
                Indicator.close();
                that.movielist=res.subjects.slice(0,5);
            })
        }
    },
    mounted(){
        this.initdata();
    }
}
</script>