<template>
    <div>
        <common-nav></common-nav>
        <div class="divi">
            <el-divider content-position="center">账号信息</el-divider>
        </div>
        <div class="info"><span class="title">账号：</span><span class="value">{{userAccount}}</span></div>
        <div class="info"><span class="title">套餐：</span><span class="value">{{setName}}</span></div>
        <div class="info"><span class="title">到期日：</span><span class="value">{{expireDate}}</span></div>
        <div class="info"><span class="title">待支付金额：</span><span class="value amt">￥ {{price}}</span></div>
        <div class="divi">
            <el-divider content-position="center">支付方式</el-divider>
        </div>
        <div style="width: 100%;margin-top: 20px;">
            <div style="width: 200px;height: 40px;margin: auto;display: flex;justify-content:center;">
                <img src="@/assets/img/wepay.png" style="height: 20px; width: 20px;margin: 10px;float: left;">
                <p class="wxpay">微信支付</p>
            </div>
            <div id="wxqr" style="width: 200px; height: 200px; margin: auto">
                <el-image :src="qr" fit="contain" style="width: 100%; height: 100%;">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
        </div>
        <p style="color: #909399" class="hidden-sm-and-up">长按识别二维码付款</p>
    </div>
</template>

<script>

    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'
    import dayjs from 'dayjs'

    let QRCode = require('qrcode');

    export default {
        name: "payment",
        components: {commonNav, commonFooter},
        data() {
            return {
                qr: '',
                setName: '',
                userAccount: '',
                price: '',
                expireDate: '',
                tm: null,
                isPay: false,
                endDate: '',
            }
        },
        watch: {
            "isPay"(n, o) {
                if (n) {
                    this.$alert('您的账户已经支付成功！到期日为 ' + this.endDate, '提示', {
                        confirmButtonText: '确定',
                        showClose: false,
                        center: true,
                        callback: action => {
                            this.$router.replace('/')
                        }
                    });

                }
            }
        },
        mounted() {
            this.$store.commit('currNav', '/payment');

            this.checkPayment();
            this.tm = setInterval(this.checkPayment, 2000);

            // 商品价格, 单位是分
            let productId = '1';
            if (this.$route.query.set === 'A') {
                productId = 'A' + '_' + '39900';
                this.setName = 'A套餐，399 / 年';
                this.price = '399';
                this.expireDate = dayjs().add(365, 'day').format('YYYY-MM-DD');
            } else if (this.$route.query.set === 'B') {
                productId = 'B' + '_' + '59900';
                this.setName = 'B套餐，599 / 2年';
                this.price = '599';
                this.expireDate = dayjs().add(730, 'day').format('YYYY-MM-DD');
            } else {
                this.$router.replace('/price')
            }

            this.$axios.post(this.$api.userInfo).then((res) => {
                if (res.data.code === '00') {
                    this.userAccount = res.data.data.user_account
                }
            }).catch((res) => {
                console.log(res);
            });

            let timeStamp = Date.parse(new Date()).toString().substr(0, 10);
            let data = {
                appid: 'wx29d771f40597ece9',
                mch_id: '1540805771',
                time_stamp: timeStamp,
                nonce_str: 'yujiahao',
                product_id: productId,
            };
            this.$axios.post(this.$api.getPayUrl, data).then((res) => {
                if (res.data.code === '00') {
                    QRCode.toDataURL(res.data.data.url).then(url => {
                        this.qr = url
                    }).catch(err => {
                        console.error(err)
                    })
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        methods: {
            checkPayment() {
                this.$axios.get(this.$api.checkPayment).then((res) => {
                    if (res.data.code === '00') {
                        this.isPay = res.data.data.isPayed
                        this.endDate = res.data.data.expiredDate
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch((res) => {
                    console.log(res);
                });
            }
        },
        destroyed() {
            window.clearInterval(this.tm)
        }
    }
</script>

<style scoped>

    .divi {
        max-width: 1400px;
        width: 100%;
        margin: auto;
        margin-top: 50px;
    }

    .title {
        display: inline-block;
        width: 50%;
        float: left;
        text-align: right;
        font-weight: 600;
    }

    .info {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .value {
        float: left;
        padding-left: 20px;
    }

    .amt {
        font-size: 30px;
        color: #E6A23C;
    }
</style>
<style>
    .wxpay {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        float: left;
        margin: 0;
    }

    .image-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f7fa;
        height: 100%;
    }
</style>