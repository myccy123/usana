<template>
    <div>
        <common-nav class="hidden-xs-only"></common-nav>
        <div class="content ask">
            <el-input id="href" v-model="href" readonly size="mini" style="width: 90%;margin-top: 20px; max-width: 600px;">
                <el-button id="copy" data-clipboard-target="#href" slot="append" icon="el-icon-document-copy" style="padding: 4px;">复制链接</el-button>
            </el-input>
            <h2>健康档案</h2>
            <el-form class="forms" :model="health" label-width="80px" size="mini" style="padding-right: 10px;">
                <el-form-item label="日期">
                    <el-input v-model="health.date" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="health.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="health.gender" style="float: left">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生年月" style="float: left">
                    <el-date-picker
                            v-model="health.birthDay"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="子女情况" style="clear: both">
                    <el-radio-group v-model="health.baby" style="float: left">
                        <el-radio-button label="有"></el-radio-button>
                        <el-radio-button label="无"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="体重">
                    <el-input v-model="health.weight">
                        <template slot="append">公斤 / KG</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="身高">
                    <el-input v-model="health.top">
                        <template slot="append">厘米 / CM</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="职业类别">
                    <el-checkbox-group v-model="health.job" style="text-align: left">
                        <el-checkbox label="教师"></el-checkbox>
                        <el-checkbox label="白领"></el-checkbox>
                        <el-checkbox label="经商"></el-checkbox>
                        <el-checkbox label="全职妈妈"></el-checkbox>
                        <el-checkbox label="学生"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <h2>生活习惯</h2>
            <el-form class="forms" :model="life" label-width="80px" size="mini">
                <el-form-item label="饮食习惯">
                    <el-checkbox-group v-model="life.dietOften" style="text-align: left">
                        <el-checkbox label="定时定量"></el-checkbox>
                        <el-checkbox label="无规律"></el-checkbox>
                        <el-checkbox label="正在节食"></el-checkbox>
                        <el-checkbox label="常吃速食"></el-checkbox>
                        <el-checkbox label="饮水少"></el-checkbox>
                        <el-checkbox label="饮水多"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="膳食搭配">
                    <el-checkbox-group v-model="life.dietSet" style="text-align: left">
                        <el-checkbox label="素食为主"></el-checkbox>
                        <el-checkbox label="主副搭配"></el-checkbox>
                        <el-checkbox label="荤素搭配"></el-checkbox>
                        <el-checkbox label="粗细搭配"></el-checkbox>
                        <el-checkbox label="干稀搭配"></el-checkbox>
                        <el-checkbox label="油炸物"></el-checkbox>
                        <el-checkbox label="辣物"></el-checkbox>
                        <el-checkbox label="咸物"></el-checkbox>
                        <el-checkbox label="甜食"></el-checkbox>
                        <el-checkbox label="清淡物"></el-checkbox>
                        <el-checkbox label="肉类"></el-checkbox>
                        <el-checkbox label="淀粉"></el-checkbox>
                        <el-checkbox label="海鲜"></el-checkbox>
                        <el-checkbox label="蔬菜"></el-checkbox>
                        <el-checkbox label="水果"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="睡眠情况">
                    <el-checkbox-group v-model="life.sleep" style="text-align: left">
                        <el-checkbox label="好"></el-checkbox>
                        <el-checkbox label="一般"></el-checkbox>
                        <el-checkbox label="不好"></el-checkbox>
                        <el-checkbox label="多梦"></el-checkbox>
                        <el-checkbox label="恶梦"></el-checkbox>
                        <el-checkbox label="易醒"></el-checkbox>
                        <el-checkbox label="失眠"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="个人嗜好">
                    <el-checkbox-group v-model="life.hobby" style="text-align: left">
                        <el-checkbox label="吸烟"></el-checkbox>
                        <el-checkbox label="饮酒"></el-checkbox>
                        <el-checkbox label="咖啡"></el-checkbox>
                        <el-checkbox label="茶"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="运动习惯">
                    <el-checkbox-group v-model="life.sport" style="text-align: left">
                        <el-checkbox label="不运动"></el-checkbox>
                        <el-checkbox label="偶尔运动"></el-checkbox>
                        <el-checkbox label="经常运动"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="用药情况">
                    <el-checkbox-group v-model="life.medicine" style="text-align: left">
                        <el-checkbox label="安眠药"></el-checkbox>
                        <el-checkbox label="避孕药"></el-checkbox>
                        <el-checkbox label="止痛药"></el-checkbox>
                        <el-checkbox label="减肥药"></el-checkbox>
                        <el-checkbox label="缓泻药"></el-checkbox>
                        <el-checkbox label="利尿药"></el-checkbox>
                        <el-checkbox label="激素类药"></el-checkbox>
                        <el-checkbox label="保健药"></el-checkbox>
                        <el-checkbox label="维他命"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <h2>身体状况</h2>
            <el-form class="forms" :model="body" label-width="80px" size="mini">
                <el-form-item label="健康状况">
                    <el-checkbox-group v-model="body.health" style="text-align: left">
                        <el-checkbox label="满意"></el-checkbox>
                        <el-checkbox label="不满意"></el-checkbox>
                        <el-checkbox label="一般"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="五官疾病">
                    <el-checkbox-group v-model="body.five" style="text-align: left">
                        <el-checkbox label="口腔溃疡"></el-checkbox>
                        <el-checkbox label="白内障"></el-checkbox>
                        <el-checkbox label="青光眼"></el-checkbox>
                        <el-checkbox label="飞蚊症"></el-checkbox>
                        <el-checkbox label="黄斑变性"></el-checkbox>
                        <el-checkbox label="鼻窦炎"></el-checkbox>
                        <el-checkbox label="过敏"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="神经肌肉系统">
                    <el-checkbox-group v-model="body.neuro" style="text-align: left">
                        <el-checkbox label="失眠"></el-checkbox>
                        <el-checkbox label="多梦"></el-checkbox>
                        <el-checkbox label="神经衰弱"></el-checkbox>
                        <el-checkbox label="偏头痛"></el-checkbox>
                        <el-checkbox label="美尼尔氏症"></el-checkbox>
                        <el-checkbox label="晕车晕船"></el-checkbox>
                        <el-checkbox label="忧郁/焦虑/多疑"></el-checkbox>
                        <el-checkbox label="记忆力下降"></el-checkbox>
                        <el-checkbox label="疲劳"></el-checkbox>
                        <el-checkbox label="爱唠叨"></el-checkbox>
                        <el-checkbox label="扇颈酸痛"></el-checkbox>
                        <el-checkbox label="肩周炎"></el-checkbox>
                        <el-checkbox label="颈椎病"></el-checkbox>
                        <el-checkbox label="腰肌劳损"></el-checkbox>
                        <el-checkbox label="肌肉痛/抽筋"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="心脑血管与循环">
                    <el-checkbox-group v-model="body.loop" style="text-align: left">
                        <el-checkbox label="静脉曲张"></el-checkbox>
                        <el-checkbox label="口腔溃疡"></el-checkbox>
                        <el-checkbox label="冠心病"></el-checkbox>
                        <el-checkbox label="动脉硬化"></el-checkbox>
                        <el-checkbox label="高血压"></el-checkbox>
                        <el-checkbox label="高血脂"></el-checkbox>
                        <el-checkbox label="高血糖"></el-checkbox>
                        <el-checkbox label="低血压/贫血"></el-checkbox>
                        <el-checkbox label="心肌炎"></el-checkbox>
                        <el-checkbox label="中风"></el-checkbox>
                        <el-checkbox label="癫痫"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="肝胆及消化系统">
                    <el-checkbox-group v-model="body.digestion" style="text-align: left">
                        <el-checkbox label="胃溃疡"></el-checkbox>
                        <el-checkbox label="胃炎"></el-checkbox>
                        <el-checkbox label="胃胀"></el-checkbox>
                        <el-checkbox label="胃下垂"></el-checkbox>
                        <el-checkbox label="食欲不振/厌食"></el-checkbox>
                        <el-checkbox label="口臭"></el-checkbox>
                        <el-checkbox label="口苦"></el-checkbox>
                        <el-checkbox label="慢性腹泻"></el-checkbox>
                        <el-checkbox label="痔疮"></el-checkbox>
                        <el-checkbox label="偶尔便秘"></el-checkbox>
                        <el-checkbox label=胀气"></el-checkbox>
                        <el-checkbox label="肝炎"></el-checkbox>
                        <el-checkbox label="脂防肝"></el-checkbox>
                        <el-checkbox label="胆囊炎"></el-checkbox>
                        <el-checkbox label="胆结石"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="肺与呼吸">
                    <el-checkbox-group v-model="body.breath" style="text-align: left">
                        <el-checkbox label="手脚冰凉"></el-checkbox>
                        <el-checkbox label="易感冒"></el-checkbox>
                        <el-checkbox label="哮喘"></el-checkbox>
                        <el-checkbox label="气管炎"></el-checkbox>
                        <el-checkbox label="鼻炎"></el-checkbox>
                        <el-checkbox label="慢性咽喉炎"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="泌尿系统">
                    <el-checkbox-group v-model="body.urinary" style="text-align: left">
                        <el-checkbox label="膀胱炎"></el-checkbox>
                        <el-checkbox label="尿频尿急"></el-checkbox>
                        <el-checkbox label="夜尿多肾炎"></el-checkbox>
                        <el-checkbox label="肾结石"></el-checkbox>
                        <el-checkbox label="尿毒症"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="生殖及内分泌系统">
                    <el-checkbox-group v-model="body.reproduction" style="text-align: left">
                        <el-checkbox label="性欲减退/性功能下降"></el-checkbox>
                        <el-checkbox label="阴道炎"></el-checkbox>
                        <el-checkbox label="盆腔炎"></el-checkbox>
                        <el-checkbox label="附件炎"></el-checkbox>
                        <el-checkbox label="子宫肌瘤"></el-checkbox>
                        <el-checkbox label="卵巢囊肿"></el-checkbox>
                        <el-checkbox label="经前期综合症"></el-checkbox>
                        <el-checkbox label="痛经"></el-checkbox>
                        <el-checkbox label="月经不调"></el-checkbox>
                        <el-checkbox label="乳腺小叶增生"></el-checkbox>
                        <el-checkbox label="内分泌失调"></el-checkbox>
                        <el-checkbox label="更年期综合症"></el-checkbox>
                        <el-checkbox label="前列腺肥大/前列腺炎"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="兔疫系统">
                    <el-checkbox-group v-model="body.immune" style="text-align: left">
                        <el-checkbox label="糖尿病"></el-checkbox>
                        <el-checkbox label="甲亢"></el-checkbox>
                        <el-checkbox label="甲减"></el-checkbox>
                        <el-checkbox label="肥胖"></el-checkbox>
                        <el-checkbox label="痛风"></el-checkbox>
                        <el-checkbox label="类风湿关节炎"></el-checkbox>
                        <el-checkbox label="帕金森氏症"></el-checkbox>
                        <el-checkbox label="老年痴呆症"></el-checkbox>
                        <el-checkbox label="强直性脊柱炎"></el-checkbox>
                        <el-checkbox label="类风湿关节炎"></el-checkbox>
                        <el-checkbox label="日系统性红斑狼疮"></el-checkbox>
                        <el-checkbox label="硬化症"></el-checkbox>
                        <el-checkbox label="慢性疲劳综合症"></el-checkbox>
                        <el-checkbox label="纤维化肌痛"></el-checkbox>
                        <el-checkbox label="脱发"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="肌肤类型">
                    <el-checkbox-group v-model="body.skinType" style="text-align: left">
                        <el-checkbox label="干性"></el-checkbox>
                        <el-checkbox label="中性"></el-checkbox>
                        <el-checkbox label="油性"></el-checkbox>
                        <el-checkbox label="混合性"></el-checkbox>
                        <el-checkbox label="敏感性"></el-checkbox>
                        <el-checkbox label="衰老性"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="肤色">
                    <el-checkbox-group v-model="body.skinColor" style="text-align: left">
                        <el-checkbox label="白皙"></el-checkbox>
                        <el-checkbox label="红润"></el-checkbox>
                        <el-checkbox label="晦暗"></el-checkbox>
                        <el-checkbox label="发黄"></el-checkbox>
                        <el-checkbox label="粉刺面"></el-checkbox>
                        <el-checkbox label="雀斑"></el-checkbox>
                        <el-checkbox label="黄褐斑"></el-checkbox>
                        <el-checkbox label="老人斑"></el-checkbox>
                        <el-checkbox label="外伤性斑"></el-checkbox>
                        <el-checkbox label="印痕凹洞"></el-checkbox>
                        <el-checkbox label="过敏"></el-checkbox>
                        <el-checkbox label="毛孔粗大"></el-checkbox>
                        <el-checkbox label="红血丝"></el-checkbox>
                        <el-checkbox label="皱纹"></el-checkbox>
                        <el-checkbox label="松弛下垂"></el-checkbox>
                        <el-checkbox label="黑眼圈"></el-checkbox>
                        <el-checkbox label="眼袋"></el-checkbox>
                        <el-checkbox label="扁平疣"></el-checkbox>
                        <el-checkbox label="牛皮癬"></el-checkbox>
                        <el-checkbox label="湿疹"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="心理状况">
                    <el-checkbox-group v-model="body.mind" style="text-align: left">
                        <el-checkbox label="孤独自卑/优郁苦闷"></el-checkbox>
                        <el-checkbox label="注意分散/注意力缺乏症"></el-checkbox>
                        <el-checkbox label="压力大易疲劳"></el-checkbox>
                        <el-checkbox label="精神焦虑"></el-checkbox>
                        <el-checkbox label="烦躁易怒"></el-checkbox>
                        <el-checkbox label="抑郁症"></el-checkbox>
                        <el-checkbox label="狂躁症"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注" style="padding-right: 10px;">
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            rows="5"
                            v-model="note">
                    </el-input>
                </el-form-item>
                <el-button type="primary" icon="el-icon-circle-check"
                           style="width: 80%; max-width: 250px;margin-bottom: 20px;"
                           @click="commitDoc">提交
                </el-button>
            </el-form>
        </div>
        <common-footer class="hidden-xs-only"></common-footer>

    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'
    import dayjs from 'dayjs'
    import 'element-ui/lib/theme-chalk/display.css';
    import ClipboardJS from 'clipboard'

    export default {
        name: "document",
        components: {commonNav, commonFooter},
        data() {
            return {
                health: {
                    date: null,
                    name: '',
                    gender: '',
                    birthDay: '',
                    baby: '',
                    weight: '',
                    top: '',
                    job: [],
                },
                life: {
                    dietOften: [],
                    dietSet: [],
                    sleep: [],
                    hobby: [],
                    sport: [],
                    medicine: [],
                },
                body: {
                    health: [],
                    five: [],
                    neuro: [],
                    loop: [],
                    digestion: [],
                    breath: [],
                    urinary: [],
                    reproduction: [],
                    immune: [],
                    skinType: [],
                    skinColor: [],
                    mind: [],
                },
                note: '',
                href: '',
            }
        },
        mounted() {
            this.health.date = dayjs().format('YYYY-MM-DD');
            this.docDetail()
            this.href = this.$api.baseUrl + '/#' + this.$route.fullPath
            new ClipboardJS('#copy');
        },
        methods: {
            docDetail() {
                this.$axios.get(this.$api.docDetail, {params: {id: this.$route.query.id}}).then((res) => {
                    if (res.data.code === '00') {
                        let doc = res.data.data;
                        if (doc.is_save === '1') {
                            this.health.date = doc.update_date.split(' ')[0]
                        }
                        this.health.name = doc.name;
                        this.health.gender = doc.gender;
                        this.health.birthDay = doc.birth_day;
                        this.health.baby = doc.baby;
                        this.health.weight = doc.weight;
                        this.health.top = doc.top;
                        this.health.job = doc.job.split(',');
                        this.life.dietOften = doc.life_diet_often.split(',');
                        this.life.dietSet = doc.life_diet_set.split(',');
                        this.life.sleep = doc.life_sleep.split(',');
                        this.life.hobby = doc.life_hobby.split(',');
                        this.life.sport = doc.life_sport.split(',');
                        this.life.medicine = doc.life_medicine.split(',');
                        this.body.health = doc.body_health.split(',');
                        this.body.five = doc.body_five.split(',');
                        this.body.neuro = doc.body_neuro.split(',');
                        this.body.loop = doc.body_loop.split(',');
                        this.body.digestion = doc.body_digestion.split(',');
                        this.body.breath = doc.body_breath.split(',');
                        this.body.urinary = doc.body_urinary.split(',');
                        this.body.reproduction = doc.body_reproduction.split(',');
                        this.body.immune = doc.body_immune.split(',');
                        this.body.skinType = doc.body_skin_type.split(',');
                        this.body.skinColor = doc.body_skin_color.split(',');
                        this.body.mind = doc.body_mind.split(',');
                        this.note = doc.note
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            commitDoc() {
                let data = {
                    id: this.$route.query.id,
                    health: {
                        ...this.health
                    },
                    life: {
                        ...this.life
                    },
                    body: {
                        ...this.body
                    },
                    note: this.note
                };
                this.$axios.post(this.$api.saveDoc, data).then((res) => {
                    if (res.data.code === '00') {
                        this.$message.success('提交成功!');
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            copyHref() {

            },
            wxShare(){
                let timestamp = new Date().getTime();
                timestamp = timestamp.toString().substring(0, 10);
                let url = window.location.href;
                url = encodeURIComponent(url.split('#').slice(0,url.split('#').length-1).join('#'));

                const imgurl = img;
                let params = {
                    params: {
                        timestamp: timestamp,
                        url: url
                    }
                }

                this.$axios.get(this.$api.wxShare, params).then((res) => {
                    let signature = res.data;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx86b375b39cf69443', // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: 'realter', // 必填，生成签名的随机串
                        signature: signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.ready(function () {
                        wx.onMenuShareAppMessage({
                            title: '健康档案', // 分享标题
                            desc: '创造您的未来，CREATE YOUR FUTURE', // 分享描述
                            link: '', // 分享链接
                            imgUrl: imgurl, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: '健康档案', // 分享标题
                            link: '', // 分享链接
                            imgUrl: imgurl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>
    .forms {
        max-width: 500px;
        margin: auto;
    }
</style>

<style>
    .ask .el-form-item__label {
        font-weight: bold;
    }
</style>