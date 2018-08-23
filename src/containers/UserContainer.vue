<style scoped>
    .nofind img{
        position: fixed;
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="nofind">
        <mt-button type="primary" size="large" plain @click="towxappback">调用小程序返回页面操作</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:'404'
        }
    },
    mounted(){
        // 显示返回按钮
        this.$store.dispatch('showbackbtn');
    },
    methods: {
        towxappback() {
            var _self = this;
            _self.$wecat.miniProgram.getEnv((res) => {
                if (res.miniprogram) { // 小程序环境
                    var _obj = {
                        id: 1,
                        name: '豆瓣电影',
                        value: 'douban_mobile'
                    }
                    _self.$wecat.miniProgram.postMessage({
                        data: _obj
                    })
                    // _self.$wecat.miniProgram.redirectTo({url: '/pages/testh5/index?search=' + JSON.stringify(_obj)});
                    _self.$wecat.miniProgram.navigateBack({delta:1});
                }
            })
        }
    }
}
</script>
