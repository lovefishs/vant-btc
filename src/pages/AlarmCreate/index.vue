<script setup lang="ts" name="AlarmCreate">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { showFailToast } from 'vant'

  import { createAlarm } from '@/services'

  const router = useRouter()
  const typeOptions = ref([
    { text: '价格涨至', value: 'up' },
    { text: '价格跌至', value: 'down' },
  ])
  const showType = ref(false)
  const type = ref(typeOptions.value[0].value) // 提醒类型
  const typeText = ref(typeOptions.value[0].text)
  const price = ref('') // 数值
  const frequencyOptions = ref([
    { text: '仅提醒 1 次', value: 'once' },
    { text: '每次都提醒', value: 'everyone' },
  ])
  const showFrequency = ref(false)
  const frequency = ref(frequencyOptions.value[0].value) // 频率
  const frequencyText = ref(frequencyOptions.value[0].text)
  const styleOptions = ref([
    { text: '语音预警', value: 'voice' },
    { text: 'APP 通知', value: 'app-notice' },
    { text: 'PC 通知', value: 'pc-notice' },
  ])
  const showStyle = ref(false)
  const style = ref(styleOptions.value[0].value) // 方式
  const styleText = ref(styleOptions.value[0].text)
  const remark = ref('')

  // 返回上一页
  function onClickLeft() {
    router.go(-1)
  }
  function onClickRight() {
    router.push('/alarm')
  }

  function onTypeConfirm({ selectedOptions }: any) {
    type.value = selectedOptions[0]?.value ?? ''
    typeText.value = selectedOptions[0]?.text ?? ''
    showType.value = false
  }
  function onFrequencyConfirm({ selectedOptions }: any) {
    frequency.value = selectedOptions[0]?.value ?? ''
    frequencyText.value = selectedOptions[0]?.text ?? ''
    showFrequency.value = false
  }
  function onStyleConfirm({ selectedOptions }: any) {
    style.value = selectedOptions[0]?.value ?? ''
    styleText.value = selectedOptions[0]?.text ?? ''
    showStyle.value = false
  }

  function onSubmit(values: any) {
    const params = {
      ...values,
      type: type.value,
      frequency: frequency.value,
      price: Number(price.value),
    }

    createAlarm(params)
      .then((res: any) => {
        console.info('alarm create res', res)

        setTimeout(() => router.push('/alarm'), 1000)
      })
      .catch((error) => {
        showFailToast(`错误: ${error}`)
      })
  }

  onMounted(() => {
    console.info('page:mounted: AlarmCreate')
  })
</script>

<template>
  <van-nav-bar
    title="创建预警"
    left-text="返回"
    left-arrow
    right-text="列表"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

  <div class="alarm-wrap">
    <div class="price-info">
      <div class="price-info_item">
        <div class="left">
          <strong>BTC</strong>
          <small><span>/USDT</span></small>
        </div>
        <div class="right">
          <small>$</small>
          <strong class="ml-4px">25825.1</strong>
        </div>
      </div>
      <div class="price-info_item">
        <div class="left">
          <i class="cubeic-aim"></i>
          <span class="ml-4px">欧易OKX USDT永续</span>
        </div>
        <div class="right">
          <span>￥189,685.36</span>
          <em class="ml-8px">-0.19%</em>
        </div>
      </div>
    </div>

    <van-form @submit="onSubmit">
      <div class="alarm-form mt-12px">
        <van-cell-group inset>
          <van-field
            v-model="typeText"
            is-link
            readonly
            name="type"
            label="提醒类型"
            placeholder="点击选择类型"
            :rules="[{ required: true, message: '请选择类型' }]"
            @click="showType = true"
          />
          <van-popup v-model:show="showType" position="bottom">
            <van-picker
              :columns="typeOptions"
              @confirm="onTypeConfirm"
              @cancel="showType = false"
            />
          </van-popup>

          <van-field
            v-model="price"
            type="number"
            name="price"
            label="预警数值"
            placeholder="填写数值"
            :rules="[{ required: true, message: '请填写数值' }]"
          >
            <template #button>
              <van-button size="small" class="price-tip">USDT</van-button>
            </template>
          </van-field>

          <van-field
            v-model="frequencyText"
            is-link
            readonly
            name="frequency"
            label="预警频率"
            placeholder="点击选择频率"
            :rules="[{ required: true, message: '请选择预警频率' }]"
            @click="showFrequency = true"
          />
          <van-popup v-model:show="showFrequency" position="bottom">
            <van-picker
              :columns="frequencyOptions"
              @confirm="onFrequencyConfirm"
              @cancel="showFrequency = false"
            />
          </van-popup>

          <van-field
            v-model="styleText"
            is-link
            readonly
            name="style"
            label="预警方式"
            placeholder="点击选择方式"
            :rules="[{ required: true, message: '请选择预警方式' }]"
            @click="showStyle = true"
          />
          <van-popup v-model:show="showStyle" position="bottom">
            <van-picker
              :columns="styleOptions"
              @confirm="onStyleConfirm"
              @cancel="showStyle = false"
            />
          </van-popup>

          <van-field
            v-model="remark"
            rows="1"
            autosize
            label="备注"
            type="textarea"
            placeholder="选填，限 10 字"
            maxlength="10"
            show-word-limit
          />
        </van-cell-group>
      </div>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" class="btn-submit">
          <template #default>
            <div class="btn-submit-inner">
              <span>创建预警</span>
              <span class="tip">24-09-10 到期(365 天)</span>
            </div>
          </template>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
  .alarm-wrap {
  }

  .price-info {
    margin: 16px;
    padding: 12px;
    height: 64px;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;

    &_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      height: 20px;
      line-height: 20px;
    }

    .left,
    .right {
      display: inline-flex;
      align-items: center;
    }

    span {
      color: #bbb;
    }
    strong {
      font-size: 16px;
      font-weight: 600;
      color: #2c2b2f;
    }
    small {
      position: relative;
      margin-bottom: -2px;
      font-size: 12px;
      color: #2c2b2f;
    }
    em {
      font-style: normal;
      color: #df483f;
    }
    i {
      color: #2c2b2f;
    }
  }

  .alarm-form {
    padding: 16px 0;
    background: #fff;

    :deep(.van-field__label) {
      color: #666;
    }
  }
  .price-tip {
    display: block;
    height: 24px;
    color: #999;
    border: none;
    border-left: 1px solid #dcdee0;
  }

  .btn-submit {
    :deep(.van-button__text) {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .btn-submit-inner {
    position: relative;
    height: 100%;
    line-height: 42px;

    .tip {
      position: absolute;
      top: 2px;
      margin-left: 4px;
      padding: 0 4px;
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      border: 1px solid #78b0ff;
      background: #5293ff;
      border-radius: 8px 8px 8px 0;
    }
  }
</style>
