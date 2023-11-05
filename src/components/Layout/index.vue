<script setup lang="ts">
  import { useVantConfigStore } from '@/stores'

  const vantConfigStore = useVantConfigStore()
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="vantConfigStore.theme">
      <router-view />
    </van-config-provider>
  </div>
</template>

<style scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    background: #f7f8fa;
  }
</style>
