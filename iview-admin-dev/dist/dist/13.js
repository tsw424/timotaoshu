webpackJsonp([13],{245:function(t,a,i){"use strict";function e(t){l||i(479)}Object.defineProperty(a,"__esModule",{value:!0});var o=i(427),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(a,t,function(){return o[t]})}(s);var r=i(481),c=i.n(r),l=!1,d=i(4),u=e,p=d(n.a,c.a,!1,u,null,null);p.options.__file="src\\views\\home\\catalog.vue",a.default=p.exports},279:function(t,a,i){t.exports={default:i(280),__esModule:!0}},280:function(t,a,i){i(281),t.exports=i(0).Object.assign},281:function(t,a,i){var e=i(8);e(e.S+e.F,"Object",{assign:i(282)})},282:function(t,a,i){"use strict";var e=i(26),o=i(54),n=i(34),s=i(33),r=i(94),c=Object.assign;t.exports=!c||i(20)(function(){var t={},a={},i=Symbol(),e="abcdefghijklmnopqrst";return t[i]=7,e.split("").forEach(function(t){a[t]=t}),7!=c({},t)[i]||Object.keys(c({},a)).join("")!=e})?function(t,a){for(var i=s(t),c=arguments.length,l=1,d=o.f,u=n.f;c>l;)for(var p,f=r(arguments[l++]),h=d?e(f).concat(d(f)):e(f),m=h.length,g=0;m>g;)u.call(f,p=h[g++])&&(i[p]=f[p]);return i}:c},427:function(t,a,i){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var o=i(279),n=e(o),s=i(16),r=e(s),c=i(96),l=e(c);a.default={name:"catalog",data:function(){var t=this;return{params:{bookId:null,page:null,limit:null},total:1,loading:!1,columns:[{title:"id",key:"id",render:function(a,i){return a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){t.$router.push("/bookContainer?bookId="+t.params.bookId+"&catalogId="+i.row.id+"&num="+i.row.num),a.stopPropagation(),a.preventDefault()}}},i.row.id)}},{title:"章节名称",key:"name",width:300},{title:"排序NUM",key:"num",width:100},{title:"是否禁用",key:"isJin",render:function(a,i){return a("div",[a("span","2"==i.row.isJin?"未禁用":"已禁用"),a("a",{attrs:{href:"javascript:void(0);",style:"color:"+("2"==i.row.isJin?"red":"auto")},on:{click:function(){t.onClickUpdateCatalogisJin(i.row.id,"2"==i.row.isJin?"1":"2")}}},"("+("2"==i.row.isJin?"禁用":"启用")+")")])}},{title:"章节类型",key:"type",render:function(t,a){return t("span",{},"2"==a.row.type?"特殊章节":"普通章节")}},{title:"创建时间",key:"createTime",render:function(t,a){return t("span",{},r.default.timeChange(a.row.createTime))}},{title:"最后修改时间",key:"updateTime",render:function(t,a){return t("span",{},r.default.timeChange(a.row.updateTime))}}],catalog:[],book:{},imgUrl:l.default.apiUrl+"/images/",isEdit:!1,description:""}},computed:{},methods:{getCatalog:function(t){var a=this;t>0&&(this.params.page=t);var i={params:(0,n.default)({},this.params)};this.loading=!0,this.$router.replace({path:"/catalog",query:this.params}),r.default.post.books.catalogList(i).then(function(t){a.catalog=t.catalog,a.total=t.count,a.loading=!1}).catch(function(t){a.loading=!1})},getBook:function(){var t=this,a={params:{bookId:this.params.bookId}};r.default.post.books.book(a).then(function(a){t.book=a.book[0],t.description=t.book.description})},onClickUpdateCatalogisJin:function(t,a){var i=this,e={params:{catalogId:t,isJin:a}};this.loading=!0,r.default.post.books.updateCatalogIsJin(e).then(function(t){i.$Message.success(t),i.getCatalog()}).catch(function(t){i.loading=!1})},onClickSaveDescription:function(){var t=this,a={params:{bookId:this.params.bookId,description:this.description}};this.loading=!0,r.default.post.books.updateBookDescription(a).then(function(a){t.loading=!1,t.book.description=t.description,t.isEdit=!1,t.$Message.success("修改成功")}).catch(function(a){t.loading=!1})}},components:{},created:function(){},mounted:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){var t=parseInt(this.$route.query.bookId)||0,a=parseInt(this.$route.query.page)||1,i=parseInt(this.$route.query.limit)||20;t===this.params.bookId&&a===this.params.page&&i===this.params.limit||(t!==this.params.bookId&&(this.params.bookId=t,this.getBook()),a!==this.params.page&&(this.params.page=a),i!==this.params.limit&&(this.params.limit=i),this.getCatalog())},deactivated:function(){}}},479:function(t,a,i){var e=i(480);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(19)("00896264",e,!1,{})},480:function(t,a,i){a=t.exports=i(18)(!1),a.push([t.i,"\n.bookImg {\n  max-width: 150px;\n  max-height: 120px;\n  display: block;\n  float: left;\n  margin-right: 10px;\n}\n.description {\n  text-indent: 28px;\n  margin-top: 10px;\n}\n.textarea {\n  width: calc(100% - 150px);\n}\ntextarea {\n  text-indent: 20px;\n}\n",""])},481:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("Layout",[i("Card",[i("Row",[i("Col",{attrs:{span:"24"}},[i("img",{staticClass:"bookImg",attrs:{src:t.imgUrl+t.params.bookId,alt:"书名"}}),t._v(" "),i("h1",[t._v("\n                    "+t._s(t.book.name)+"\n                    "),i("Button",{staticClass:"fr",attrs:{type:"primary",disabled:t.loading},on:{click:function(a){t.isEdit=!t.isEdit}}},[t._v(t._s(t.isEdit?"取消编辑":"编辑描述"))]),t._v(" "),i("Button",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],staticClass:"fr mr10",attrs:{type:"primary",disabled:t.loading},on:{click:t.onClickSaveDescription}},[t._v("保存描述")])],1),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}],staticClass:"description"},[t._v(t._s(t.book.description))]),t._v(" "),i("Input",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],staticClass:"textarea",attrs:{type:"textarea",rows:4,placeholder:"请输入描述"},model:{value:t.description,callback:function(a){t.description=a},expression:"description"}})],1)],1)],1),t._v(" "),i("Card",{attrs:{shadow:""}},[i("Table",{ref:"table",attrs:{border:"","highlight-row":"",loading:t.loading,columns:t.columns,data:t.catalog}})],1),t._v(" "),i("Card",{attrs:{shadow:""}},[i("Page",{attrs:{current:t.params.page,"page-size":t.params.limit,total:t.total,"show-total":"","show-elevator":""},on:{"on-change":t.getCatalog}})],1)],1)},o=[];e._withStripped=!0;var n={render:e,staticRenderFns:o};a.default=n}});