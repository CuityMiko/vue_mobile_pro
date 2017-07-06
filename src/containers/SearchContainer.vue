<style scoped>
    .mint-search {
        height: 100%;
        overflow: hidden;
    }
    .searchmovie{
        margin-bottom: 60px;
    }
</style>

<template>
    <div class="searchmovie">
        <mt-search
            v-model.trim="searchtxt"
            cancel-text="取消"
            placeholder="搜索电影/导演/演员..." @keyup.enter.native="gosearch">
        </mt-search>
        <MovieList :movietype="'search'" :search="tosearch"></MovieList>
    </div>
</template>
<script>
import MovieList from '../components/MovieListComponent.vue'
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            searchtxt:'',
            tosearch:''
        }
    },
    mounted(){
        this.$store.dispatch('hideheader');
    },
    methods:{
        gosearch(){
            if(this.searchtxt.length>0){
                this.tosearch=this.searchtxt;
                this.searchtxt="";
            }
            else
                Toast('请输入搜索内容！');
        }
    },
    components:{
        MovieList
    }
}
</script>

