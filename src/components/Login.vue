/* eslint-disable no-useless-return */
<template>
  <div class="login_con">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" />
      </div>
      <!-- 表单 -->
      <el-form
        label-width="85px"
        ref="loginformref"
        class="login_form"
        :model="loginform"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginform.account"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginform.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn_s">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetlogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      // 表单验证规则对象
      rules: {
        account: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          // 长度区间
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          // 长度区间
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      // 登录表单绑定的对象
      loginform: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    // 重置
    resetlogin() {
      this.$refs.loginform.resetFields();
    },
    // 登录
    login() {
      this.$refs.loginformref.validate((valid) => {
        if (!valid) return;

        this.$http
          .post("/login", JSON.stringify(this.loginform), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              console.log(res, "login");
              console.log(Cookies.get("COOKIE-TOKEN"));
              // var strCookie = document.cookie;
              // var arrCookie = strCookie.split("; ");
              // for (var i = 0; i < arrCookie.length; i++) {
              //   var arr = arrCookie[i].split("=");
              //   console.log(arr);
              // }

              // sessionStorage.setItem(" account",res.data.data.account)
              // sessionStorage.setItem("password",res.data.data.password)
              window.sessionStorage.setItem(
                "token",
                Cookies.get("COOKIE-TOKEN")
              );
              this.$router.push({
                name: "/welcome",
                params: { id: res.data.data.id },
              });
            } else {
              alert("登录失败，请重试");
            }
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login_con {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  /* 进行页面上的位移 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 在坐标轴上位移 */
  /* less语法嵌套 */
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd; //向外扩展10像素 颜色是ddd
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btn_s {
  //居右对齐
  display: flex; //弹性盒模型
  justify-content: flex-end; //居右对齐
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
