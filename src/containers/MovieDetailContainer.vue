<style scoped>
    .moviedetail{
        margin-bottom: 57px;
    }
    .movietitle{
        text-align: center;
    }
    .cls{
        width: 110%;
        margin-left: -10px;
    }
    .movieimg{
        background-color: black;
        text-align: center;
    }
    .movieimg img{
        height: 300px;
    }

    .director{
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        width: 23rem;
    }
    .director img{
        margin: 9px;
    }
    .directoritem{
        display: flex;
        flex-direction: column;
    }
</style>

<template>
    <div class="moviedetail" v-if="movie!=null">
        <mt-cell>
            <div slot="title" class="movietitle">
                <strong>{{movie.title}}</strong>
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title" class="cls movieimg">
                <img :src="movie.images.large" :alt="movie.title">
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title">
                类型：<span>{{movie.genres.join("、")}}</span>
                &nbsp;&nbsp;&nbsp;
                综合评分：<mt-badge type="error" v-if="movie.rating.average">{{movie.rating.average}}分</mt-badge><span style="color:#BEBEBE" v-else>暂无评分</span>
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title">
                上映时间：<span>{{movie.year}}</span>
                &nbsp;&nbsp;&nbsp;
                国家：<span>{{movie.countries.join('、')}}</span>
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title">
                <div style="color:#D3D3D3;padding-top: 9px;">剧情简介</div>
                <p style="line-height: 24px;">
                    {{movie.summary}}
                </p>
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title">
                <div style="color:#D3D3D3;padding-top: 9px;">导演</div>
                <div class="director">
                    <div v-for="director in movie.directors" :key="director.id" class="directoritem">
                        <img :src="getimageurl(director.avatars.small)" :alt="director.name" style="width: 6rem; height: 6rem;">
                        <span style="margin:9px;margin-top:3px;font-size:13px;">{{director.name}}</span>
                    </div>
                </div>
            </div>
        </mt-cell>
        <mt-cell>
            <div slot="title">
                <div style="color:#D3D3D3;padding-top: 9px;">演员</div>
                <div class="director">
                    <div v-for="cast in movie.casts" :key="cast.id" class="directoritem">
                        <img :src="getimageurl(cast.avatars.small)" :alt="cast.name" style="width: 6rem; height: 6rem;">
                        <span style="margin:9px;margin-top:3px;font-size:13px;">{{cast.name}}</span>
                    </div>
                </div>
            </div>
        </mt-cell>
    </div>
</template>

<script>
import movieServices from '../services/movieServices.js'
import { MessageBox } from 'mint-ui';

export default {
    data(){
        return{
            movie:null
        }
    },
    mounted(){
        // 显示头部、底部
        this.$store.dispatch('showheader');
        this.$store.dispatch('showfooter');
        let that=this;
        movieServices.Getmoviedetail(that.$route.params.id).then((res)=>{
            console.log(res)
            that.movie=res;
        },(err)=>{
            MessageBox('温馨提示', '内容获取失败！');
        })
    },
    methods: {
        getimageurl(_url) {
            // return url + '?v=' + (new Date()).getTime();
            if( _url !== undefined ){
                var _u = _url.substring( 7 );
                return 'https://images.weserv.nl/?url=' + _u;
            }
        }
    }
}
</script>


