<template>
  <!-- 博客编辑页面 -->
  <div class="container">
    <div class="col-lg-10 offset-lg-1">
      <div id="main">
        <mavon-editor
          v-model="value"
          ref="md"
          @imgAdd="imgAdd"
          style="min-height: 600px; z-index: 1000"
        />
      </div>
      <div class="my-5 clearfix">
        <button
          type="button"
          class="btn btn-lg btn-outline-success float-end"
          data-bs-toggle="modal"
          data-bs-target="#detailConfirm"
        >
          发布
        </button>
      </div>
    </div>

    <div
      class="modal fade"
      id="detailConfirm"
      tabindex="-1"
      aria-labelledby="detailConfirmLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="detailConfirmLabel">博客信息</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="input-group my-2">
                <span class="input-group-text">标题</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="title"
                  id="titleInput"
                  v-model="title"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-group my-2">
                <span class="input-group-text">简介</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="description"
                  id="descriptionInput"
                  v-model="description"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-group my-2" v-if="this.firstPicture == ''">
                <span class="input-group-text">首图</span>
                <input
                  type="file"
                  class="form-control"
                  id="firstPictureInput"
                  @change="addFirstPicture($event)"
                />
              </div>
                <span class="text-danger font-mini" style="visibility:hidden;" id="uploadSuccessMsg">上传成功: {{firstPicture}}</span>
            </div>
            <div class="row">
              <div class="input-group my-2 d-flex">
                <span class="input-group-text">分类</span>&nbsp;&nbsp;
                <div
                  class="form-check mx-1 align-self-center"
                  v-for="type in typeData"
                  :key="type.id"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    :id="'type' + type.id"
                    name="typeOption"
                    :value="type.id"
                    v-model="checkedTypeId"
                  />
                  <label class="form-check-label" :for="'type' + type.id">{{
                    type.name
                  }}</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="input-group my-2 d-flex">
                <span class="input-group-text">标签</span>&nbsp;&nbsp;
                <div
                  class="form-check mx-1 align-self-center"
                  v-for="tag in tagData"
                  :key="tag.id"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'tag' + tag.id"
                    name="tagOption"
                    :value="tag.id"
                    v-model="checkedTags"
                  />
                  <label class="form-check-label" :for="'tag' + tag.id">{{
                    tag.name
                  }}</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="input-group my-2 d-flex">
                <span class="input-group-text">来源</span>&nbsp;&nbsp;
                <div class="form-check mx-1 align-self-center">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="authorshipOption1"
                    name="authorshipOption"
                    value="true"
                    v-model="authorship"
                  />
                  <label class="form-check-label" for="authorshipOption1">原创</label>
                </div>
                <div class="form-check mx-1 align-self-center">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="authorshipOption0"
                    name="authorshipOption"
                    value="false"
                    v-model="authorship"
                  />
                  <label class="form-check-label" for="authorshipOption0">转载</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="submitBlog()"
              data-bs-toggle="modal"
              data-bs-target="#msgAlert"
            >
              提交
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="msgAlert"
      tabindex="-1"
      aria-labelledby="msgAlertLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="msgAlertLabel">提示</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="msg-alert-content"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import $ from "jquery";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(mavonEditor);

const options = {
  data() {
    return {
      value: "", // 博客内容
      title: "", // 博客标题
      description: "", // 博客简介
      firstPicture: "", // 博客首图地址
      blogData: null, // 该篇博客所有相关数据
      typeData: [], // 博客分类
      checkedTypeId: -1, // 博客分类对应id
      tagData: [], // 博客标签
      checkedTags: [], // 博客标签对应id
      authorship: true, // 原创or转载
    };
  },
  methods: {
    // 加载数据库中所有的分类数据供选择
    loadTypeData() {
      axios
        .get("/api/type/admin/listAllTypes", {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.typeData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 加载数据库中所有的标签数据供选择
    loadTagData() {
      axios
        .get("/api/tag/admin/listAllTags", {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.tagData = res.data.data;
          if (this.blogData != null) {
            for (const tag of this.blogData.tags) {
              this.checkedTags.push(tag.id);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 如果url中有blogId，则通过博客id加载博客所有相关数据，否则什么新建一个页面
    loadBlogData() {
      let editBlogId = this.$route.query.blogId;
      if (editBlogId != null) {
        axios
          .post(
            "/api/blog/admin/blogDetails",
            {
              blogId: editBlogId,
            },
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            this.blogData = res.data.data;
            this.title = this.blogData.title;
            this.value = this.blogData.content;
            this.description = this.blogData.description;
            this.firstPicture = this.blogData.firstPicture;
            this.checkedTypeId = this.blogData.typeId;
            this.authorship = this.blogData.authorship;
            this.loadTagData();
          })
          .catch((err) => {
            console.error(err);
            sessionStorage.setItem("errorMsg", err);
            this.$router.push({ path: "/500" });
          });
      } else {
        this.loadTagData();
      }
    },
    // 提交博客数据
    submitBlog() {
      axios
        .post(
          "/api/blog/admin/publish",
          {
            id: this.$route.query.blogId,
            title: this.title,
            content: this.value,
            typeId: this.checkedTypeId,
            firstPicture: this.firstPicture,
            tags: this.checkedTags,
            description: this.description,
            authorship: this.authorship,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          var changeRowNum = res.data.data;
          if (changeRowNum == 1) {
            document.getElementById("msg-alert-content").innerHTML = "操作成功!";
            window.setTimeout(function () {
              $("#msgAlert").modal("hide");
            }, 3000); //显示的时间
          } else {
            document.getElementById("msg-alert-content").innerHTML = "操作失败!";
            window.setTimeout(function () {
              $("#msgAlert").modal("hide");
            }, 3000); //显示的时间
          }
          setTimeout("location.reload()", 3000);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 上传博客中所需要的图片到cdn，并将返回图片对应的url填入md文本中
    imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        method: "post",
        url: "/api/upload",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          let url = res.data.data;
          this.$refs.md.$img2Url(pos, url);
        })
        .catch((err) => {
          console.log(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 将首图上传到cdn
    addFirstPicture(e) {
      let file = e.target.files[0];
      var formdata = new FormData();
      formdata.append("image", file, file.name);
      axios({
        method: "post",
        url: "/api/upload",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          let url = res.data.data;
          this.firstPicture = url;
          document.getElementById('uploadSuccessMsg').setAttribute('style', 'visibility : visible');
        })
        .catch((err) => {
          console.log(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
  },
  mounted() {
    if (sessionStorage.getItem("token") == null) {
      this.$router.push({ path: "/login" });
    }
    this.loadBlogData();
    this.loadTypeData();
  },
};

export default options;
</script>

<style scoped>

.font-mini {
  font-size: 10px !important;
  font-weight: 260 !important;
  letter-spacing: 0.8px !important;
  line-height: 1.6 !important;
}

</style>
