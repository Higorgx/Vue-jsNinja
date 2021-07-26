<template>
  <div id="app">
    <div class="bg-dark p-2">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <h4 class="text-white">VueJs Ninja</h4>
      </nav>
    </div>
      <br>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
