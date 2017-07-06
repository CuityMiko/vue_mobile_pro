<style>

</style>

<template>
    <mt-loadmore :bottom-method="loaditBottom" :bottom-loaded="itLoaded" :bottom-all-loaded="itallLoaded" ref="itloadmore">
        <mt-cell-swipe
            v-for="movie in in_theaters" :key="movie.id"
            is-link
            :right="[
                {
                    content: '收藏',
                    style: { background: '#2E8B57', color: '#fff',padding:'39px 10px' },
                    handler: () => {
                        // this.$messagebox('添加')
                    }
                }
            ]">
            <div slot="icon" class="movieitem">
                <img :src="movie.images.small" :alt="movie.title">
                <div class="iteminfo">
                    <strong class="title">{{movie.title}}</strong>
                    <span class="cls">类型：{{movie.genres.join("、")}}</span>
                    <div class="cls">
                        导演：<span v-for="(director,index) in movie.directors" :key="director.id">{{director.name}}<span v-if="!(index==movie.directors.length-1)">、</span></span>
                    </div>
                    <span class="cls">上映时间：{{movie.year}}年</span>
                    <span class="cls">评分：<mt-badge type="error" v-if="movie.rating.average">{{movie.rating.average}}分</mt-badge><span style="color:#BEBEBE" v-else>暂无评分</span></span>
                </div>
            </div>
        </mt-cell-swipe>
    </mt-loadmore>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>


