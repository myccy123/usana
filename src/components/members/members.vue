<template>
    <div>
        <common-nav></common-nav>
        <div class="content" v-loading="loadingInfo">
            <h1 style="margin: 50px;color: #909399;">团队名单</h1>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%;margin-bottom: 30px;">
                <el-table-column
                        header-align="center"
                        sortable
                        align="center"
                        prop="name"
                        label="姓名">
                    <template slot-scope="scope">
                        {{scope.row.name}}<br>
                        {{scope.row.usana_id}}
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        sortable
                        align="center"
                        prop="center"
                        label="商务中心">
                    <template slot-scope="scope">
                        {{padding0(scope.row.center,3)}}
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        sortable
                        align="center"
                        width="200"
                        prop="pos_name"
                        label="位置">
                    <template slot-scope="scope">
                        {{scope.row.pos_name}}({{scope.row.pos_usana_id}}) [{{padding0(scope.row.pos_center,3)}}/{{scope.row.pos_dept}}]
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--v-if="!isMobile"-->
                        <!--header-align="center"-->
                        <!--align="center"-->
                        <!--prop="password"-->
                        <!--label="密码">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--v-if="!isMobile"-->
                        <!--header-align="center"-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="open_date"-->
                        <!--label="开户日期">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{parseDate(scope.row.open_date)}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--v-if="!isMobile"-->
                        <!--header-align="center"-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="open_date"-->
                        <!--label="超级扩展名明到期日">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{overData(scope.row.open_date)}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--v-if="!isMobile"-->
                        <!--header-align="center"-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="order_date"-->
                        <!--label="上一次自动订货日">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{parseDate(scope.row.order_date)}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--v-if="!isMobile"-->
                        <!--header-align="center"-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="order_date"-->
                        <!--label="下一次自动订货日">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{nextOrderDate(scope.row.order_date)}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>

        </div>
        <common-footer></common-footer>

    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'
    import dayjs from 'dayjs'

    export default {
        name: "members",
        components: {commonNav, commonFooter},
        data() {
            return {
                tableData: [],
                loadingInfo: false,
                isMobile: false,
            }
        },
        mounted() {
            this.$store.commit('currNav', '/team')

            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            this.isMobile = flag? true : false
            this.loadingInfo = true
            this.$axios.get(this.$api.teamInfo).then((res) => {
                if (res.data.code === '00') {
                    this.tableData = res.data.data
                }
                this.loadingInfo = false
            }).catch((res) => {
                this.loadingInfo = false
                console.log(res);
            })
        },
        methods: {
            padding0(num, length) {
                for (let len = (num + "").length; len < length; len = num.length) {
                    num = "0" + num;
                }
                return num;
            },
            parseDate(date) {
                if(dayjs(date).isValid()) {
                    return dayjs(date).format('YYYY-MM-DD')
                } else {
                    return ''
                }
            },
            overData(date) {
                if(dayjs(date).isValid()) {
                    return dayjs(date).add(56,"day").format('YYYY-MM-DD')
                } else {
                    return ''
                }
            },
            nextOrderDate(date) {
                if(dayjs(date).isValid()) {
                    return dayjs(date).add(28,"day").format('YYYY-MM-DD')
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        max-width: 1200px;
        margin: auto;
    }
</style>