<script setup lang="ts" name="Login">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { showFailToast } from 'vant'

  import avatarImg from '@/assets/avatar.svg'
  import { userRegister } from '@/services'

  const router = useRouter()
  const phone = ref('')
  const password = ref('')
  const sms = ref('')

  // 返回上一页
  function onClickLeft() {
    router.go(-1)
  }

  function onSubmit(values: any) {
    if (values.phone && values.password) {
      userRegister(values)
        .then((res: any) => {
          console.info('register res', res)

          setTimeout(() => router.push('/alarm'), 1000)
        })
        .catch((error) => {
          showFailToast(`错误: ${error}`)
        })
    }
  }
</script>

<template>
  <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div class="login">
    <img class="mb-12px" :src="avatarImg" alt="Avatar" />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          clearable
          left-icon="phone-o"
          name="phone"
          type="tel"
          placeholder="手机号码"
          maxlength="11"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="sms"
          left-icon="award-o"
          clearable
          placeholder="短信验证码"
          maxlength="6"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <van-field
          v-model="password"
          clearable
          left-icon="manager-o"
          type="password"
          name="password"
          placeholder="密码"
          maxlength="20"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 注册 </van-button>
      </div>
    </van-form>
  </div>

  <div class="find">
    <router-link to="/login"><span>已有账号去登录</span></router-link>
    <router-link to="/find-pwd"><span>找回密码</span></router-link>
  </div>
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
</style>
