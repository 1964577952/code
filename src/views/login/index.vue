<template>
  <div class="login-container">
    <div class="top-container">
        <img src="/static/img/ic_logo@2x.png" width="75px" height="60px" class="top-container-img">
        <p class="top-container-p"> {{ $t('login.title') }}</p>
    </div>
    <div  class="login-div">
      <el-row >
        <el-col :span="6">
          &nbsp;
        </el-col>
        <el-col :span="5">
          <div class="login-form">
            <div align="center">
                           <img  src="/static/img/pic_log@2x.png" width="260px" height="240px" style="padding-top:50px;  ">
            </div>

          </div>
        </el-col>
         <el-col :span="1" class="login-form">
           <div style="padding-left:10px;padding-top:40px;">
          <div style="width:1px;height:230px;border:1px solid rgba(230,230,230,1); "></div>
           </div>
        </el-col>
         <el-col :span="5" class="login-form">
           <p style="font-size:17px;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:rgba(0,87,201,1);padding-top:22px;" align="center">欢迎登陆</p>
           <el-form ref="loginForm" :model="loginForm" :rules="loginRules"  auto-complete="on" label-position="left">
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="loginForm.username"
                  :placeholder="$t('login.username')"
                  name="username"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="loginForm.password"
                  :type="passwordType"
                  :placeholder="$t('login.password')"
                  name="password"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
                
              </el-form-item>
              
              <el-form-item prop="captcha">
                
              <span class="svg-container">
                  <svg-icon icon-class="lock" />
                </span>
                <el-input  
                  v-model="loginForm.captcha"
                  type="text"
                  class = "captcha-input"
                  name="captcha"
                  auto-complete="on"
                  placeholder="验证码"
                  @keyup.enter.native="handleLogin"
                />
              
                <span class="captcha-container">
                <img :src="captchaUrl" @click="refreshCaptcha" width="100px;" height="30px;">
                </span>
              </el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                {{ $t('login.logIn') }}
              </el-button>
            </el-form>
        </el-col>
         <el-col :span="1" class="login-form">
           &nbsp;
        </el-col>
         <el-col :span="6">
          &nbsp;
        </el-col>
      </el-row>
    
</div>
  
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import {getCaptcha } from  '@/api/login'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能小于4位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captcha:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', message:'验证码必填'} ],
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      captchaUrl:null,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
     this.refreshCaptcha();
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    refreshCaptcha(){
      this.captchaUrl="http://211.159.176.177:88/login/captcha?data="+new Date();
      
       
        // getCaptcha()
        // .then(response => {

         
        //   console.log(response);
        //   this.captchaUrl= 'data:image/jpeg;base64,' + encodeURI(response.data);
        
        
        // })
        // .catch(err => {
         
        //   console.log(err);
        // });

    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((response) => {
            this.refreshCaptcha();
             var msg='';
             if(response.data.state){
                  if(response.data.state == "fail") {
                    msg=response.data.msg;
                  }
              }
              if(response.data.captchaMsg){
                 
                msg='验证码错误，请重新输入';
              
              }
              if(response.data.userNameMsg){
                 msg='用户名错误，请重新输入';
              }
              if(response.data.passwordMsg){
                msg='密码错误，请重新输入';
              }
             
              if(msg !=''){
                this.$message({
                  message: msg,
                  type: "error"
                });
                 this.refreshCaptcha();
              }
              
             
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })

          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#fff;
  $light_gray:#22345E;
  $cursor: #22345E;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 30px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 30px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(204, 204, 204, 1);
      background: #fff;
     // border-radius: 5px;
      color: #454545;
      margin-bottom: 15px;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.top-container{
  width:100%;
  height:65px;
  background:linear-gradient(0deg,rgba(208,223,255,1),rgba(255,255,255,1));
  box-shadow:0px 3px 4px 0px rgba(0, 0, 0, 0.32);
}

.top-container-img{
  padding-top:5px;
  padding-left:30px;
  float: left;
}
.top-container-p{
   float: left;
   padding-left:30px;
  margin-top:10px;
  font-size:30px;
  
  font-weight:bold;
  color:rgba(255,255,255,1);
  text-shadow:0px 4px 4px rgba(9,32,66,0.81);
-webkit-text-stroke:2px RGBA(19, 62, 143, 1);
text-stroke:2px RGBA(19, 62, 143, 1);



}
.login-div{
  
  padding-top:130px;
  
}
.login-container {
  min-height: 100%;
  width: 100%;
   background-image: url("/static/img/pic_bg@2x.png");
 background-repeat: no-repeat;   //不重复
    background-size: 100% 100%;     // 满屏
  overflow: hidden;
  .login-form {
   
    background-color:RGBA(255, 255, 255, 1);
     position: relative;
    margin: 0 auto;
   height: 320px;
    padding:  0px;
   
    
    
  }
  .tips {
    font-size: 12px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 2px 2px 0px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 25px;
    display: inline-block;
  }
   .captcha-container {
   height: 30px;
    color: $dark_gray;
    vertical-align: middle;
    //width: 25px;
    display: inline-block;
  }

  .captcha-input{
  width: 60%; /*保留这个是为了浏览器不支持calc()的时候仍然有效果*/
  width: -webkit-calc(100% - 150px); /*对应Chrome和Safari浏览器*/
  width: -moz-calc(100% - 150px); /*对应FireFox浏览器*/
  width: calc(100% - 150px);
}
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size:18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
