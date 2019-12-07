<template>
    <div class="info-div">
        <p style="margin-top: 0">商务中心</p>
        <el-button-group>
            <el-button size="mini" :disabled="!canAdd23Center" type="primary" @click="add23Center" icon="el-icon-plus"
                       style="width: 120px;">002、003号店
            </el-button>
            <el-button size="mini" :disabled="!canDelNode" type="danger" @click="delNode" icon="el-icon-close"
                       style="width: 120px;">注销商务中心
            </el-button>
        </el-button-group>
        <p>区域</p>
        <el-button-group>
            <el-button v-show="canAddDept.indexOf('1') !== -1" :disabled="!canLeftDept" @click="addDept(1)" size="mini"
                       type="primary"
                       icon="el-icon-plus" style="width: 120px;">1部门
            </el-button>
            <el-button v-show="canAddDept.indexOf('3') !== -1" :disabled="!canRightDept" @click="addDept(3)" size="mini"
                       type="primary"
                       icon="el-icon-plus" style="width: 120px;">3部门
            </el-button>
            <el-button v-show="canAddDept.indexOf('4') !== -1" :disabled="!canLeftDept" @click="addDept(4)" size="mini"
                       type="primary"
                       icon="el-icon-plus" style="width: 120px;">4部门
            </el-button>
            <el-button v-show="canAddDept.indexOf('2') !== -1" :disabled="!canRightDept" @click="addDept(2)" size="mini"
                       type="primary"
                       icon="el-icon-plus" style="width: 120px;">2部门
            </el-button>
        </el-button-group>

        <el-form class="node-form" :model="nodeInfo" :disabled="!selectedNode" label-width="140px" size="mini">
            <el-form-item label="商务中心">
                <el-select v-model="nodeInfo.center" :disabled="!noCenter" placeholder="请选择" style="width: 100%;">
                    <el-option v-for="item in centers" :label="item.label" :value="item.value"
                               :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="ID">
                <el-input v-model="nodeInfo.usanaId" :readonly="!isBlank" placeholder="保存之后不可修改，慎填！"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" :show-password="true" v-model="nodeInfo.passWord"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="nodeInfo.name"></el-input>
            </el-form-item>
            <!--<el-form-item label="推荐人">-->
                <!--<el-input v-model="nodeInfo.srcName"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="开户日期" style="text-align: left;">
                <el-date-picker
                        placeholder="选择日期"
                        style="width: 193px;"
                        type="date"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        v-model="nodeInfo.openDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="超级扩展名星到期日" style="text-align: left;">
                <el-date-picker
                        placeholder="由开户日期自动计算"
                        style="width: 193px;"
                        type="date"
                        :readonly="true"
                        v-model="nodeInfo.overDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上一次自动订货日" style="text-align: left;">
                <el-date-picker
                        v-model="nodeInfo.orderDate"
                        type="date"
                        :clearable="false"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        style="width: 193px;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="下一次自动订货日" style="text-align: left;">
                <el-date-picker
                        v-model="nodeInfo.nextOrderDate"
                        type="date"
                        placeholder="由自动订货日自动计算"
                        :readonly="true"
                        :picker-options="pickerOptions"
                        style="width: 193px;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="自动订货提醒" style="text-align: left;">
                <el-switch
                        v-model="remind">
                </el-switch>
            </el-form-item>
            <el-form-item label="级别" style="text-align: left;">
                <el-select v-model="nodeInfo.level" placeholder="请选择">
                    <el-option v-for="item in levelInfo" :label="item.label" :value="item.value"
                               :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" style="text-align: left;">
                <el-select v-model="nodeInfo.cate" placeholder="请选择">
                    <el-option v-for="item in cateInfo" :label="item.label" :value="item.value" :key="item.value"><span
                            :style="`color: ${item.color}`">{{ item.label }}</span></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="nodeInfo.note"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="updateNodeInfo" style="width: 70px;">保存</el-button>
                <el-button @click="cancelUpdate" style="width: 70px;">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import dayjs from 'dayjs'

    const posMap = {
        '1': 'left',
        '3': 'right',
        '4': 'left',
        '2': 'right',
    };

    function padding0(num, length) {
        for (let len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    var currNode;

    export default {
        name: "console_info",
        data() {
            return {
                canAdd23Center: false,
                canAddDept: '12',
                canDelNode: false,
                canLeftDept: false,
                canRightDept: false,
                noCenter: false,
                isBlank: false,
                test: false,
                selectedNode: false,
                remind: false,
                nodeInfo: {
                    openDate: null,
                    orderDate: null,
                    overDate: null,
                    nextOrderDate: null,
                    usanaId: '',
                    passWord: '',
                    center: '',
                    name: '',
                    srcName: '',
                    level: '',
                    cate: '',
                    note: '',
                    remind: true,
                },
                levelInfo: [{
                    label: '扩展名星',
                    value: '1'
                }, {
                    label: '超级扩展名星',
                    value: '2'
                }, {
                    label: '银董事（执行董事）',
                    value: '3'
                }, {
                    label: '黄金董事（执行经销商）',
                    value: '4'
                }, {
                    label: '红宝石董事（首席经销商）',
                    value: '5'
                }, {
                    label: '钻石董事（钻石经销商）',
                    value: '6'
                }, {
                    label: '1星钻',
                    value: '7'
                }, {
                    label: '2星钻',
                    value: '8'
                }, {
                    label: '3星钻',
                    value: '9'
                }, {
                    label: '4星钻',
                    value: '10'
                }, {
                    label: '5星钻',
                    value: '11'
                }, {
                    label: '6星钻',
                    value: '12'
                }, {
                    label: '7星钻',
                    value: '13'
                }, {
                    label: '8星钻',
                    value: '14'
                }, {
                    label: '9星钻',
                    value: '15'
                }, {
                    label: '10星钻',
                    value: '16'
                }, {
                    label: '11星钻',
                    value: '17'
                }, {
                    label: '12星钻',
                    value: '18'
                }],
                cateInfo: [{
                    label: '消费者',
                    value: '1',
                    color: '#67C23A'
                }, {
                    label: '领导人',
                    value: '2',
                    color: '#E6A23C'
                }, {
                    label: '身份证借用',
                    value: '3',
                    color: '#909399'
                }],
                centers: [],
                pickerOptions: {
                    disabledDate(time) {
                        // if (time < new Date()) {
                        //     return true
                        // }

                        if (time.getDay() !== 0) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        },
        mounted() {

            this.centers.push({label: '无', value: 0});
            for (let i = 1; i <= 999; i++) {
                this.centers.push({label: padding0(i, 3), value: i})
            }


            this.$bus.$on('listNodeDetail', (node) => {
                console.log(node);

                currNode = node;
                this.selectedNode = true;
                this.renderNodeInfo();

                // 当已存在下级时，刚新增部门按钮不可点击
                if (!node.left) {
                    this.canLeftDept = true
                } else {
                    this.canLeftDept = false
                }
                if (!node.right) {
                    this.canRightDept = true
                } else {
                    this.canRightDept = false
                }

                if (node.data.center === 1) {
                    this.canDelNode = this.$store.state.userInfo.usana_id == node.data.usana_id ? false : true;
                    if (!node.left || !node.right) {
                        this.canAdd23Center = true;
                        this.canAddDept = '12'
                    }
                } else if (node.data.center === 2) {
                    this.canAdd23Center = false;
                    this.canDelNode = true;
                    this.canAddDept = '13'
                } else if (node.data.center === 3) {
                    this.canAdd23Center = false;
                    this.canDelNode = true;
                    this.canAddDept = '42'
                } else {
                    if (node.data.center === 0) {
                        this.canAdd23Center = false;
                        this.canDelNode = true;
                        this.canAddDept = '12';
                        this.canLeftDept = false;
                        this.canRightDept = false
                    } else {
                        this.canAdd23Center = false;
                        this.canDelNode = true;
                        this.canAddDept = '12'
                    }
                }
            });
        },
        watch: {
            "nodeInfo.openDate"(n, o) {
                // 计算超级扩展名明到期日
                if (n) {
                    this.nodeInfo.overDate = dayjs(n).add(56, 'day').format('YYYY-MM-DD');
                }
            },
            "nodeInfo.orderDate"(n, o) {
                // 计算下一次自动订货日
                if (n) {
                    this.nodeInfo.nextOrderDate = dayjs(n).add(28, 'day').format('YYYY-MM-DD');
                }
            }

        },
        methods: {
            renderNodeInfo() {
                let node = currNode;
                this.nodeInfo = {
                    openDate: null,
                    orderDate: null,
                    overDate: null,
                    nextOrderDate: null,
                    usanaId: '',
                    passWord: '',
                    center: '',
                    name: '',
                    srcName: '',
                    level: '',
                    cate: '',
                    note: '',
                };

                this.nodeInfo.usanaId = node.data.usana_id;
                if (node.data.usana_id === '') {
                    this.isBlank = true
                } else {
                    this.isBlank = false
                }

                this.nodeInfo.center = node.data.center;
                if (node.data.center === 0) {
                    this.noCenter = true
                } else {
                    this.noCenter = false
                }


                this.nodeInfo.note = node.data.note;
                if (node.data.usana_id !== '') {
                    this.$bus.$emit('loadingInfo');
                    this.$axios.get(this.$api.memberInfo, {params: {usanaId: node.data.usana_id}}).then((res) => {
                        if (res.data.code === '00') {
                            if (res.data.data.open_date) {
                                this.nodeInfo.openDate = dayjs(res.data.data.open_date).format('YYYY-MM-DD');
                            } else {
                                this.nodeInfo.openDate = null;
                            }
                            if (res.data.data.order_date) {
                                let today = dayjs(dayjs().format('YYYY-MM-DD'));
                                let od = dayjs(res.data.data.order_date);
                                let dif = today.diff(od, 'day');
                                if (dif > 0) {

                                    // 自动更新自动订货日
                                    let cnt = Math.floor(dif / 28) + 1;
                                    let newOrderDate = od.add(cnt * 28, 'day').format('YYYY-MM-DD');
                                    this.$axios.post(this.$api.updateOrderDate, {
                                        usanaId: node.data.usana_id,
                                        orderDate: newOrderDate
                                    }).then((res) => {
                                        if (res.data.code === '00') {
                                            this.nodeInfo.orderDate = dayjs(res.data.data.order_date).format('YYYY-MM-DD');
                                        }
                                    }).catch((res) => {
                                        console.log(res)
                                    })
                                }
                                this.nodeInfo.orderDate = dayjs(res.data.data.order_date).format('YYYY-MM-DD');
                            } else {
                                this.nodeInfo.orderDate = null;
                            }
                            this.nodeInfo.name = res.data.data.user_name;
                            this.nodeInfo.level = res.data.data.level;
                            this.nodeInfo.cate = res.data.data.cate;
                            this.nodeInfo.srcName = res.data.data.src_name;
                            this.nodeInfo.passWord = res.data.data.usana_password;
                            this.nodeInfo.nextOrderDate = null;
                            this.remind = res.data.data.remind
                        }
                        this.$bus.$emit('loadedInfo')
                    }).catch((res) => {
                        this.$bus.$emit('loadedInfo');
                        console.log(res)
                    })
                }
            },
            addCenter(centerData) {
                this.$axios.post(this.$api.addCenter, centerData).then((res) => {
                    if (res.data.code === '00') {
                        this.$bus.$emit('refreshTree', 'add', res.data.data);
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        });
                    }
                }).catch((res) => {
                    console.log(res)
                })
            },
            add23Center() {
                let centerData2 = {};
                let centerData3 = {};
                centerData2.usanaId = currNode.data.usana_id;
                centerData2.name = currNode.data.name;
                centerData2.center = 2;
                centerData2.parentCenter = 1;
                centerData2.parentId = currNode.id;
                centerData2.position = 'left';

                centerData3.usanaId = currNode.data.usana_id;
                centerData3.name = currNode.data.name;
                centerData3.center = 3;
                centerData3.parentCenter = 1;
                centerData3.parentId = currNode.id;
                centerData3.position = 'right';
                this.canAdd23Center = false;
                this.canLeftDept = false;
                this.canRightDept = false;
                this.$axios.post(this.$api.addCenter, centerData2).then((res) => {
                    if (res.data.code === '00') {
                        console.log(res.data.data);
                        this.$bus.$emit('refreshTree', 'add', res.data.data);
                        this.$axios.post(this.$api.addCenter, centerData3).then((res2) => {
                            console.log(res2.data.data);
                            if (res2.data.code === '00') {
                                this.$bus.$emit('refreshTree', 'add', res2.data.data);
                                this.$message({
                                    type: 'success',
                                    message: '添加成功！'
                                });
                            }
                        }).catch((res2) => {
                            console.log(res2);
                            this.canAdd23Center = true;
                            this.canLeftDept = false;
                            this.canRightDept = false
                        })
                    }
                }).catch((res) => {
                    console.log(res);
                    this.canAdd23Center = true;
                    this.canLeftDept = true;
                    this.canRightDept = true
                })
            },
            delNode() {
                this.$confirm('此操作将永久删除本级及所有下级数据, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {rootId: currNode.id};
                    this.$axios.post(this.$api.delNode, data).then((res) => {
                        if (res.data.code === '00') {
                            this.$bus.$emit('refreshTree', 'delete', currNode.id);
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
                        }
                    }).catch((res) => {
                        console.log(res)
                    })
                }).catch(() => {

                });
            },
            addDept(dept) {
                let data = {};
                data.parentCenter = currNode.data.center;
                data.dept = dept;
                data.deptUsanaId = currNode.data.usana_id;
                data.parentId = currNode.id;
                data.position = posMap[dept];

                if (dept === 1 || dept === 4) {
                    this.canLeftDept = false
                } else {
                    this.canRightDept = false
                }

                this.$axios.post(this.$api.addDept, data).then((res) => {
                    if (res.data.code === '00') {
                        this.$bus.$emit('refreshTree', 'add', res.data.data);
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        });
                    }
                }).catch((res) => {
                    console.log(res);
                    if (dept === 1 || dept === 4) {
                        this.canLeftDept = true
                    } else {
                        this.canRightDept = true
                    }
                })
            },
            updateNodeInfo() {
                if (this.nodeInfo.center === 0 || this.nodeInfo.usanaId === '') {
                    this.$message({
                        type: 'error',
                        message: '必须选择一个商务中心并填写正确的ID！'
                    });
                    return
                }

                // 新增商务中心需要二次确认
                if (currNode.data.usana_id != this.nodeInfo.usanaId) {
                    this.$confirm(`此操作将新增 ${this.nodeInfo.usanaId} 的 ${padding0(this.nodeInfo.center, 3)} 号商务中心，确定之后将不可更改, 是否继续?`, '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.nodeInfo.nodeId = currNode.id;
                        this.nodeInfo.remind = this.remind
                        this.$bus.$emit('loadingInfo');
                        this.$axios.post(this.$api.updateNode, this.nodeInfo).then((res) => {
                            if (res.data.code === '00') {
                                this.$bus.$emit('refreshTree', 'update', res.data.data);
                                this.$message({
                                    type: 'success',
                                    message: '更新成功！'
                                });
                            }
                            this.$bus.$emit('loadedInfo')
                        }).catch((res) => {
                            console.log(res);
                            this.$bus.$emit('loadedInfo')
                        })
                    }).catch(() => {

                    })
                } else {
                    // 直接修改信息, 不需要二次确认
                    this.nodeInfo.nodeId = currNode.id;
                    this.nodeInfo.remind = this.remind
                    this.$bus.$emit('loadingInfo');
                    this.$axios.post(this.$api.updateNode, this.nodeInfo).then((res) => {
                        if (res.data.code === '00') {
                            this.$bus.$emit('refreshTree', 'update', res.data.data);
                            this.$message({
                                type: 'success',
                                message: '更新成功！'
                            });
                        }
                        this.$bus.$emit('loadedInfo')
                    }).catch((res) => {
                        console.log(res);
                        this.$bus.$emit('loadedInfo')
                    })
                }

            },
            cancelUpdate() {
                this.renderNodeInfo()
            },
        },
        destroyed() {
            this.$bus.$off('listNodeDetail');
        }
    }
</script>

<style scoped>
    .info-div {
        margin: 0;
        padding-top: 20px;
    }

    .node-form {
        width: 333px;
        margin: auto;
        margin-top: 30px;
        color: rgb(204, 229, 255);
    }

</style>