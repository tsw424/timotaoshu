<template>
    <layout>
        <edit-banner :modal="modal" v-on:getBannerList="getBannerList" ref="editBanner"></edit-banner>

        <div>
            <Card>
                <Row>
                    <Col span="12" class="tl">
                        <Button type="primary" :disabled="loading" @click="onClickAddBanner">新增Banner</Button>
                    </Col>
                    <Col span="12" class="tr">
                        <span>批量操作：</span>
                        <Button type="primary" :disabled="loading" @click="onClickDel()">删除banner</Button>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Table border highlight-row :loading="loading" :columns="columns" :data="bannerList" ref="table"  @on-selection-change="onClickSelect" ></Table>
            </Card>

            <Card shadow>
                <Page :current="params.page" :page-size="params.limit" :total="total" show-total show-elevator @on-change="getBannerList"></Page>
            </Card>
        </div>
    </layout>
</template>
<script type="text/ecmascript-6">
    import editBanner from 'modal/others/bannerEdit.vue';
    import util from 'util';
    export default {
        name: "bannerList",
        data() {
            return {
                loading:false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '序号',
                        key: 'seq'
                    },
                    {
                        title: '图片来源',
                        key: 'img_src'
                    },
                    {
                        title: '点击展示的内容URL',
                        key: 'href_src'
                    },
                    {
                        title: '是否使用(1:使用 0:未使用)',
                        key: 'use_yn'
                    },
                    {
                        title: '描述',
                        key: 'alt'
                    },
                    {
                        title: '添加时间',
                        key: 'create_dt'
                    },
                    {
                        title:'操作',

                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    attrs:{
                                        href:'javascript:void(0);'
                                    },
                                    on:{
                                        click: () => {
                                            this.$refs.editBanner.$emit('reset',params.row);
                                            this.modal.showModal = true;
                                        }
                                    }
                                }, `编辑`),
                                h('a', {
                                    attrs:{
                                        href:'javascript:void(0);',
                                        style:`margin-left:10px;`
                                    },
                                    on:{
                                        click: () => {
                                            this.onClickDel(params.row.id);
                                        }
                                    }
                                }, `删除`),
                            ])
                        }
                    }
                ],
                params:{
                    limit:null,
                    page:null
                },
                total:1,
                bannerList:[],
                modal:{
                    showModal:false
                }
            }
        },
        computed: {},
        methods: {
            getBannerList(page) {
                if(this.loading) return;
                if(page > 0) {
                    this.params.page = page;
                }
                let obj = {
                    params: {
                        page:this.params.page,
                        limit:this.params.limit
                    }
                };
                this.loading = true;
                this.$router.replace({path:'/type/bannerList', query:Object.assign({}, obj.params)});
                util.post.type.bannerList(obj).then((data) => {
                    this.loading = false;
                    this.bannerList = data.bannerList;
                    this.total = data.count;
                }).catch((err)=> {
                    this.loading = false;
                });
            },
            onClickAddBanner() {
                console.log(  this.$refs.editBanner );
                console.log(this.modal)
                this.$refs.editBanner.$emit('reset',null);
                this.modal.showModal = true;
                //this.$refs.editBanner.modal.showModal = true;
            },
            onClickSelect(selection){       //check选择框选中
                this.selection = selection;
            }
        },
        components: {
            editBanner
        },
        created() {

        },
        mounted() {
        },
        beforeDestroy() {

        },
        destroyed() {
        },
        activated() {
            let page = parseInt(this.$route.query.page) || 1;
            let limit = parseInt(this.$route.query.limit) || 10;

            if(this.params.page != page || this.params.limit != limit) {
                if(this.params.page != page) this.params.page = page;
                if(this.params.limit != page) this.params.limit = limit;

                this.getBannerList();
            } else {
                this.$router.replace({path:'/type/bannerList', query:Object.assign({}, this.params)});
            }
        },
        deactivated() {

        }
    }
</script>
