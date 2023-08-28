<template>
<!-- 后端服务器报错 -->
  <div class="container">
    <div class="alert alert-danger m-5 w-75 mx-auto">
        <br>
        <div class="fw-bold fs-3 text-center lh-lg"><i class="bi bi-x-circle"></i> <strong>500</strong></div>
        <div class="fs-4 text-center lh-lg">服务器异常!</div>
        <div class="fs-5 text-center my-3">{{errorMsg}}</div>
        <br>
    </div>
  </div>
</template>

<script>

const options = {
  data() {
    return {
      errorMsg: null,
    }
  },
  mounted() {
    this.errorMsg = sessionStorage.getItem("errorMsg");
    // sessionStorage.removeItem("errorMsg");
  },
}

export default options;
</script>
