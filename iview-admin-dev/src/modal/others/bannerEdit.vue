<template>
    <Modal v-model="modal.showModal" :closable='false' :mask-closable='true' :width="500" @on-cancel="onClickCancel">
        <h3 slot="header" class="modal-header-color">{{isAdd?"新增":"编辑"}}</h3>
        <Form ref="bannerForm" :model="banner" :label-width="100" label-position="right" :rules="rules">
            <Form-item label="描述" prop="alt" >
                <Input v-model="banner.alt" placeholder="请输入说明" ></Input>
            </Form-item>
            <Form-item label="图片URL" prop="img_src" >
                <Input v-model="banner.img_src" placeholder="请输入图片URL" ></Input>
            </Form-item>
            <Form-item label="点击显示URL" prop="href_src" >
                <Input v-model="banner.href_src" placeholder="请输入URL" ></Input>
            </Form-item>
            <Form-item label="是否使用(1:使用 0不用)" prop="use_yn" >
                <Input v-model="banner.use_yn" placeholder="请输入0 or 1" ></Input>
            </Form-item>
            <Form-item label="序号" prop="seq" >
                <Input v-model="banner.seq" placeholder="请输入展示序号" ></Input>
            </Form-item>

        </Form>
        <div slot="footer">
            <Button type="text"  @click="onClickCancel">取消</Button>
            <Button type="primary" :loading="loading" @click="onClickSave">{{isAdd?"新增":"保存"}}</Button>
        </div>
    </Modal>
</template>

<style scoped rel="stylesheet/less" type="text/less" lang="less">

</style>
<script type="text/ecmascript-6">
    import util from "util"
    export default {
        name: "edit-banner",
        props:{
            modal: {
                type: Object,
                default: {
                    showModal:true
                }
            },
        },
        data() {
            return {
                loading:false,
                oldPassError: '',
                rules: {
                    alt: [
                        { required: true, message: '请输入相应内容', trigger: 'blur' }
                    ],
                    img_src: [
                        { required: true, message: '请输入图片url', trigger: 'blur' }
                    ],
                    href_src: [
                        { required: true, message: '请输入点击现实的url', trigger: 'blur' }
                    ],

                },
                banner:{

                    seq         : 0,
                    alt         : "",
                    img_src     : "",
                    use_yn      :1,
                    href_src    : "",
                    id          : null
                },
                baseData: [],
                selection:[],
                isAdd:true
            }
        },
        computed: {},
        methods: {
            onClickCancel(){
                this.modal.showModal = false;
                console.log( this.modal)
            },
            onClickSave(){
                this.$refs['bannerForm'].validate((valid) => {
                    if(valid) {
                        console.log(this.loading);
                        console.log(this.isAdd);
                        if(this.loading) return;
                        if(this.isAdd) {
                            let obj = {
                                params:{
                                    seq: this.banner.seq,
                                    alt:this.banner.alt,
                                    img_src:this.banner.img_src,
                                    use_yn:this.banner.use_yn,
                                    href_src:this.banner.href_src,
                                    id:null
                                }
                            };
                            this.loading = true;
                           // this.$router.replace({path:'/type/editBanner', query:Object.assign({}, obj.params)});
                            util.post.type.editBanner(obj).then((data) => {
                                console.log(data)
                                this.loading = false;
                                this.modal.showModal = false;
                                this.$emit("getBannerList");  //调用父组件的方法
                            }).catch((err) => {
                                this.loading = false;
                            });
                        } else {
                            let obj = {
                                params:{

                                    seq: this.banner.seq,
                                    alt:this.banner.alt,
                                    img_src:this.banner.img_src,
                                    use_yn:this.banner.use_yn,
                                    href_src:this.banner.href_src,
                                    id:this.banner.id

                                }
                            };
                            this.loading = true;
                            console.log(util.post.type.editBanner)
                            //this.$router.replace({path:'/type/editBanner', query:Object.assign({}, obj.params)});
                            util.post.type.editBanner(obj).then((data) => {
                                console.log(data)
                                this.loading = false;
                                this.modal.showModal = false;
                                this.$emit("getBannerList");  //调用父组件的方法
                            }).catch((err) => {
                                this.loading = false;
                            });
                        }
                    }
                });
            },
            onCheckChange(selection){
                this.selection = selection;
            },
            getList(){
                let obj = {
                    params:{}
                };
                util.post.permission.list(obj).then((data) => {
                    this.baseData  = data;
                    this.role.permission = JSON.parse(JSON.stringify(this.baseData));
                }).catch((err) => {

                });
            }
        },
        components: {},
        created() {
            this.getList();
        },
        mounted() {
            this.$on('reset', (data) => {
                if(!data) {

                    console.log(" this.banner=", this.banner);
                    this.banner.seq = 0;
                    this.banner.alt = "";
                    this.banner.img_src = "";
                    this.banner.use_yn =1;
                    this.banner.href_src = "";
                    this.banner.id = null;
                    this.isAdd = true;
                } else {
                    this.banner.seq = data.seq;
                    this.banner.alt = data.alt;
                    this.banner.img_src = data.img_src;
                    this.banner.use_yn =data.use_yn;
                    this.banner.href_src = data.href_src;
                    this.banner.id = data.id;
                    this.isAdd = false;
                }
            });
        },
        beforeDestroy() {

        },
        destroyed() {
        },
        activated() {

        },
        deactivated() {

        }
    }
</script>
