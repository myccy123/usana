<template>
    <div>
        <common-nav></common-nav>
        <div style="width: 95%;margin: auto">
            <el-button type="primary" icon="el-icon-circle-plus-outline"
                       style="width: 80%; max-width: 250px;margin-top: 20px;"
                       @click="addDoc">新建档案
            </el-button>
            <h1 style="margin: 20px;color: #909399;font-size: 24px;">健康档案</h1>
            <el-table
                    :data="tableData"
                    stripe
                    @row-click="handleOpen"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="commited"
                        label="已提交">
                </el-table-column>
                <el-table-column
                        prop="updateDate"
                        label="更新日期">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import dayjs from 'dayjs'
    import CommonNav from "../common/nav";

    export default {
        name: "doc_list_m",
        components: {CommonNav},
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            this.docList()
        },
        methods: {
            docList() {
                this.tableData = []
                this.$axios.get(this.$api.docList).then((res) => {
                    if (res.data.code === '00') {
                        for (let doc of res.data.data) {
                            let tmp = {}
                            tmp.createDate = dayjs(doc.create_date).format('YYYY-MM-DD HH:mm')
                            tmp.name = doc.name
                            tmp.commited = doc.is_save == '1' ? '是' : '否'
                            tmp.updateDate = dayjs(doc.update_date).format('YYYY-MM-DD')
                            tmp.id = doc.id
                            this.tableData.push(tmp)
                        }
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            addDoc() {
                this.$axios.post(this.$api.addDoc).then((res) => {
                    if (res.data.code === '00') {
                        this.$router.push({
                            name: 'doc_detail',
                            query: {id: res.data.data.id}
                        })
                        this.docList()
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            handleOpen(row, column, event) {
                this.$router.push({
                    name: 'doc_detail',
                    query: {id: row.id}
                })
            },
        }
    }
</script>

<style scoped>
    .cell-title {
        text-align: left;
    }
</style>