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
        height: 50px
    }
</style>

<template>
    <div class="guide">
        <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
            <mt-swipe-item>
                <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471315752.webp" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471580153.webp" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460388855.webp" alt="">
                <mt-button type="primary" size="large" plain @click="gohome">立即体验</mt-button>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
// 电影初始化缓存数据
import movieCacheData from '../caches/movieCacheData.js'

export default {
    data(){
        return{

        }
    },
    methods:{
        gohome(){
            this.$router.push('/home')
        }
    },
    mounted(){
        movieCacheData.coming_soonData().then((res)=>{
            console.log(res)
        })
    }
}
</script>