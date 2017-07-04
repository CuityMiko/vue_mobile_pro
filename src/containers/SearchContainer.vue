<template>
    <div>
        <mt-search
            v-model.trim="searchtxt"
            cancel-text="取消"
            placeholder="搜索电影/导演/演员..." @keyup.enter.native="tosearch">
        </mt-search>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            searchtxt:''
        }
    },
    mounted(){
        this.$store.dispatch('hideheader');
    },
    methods:{
        tosearch(){
            if(this.searchtxt.length>0){
                console.log(this.searchtxt)
            }
            else
                Toast('请输入搜索内容！');
        }
    }
}
</script>

