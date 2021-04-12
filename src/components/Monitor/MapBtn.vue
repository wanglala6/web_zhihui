<template>
  <div class="flex" @click="isShow">
    <div class="btn-value">{{ value }}</div>
    <div :class="[{ active: isActive }, iconClass]" class="btn-icon"></div>
  </div>
</template>

<script>
export default {
  name: "MapBtn",
  props: ["value", "iconClass", "isActive"],
  data() {
    return {};
  },
  methods: {
    isShow() {
      this.isActive = !this.isActive;
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
