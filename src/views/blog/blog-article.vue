<template>
  <!-- 博客详情页面 -->
  <div class="container" id="article-container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-3">
          <div class="card-header clearfix px-5">
            <span class="fw-light"
              ><i class="bi bi-calendar-check"></i>
              {{ blogData.createTime | dateFormat }}</span
            >
            <span class="fw-light float-end"
              ><i class="bi bi-eye"></i> {{ blogData.views }}</span
            >
          </div>

          <img
            decoding="async"
            :src="blogData.firstPicture"
            class="card-img-top rounded"
            alt=""
          />

          <div class="card-body p-lg-5">
            <span
              class="badge float-end"
              :class="[blogData.authorship ? 'bg-warning' : 'bg-secondary']"
              >{{ blogData.authorship == true ? "原创" : "转载" }}</span
            >
            <div class="article-title">
              <div class="text-center fw-bold fs-3">{{ blogData.title }}</div>
            </div>
            <div class="article-content mt-3">
              <mavon-editor
                class="md"
                :value="htmlContent"
                :subfield="prop.subfield"
                :defaultOpen="prop.defaultOpen"
                :toolbarsFlag="prop.toolbarsFlag"
                :editable="prop.editable"
                :scrollStyle="prop.scrollStyle"
                style="z-index: 1000"
              />
            </div>
            <div class="mt-5">
              <div class="mb-3">
                分类&nbsp;:&nbsp;&nbsp;&nbsp;
                <a
                  class="btn btn-outline-success btn-sm font-tiny"
                  @click="jumpToTypeByTypeId(typeData.id)"
                  >{{ typeData.name }}</a
                >
              </div>
              <div class="mb-3">
                标签&nbsp;:&nbsp;&nbsp;&nbsp;
                <a
                  class="badge rounded-pill me-2 text-bg-light text-success"
                  @click="jumpToTagByTagId(tag.id)"
                  v-for="tag in tagsData"
                  :key="tag.id"
                  style="cursor: pointer"
                  >{{ tag.name }}</a
                >
              </div>
            </div>
          </div>

          <div class="card-footer clearfix">
            <div class="fw-bold fs-4">评论</div>
            <div class="container border bg-white pt-3" v-if="commentsData.length > 0">
              <div
                class="row"
                v-for="parentComment in commentsData"
                :key="parentComment.id"
              >
                <div class="col-lg-1 col-2">
                  <img
                    src="https://qiniu.gjz0117.top/commentPhoto.jpeg"
                    class="mx-auto mt-2"
                    style="border-radius: 50%; width: 50px; height: 50px"
                    alt=""
                  />
                </div>
                <div class="col-lg-11 col-10">
                  <div class="alert alert-secondary clearfix">
                    <div class="clearfix">
                      <div class="fw-bold" style="display: inline-block">
                        {{ parentComment.nickname }}
                      </div>
                      <span
                        class="badge bg-danger float-end"
                        style="cursor: pointer"
                        v-if="isAdminLogin"
                        @click="deleteCommentByCommentId(parentComment.id)"
                        >删除</span
                      >
                      <span
                        class="badge bg-success float-end"
                        v-if="parentComment.adminComment"
                        >博主</span
                      >
                    </div>
                    <div>
                      {{ parentComment.content }}
                    </div>
                    <span class="font-tiny float-start">{{
                      parentComment.createTime | dateFormat
                    }}</span>
                    <a
                      @click="clickReplyButton(parentComment.id, parentComment.nickname)"
                      class="font-tiny float-end"
                      style="cursor: pointer"
                      >回复</a
                    >
                  </div>

                  <div
                    class="row"
                    v-for="childComment in parentComment.childrenComment"
                    :key="childComment.id"
                  >
                    <div class="col-lg-1 col-2">
                      <img
                        src="https://qiniu.gjz0117.top/commentPhoto.jpeg"
                        class="mx-auto mt-3"
                        style="border-radius: 50%; width: 30px; height: 30px"
                        alt=""
                      />
                    </div>
                    <div class="col-lg-11 col-10">
                      <div class="alert alert-secondary clearfix">
                        <div class="clearfix">
                          <div class="fw-bold" style="display: inline-block">
                            {{ childComment.nickname }}
                          </div>
                          <span class="font-tiny"
                            >&nbsp;@{{ childComment.parentCommentName }}</span
                          >
                          <span
                            class="badge bg-danger float-end"
                            style="cursor: pointer"
                            @click="deleteCommentByCommentId(childComment.id)"
                            v-if="isAdminLogin"
                            >删除</span
                          >
                          <span
                            class="badge bg-success float-end"
                            v-if="childComment.adminComment"
                            >博主</span
                          >
                        </div>
                        <div>
                          {{ childComment.content }}
                        </div>
                        <span class="font-tiny float-start">{{
                          childComment.createTime | dateFormat
                        }}</span>
                        <a
                          @click="
                            clickReplyButton(childComment.id, childComment.nickname)
                          "
                          class="font-tiny float-end"
                          style="cursor: pointer"
                          >回复</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <textarea class="p-3 rounded" id="commentContentArea" required></textarea>

              <div class="row">
                <div class="col-lg-3">
                  <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input
                      type="text"
                      placeholder="昵称"
                      id="commentNickname"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="col-lg-3 input-group mb-3">
                    <span class="input-group-text">Email</span>
                    <input
                      type="email"
                      placeholder="邮箱"
                      id="commentEmail"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-lg-3">
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#msgAlert"
                    @click="addComment()"
                  >
                    提交
                  </button>
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
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      blogData: "", // 博客所有的相关数据
      htmlContent: "", // 博客主题内容
      typeData: "", // 分类数据
      tagsData: [], // 标签数据
      commentsData: [], // 评论列表
      replyCommentId: null, // 要回复的评论id
      isAdminLogin: false,
    };
  },
  methods: {
    // 通过博客Id找到文章相关数据
    findBlogByBlogId() {
      let blogId = this.$route.query.blogId;
      axios
        .post("/api/blog/findBlogByBlogId", {
          blogId: blogId,
        })
        .then((res) => {
          this.blogData = res.data.data.blogData;
          this.htmlContent = this.blogData.content;
          this.typeData = res.data.data.type;
          this.tagsData = res.data.data.tags;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 根据typeId跳转到对应的type页面
    jumpToTypeByTypeId(typeId) {
      this.$router.push({ path: "/type", query: { curTypeId: typeId, page: 1 } });
    },
    // 根据tagId跳转到对应的tag页面
    jumpToTagByTagId(tagId) {
      this.$router.push({ path: "/tag", query: { curTagId: tagId, page: 1 } });
    },
    // 通过blogId找到相关的评论
    findCommentsByBlogId() {
      let blogId = this.$route.query.blogId;
      axios
        .post("/api/comment/findCommentsByBlogId", {
          blogId: blogId,
        })
        .then((res) => {
          this.commentsData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    //点击回复按钮
    clickReplyButton(parentCommentId, parentCommentName) {
      document.getElementById("commentContentArea").placeholder =
        "@" + parentCommentName + ":";
      document.getElementById("commentContentArea").scrollIntoView();
      this.replyCommentId = parentCommentId;
    },
    // 新增评论
    addComment() {
      let blogId = this.$route.query.blogId;
      let commentContent = document.getElementById("commentContentArea").value;
      let commentNickname = document.getElementById("commentNickname").value;
      let commentEmail = document.getElementById("commentEmail").value;
      let adminComment = sessionStorage.getItem("token") == null ? false : true;
      // 判断输入的邮箱是否合法的正则表达式
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // 判断评论内容、昵称、邮箱是否为空，邮箱是否合法
      if (
        commentContent.replace(/\s+/g, "") === "" ||
        commentNickname.replace(/\s+/g, "") === "" ||
        commentEmail.replace(/\s+/g, "") === "" ||
        !reg.test(commentEmail)
      ) {
        document.getElementById("msg-alert-content").innerHTML =
          "输入的信息有错误,请检查后再提交!";
        window.setTimeout(function () {
          $("#msgAlert").modal("hide");
        }, 3000); //显示的时间
        return;
      }
      axios
        .post("/api/comment/addComment", {
          content: commentContent,
          email: commentEmail,
          nickname: commentNickname,
          blogId: blogId,
          adminComment: adminComment,
          parentCommentId: this.replyCommentId,
        })
        .then(() => {
          this.findCommentsByBlogId();
          document.getElementById("commentContentArea").value = "";
          document.getElementById("commentContentArea").placeholder = "";
          this.$forceUpdate();
          this.replyCommentId = null;
          document.getElementById("msg-alert-content").innerHTML = "评论成功!";
          window.setTimeout(function () {
            $("#msgAlert").modal("hide");
          }, 3000); //显示的时间
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 管理员登陆后按评论id删除评论
    deleteCommentByCommentId(commentId) {
      axios
        .post(
          "/api/comment/deleteCommentByCommentId",
          { id: commentId },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.findCommentsByBlogId();
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(commentId);
    },
  },
  components: {
    mavonEditor,
  },
  computed: {
    // md解析器配置
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false, // 是否允许编辑
        toolbarsFlag: false,
        scrollStyle: true,
      };
      return data;
    },
  },
  filters: {
    dateFormat: function (value) {
      // 根据给定的字符串，得到特定的日期
      var date = new Date(value);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return year + "-" + month + "-" + day;
    },
  },
  mounted() {
    this.isAdminLogin = sessionStorage.getItem("token");
    this.findBlogByBlogId();
    this.findCommentsByBlogId();
    document.getElementById("article-container").scrollIntoView();
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  resize: none;
}

.font-tiny {
  font-size: 12px !important;
  font-weight: 300 !important;
  letter-spacing: 1px !important;
  line-height: 1.8 !important;
}

a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
</style>
