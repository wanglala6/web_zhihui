<template>
  <div class="container">
    <div class="lost">
      <el-row>
        <el-col :span="4" :offset="1">
          <el-image
            style="width: 100%;border-radius: 5px"
            :src="older.avatar"
            :fit="fit"></el-image>
    </el-col>
    <el-col :span="18" :offset="1" style="padding-right: 40px">
      <div class="lost-name flex">
        <p>{{ older.name }}</p>
        <el-link type="primary" v-if="isEdit" href="/#/newsEdit">信息已修改，点击通知志愿者</el-link>
      </div>
      <div class="lost-info">
        <div
          class="lost-info-item"
          @mouseenter="handleEnter('sex')"
          @mouseleave="handleLeave('sex')"
        >
          <div class="lost-info-itemLabel">性别</div>
          <div class="lost-info-itemValue" v-if="!isSexEdit">
            {{ older.gender }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="sexEdit"
              @click="startEdit('sex')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isSexEdit">
            <el-form-item>
              <el-radio-group v-model="form.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('sex')">修改</el-button>
              <el-button @click="cancelEdit('sex')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="lost-info-item"
          @mouseenter="handleEnter('age')"
          @mouseleave="handleLeave('age')"
        >
          <div class="lost-info-itemLabel">年龄</div>
          <div class="lost-info-itemValue" v-if="!isAgeEdit">
            {{ older.age }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="ageEdit"
              @click="startEdit('age')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isAgeEdit">
            <el-form-item>
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('age')">修改</el-button>
              <el-button @click="cancelEdit('age')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div
          class="lost-info-item"
          @mouseenter="handleEnter('feature')"
          @mouseleave="handleLeave('feature')"
        >
          <div class="lost-info-itemLabel">外貌特征</div>
          <div class="lost-info-itemValue" v-if="!isFeatureEdit">
            {{ older.feature }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="featureEdit"
              @click="startEdit('feature')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isFeatureEdit">
            <el-form-item>
              <el-input v-model="form.feature" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('feature')">修改</el-button>
              <el-button @click="cancelEdit('feature')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div
          class="lost-info-item"
          @mouseenter="handleEnter('disease')"
          @mouseleave="handleLeave('disease')"
        >
          <div class="lost-info-itemLabel">病历</div>
          <div class="lost-info-itemValue" v-if="!isDiseaseEdit">
            {{ older.disease }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="diseaseEdit"
              @click="startEdit('disease')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isDiseaseEdit">
            <el-form-item>
              <el-input v-model="form.disease" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('disease')">修改</el-button>
              <el-button @click="cancelEdit('disease')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div
          class="lost-info-item"
          @mouseenter="handleEnter('place')"
          @mouseleave="handleLeave('place')"
        >
          <div class="lost-info-itemLabel">走失地点</div>
          <div class="lost-info-itemValue" v-if="!isPlaceEdit">
            {{ older.lastPlace }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="placeEdit"
              @click="startEdit('place')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isPlaceEdit">
            <el-form-item>
              <el-input v-model="form.lastPlace" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('place')">修改</el-button>
              <el-button @click="cancelEdit('place')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div
          class="lost-info-item"
          @mouseenter="handleEnter('time')"
          @mouseleave="handleLeave('time')"
        >
          <div class="lost-info-itemLabel">走失时间段</div>
          <div class="lost-info-itemValue">
            {{ older.lostTimeBegin }} ~ {{ older.lostTimeEnd }}
          </div>
        </div>

        <div
          class="lost-info-item"
          @mouseenter="handleEnter('phone')"
          @mouseleave="handleLeave('phone')"
        >
          <div class="lost-info-itemLabel">家人联系电话</div>
          <div class="lost-info-itemValue" v-if="!isPhoneEdit">
            {{ older.familyTelephone }}
            <div
              class="el-icon-edit lost-info-edit"
              v-if="phoneEdit"
              @click="startEdit('phone')"
            >
              修改
            </div>
          </div>
          <el-form ref="form" :model="form" v-if="isPhoneEdit">
            <el-form-item>
              <el-input v-model="form.familyTelephone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('phone')">修改</el-button>
              <el-button @click="cancelEdit('phone')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="lost-info-item">
          <div class="lost-info-itemLabel">走失者图片</div>
          <div class="lost-info-itemValue flex">
            <el-image
              style="
                    width: 148px;
                    height: 148px;
                    margin-right: 10px;
                    border-radius: 5px;
                  "
              :src="url"
              v-for="url in pictures"
              v-bind:key="url"
              :preview-src-list="pictures"
            >
            </el-image>
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt=""/>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "ElderMsg",
  data() {
    return {
      id: "",
      pictures: [],
      activeNames: ["1"],
      older: {},
      sexEdit: false,
      ageEdit: false,
      featureEdit: false,
      diseaseEdit: false,
      placeEdit: false,
      phoneEdit: false,
      isSexEdit: false,
      isAgeEdit: false,
      isFeatureEdit: false,
      isDiseaseEdit: false,
      isPlaceEdit: false,
      isPhoneEdit: false,
      isEdit: false,
      form: {},
      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    // 老人信息
    async getold() {
      console.log("获取老人信息");
      this.lostId = this.$route.query.lostId;
      let res = await this.$http.get("/command/lost/" + this.lostId);
      console.log(res.data.data);
      this.older = res.data.data;
      this.form = this.older;
      // 获取人脸图片
      console.log("获取人脸图片");
      res = await this.$http.get("/face/lost/" + this.lostId);
      console.log(res);
      res.data.data.forEach((element) => {
        this.pictures.push(element.faceImg);
      });
    },
    handleEnter(e) {
      if (e === "sex") {
        this.sexEdit = true;
      } else if (e === "age") {
        this.ageEdit = true;
      } else if (e === "feature") {
        this.featureEdit = true;
      } else if (e === "disease") {
        this.diseaseEdit = true;
      } else if (e === "place") {
        this.placeEdit = true;
      } else if (e === "time") {
        this.timeEdit = true;
      } else if (e === "phone") {
        this.phoneEdit = true;
      }
    },
    handleLeave(e) {
      if (e === "sex") {
        this.sexEdit = false;
      } else if (e === "age") {
        this.ageEdit = false;
      } else if (e === "feature") {
        this.featureEdit = false;
      } else if (e === "disease") {
        this.diseaseEdit = false;
      } else if (e === "place") {
        this.placeEdit = false;
      } else if (e === "time") {
        this.timeEdit = false;
      } else if (e === "phone") {
        this.phoneEdit = false;
      }
    },
    startEdit(e) {
      console.log(e);
      if (e === "sex") {
        this.isSexEdit = true;
      } else if (e === "age") {
        this.isAgeEdit = true;
      } else if (e === "feature") {
        this.isFeatureEdit = true;
      } else if (e === "disease") {
        this.isDiseaseEdit = true;
      } else if (e === "place") {
        this.isPlaceEdit = true;
      } else if (e === "phone") {
        this.isPhoneEdit = true;
      }
    },
    cancelEdit(e) {
      if (e === "sex") {
        this.isSexEdit = false;
        this.sexEdit = false;
      } else if (e === "age") {
        this.isAgeEdit = false;
        this.ageEdit = false;
      } else if (e === "feature") {
        this.isFeatureEdit = false;
        this.featureEdit = false;
      } else if (e === "disease") {
        this.isDiseaseEdit = false;
        this.diseaseEdit = false;
      } else if (e === "place") {
        this.isPlaceEdit = false;
        this.placeEdit = false;
      } else if (e === "phone") {
        this.isPhoneEdit = false;
        this.phoneEdit = false;
      }
    },
    onSubmit(e) {
      if (e === "sex") {
        this.isSexEdit = false;
        this.sexEdit = false;
      } else if (e === "age") {
        this.isAgeEdit = false;
        this.ageEdit = false;
      } else if (e === "feature") {
        this.isFeatureEdit = false;
        this.featureEdit = false;
      } else if (e === "disease") {
        this.isDiseaseEdit = false;
        this.diseaseEdit = false;
      } else if (e === "place") {
        this.isPlaceEdit = false;
        this.placeEdit = false;
      } else if (e === "phone") {
        this.isPhoneEdit = false;
        this.phoneEdit = false;
      }
      this.isEdit = true;
    },
    // 图片上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
  mounted() {
    console.log(this.$route.query.lostId);
    this.getold();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.lost {
  width: 80%;
  background-color: #fff;
  height: 100%;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #ededed;
  padding-top: 20px;
}

.lost-name {
  font-weight: bold;
  font-size: 26px;
}

.lost-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.lost-info-item {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ebebeb;
  padding: 15px 0;
}

.lost-info-itemLabel {
  font-weight: bold;
  font-size: 15px;
  width: 100px;
  margin-right: 40px;
}

.lost-info-edit {
  margin-left: 15px;
  cursor: pointer;
  color: #409eff;
}

.flex {
  display: flex;
  justify-content: space-between;
}
</style>
