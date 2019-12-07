<template>
    <div>
        <common-nav></common-nav>
        <div class="content">
            <h2 class="sc-title">
                超级拓展明星到期日
            </h2>
            <div class="table-div" v-loading="loading0">
                <el-table
                        :default-sort="{prop: 'orderDate', order: 'ascending'}"
                        :data="tableData0" border stripe
                        style="width: 100%;"
                        header-row-class-name="tb-header">
                    <el-table-column
                            sortable
                            align="center"
                            prop="overDate"
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            sortable
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            sortable
                            align="center"
                            prop="usanaId"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="usanaPassword"
                            label="密码">
                    </el-table-column>
                </el-table>
            </div>
            <h2 class="sc-title">
                本周自动订货
            </h2>
            <div class="table-div" v-loading="loading">
                <el-table
                        :default-sort="{prop: 'orderDate', order: 'ascending'}"
                        :data="tableData" border stripe
                        style="width: 100%"
                        header-row-class-name="tb-header">
                    <el-table-column
                            sortable
                            align="center"
                            prop="orderDate"
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            sortable
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            sortable
                            align="center"
                            prop="usanaId"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="usanaPassword"
                            label="密码">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'

    export default {
        name: "order_schedule",
        components: {commonNav, commonFooter},
        data() {
            return {
                tableData: [],
                tableData0: [],
                loading: false,
                loading0: false,
                isMobile: false,
            }
        },
        mounted() {
            this.$store.commit('currNav', '/orders')

            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            this.isMobile = flag ? true : false

            // 自动订货
            this.loading = true
            this.$axios.get(this.$api.orderSchedule).then((res) => {
                if (res.data.code === '00') {
                    this.tableData = res.data.data
                }
                this.loading = false
            }).catch((res) => {
                console.log(res);
                this.loading = false
            })

            // 扩展明星
            this.loading0 = true
            this.$axios.get(this.$api.overDateSchedule).then((res) => {
                if (res.data.code === '00') {
                    this.tableData0 = res.data.data
                }
                this.loading0 = false
            }).catch((res) => {
                console.log(res);
                this.loading0 = false
            })
        }
    }
</script>

<style>
    .content {
        min-height: calc(100vh - 320px);
    }

    .sc-title {
        padding: 40px 0;
        margin: 0;
        color: #606266;
        font-size: 1.5rem;
    }

    .table-div {
        max-width: 1200px;
        width: 95%;
        margin: auto;
        padding-bottom: 60px;
    }

    .tb-header {
        background-color: #606266 !important;
        color: #303133 !important;
    }
</style>