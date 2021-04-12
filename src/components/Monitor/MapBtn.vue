<template>
  <div class="flex" @click="isShow">
    <div class="btn-value">{{ value }}</div>
    <div
      :class="[{ active: isActive }, iconClass]"
      class="btn-icon"
      v-clickoutside="handleClose"
    ></div>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

export default {
  name: "MapBtn",
  props: ["value", "iconClass", "isActive"],
  data() {
    return {};
  },
  directives: { clickoutside },
  methods: {
    isShow() {
      this.isActive = !this.isActive;
    },
    handleClose(e) {
      this.isActive = false;
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
}

.btn-value {
  color: #000000;
  text-align: center;
  padding: 0px 20px 0px 10px;
  margin-right: -15px;
  font-size: 12px;
  line-height: 32px;
  font-weight: normal;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 4px 0 rgb(130 130 130 / 50%);
  border-radius: 12px;
}

.btn-icon {
  background-color: #244353;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  color: #ffffff;
}

.active {
  background-color: #ffd200;
  color: #000;
}
</style>
