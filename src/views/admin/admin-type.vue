<template>
  <!-- 后台管理分类管理 -->
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
                <tr class="lh-lg" v-for="(type, index) in typeData" :key="index">
                  <th scope="row" style="vertical-align: middle">{{ index + 1 }}</th>
                  <td style="vertical-align: middle">{{ type.name }}</td>
                  <td style="vertical-align: middle">{{ type.num }}</td>
                  <td>
                    <a
                      class="btn btn-sm btn-outline-success me-2"
                      @click="changeCurType(type.typeId, type.name, type.num)"
                      data-bs-toggle="modal"
                      data-bs-target="#edit"
                      >编辑</a
                    >
                    <a
                      class="btn btn-sm btn-outline-danger me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirm"
                      @click="changeCurType(type.typeId, type.name, type.num)"
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
            确定删除 <span class="fw-bold text-danger">{{ curTypeName }}</span> 吗?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteType()"
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
                  placeholder="原类别名"
                  :value="curTypeName"
                  id="editTypeInput"
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
                  placeholder="请输入类别名称"
                  id="addTypeInput"
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
              @click="addType()"
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
      typeData: null, // 要展示的分类数据
      typeCount: null, // 总类别量
      curTypeId: null, // 当前操作的类别id
      curTypeName: null, // 当前操作的类别名
      curTypeCiteNum: 0, // 当前分类被引用数
    };
  },

  methods: {
    // 根据当前页和页面容量加载要展示的分类数据
    adminListTypes() {
      axios
        .post(
          "/api/type/admin/listTypes",
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
          this.typeData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 根据分类数统计总页数
    getTypeCount() {
      axios
        .get("/api/type/getTypeCount")
        .then((res) => {
          this.typeCount = res.data.data;
          this.totalPages = Math.ceil(this.typeCount / this.pageSize);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 更改当前操作的类别id和类别名
    changeCurType(typeId, typeName, citeNum) {
      this.curTypeId = typeId;
      this.curTypeName = typeName;
      this.curTypeCiteNum = citeNum;
    },
    // 翻页
    changePage(newPage) {
      this.page = newPage;
      this.$router.push({ path: "/admin/type", query: { page: this.page } });
    },
    // 提交修改的分类名
    submitEditDetail() {
      let newTypeName = document.getElementById("editTypeInput").value;
      axios
        .post(
          "/api/type/editTypeByTypeId",
          {
            typeId: this.curTypeId,
            newTypeName: newTypeName,
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
    // 根据id删除分类
    deleteType() {
      if (this.curTypeCiteNum > 0) {
        document.getElementById("msg-alert-content").innerHTML =
          "该分类被博客引用,操作失败!";
        window.setTimeout(function () {
          $("#msgAlert").modal("hide");
        }, 3000); //显示的时间
        return;
      }
      axios
        .post(
          "/api/type/deleteTypeByTypeId",
          {
            typeId: this.curTypeId,
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
    // 新增分类
    addType() {
      let newTypeName = document.getElementById("addTypeInput").value;
      axios
        .post(
          "/api/type/addType",
          {
            newTypeName: newTypeName,
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
    this.adminListTypes();
    this.getTypeCount();
  },
  watch: {
    $route() {
      if (this.$route.query.page) {
        this.page =
          this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
        this.adminListTypes();
      }
    },
  },
};

export default options;
</script>
