
/**
 * 自定义Loading插件
 * 一般都是默认index.js文件
 */
import LoadingComponent from './components/LoadingComponent.vue'

const Loading = {
	install: function(Vue) { // install是Vue使用并将Vue实例作为参数传进来(即:Vue.use()方法)
		Vue.component('Loading', LoadingComponent) // 将Loading作为Vue的自定义组件
	}
};

export default Loading