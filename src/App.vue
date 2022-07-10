<template>
  <app-provider>
    <router-view />
  </app-provider>
</template>

<script lang="ts" setup>
  import { AppProvider } from "/@/components/Application";
  console.log("hello");
</script>
