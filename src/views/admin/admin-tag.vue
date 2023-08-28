<template>
  <!-- 后台管理标签管理页面 -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="container mt-4">
            <table class="table table-bordered table-hover">
              <thead>
                <tr class="back">
                  <th scope="col">#</th>
                  <th scope="col">名称</th>
                  <th scope="col">关联文章数</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr class="lh-lg" v-for="(tag, index) in tagData" :key="index">
                  <th scope="row" style="vertical-align: middle">{{ index + 1 }}</th>
                  <td style="vertical-align: middle">{{ tag.name }}</td>
                  <td style="vertical-align: middle">{{ tag.num }}</td>
                  <td>
                    <a
                      class="btn btn-sm btn-outline-success me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#edit"
                      @click="changeCurTag(tag.id, tag.name, tag.num)"
                      >编辑</a
                    >
                    <a
                      class="btn btn-sm btn-outline-danger me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirm"
                      @click="changeCurTag(tag.id, tag.name, tag.num)"
                      >删除</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card-body">
            <a
              class="btn btn-outline-warning float-end"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#add"
              >新增</a
            >
          </div>

          <div class="card-footer clearfix text-center">
            <div class="row">
              <div class="col-3">
                <button
                  class="btn btn-outline-success btn-sm float-start font-tiny"
                  @click="changePage(page - 1)"
                  :class="{ disabled: page == 1 }"
                >
                  上一页
                </button>
              </div>
              <div class="col-6">
                第<span class="fs-5 text-success">{{ page }}</span
                >页 / 共<span class="fs-5 text-success">{{ totalPages }}</span
                >页
              </div>
              <div class="col-3">
                <button
                  class="btn btn-outline-success btn-sm float-end font-tiny"
                  @click="changePage(page + 1)"
                  :class="{ disabled: page == totalPages }"
                >
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteConfirm"
      tabindex="-1"
      aria-labelledby="deleteConfirmLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteConfirmLabel">确认删除</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            确定删除 <span class="fw-bold text-danger">{{ curTagName }}</span> 吗?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteTag()"
              data-bs-toggle="modal"
              data-bs-target="#msgAlert"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editLabel">编辑</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 input-group my-3">
                <span class="input-group-text">名称</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="原标签名"
                  :value="curTagName"
                  id="editTagInput"
                />
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
              @click="submitEditDetail()"
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
      id="add"
      tabindex="-1"
      aria-labelledby="addLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addLabel">添加</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 input-group my-3">
                <span class="input-group-text">名称</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="请输入标签名称"
                  id="addTagInput"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-warning"
              @click="addTag()"
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
import axios from "axios";
import $ from "jquery";

const options = {
  data() {
    return {
      page: 1, // 当前页
      pageSize: 5, // 页面容量
      totalPages: null, // 总页数
      tagData: null, // 要展示的标签列表
      tagCount: null, // 标签数
      curTagId: null, // 当前操作的标签id
      curTagName: null, // 当前操作的标签名称
      curTagCiteNum: 0, // 当前标签被引用数
    };
  },
  methods: {
    // 通过当前页和页面容量加载要展示的标签数据
    adminListTags() {
      axios
        .post(
          "/api/tag/admin/listTags",
          {
            page: this.page,
            pageSize: this.pageSize,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.tagData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 根据标签数量统计总页数
    getTagCount() {
      axios
        .get("/api/tag/getTagCount")
        .then((res) => {
          this.tagCount = res.data.data;
          this.totalPages = Math.ceil(this.tagCount / this.pageSize);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 更改当前操作的标签id及标签名
    changeCurTag(tagId, tagName, citeNum) {
      this.curTagId = tagId;
      this.curTagName = tagName;
      this.curTagCiteNum = citeNum;
    },
    // 翻页
    changePage(newPage) {
      this.page = newPage;
      this.$router.push({ path: "/admin/tag", query: { page: this.page } });
    },
    // 提交要修改的标签名
    submitEditDetail() {
      let newTagName = document.getElementById("editTagInput").value;
      axios
        .post(
          "/api/tag/editTagByTagId",
          {
            tagId: this.curTagId,
            newTagName: newTagName,
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
    // 根据标签id删除标签
    deleteTag() {
      if (this.curTagCiteNum > 0) {
        document.getElementById("msg-alert-content").innerHTML =
          "该标签被博客引用,操作失败!";
        window.setTimeout(function () {
          $("#msgAlert").modal("hide");
        }, 3000); //显示的时间
        return;
      }
      axios
        .post(
          "/api/tag/deleteTagByTagId",
          {
            tagId: this.curTagId,
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
    // 新增标签
    addTag() {
      let newTagName = document.getElementById("addTagInput").value;
      axios
        .post(
          "/api/tag/addTag",
          {
            newTagName: newTagName,
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
  },
  mounted() {
    if (sessionStorage.getItem("token") == null) {
      this.$router.push({ path: "/login" });
    }
    this.page = this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
    this.adminListTags();
    this.getTagCount();
  },
  watch: {
    $route() {
      if (this.$route.query.page) {
        this.page =
          this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
        this.adminListTags();
      }
    },
  },
};
export default options;
</script>
