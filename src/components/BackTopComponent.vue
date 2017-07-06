<template>
  <div @click.prevent="backTop">
    <img id="backtop" v-show="show" src="../assets/images/top.png" alt="回到顶部">
  </div>
</template>

<script>
  export default {
    name: 'backTop',
    data () {
      return {
        show:false
      };
    },
    methods: {
      backTop(){
        var that = this;
        var top = document.body.scrollTop;
        top -= Math.abs(top * that.speed);
        if (top <= 1) {
          top = 0;
        }
        document.body.scrollTop = top;
      }
   },
   mounted(){
      window.onscroll= function(){
          //变量t是滚动条滚动时，距离顶部的距离
          var t = document.documentElement.scrollTop||document.body.scrollTop;
          if(t>(window.screen.height-30)){
              this.show = true;
          }else{
              this.show = false;
          }
      }.bind(this)
   }
 };
</script>

<style scoped>
  #backtop{
      width: 2.4rem;
      height: 2.4rem;
      position: fixed;
      z-index: 99999;
      bottom: 5rem;
      right: 0.53333333rem;
  }
</style>