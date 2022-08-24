<script lang="ts">
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView
  }
};
</script>

<template>
  <RouterView />
</template>

<style>
  .bg_1{
    background-color: #f7f7f7;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.25' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  }
</style>
