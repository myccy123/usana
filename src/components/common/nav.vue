<template>
    <div>
        <el-menu :router="true" :default-active="this.$store.state.currNav" class="common-nav hidden-xs-only" mode="horizontal"
                 menu-trigger="click"
                 background-color="#303133"
                 text-color="#C0C4CC"
                 active-text-color="#fff">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/console">网络图</el-menu-item>
            <el-menu-item index="/team">团队名单</el-menu-item>
            <el-submenu index="1">
                <template slot="title">工作台</template>
                <el-menu-item index="/document">健康档案</el-menu-item>
                <el-menu-item index="/list">列名单</el-menu-item>
                <el-menu-item index="/orders">自动订货提醒</el-menu-item>
            </el-submenu>
            <el-menu-item index="/price">价格</el-menu-item>

            <el-menu-item v-if="!isLogin" class="right-item" index="/signin">登录</el-menu-item>
            <el-submenu v-else class="right-item" index="2">
                <template slot="title">{{userInfo.user_account}}</template>
                <el-menu-item index="/signin" style="width: 100px;">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="hidden-sm-and-up">
            <el-menu :router="true" :default-active="this.$store.state.currNav" class="common-nav-m" mode="horizontal"
                     menu-trigger="click"
                     background-color="#303133"
                     text-color="#C0C4CC"
                     active-text-color="#fff">
                <el-menu-item index="/">首页</el-menu-item>
                <el-submenu index="1">
                    <template slot="title">工作台</template>
                    <el-menu-item index="/team">团队名单</el-menu-item>
                    <el-menu-item index="/document">健康档案</el-menu-item>
                    <el-menu-item @click="alertTip">列名单</el-menu-item>
                    <el-menu-item @click="alertTip">网络图</el-menu-item>
                    <el-menu-item index="/orders">自动订货提醒</el-menu-item>
                </el-submenu>

                <el-menu-item v-if="!isLogin" class="right-item" index="/signin">登录</el-menu-item>
                <el-submenu v-else class="right-item" index="2">
                    <template slot="title">{{userInfo.user_account}}</template>
                    <el-menu-item index="/signin" style="width: 100px;">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        name: "commonNav",
        data() {
            return {
                isLogin: false,
                isMobile: false,
                userInfo: {}
            };
        },
        mounted() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            this.isMobile = flag? true : false

            this.$axios.get(this.$api.userInfo).then((res) => {
                if (Object.keys(res.data.data).length > 0) {
                    this.isLogin = true
                    this.userInfo = res.data.data
                    this.$store.commit('userInfo',this.userInfo)
                } else {
                    this.isLogin = false
                    this.userInfo = {}
                }
            }).catch((res) => {
                console.log(res)
            })
        },
        methods: {
            alertTip() {
                this.$message({
                    message: '此功能手机端暂未开放，请使用电脑登录',
                    type: 'warning'
                });
            }
        }
    }
</script>

<style>
    .common-nav {
        padding: 0 50px;
        padding-left: 50px !important;
    }

    .common-nav-m{
        padding: 0 5px;
    }

    .el-menu-item, .el-submenu, .el-menu-item, .el-submenu__title {
        height: 40px !important;
        line-height: 40px !important;
        /*padding-right: 0!important;*/
    }

    .right-item {
        float: right !important;
    }


    .right-item .el-submenu__title{
        padding-right: 0px!important;
    }

    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
        min-width: 137px !important;
        text-align: center;
    }

    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup li {
        margin: auto;
    }
</style>