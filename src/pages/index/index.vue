<template>
  <view class="index">
    <view>
      <img src="" alt="" />
    </view>
    {{ msg }}
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">点我</nut-button>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'XmIndex',
};
</script>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import Taro, { useLoad } from '@tarojs/taro';
import API from '@/api';
import { retryGetToken } from '@/utils';
useLoad(() => {
  handleLoginConfirm();
});
//
const state = reactive({
  msg: '欢迎使用 NutUI3.x 开发小程序',
  msg2: '你成功了～',
  type: 'text',
  show: false,
  cover: false,
});

// 确定扫码状态
async function handleLoginConfirm() {
  const router = Taro.getCurrentInstance().router;
  const { scene = null } = router ? router.params : {};
  console.log('场景scene:', scene);
  if (!scene) return;
  //
  const token = await retryGetToken();
  if (!token) return;
  await API.auth.loginConfirm({ sc: scene });
  Taro.showToast({
    title: `扫码成功`,
    icon: 'success',
    duration: 2000,
  });
}

const handleClick = (type, msg, cover = false) => {
  state.show = true;
  state.msg2 = msg;
  state.type = type;
  state.cover = cover;
};
const { msg, msg2, type, show, cover } = toRefs(state);
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
