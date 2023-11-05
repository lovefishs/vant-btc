<script setup lang="ts" name="AlarmList">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { showFailToast, showToast } from 'vant'

  import { alarmList } from '@/services'

  const router = useRouter()
  const list = ref([
    {
      id: 1,
      count: 1,
      flow: 'up',
      text: '26000',
      price: 190970.0,
      createTime: '2023-11-05 12:00:00',
    },
    {
      id: 2,
      count: 2,
      flow: 'down',
      text: '25600',
      price: 188032.0,
      createTime: '2023-11-05 13:00:00',
    },
  ])
  const params = ref({
    page: 1,
    pageSize: 10,
  })
  const loading = ref(false)
  const finished = ref(false)
  const error = ref(false)
  const refreshing = ref(false)

  // 返回上一页
  function onClickLeft() {
    router.go(-1)
  }
  function onClickRight() {
    router.push('/alarm/create')
  }

  function onLoad() {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    loading.value = true
    error.value = false
    alarmList(params.value)
      .then((res) => {
        if (res.code === 0) {
          list.value = list.value.concat(res.data.list)
          params.value.page = params.value.page + 1

          if (res.data.list.length < res.data.pageSize) {
            finished.value = true
          }
        } else {
          showFailToast(res.msg)
          error.value = true
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  function onRefresh() {
    finished.value = false
    loading.value = true
    onLoad()
  }

  function onDelete(record: any) {
    console.info('record', record)
    showToast('删除预警记录')
  }

  onMounted(() => {
    onLoad()
  })
</script>

<template>
  <van-nav-bar
    title="预警记录"
    left-text="返回"
    left-arrow
    right-text="配置"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

  <div class="alarm-wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
        class="alarm-list"
      >
        <van-cell v-for="item in list" :key="item.id">
          <div class="alarm-item">
            <div class="alarm-content">
              <van-icon name="phone" class="alarm-icon" />
              <div class="alarm-count">{{ item.count }}次</div>
              <div class="alarm-text">
                <span v-if="item.flow === 'up'">上涨至</span>
                <span v-else>下跌至</span>
                <span class="symbol">$</span>
                <strong>{{ item.text }}</strong>
              </div>
              <div class="alarm-price">(<span class="symbol">$</span>{{ item.price }})</div>
            </div>
            <div class="alarm-action">
              <van-button round type="danger" size="mini" class="del-btn" @click="onDelete(item)">
                <van-icon name="minus" />
              </van-button>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
  .alarm-wrap {
    padding: 16px 0;
  }
  .alarm-list {
  }
  .alarm-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
  }
  .alarm-content,
  .alarm-action {
    display: flex;
    align-items: center;
    gap: 0 4px;
  }
  .alarm-action {
    .del-btn {
      width: 20px;
      height: 20px;
    }
  }
  .alarm-icon {
    font-size: 20px;
    color: #1989fa;
  }
  .alarm-count {
    min-width: 40px;
    text-align: center;
    color: #fff;
    background: #1989fa;
    border-radius: 2px;
  }
  .alarm-text {
    display: flex;
    align-items: center;
    gap: 0 2px;

    .symbol,
    strong {
      font-weight: 600;
    }
  }
  .alarm-price {
    color: #999;
  }
</style>
