<template>
  <div class="blog-container">
    <header class="my-5 pb-1">
        <admin-header v-if="isAdmin"></admin-header>
        <blog-header v-else></blog-header>
    </header>
    <content>
        <router-view></router-view>
        <br>
    </content>
    <footer>
        <blog-footer class="mt-4"></blog-footer>
    </footer>
  </div>
</template>


<script>

import BlogHeader from '../components/blog-header'
import BlogFooter from '../components/blog-footer'
import AdminHeader from '../components/admin-header'

const options = {
    data() {
      return {
        isAdmin: false, // 切换用户模式header和后台管理header
      }
    },
    components: {
        BlogHeader,
        BlogFooter,
        AdminHeader
    },
    methods: {
      getPathFun(){
        let curPath = this.$route.path;
        this.isAdmin = (curPath.includes("admin"));
      }
    },
    watch: {
      $route: "getPathFun"
    },
    mounted() {
    this.getPathFun();
  },
}

export default options;
</script>

<style scoped>
.blog-container {
  background: url("../assets/img/bg.png");
  min-height: 100vh;
  position: relative;
}

.content {
    padding-bottom: 2.5rem;
}

footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 2.5rem;
}
</style>
