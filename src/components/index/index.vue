<template>
    <div>
        <common-nav></common-nav>
        <div class="hidden-xs-only">
            <div>
                <img src="@/assets/img/bg5.jpg" style="width: 100%" high="1200px">
            </div>
            <div class="classily">
                <div class="free">
                    <img id="aixin" src="@/assets/img/a.jpg" style="width:50px">
                    <p class="title">团队管理</p>
                    <p class="s_title">操作简单 高效管理</p>
                </div>
                <div class="free">
                    <img src="@/assets/img/g.jpg" style="width:50px">
                    <p class="title">功能丰富</p>
                    <p class="s_title">数据建立 一目了然</p>
                </div>
                <div class="free">
                    <img src="@/assets/img/s.jpg" style="width:50px">
                    <p class="title">团队活跃</p>
                    <p class="s_title">随时调用 方便快捷</p>
                </div>
            </div>

            <div class="introduce" style="width:1000px">
                <div class="line">
                    <div class="planing">
                        <p class="bigtitle">全新1.0</p>
                        <p id="network">网络图</p>
                        <p class="summary">操作简单十秒记录会员网络位置</p>
                        <p class="summary">告别手写记录网络图</p>
                        <p class="summary">后台帮您永久保存网络数据</p>
                        <p class="summary">搜索ID查看任一下线合作伙伴网络图</p>
                        <p class="summary">团队领导者共同管理使用</p>
                        <p class="summary">市场开发效率倍增</p>

                    </div>
                    <div class="introduce_img"><img src="@/assets/img/feature-1.jpg"></div>
                </div>
                <div class="line">
                    <div class="introduce_img" id="jiankang"><img src="@/assets/img/iphone22.jpg"></div>
                    <div class="planing" id="twop">
                        <p class="bigtitle" id="2title">健康档案</p>
                        <p class="summary">手机一秒创建健康档案</p>
                        <p class="summary">链接发送客户，填写提交超便捷</p>
                        <p class="summary">高效收取客户健康档案信息</p>
                        <p class="summary">帮助您最快建立网络客户健康档案</p>
                    </div>

                </div>
                <div class="line">
                    <div class="planing" id="lmdd">
                        <p class="bigtitle">列名单</p>
                        <p class="summary">系统自带列名单功能</p>
                        <p class="summary">操作便捷</p>
                        <p class="summary">是您开发市场的好帮手</p>
                    </div>
                    <div class="introduce_img" id="three"><img src="@/assets/img/lmd.jpg"></div>
                </div>

                <div class="line">
                    <div class="planing" id="zdtx">
                        <p class="bigtitle">自动提醒</p>
                        <p class="summary">当您暂代管N个会员账号的网络订货</p>
                        <p class="summary">是否担心错过自动订货变更产品和支付时间</p>
                        <p class="summary">开启短信提醒功能，每周四短信通知</p>
                        <p class="summary">您所管理的会员账号，本周自动订货详细名单</p>
                        <p class="summary">以及超级扩展明星资格到期提醒</p>
                    </div>
                    <div class="introduce_img" id="fore"><img src="@/assets/img/dx.jpg"></div>
                </div>



            </div>
        </div>
        <common-footer></common-footer>

        <!--移动端样式-->
        <div class="hidden-sm-and-up">
            <!--<h1 class="name">葆婴助手</h1>-->
            <!--<div>-->
            <!--<img class="banner" src="@/assets/img/banner_img.jpg" style="width: 100%">-->
            <!--</div>-->
            <!--<div class="summarize">-->
            <!--<img id="" src="@/assets/img/a.jpg" style="width:36px">-->
            <!--<p class="summarize_bt">团队管理</p>-->
            <!--<p class="summarize_st">操作简单 高效管理</p>-->
            <!--</div>-->
            <!--<div class="summarize">-->
            <!--<img src="@/assets/img/g.jpg" style="width:36px">-->
            <!--<p class="summarize_bt">功能丰富</p>-->
            <!--<p class="summarize_st">网络规划 一目了然</p>-->
            <!--</div>-->
            <!--<div class="summarize">-->
            <!--<img src="@/assets/img/s.jpg" style="width:36px">-->
            <!--<p class="summarize_bt">用户活跃</p>-->
            <!--<p class="summarize_st">随时调用 方便快捷</p>-->
            <!--</div>-->
            <h2 class="name_h2">葆婴助手</h2>
            <h3 class="name_h3">全新1.0</h3>
            <div class="introduce_1">
                <div class=""><img src="@/assets/img/feature-1.jpg"></div>
                <h2 class="introduce_classily">网络图</h2>
                <h3 class="details">操作简单十秒记录会员网络位置</h3>
                <h3 class="details">告别手写记录网络图</h3>
                <h3 class="details">后台帮您永久保存网络数据</h3>
                <h3 class="details">搜索ID查看任一下线合作伙伴网络图</h3>
                <h3 class="details">团队领导者共同管理使用</h3>
                <h3 class="details">市场开发效率倍增</h3>
            </div>
            <div class="introduce_1">
                <div class="introduce_2"><img src="@/assets/img/iphone22.jpg"></div>
                <h2 class="introduce_classily">健康档案</h2>
                <h3 class="details">手机一秒创建健康档案</h3>
                <h3 class="details">链接发送客户，填写提交超便捷</h3>
                <h3 class="details">高效收取客户健康档案信息</h3>
                <h3 class="details">帮助您最快建立网络客户健康档案</h3>
            </div>
            <div class="introduce_1">
                <div class=""><img src="@/assets/img/lmd.jpg"></div>
                <h2 class="introduce_classily">列名单</h2>
                <h3 class="details">系统自带列名单功能</h3>
                <h3 class="details">操作便捷</h3>
                <h3 class="details">是您开发市场的好帮手</h3>
            </div>
            <div class="introduce_1">
                <div class="introduce_2"><img src="@/assets/img/dx.jpg"></div>
                <h2 class="introduce_classily">自动提醒</h2>
                <h3 class="details">当您暂代管N个会员账号的网络订货</h3>
                <h3 class="details">是否担心错过自动订货变更产品和支付时间</h3>
                <h3 class="details">开启短信提醒功能，每周四短信通知</h3>
                <h3 class="details">您所管理的会员账号，本周自动订货详细名单</h3>
                <h3 class="details">以及超级扩展明星资格到期提醒</h3>
            </div>
            <el-row>
                <h2 class="introduce_classily">开始体验</h2>

                <el-button class="buy-btn" style="margin-top: 50px;" @click="toDoc">免费体验
                </el-button>
                <el-button type="primary" class="buy-btn" style="margin-left: 0;" @click="toBuy('A')">A套餐 399 / 年
                </el-button>
                <el-button type="success" class="buy-btn" style="margin-left: 0;margin-bottom: 50px;"
                           @click="toBuy('B')">B套餐 599 / 2年
                </el-button>

            </el-row>
            <div class="footer_phone">
                <h3>联系我们</h3>
                <img src="@/assets/img/wechat.jpg">
                <p>电话：18259266523</p>
                <p>邮箱：xjq110826@163.com</p>
            </div>
        </div>
    </div>
