<style scoped>
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="home">
        <mt-cell title="正在热映" is-link to="/movie/in_theaters">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471315752.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471580153.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460388855.webp" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-cell title="即将上映" is-link to="/movie/coming_soon">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471315752.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471580153.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460388855.webp" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-cell title="口碑榜单" is-link to="/movie/top250">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471315752.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2471580153.webp" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460388855.webp" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
import movieServices from '../services/movieServices.js'

export default {
    data(){
        return{
            title:'首页'
        }
    },
    mounted(){
        // 不显示返回按钮
        this.$store.dispatch('hidebackbtn');
        
        // let _params={
        //     start:0,
        //     count:7,
        //     city:'杭州',
        //     q:''
        // }
        // movieServices.getmoviedata('coming_soon',_params).then((res)=>{
        //     console.log(res)
        // },(err)=>{
        //     console.log(err);
        // })
    }
}
</script>


