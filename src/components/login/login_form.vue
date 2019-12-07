<template>
    <div style="margin: auto;width: 400px;max-width: 90%;padding-top: 1px;">
        <el-button icon="el-icon-back" @click="toIndex" type="success" round class="hidden-xs-only"
                   style="width: 130px; margin-top: 45%; margin-bottom: 20px; float: left;">返回首页
        </el-button>
        <div class="form-div">
            <div>
                <h1>Network Planning</h1>
                <p>团队管理 分享工具</p>
            </div>
            <el-form :model="loginInfo" class="ipt-div">
                <el-form-item prop="pass">
                    <el-input type="text" placeholder="用户名" v-model="loginInfo.account" autocomplete="on"
                              prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" placeholder="密码" v-model="loginInfo.password"
                              autocomplete="on" prefix-icon="el-icon-lock" :show-password="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn" @click="login">登录</el-button>
                    <el-button class="btn" @click="toSignUp">没有账号？ 去注册</el-button>
                </el-form-item>
                <el-link type="info" style="float: right;">忘记密码</el-link>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "login_form",
        data() {
            return {
                loginInfo: {
                    account: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.$axios.post(this.$api.login, this.loginInfo).then((res) => {
                    if (res.data.code === '00') {
                        console.log(this.$route.query.redirect ? this.$route.query.redirect : '/')
                        this.$router.replace(this.$route.query.redirect ? this.$route.query.redirect : '/')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            toSignUp() {
                this.$router.push('/signup')
            },
            toIndex() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .form-div {
        clear: both;
        padding: 40px 0 45px 0;
        background-color: #fff;
        margin: auto;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        .form-div {
            margin-top: 30%;
        }
    }


    .ipt-div {
        width: 300px;
        margin: auto;
    }

    h1 {
        margin: 0;
        color: #4E7E9A;
    }

    p {
        color: #999;
        margin-top: 5px;
        margin-bottom: 30px;
    }

    .btn {
        width: 100%;
        margin-top: 10px;
        margin-left: 0 !important;
    }
</style>