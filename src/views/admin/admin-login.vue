<template>
  <!-- 后台管理登录页面 -->
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="alert alert-light border mt-5">
            <div class="text-center fs-3 fw-bold pt-3">管理后台登录</div>

            <div class="input-group w-75 mx-auto mt-3">
              <span class="input-group-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  class="bi bi-person"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="用户名"
                id="username"
              />
            </div>

            <div class="input-group w-75 mx-auto mt-3">
              <span class="input-group-text" id="basic-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  class="bi bi-lock"
                >
                  <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
                  ></path>
                </svg>
              </span>
              <input
                type="password"
                class="form-control"
                placeholder="密码"
                id="password"
              />
            </div>
            <div class="text-center mt-3 text-danger" style="diplay: none" id="errorMsg">
              {{ errorMsg }}
            </div>

            <div class="mx-auto w-75">
              <a class="btn btn-success w-100 my-3" @click="login()">登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SHA1 } from "../../assets/js/sha1.js";
import axios from "axios";

const options = {
  data() {
    return {
      errorMsg: "", // 登录失败提示错误信息
    };
  },
  methods: {
    // 通过sha1算法在前端加密密码，将用户名和加密后的密码发送到后端校验
    login() {
      let username = document.getElementById("username").value;
      let password = SHA1(document.getElementById("password").value);
      axios
        .post("/api/admin/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.code === 200) {
            sessionStorage.setItem("token", res.data.data);
            this.$router.push({ path: "/admin/article", query:{page: 1} });
          } else {
            this.errorMsg = res.data.msg;
            document.getElementById("errorMsg").style.diplay = "block";
          }
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
  },
  mounted() {
    if(sessionStorage.getItem("token") != null) {
      this.$router.push({ path: "/admin/article", query:{page: 1} });
    }
  },
};

export default options;
</script>
<style scoped></style>
