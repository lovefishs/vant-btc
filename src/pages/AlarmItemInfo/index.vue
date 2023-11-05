<script setup lang="ts" name="AlarmItemInfo">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  onMounted(() => {
    console.info('page:mounted: AlarmItemInfo')
    console.info('route', route)
  })
</script>

<template>
  <div class="alarm-item-info">
    alarm item info
  </div>
</template>

<style lang="scss" scoped>
  .alarm-item-info {
    padding: 16px;
  }
</style>
