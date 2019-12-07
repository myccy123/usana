<template>
    <!--这是B  你应该设置的 ox oy  是鼠标相对于B的  而不是相对于页面的-->
    <div id="wp" class="wrapper" ref="wheelTarget" onselectstart="return false;"
         :style="{transform:`scale(${scale})`, height: allHeight, width: allWidth}">
        <svg ref="lines" xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 1000%; height: 1000%;"></svg>
        <div :ref="node.id"
             class="node"
             :class="{'sel-node': selNodeId==node.id,
                      'custom-node': node.data.cate=='1',
                      'leader-node': node.data.cate=='2',
                      'tmp-node': node.data.cate=='3'}"
             v-for="node in nodeList"
             :key="node.id"
             @click="selectNode(node)">
            <h2 v-if="node.data.center == 0">未入驻</h2>
            <h2 v-else>{{node.data.name}} {{node.data.centerName}}</h2>
            <!--<h2 v-else>{{node.data.name}}（{{node.data.centerName}}）</h2>-->
            <p class="node-detail">{{node.data.levelName}}</p>
            <p class="node-detail">ID：{{node.data.usana_id}}</p>
        </div>


    </div>
</template>

<script>

    const codeMap = {
        levMap: {
            '1': '扩展名星',
            '2': '超级扩展名星',
            '3': '银董事',
            '4': '黄金董事',
            '5': '红宝石董事',
            '6': '钻石董事',
            '7': '1星钻',
            '8': '2星钻',
            '9': '3星钻',
            '10': '4星钻',
            '11': '5星钻',
            '12': '6星钻',
            '13': '7星钻',
            '14': '8星钻',
            '15': '9星钻',
            '16': '10星钻',
            '17': '11星钻',
            '18': '12星钻',
        },
        cateMap: {
            '1': '消费者',
            '2': '领导人',
            '3': '身份证借用',
        }
    };


    function padding0(num, length) {
        for (let len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    export default {
        name: "console_tree",
        data() {
            return {
                scale: 1,
                treeInfo: {},
                nodeList: [],
                selNodeId: '',
                allWidth: '200px',
                allHeight: '150px',
                originX: '50px',
                originY: '50px',
                zoomStep: 0,
            }
        },
        mounted() {
            this.initTree();
            this.$bus.$on('refreshTree', (action, data) => {
                this.nodeList = [];
                this.$refs.lines.innerHTML = '';
                let oldLeft = this.$refs.wheelTarget.style.left;
                let oldTop = this.$refs.wheelTarget.style.top;
                // let scale = this.$refs.wheelTarget.style.transform;
                if (action == 'delete') {
                    this.delAction(this.treeInfo, data);
                    this.renderTree(this.treeInfo)
                } else if (action == 'add') {
                    this.addAction(this.treeInfo, data);
                    this.renderTree(this.treeInfo)
                } else if (action == 'update') {
                    this.updateAction(this.treeInfo, data);
                    this.renderTree(this.treeInfo)
                }
                this.$nextTick(() => {
                    this.$refs.wheelTarget.style.left = oldLeft;
                    this.$refs.wheelTarget.style.top = oldTop;
                    // this.$refs.wheelTarget.style.transform = scale;
                    console.log(this.$refs.wheelTarget.style.left, this.$refs.wheelTarget.style.top)

                })
            })

            this.$bus.$on('searchNode', (data) => {
                this.searchNode(this.treeInfo, data)
            })

            this.$bus.$on('setOrigin', () => {
                this.setOrigin()
            })


        },
        watch: {
            'nodeList'(n, o) {
                this.allWidth = (n.length + 2) * 200 + 'px';
                this.allHeight = (n.length + 2) * 150 + 'px';
                let s = (n.length + 2) * 200 * (n.length + 2) * 150;
                let c = 6828300;
                this.zoomStep = c / s + 1
            }
        },
        methods: {
            initTree() {
                this.$bus.$emit("loadingTree");
                this.$axios.get(this.$api.treeInfo).then((res) => {
                    if (res.data.code === '00') {
                        this.renderTree(res.data.data);
                        this.treeInfo = res.data.data
                    }
                    this.$bus.$emit("loadedTree")
                }).catch((res) => {
                    console.log(res);
                    this.$bus.$emit("loadedTree")
                })
            },
            searchNode(tree, data) {
                if (tree.nodeInfo.data.usana_id == data.usanaId && tree.nodeInfo.data.center == data.center) {
                    let hitNode = this.$refs[tree.nodeInfo.id][0]
                    let left = hitNode.offsetLeft
                    let top = hitNode.offsetTop
                    // this.$refs.wheelTarget.style.transform = 'scale(1)'
                    this.scale = 1
                    this.$refs.wheelTarget.style.left = -left + hitNode.offsetWidth * 3 + 'px'
                    this.$refs.wheelTarget.style.top = -top + hitNode.offsetHeight + 'px'
                    this.selectNode(tree.nodeInfo)
                } else {
                    if (tree.left) {
                        this.searchNode(tree.left, data)
                    }
                    if (tree.right) {
                        this.searchNode(tree.right, data)
                    }
                }

            },
            delAction(tree, nodeId) {
                if (tree.left) {
                    if (tree.left.nodeInfo.id == nodeId) {
                        tree.left = false;
                        return
                    } else {
                        this.delAction(tree.left, nodeId)
                    }
                }
                if (tree.right) {
                    if (tree.right.nodeInfo.id == nodeId) {
                        tree.right = false;

                    } else {
                        this.delAction(tree.right, nodeId)
                    }
                }
            },
            addAction(tree, nodeInfo) {
                if (tree.nodeInfo.id == nodeInfo.nodeInfo.parentId) {
                    if (nodeInfo.nodeInfo.data.position == 'left') {
                        tree.left = nodeInfo
                    } else {
                        tree.right = nodeInfo
                    }

                } else {
                    if (tree.left) {
                        this.addAction(tree.left, nodeInfo)
                    }
                    if (tree.right) {
                        this.addAction(tree.right, nodeInfo)
                    }
                }
            },
            updateAction(tree, nodeInfo) {
                if (nodeInfo.nodeInfo.id == tree.nodeInfo.id) {
                    tree.nodeInfo.data.center = nodeInfo.nodeInfo.data.center
                    tree.nodeInfo.data.usana_id = nodeInfo.nodeInfo.data.usana_id
                    tree.nodeInfo.data.name = nodeInfo.nodeInfo.data.name
                    tree.nodeInfo.data.cate = nodeInfo.nodeInfo.data.cate
                    tree.nodeInfo.data.level = nodeInfo.nodeInfo.data.level
                }else if (nodeInfo.nodeInfo.data.usana_id == tree.nodeInfo.data.usana_id) {
                    tree.nodeInfo.data.name = nodeInfo.nodeInfo.data.name
                    tree.nodeInfo.data.cate = nodeInfo.nodeInfo.data.cate
                    tree.nodeInfo.data.level = nodeInfo.nodeInfo.data.level
                }
                if (tree.left) {
                    this.updateAction(tree.left, nodeInfo)
                }
                if (tree.right) {
                    this.updateAction(tree.right, nodeInfo)
                }
            },
            zoom(e) {
                this.setOrigin();
                if (e.wheelDelta > 0) {
                    if (this.scale > 1.5) {
                        return;
                    }
                    this.scale *= this.zoomStep;
                } else {
                    if (this.scale <= 0.2) {
                        return;
                    }
                    this.scale /= this.zoomStep;
                }
            },
            setOrigin() {
                let pageX = this.$refs.wheelTarget.parentNode.offsetWidth / 2;
                let pageY = this.$refs.wheelTarget.parentNode.offsetHeight / 2;
                this.originX = pageX - this.$refs.wheelTarget.offsetLeft + 'px';
                this.originY = pageY - this.$refs.wheelTarget.offsetTop + 'px'
                this.$refs.wheelTarget.style.transformOrigin = `${this.originX} ${this.originY}`
            },
            selectNode(node) {
                this.selNodeId = node.id;
                this.$bus.$emit('listNodeDetail', node);
            },
            renderTree(tree) {
                // tree = {
                //     nodeInfo: {id: '', type: 'root', offset: 0, parentId: '', data: {}},
                //     left: {nodeInfo: {}, left: {}, right: {}},
                //     right: {nodeInfo: {}, left: {}, right: {}}
                // }
                tree.nodeInfo.left = tree.left;
                tree.nodeInfo.right = tree.right;
                tree.nodeInfo.data.centerName = padding0(tree.nodeInfo.data.center, 3);
                tree.nodeInfo.data.levelName = codeMap.levMap[tree.nodeInfo.data.level];
                tree.nodeInfo.data.cateName = codeMap.cateMap[tree.nodeInfo.data.cate];
                this.nodeList.push(tree.nodeInfo);

                this.$nextTick(() => {
                    let dom = this.$refs[tree.nodeInfo.id][0];
                    if (tree.nodeInfo.type === 'root') {
                        let os = 1;
                        if (tree.left) {
                            os += tree.left.nodeInfo.offset
                        }
                        this.$refs[tree.nodeInfo.id][0].style.top = '100px';
                        this.$refs[tree.nodeInfo.id][0].style.left = dom.offsetWidth * os + 'px';
                        this.$refs.wheelTarget.style.left = -dom.offsetWidth * (os - 3) + 'px'
                        // this.$refs.wheelTarget.style.top = '100px'
                    } else {

                        let p = this.$refs[tree.nodeInfo.parentId][0];
                        this.$refs[tree.nodeInfo.id][0].style.top = p.offsetTop + p.offsetHeight + 110 + 'px';

                        if (tree.nodeInfo.type === 'left') {
                            let os = 1;
                            if (tree.right) {
                                os += tree.right.nodeInfo.offset
                            }
                            this.$refs[tree.nodeInfo.id][0].style.left = p.offsetLeft - p.offsetWidth * os + 'px'
                        } else {
                            let os = 1;
                            if (tree.left) {
                                os += tree.left.nodeInfo.offset
                            }
                            this.$refs[tree.nodeInfo.id][0].style.left = p.offsetLeft + p.offsetWidth * os + 'px'
                        }

                        let x1 = p.offsetLeft + (p.offsetWidth / 2);
                        let y1 = p.offsetTop + p.offsetHeight;

                        let node = this.$refs[tree.nodeInfo.id][0];
                        let x2 = node.offsetLeft + (node.offsetWidth / 2);
                        let y2 = node.offsetTop;

                        let svg = '<line id="ln' + tree.nodeInfo.id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"\
				  style="stroke:#909399;stroke-width:1;" stroke-dasharray="3,0"/>';
                        this.$refs.lines.innerHTML += svg
                    }

                    if (tree.left) {
                        this.renderTree(tree.left)
                    }

                    if (tree.right) {
                        this.renderTree(tree.right)
                    }
                })
            }
        },
        destroyed() {
            this.$bus.$off('refreshTree');
            this.$bus.$off('searchNode');
            this.$bus.$off('setOrigin');
        }
    }
</script>

<style scoped>
    h2 {
        margin: 18px;
        font-size: 23px;
    }

    .wrapper {
        /*width: 200%;*/
        /*height: 200%;*/
        position: relative;
    }

    .node {
        width: 200px;
        height: 150px;
        background-color: #b7d3fa;
        position: absolute;
        border-radius: 6px;
        color: #fff;
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .node p {
        margin: 3px;
        font-size: 18px;
    }

    .sel-node {
        border: 2px solid #657180;
    }

    .custom-node {
        background-color: #409EFF !important;
    }

    .leader-node {
        background-color: #F56C6C !important;
    }

    .tmp-node {
        background-color: #909399 !important;
    }

</style>