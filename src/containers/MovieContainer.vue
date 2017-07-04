<style scoped>
    .mint-tab-container-item{
        margin-bottom: 60px;
    }
</style>

<template>
    <div>
        <mt-navbar v-model="selected" :fixed="isfixed">
            <mt-tab-item id="1">正在热映</mt-tab-item>
            <mt-tab-item id="2">即将上映</mt-tab-item>
            <mt-tab-item id="3">口碑榜单</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected" :swipeable="true">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 30" :title="'内容 ' + n" :key="n" ></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selected:'1',
            isfixed:false,
            page:1
        }
    },
    methods:{
        fixedTop(){
            window.onscroll= function(){
                //变量t是滚动条滚动时，距离顶部的距离
                var t = document.documentElement.scrollTop||document.body.scrollTop;
                //当滚动到距离顶部100px时，navbar置顶
                if(t>=100)
                    this.isfixed=true;
                else
                    this.isfixed=false;
            }.bind(this)
        },
        defaultTab(){
            switch (this.$route.params.type) {
                case "in_theaters":
                    this.selected="1";
                    break;
                case "coming_soon":
                    this.selected="2";
                    break;
                case "top250":
                    this.selected="3";
                    break;
                default:
                    this.selected="1";
                    break;
            }
        }
    },
    mounted(){
        // 固定高度
        this.fixedTop();
        // 显示返回按钮
        this.$store.dispatch('showbackbtn');
        // 默认选中选项卡
        this.defaultTab();
    }
}
</script>