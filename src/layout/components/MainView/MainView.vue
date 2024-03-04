<template>
  <router-view>
    <template #default="{ Component, route }">
      <!-- <keep-alive>
        <component :is="Component":key="route.fullPath"></component>
      </keep-alive> -->
      <component :is="Component" :key="route.fullPath" />
    </template>
  </router-view>
</template>
