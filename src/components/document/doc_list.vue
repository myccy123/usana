<template>
    <div>
        <common-nav></common-nav>
        <h1 style="margin: 30px;color: #909399;">健康档案</h1>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   style="width: 80%; max-width: 250px;margin-bottom: 20px;"
                   @click="addDoc">新建档案
        </el-button>
        <div class="content">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="createDate"
                        label="创建日期">
                </el-table-column>
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
                        label="最后提交日期">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleOpen(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
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
        name: "doc_list",
        components: {commonNav, commonFooter},
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            this.$store.commit('currNav', '/document')
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
                            tmp.commited = doc.is_save=='1'?'是':'否'
                            tmp.updateDate = dayjs(doc.update_date).format('YYYY-MM-DD HH:mm')
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
            handleOpen(index, row) {
                this.$router.push({
                    name: 'doc_detail',
                    query: {id: row.id}
                })
            },
            handleDelete(index, row) {
                this.$confirm('是否删除此条数据?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post(this.$api.delDoc, {id: row.id}).then((res) => {
                        if (res.data.code === '00') {
                            this.docList()
                        }
                    }).catch((res) => {
                        console.log(res);
                    })
                }).catch(() => {

                });

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