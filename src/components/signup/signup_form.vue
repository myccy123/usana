<template>

    <div class="div-wrap">
        <el-button icon="el-icon-back" type="success" round @click="toIndex" class="hidden-xs-only"
                   style="width: 130px; margin-top: 60px; margin-bottom: 20px; float: left;">返回首页
        </el-button>
        <div class="form-div">
            <div>
                <h1>Network Planning</h1>
                <p>团队管理 分享工具</p>
            </div>
            <el-form :model="signUpInfo" status-icon :rules="rules" class="ipt-div">
                <el-form-item prop="account">
                    <el-input type="text" v-model="signUpInfo.account" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password1">
                    <el-input type="password" v-model="signUpInfo.password1" placeholder="密码" autocomplete="off"
                              :show-password="true"></el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" v-model="signUpInfo.password2" placeholder="确认密码" autocomplete="off"
                              :show-password="true"></el-input>
                </el-form-item>
                <el-form-item prop="usanaId">
                    <el-input type="text" v-model="signUpInfo.usanaId" placeholder="本人葆婴ID"></el-input>
                </el-form-item>
                <el-form-item prop="parentUsanaId">
                    <el-input type="text" v-model="signUpInfo.parentUsanaId" placeholder="上一级葆婴ID"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left;" prop="parentCenter">
                    <el-select v-model="signUpInfo.parentCenter" placeholder="所在位置（商务中心）" style="width: 100%;">
                        <el-option v-for="item in centers" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align: left;" prop="parentDept">
                    <el-select v-model="signUpInfo.parentDept" placeholder="所在位置（部门）" style="width: 100%;">
                        <el-option label="1部门" value="1"></el-option>
                        <el-option label="2部门" value="2"></el-option>
                        <el-option label="3部门" value="3"></el-option>
                        <el-option label="4部门" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn" @click="signup" :loading="isLoading" :disabled="!canSignUp">
                        注册
                    </el-button>
                    <el-button class="btn" @click="toLogin" :loading="isLoading">已有账号？ 去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    function padding0(num, length) {
        for (let len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    export default {
        name: "signup_form",
        data() {
            return {
                signUpInfo: {
                    account: '',
                    password1: '',
                    password2: '',
                    usanaId: '',
                    parentUsanaId: '',
                    parentCenter: '',
                    parentDept: '',
                },
                centers: [],
                isLoading: false,
                rules: {
                    account: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    password1: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    usanaId: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    parentUsanaId: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    parentCenter: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    parentDept: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            for (let i = 1; i <= 999; i++) {
                this.centers.push({label: padding0(i, 3), value: i})
            }
        },
        computed: {
            canSignUp() {
                if (this.signUpInfo.account == '' || this.signUpInfo.password1 == '' || this.signUpInfo.password2 == '' || this.signUpInfo.usanaId == '' || this.signUpInfo.parentUsanaId == '' || this.signUpInfo.parentCenter == '' || this.signUpInfo.parentDept == '') {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            signup() {
                this.isLoading = true
                this.$axios.post(this.$api.signup, this.signUpInfo).then((res) => {
                    if (res.data.code === '00') {
                        this.$message({
                            showClose: false,
                            message: '注册成功！正在前往登录...',
                            duration: 2000,
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.push('/signin')
                        }, 2000)
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            duration: 0,
                            type: 'error'
                        });
                    }
                    this.isLoading = false
                }).catch((error) => {
                    this.isLoading = false
                    console.log(error)
                })
            },
            toLogin() {
                this.$router.push('/signin')
            },
            toIndex() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    @media (min-width: 768px) {
        .div-wrap {
            float: right;
            margin-right: 150px;
            width: 400px;
            max-width: 90%;
            height: calc(100vh - 1px);
        }
    }

    @media (max-width: 768px) {
        .div-wrap {
            width: 400px;
            margin: auto;
            max-width: 90%;
            padding-top: 10px;
        }
    }


    .form-div {
        clear: both;
        padding: 40px 0 40px 0;
        background-color: #fff;
        margin: auto;
        margin-bottom: 50px;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        .form-div {
            margin-bottom: 0px;
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

<style>
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        content: '' !important;
    }
</style>