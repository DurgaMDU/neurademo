<script setup lang="ts">
import { onBeforeMount } from "vue-demi";
import { RouterLink, RouterView } from "vue-router";
import { useMainStore } from "./stores/main";

const mainStore = useMainStore();

onBeforeMount(async () => {
  await mainStore.init();
});
</script>

<template>
<div class="navbar">
  <RouterLink
          v-for="route in mainStore.routes"
          :to="route.to"
          :key="route.to"
          >{{ route.text }}</RouterLink >
</div>
<div class="main">
  <RouterView />  
</div>

</template>

<style lang="scss" >

.navbar {
  overflow: hidden;
  background-color: #333;
  top: 0;
  /*position: fixed;
  width: 100%;*/
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background: #ddd;
  color: black;
}

a.router-link-exact-active {
  background: #83847d;
  color: black;
}

.main {
  padding: 16px;
  margin-top: 30px;
  height: 1500px; /* Used in this example to enable scrolling */
}

header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 0 auto;
  margin-bottom: 10vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
 
.container {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

table {
  thead {
    background-color: #ddd;

    tr {
      td {
        font-weight: bold;
      }
    }
  }

  tr {
    td {
      padding: 5px 10px;
    }
  }

  tr:nth-child(even) {
    background-color: #f0f0f0;
  }
  
}
.error{
  border-color: rgb(176, 0, 32);
  color: rgb(176, 0, 32);
  border-style: solid;
  border-width: 0.666667px;
  background-color: rgba(0, 0, 0, 0);
  line-height: 24px;
  margin: 5px;
  padding-right: 16px;
}
.success{
  border-color: rgb(76, 175, 80);
  color: rgb(76, 175, 80);
  border-style: solid;
  border-width: 0.666667px;
  background-color: rgba(0, 0, 0, 0);
  line-height: 24px;
  margin: 5px;
  padding-right: 16px;
}
@keyframes loding-div {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}

.loding-div div {
  position: absolute;
  animation: loding-div 1s linear infinite;
  width: 12px;
  height: 12px;
  top: 5px;
  left: 5px;
  border-radius: 50%;
  box-shadow: 0 1.8px 0 0 #e15b64;
  transform-origin: 6px 6.9px;
}
.loading-spinner {
  border-color: rgb(76, 175, 80);
    color: rgb(76, 175, 80);
    border-style: solid;
    border-width: 0.666667px;
    background-color: rgba(0, 0, 0, 0);
    line-height: 24px;
    margin: 5px;
    padding: 5px;
    overflow: hidden;
    width: 100%;
    text-align: center;
    display: -webkit-inline-box;
}
.loding-div {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.loding-div div { box-sizing: content-box; } 

</style>
