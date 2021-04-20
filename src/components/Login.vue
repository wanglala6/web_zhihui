/* eslint-disable no-useless-return */
<template>
  <div class="wrapper">
    <el-col :span="24" :offset="100">
      <el-row :span="8"></el-row>
      <el-row :span="8" class="center_container">
        <div class="icon_box">
          <div class="icon_style">
            <img src="../assets/home.svg" class="icon" />
          </div>
        </div>
        <div class="line"></div>
        <div class="content_container">
          <p class="content_top">归家行动</p>
          <p class="content_bottom">我们都在等你回家</p>
        </div>
        <div class="line"></div>
        <div class="choose_container">
          <el-row :span="24" :offset="100">
            <el-col :span="8" class="choose_box"
              ><p class="short_content" @click="introduction">简介</p></el-col
            >
            <el-col
              :span="8"
              class="choose_box"
              data-step="1"
              data-intro="点击进行登录"
              ><p class="short_content" @click="goto_login">登录</p></el-col
            >
            <el-col :span="8" class="choose_box"
              ><p class="short_content" @click="contact">联系我们</p></el-col
            >
          </el-row>
        </div>
      </el-row>
      <el-row :span="8"></el-row>
    </el-col>
    <el-dialog title="简介" :visible.sync="see_intro" class="intro_style">
      <p class="intro_font">
        归家行动项目创建于2003年11月29日，主要用于帮助寻走走失老人。带他们回家！
      </p>
    </el-dialog>
    <el-dialog title="登录" :visible.sync="see_login" class="login_style" >
      <div class="login_con">
        <div class="login_box">
          <el-form
            label-width="80px"
            ref="loginformref"
            class="login_form"
            :model="loginform"
            :rules="rules"
          >
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="account">
              <el-input v-model="loginform.account"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginform.password" type="password"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btn_s" >
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetlogin">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="联系我们" :visible.sync="see_contact" class="intro_style">
      <p class="intro_font">如果您有意加入我们，请拨打1213114232。</p>
    </el-dialog>
  </div>
  <!--  <div class="login_con">-->
  <!--    <div class="login_box">-->
  <!--      &lt;!&ndash; 头像区 &ndash;&gt;-->
  <!--      <div class="avatar_box">-->
  <!--        <img src="../assets/logo.jpg" />-->
  <!--      </div>-->
  <!--      &lt;!&ndash; 表单 &ndash;&gt;-->
  <!--      <el-form-->
  <!--        label-width="85px"-->
  <!--        ref="loginformref"-->
  <!--        class="login_form"-->
  <!--        :model="loginform"-->
  <!--        :rules="rules"-->
  <!--      >-->
  <!--        &lt;!&ndash; 用户名 &ndash;&gt;-->
  <!--        <el-form-item label="用户名" prop="username">-->
  <!--          <el-input v-model="loginform.account"></el-input>-->
  <!--        </el-form-item>-->
  <!--        &lt;!&ndash; 密码 &ndash;&gt;-->
  <!--        <el-form-item label="密码" prop="password">-->
  <!--          <el-input v-model="loginform.password" type="password"></el-input>-->
  <!--        </el-form-item>-->
  <!--        &lt;!&ndash; 按钮 &ndash;&gt;-->
  <!--        <el-form-item class="btn_s">-->
  <!--          <el-button type="primary" @click="login">登录</el-button>-->
  <!--          <el-button type="info" @click="resetlogin">重置</el-button>-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--    </div>-->
  <!--&lt;!&ndash;  </div>&ndash;&gt;-->
</template>
<script>
// 导出组件数据
import introJs from "intro.js";
import "intro.js/introjs.css";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      see_intro: false,
      see_login: false,
      see_contact: false,
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
    guide() {
      introJs()
        .setOptions({
          nextLabel: "下一个", // 下一个按钮文字
          prevLabel: "上一个", // 上一个按钮文字
          skipLabel: "跳过", // 跳过按钮文字
          doneLabel: "立即体验", // 完成按钮文字
          hidePrev: true, // 在第一步中是否隐藏上一个按钮
          hideNext: true, // 在最后一步中是否隐藏下一个按钮
          exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
          showStepNumbers: false, // 是否显示红色圆圈的步骤编号
          disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
          showBullets: false, // 是否显示面板指示点
        })
        .start();
    },
    contact() {
      this.see_contact = true;
    },
    goto_login() {
      this.see_login = true;
    },
    introduction() {
      this.see_intro = true;
    },
    // 重置
    resetlogin() {
      this.$refs.loginformref.resetFields();
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
              // 存储登陆对象
              window.sessionStorage.setItem(
                "user",
                JSON.stringify(res.data.data)
              );
              var id = res.data.data.id;
              this.$router.push({
                path: "/inAction",
                query: { commanderId: id },
              });
            } else {
              this.$message("登录失败，请重试");
            }
          });
      });
    },
  },
  mounted() {
    this.guide();
  },
};
</script>
<style lang="less" scoped>
.intro_font {
  font-size: 15px;
}
.short_content {
  font-family: cursive;
}
.content_bottom {
  padding: 5px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: lighter;
  font-family: cursive;
}

.content_top {
  font-family: cursive;
  letter-spacing: 20px;
  font-weight: bolder;
  padding: 10px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.choose_container {
  height: 48px;
  margin: 0 20px 0 20px;
  //border: 1px solid;
}
.choose_box {
  font-weight: lighter;
  border: 1px solid #fff;
  height: 48px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.content_container {
  height: 186px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.line {
  height: 12%;
  width: 0px;
  border: solid 0.5px #fff;
  margin-left: 50%;
}
.icon_box {
  margin-left: 184px;
}
.icon {
  margin: 0.7rem;
  width: 4rem;
  height: 4rem;
}
.icon_style {
  text-align: center;
  width: 5.5rem;
  height: 5.5rem;
  line-height: 5.5rem;
  border: solid 1px #fff;
  border-radius: 100%;
}
.center_container {
  width: 460px;
  height: 432px;
  //border:1px solid #fff;
  margin: 70px auto;
}
.wrapper {
  //padding: 3rem 2rem;
  background-image: url(../assets/bg_my.jpg);
  background-size: 100%;
  width: 100%;
  height: 100%;
}
.intro_style {
  opacity: 0.8;
  background-color: #000;
  padding: 4%;
  width: 100%;
  height: 100%;
  z-index: 999;
  font-family: cursive;
}
.login_style {
  opacity: 0.9;
  background-color: #000;
  padding: 4%;
  width: 100%;
  height: 100%;
  z-index: 999;
  font-family: cursive;
}
</style>
