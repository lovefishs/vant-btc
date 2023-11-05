<script setup lang="ts" name="AlarmItem">
  import { onMounted, ref } from 'vue'
  import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router'

  const route = useRoute()
  const alarmRecord = ref<any>(null)

  onMounted(() => {
    console.info('page:mounted: AlarmItem')

    if (route.params.id) {
      alarmRecord.value = `${route.params.id}-${new Date().valueOf()}`
    }
  })

  // 与 beforeRouteLeave 相同
  onBeforeRouteLeave((to, from) => {
    console.info(to, from)
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')

    // // 取消导航并停留在同一页面上
    // if (!answer) {
    //   return false
    // }
  })

  // 与 beforeRouteUpdate 相同
  onBeforeRouteUpdate(async (to, from) => {
    // 仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
    if (to.params.id !== from.params.id) {
      // alarmRecord.value = await fetchUser(to.params.id)
      alarmRecord.value = `${to.params.id}-${new Date().valueOf()}`
    }
  })
</script>

<template>
  <div class="alarm-item">
    <router-view v-if="alarmRecord" />
    <van-loading v-else />
  </div>
</template>

<style lang="scss" scoped>
  .alarm-item {
    padding: 16px;
  }
</style>
