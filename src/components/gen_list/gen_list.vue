<template>
    <div>
        <common-nav></common-nav>
        <div class="content">
            <h1 style="margin: 50px;color: #909399;">列名单</h1>
            <el-table :data="tableData">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="姓名"
                        width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini" :readonly="scope.row.save"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="电话"
                        width="128">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.tel" size="mini" :readonly="scope.row.save"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="性别"
                        width="80">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.gender" placeholder="" size="mini" :disabled="scope.row.save">
                            <el-option key="1" label="男" value="1"></el-option>
                            <el-option key="0" label="女" value="0"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="年龄"
                        type="number"
                        width="70">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.age" size="mini" :readonly="scope.row.save"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="婚姻状况"
                        width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.marry" placeholder="" size="mini" :disabled="scope.row.save">
                            <el-option key="0" label="未婚" value="0"></el-option>
                            <el-option key="1" label="已婚" value="1"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="职业"
                        width="170">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.job" size="mini" :readonly="scope.row.save"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="兴趣度"
                        width="80">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.interest" placeholder="" size="mini" :disabled="scope.row.save">
                            <el-option key="1" label="热" value="1"></el-option>
                            <el-option key="2" label="暖" value="2"></el-option>
                            <el-option key="3" label="冷" value="3"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="需求"
                        width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.need" placeholder="" size="mini" :disabled="scope.row.save">
                            <el-option key="0" label="健康" value="0"></el-option>
                            <el-option key="1" label="赚钱" value="1"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="备注"
                        width="170">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.note" size="mini" :readonly="scope.row.save"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.save"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                v-else
                                size="mini"
                                @click="handleSave(scope.$index, scope.row)">保存
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button style="margin-top: 30px;margin-bottom:30px;width: 200px;" type="primary" icon="el-icon-circle-plus" @click="addList">添加</el-button>
        </div>
        <common-footer></common-footer>
    </div>

</template>

<script>
    import commonNav from '../common/nav.vue'
    import commonFooter from '../../components/common/footer'

    export default {
        name: "gen_list",
        components: {commonNav, commonFooter},
        data() {
            return {
                tableData: [],
            }
        },
        mounted() {
            this.$store.commit('currNav', '/list')
            this.getList()
        },
        methods: {
            addList() {
                this.tableData.push({save: false})
            },
            getList() {
                this.$axios.get(this.$api.getList).then((res) => {
                    if (res.data.code === '00') {
                        for (let li of res.data.data) {
                            li.save = true
                            this.tableData.push(li)
                        }
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            handleEdit(index, row) {
                row.save = false
            },
            handleSave(index, row) {
                this.$axios.post(this.$api.addList, row).then((res) => {
                    if (res.data.code === '00') {
                        row.save = true
                    }
                }).catch((res) => {
                    console.log(res);
                })
            },
            handleDelete(index, row) {
                this.$confirm('是否删除此条数据?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post(this.$api.delList, row).then((res) => {
                        if (res.data.code === '00') {
                            this.tableData.splice(index, 1)
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
<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>


<style scoped>
    .content {
        max-width: 1200px;
        margin: auto;
    }

</style>