</template>


<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        name: "index",
        components: {commonNav, commonFooter},
        mounted() {
            this.$store.commit('currNav', '/')
        },
        methods: {
            toBuy(set) {
                this.$router.push({
                    name: 'payment',
                    query: {set: set}
                })
            },
            toDoc() {
                this.$router.push('/document')
            }
        }
    }
</script>

<style scoped>
    .classily {
        margin-top: 100px;
        width: 1000px;
        height: 350px;
        margin: auto;
    }

    #aixin {
        height: 50px;

    }

    #aixin.img {
        height: 100%;
    }

    .free {
        float: left;
        width: 33.3333%;
        margin-top: 100px;

    }

    .title {
        color: #333743;
        margin: 25px 0 0 0;
        font-weight: 400;
        font-size: 22px;
    }

    .s_title {
        margin: 5px 0 0 0;
        font-size: 14px;
        color: #9297A3;
    }

    .introduce {
        width: 1000px;
        height: 2000px;
        margin: auto;
        padding: 0 30px;
        margin-bottom: 100px;
    }

    .line {
        width: 100%;
        height: 350px;

        margin: 120px 0;
    }

    .planing {
        text-align: left;
        width: 30%;
        height: 400px;
        float: left;

    }

    .introduce_img {
        float: right;

    }

    #jiankang {
        float: left;

    }

    #jiankang img {
        width: 300px;
        height: 520px;
    }

    .introduce_img img {
        border-radius: 10px;
        width: 600px;
        height: 340px;

    }

    .bigtitle {
        font-size: 35px;
        color: #333743;
        font-weight: 400;
        margin: 0px 0 30px 0;

    }

    #2title {
        margin-top: 120px;
    }

    #network {
        color: #000;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 0;
    }

    .summary {
        color: #9297A3;
        font-size: 14px;
        line-height: 1.42857143;
        font-weight: 300;

    }

    /*#twoimg {*/
        /*float: left;*/
    /*}*/

    #twoimg img {
        width: 550px;
    }

    #twop {
        margin-top: 120px;
        float: right;
    }

    #three img {
        width: 550px;
        height: 340px;

    }

    /*移动端样式*/
    .name {
        background-color: #333;
        color: white;
        margin: 0;


    }

    .banner img {
        width: 100%;

    }

    .summarize {
        margin-top: 50px;
    }

    .summarize_bt {
        color: #333743;
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 0;

    }

    .summarize_st {
        color: #9297A3;
        font-weight: 300;
        margin-top: 11px;
    }

    .name_h2 {
        font-size: 30px;
        margin-top: 50px;
        margin-bottom: 12px;
        color: #333743;
        font-weight: 300;
    }

    .name_h3 {
        margin-top: 0px;
        color: #333743;

    }

    .introduce_1 img {
        width: 100%;
        margin-top: 30px;
        /*margin-left: 18px;*/
    }

    .introduce_2 img {
        width: 230px !important;
    }

    .introduce_classily {
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 12px;
        color: #333743;
        font-weight: 400;

    }

    .details {
        font-size: 14px;
        font-weight: 300;
        color: #9297A3;
        margin: 15px 0;
        font-family: -apple-system, BlinkMacSystemFont;

    }

    #buy {
        margin: 60px 0 10PX 0;
        width: 180px;
        float: left;
        margin-left: 120px;
    }

    .buy-btn {
        margin: 10px 0;
        width: 60%;

    }

    .footer_phone {
        width: 100%;
        height: 305px;
        background-color: #303133;

    }

    .footer_phone h3 {
        margin-top: 0;
        padding-top: 25px;
        color: #606266;
    }

    .footer_phone img {
        width: 120px;
        height: 120px;
    }

    .footer_phone p {
        color: white;
        font-size: 15px;
    }
    #lmdd{
        width: 100%;
        height: 400px;
        padding-top: 100px;
        float: left;
    }
    #three{
        float: right;

    }
    #three img{
        margin-top: 70px;
        padding-top: 100px;

    }
    #lmdd {
        width:200px;
        margin-right: 100px;
        padding-top:170px;
        float: left;
        margin-left: -200px;
    }
    #lmdd p{

    }
    #zdtx{
        float: right;
        margin-top: 150px;
    }
    #fore{
        width: 230px;
        height: 400px;
        float: left;
        margin-left: -300px;
        padding-top: 80px;
    }
    #fore img{
        width: 230px;
        height: 400px;
        float: left;

    }
</style>