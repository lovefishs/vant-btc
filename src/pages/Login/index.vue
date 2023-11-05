<script setup lang="ts" name="Login">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { showFailToast } from 'vant'

  import avatarImg from '@/assets/avatar.svg'
  import { userLogin } from '@/services'

  const router = useRouter()
  const phone = ref('')
  const password = ref('')

  // 返回上一页
  function onClickLeft() {
    router.go(-1)
  }

  function onSubmit(values: any) {
    if (values.phone && values.password) {
      userLogin(values)
        .then((res: any) => {
          console.info('login res', res)

          setTimeout(() => router.push('/alarm'), 1000)
        })
        .catch((error) => {
          showFailToast(`错误: ${error}`)
        })
    }
  }
</script>

<template>
  <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div class="login">
    <img class="mb-12px" :src="avatarImg" alt="Avatar" />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          left-icon="phone-o"
          name="phone"
          type="tel"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="password"
          left-icon="manager-o"
          type="password"
          name="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>

  <div class="find">
    <router-link to="/register"><span>注册新用户</span></router-link>
    <router-link to="/find-pwd"><span>找回密码</span></router-link>
  </div>

  <!-- <div class="ways">
    <span>其他登录方式</span>
    <div>
      <span class="iconfont">&#xe882;</span>
      <span class="iconfont">&#xe600;</span>
      <span class="iconfont">&#xe65a;</span>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
  .login {
    width: 100%;
    margin-top: 4vw;
  }

  .login img {
    margin-left: 50vw;
    max-width: 20vw;
    transform: translate(-50%, 0);
  }

  .find {
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: space-between;
  }

  .find span {
    color: #0079fe;
  }

  /*
  .ways {
    width: 80%;
    margin: 7.6667vw auto;
    text-align: center;
  }

  .ways > span {
    display: block;
    margin-bottom: 5.3333vw;
    color: #999999;
  }
  .ways div {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-around;
  }
  .ways div span {
    font-size: 8.3333vw;
  }
  */
</style>
