<template>
    <div>
        <common-nav></common-nav>
        <div class="content">
            <div class="banner">
                <div style="width: 600px; margin: auto;">
                    <div style="width: 300px; float: left;">
                        <h2 style="margin: 0;">9000+</h2>
                        <p>管理者在用</p>
                    </div>
                    <div style="width: 300px; float: left;">
                        <h2 style="margin: 0;">1.1 元 / 天</h2>
                        <p>平均管理费用</p>
                    </div>
                </div>
            </div>
            <h2 style="font-size: 40px;font-weight: 300;">选择套餐</h2>
            <el-row :gutter="20" style="padding: 0 300px; margin: 0 0 20px 0;">
                <el-col :span="8">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" style="padding: 0">
                            <p class="card-title month">A套餐</p>
                        </div>
                        <p><s>原价：799 元 / 年</s></p>
                        <p>折扣价：399 元 / 年</p>
                        <el-button type="primary" style="width: 180px; margin-top: 20px;" @click="bug('A')">购买
                        </el-button>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" style="padding: 0">
                            <p class="card-title season">B套餐</p>
                        </div>
                        <p><s>原价：1299 元 / 2年</s></p>
                        <p>折扣价：599 元 / 2年</p>
                        <el-button type="warning" style="width: 180px; margin-top: 20px;" @click="bug('B')">购买
                        </el-button>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" style="padding: 0">
                            <p class="card-title year">团购套餐（6人+）</p>
                        </div>
                        <p><s>原价：699 元 / 年</s></p>
                        <p>团购价：299 元 / 年</p>
                        <el-button type="success" style="width: 180px; margin-top: 20px;" @click="showDialog = true">
                            申请团购
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="商务合作" :visible.sync="showDialog">
            <div>
                <div class="log-item"><span class="title">团购联系人：</span><span class="value">谢经理</span></div>
                <div class="log-item"><span class="title">电话：</span><span class="value">18259266523</span></div>
                <div class="log-item"><span class="title">邮箱：</span><span class="value"><a
                        href="mailto:123123312@qq.com">xjq110826@163.com</a></span></div>
                <div class="log-item" style="height: 100px;"><span class="title">微信：</span><span class="value"><img
                        style="width: 100px; height: 100px; margin-top: 10px;"
                        src="@/assets/img/wechat.jpg"></img></span></div>
            </div>
        </el-dialog>
        <common-footer></common-footer>
    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'

    export default {
        name: "price",
        components: {commonNav, commonFooter},
        data() {
            return {
                showDialog: false
            }
        },
        mounted() {
            this.$store.commit('currNav', '/price')
        },
        methods: {
            bug(set) {
                this.$router.push({
                    name: 'payment',
                    query: {set: set}
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        min-height: calc(100vh - 320px);
    }

    .banner {
        height: 260px;
        background: url("../../../src/assets/img/banner_bg.jpg");
    }

    .banner h2 {
        color: #fff;
        font-weight: 400;
        font-size: 40px;
        padding-top: 90px;
    }

    .banner p {
        color: #fff;
    }

    .card-title {
        margin: 0;
        color: #fff;
        padding: 10px;
        font-weight: 500;
        font-size: 25px;
    }

    .log-item {
        width: 500px;
        margin: auto;
        min-height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    .title {
        width: 30%;
        display: inline-block;
        float: left;
        text-align: right;
        font-weight: 600;
    }

    .value {
        display: inline-block;
        float: left;
        text-align: left;
        padding-left: 10px;
    }

    .month {
        background-color: #409EFF;
    }

    .season {
        background-color: #E6A23C;
    }

    .year {
        background-color: #67C23A;
    }

    .box-card p {
        font-size: 18px;
    }

    a {
        text-decoration: none;
        color: #606266;
    }
</style>

