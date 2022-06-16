<template>
  <div class="home">
    <div class="login">
      <div class="inner-content">
        <p>基于 vue-cli5 + vue + vuex + axios 简易脚手架</p>
        <img src="@/assets/images/hello.svg" alt="hello" class="welcome" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 30px;
  text-align: center;
  .inner-content {
    .welcome {
      width: 460px;
      margin-top: 20px;
    }
  }
}
</style>
