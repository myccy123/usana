<template>
    <div>
        <common-nav></common-nav>
        <div class="no-pay" v-if="!isPay">
            <h2 style="margin-top: 15%;font-weight: 400;">此功能仅限会员使用，请付款激活</h2>
            <el-button type="primary" style="width: 300px;margin-top: 30px;" @click="toPay">去付款</el-button>
        </div>
        <template v-else>
            <div class="tree"
                 ref="tree"
                 :style="{cursor:cursorStyle}"
                 v-loading="loadingTree"
                 @mousedown="handleDown"
                 @mouseup="handleUp"
                 @mouseout="handleOut"
                 @mousemove="handleMove"
                 @mousewheel.prevent="onScroll">

                <console_tree ref="treeComponent"></console_tree>

                <el-form :inline="true" :model="search" size="mini" class="search-form">
                    <el-form-item>
                        <el-input v-model="search.usanaId" clearable placeholder="葆婴ID" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.center" clearable placeholder="商务中心" style="width: 100px">
                            <el-option v-for="item in centers" :label="item.label" :value="item.value"
                                       :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchNode">搜索</el-button>
                        <el-button @click="reset">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="info" v-loading="loadingInfo">
                <console_info></console_info>
            </div>
        </template>
    </div>
</template>

<script>
    import commonNav from '../common/nav.vue'
    import console_tree from './console_tree'
    import console_info from './console_info'
    import dayjs from 'dayjs'

    function padding0(num, length) {
        for (let len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    export default {
        name: "console",
        components: {commonNav, console_tree, console_info},
        data() {
            return {
                loadingInfo: false,
                loadingTree: false,
                cursorStyle: "default",
                downX: 0,
                downY: 0,
                positionLeft: 0,
                positionTop: 0,
                canMove: false,
                search: {},
                centers: [],
                isPay: true,
            }
        },
        created() {
            this.$bus.$on('loadingTree', () => {
                this.loadingTree = true
            })
        },
        mounted() {
            this.$store.commit('currNav', '/console');

            this.$bus.$on('loadingInfo', () => {
                this.loadingInfo = true
            });

            this.$bus.$on('loadedInfo', () => {
                this.loadingInfo = false
            });

            this.$bus.$on('loadedTree', () => {
                this.loadingTree = false
            });

            this.$axios.post(this.$api.userInfo).then((res) => {
                if (res.data.code === '00') {
                    let expireDate = dayjs(res.data.data.expire_date)
                    let today = dayjs()
                    if (today.diff(expireDate) < 0) {
                        this.isPay = true
                    } else {
                        this.isPay = false
                    }
                }
            }).catch((res) => {
                console.log(res);
            })

            for (let i = 1; i <= 999; i++) {
                this.centers.push({label: padding0(i, 3), value: i})
            }
        },
        methods: {
            searchNode() {
                this.$bus.$emit('searchNode', this.search)
            },
            reset() {
                this.$bus.$emit('searchNode', {usanaId: this.$store.state.userInfo.usana_id, center: 1})
            },
            handleDown(e) {
                this.cursorStyle = "move";
                this.downX = e.pageX;
                this.downY = e.pageY;
                this.canMove = true;
                this.positionLeft = parseFloat(
                    getComputedStyle(this.$refs.tree.childNodes[0])["left"]
                );
                this.positionTop = parseFloat(
                    getComputedStyle(this.$refs.tree.childNodes[0])["top"]
                );
            },
            handleUp(e) {
                this.cursorStyle = "default";
                this.canMove = false;
            },
            handleOut() {
                this.cursorStyle = "default";
                this.canMove = false;
            },
            handleMove(e) {
                if (this.canMove) {
                    let moveX = e.pageX - this.downX;
                    let moveY = e.pageY - this.downY;
                    let k = parseFloat(this.$refs.tree.childNodes[0].style.transform.split('(')[1].split(')')[0])
                    let left = this.positionLeft + moveX / k
                    let top = this.positionTop + moveY / k
                    this.$refs.tree.childNodes[0].style.left = left + "px";
                    this.$refs.tree.childNodes[0].style.top = top + "px";
                    this.$bus.$emit('setOrigin');
                }
            },
            onScroll(e) {
                this.$refs.treeComponent.zoom(e)
            },
            toPay() {
                this.$router.push('/price')
            }
        },
        destroyed() {
            this.$bus.$off('loadingInfo');
            this.$bus.$off('loadedInfo');
            this.$bus.$off('loadingTree');
            this.$bus.$off('loadedTree')
        }
    }
</script>

<style scoped>
    .tree {
        position: relative;
        width: calc(100vw - 580px);
        height: 90vh;
        float: left;
        margin: 20px 0 0 20px;
        background-color: #F2F6FC;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .info {
        /*width: calc(30% - 40px);*/
        width: 500px;
        height: 90vh;
        float: right;
        margin: 20px 20px 0 20px;
        background-color: #F2F6FC;
        overflow: auto;
        box-shadow: 0 2px 20px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .search-form {
        z-index: 100;
        position: absolute;
        top: 20px;
        right: 20px;
    }

</style>