<template>
    <div class="divClass">
<!--        header     -->
        <el-page-header  content="商品列表">
        </el-page-header>
<!--        add products button -->
        <div class="addUser">
            <el-button size="mini" type="primary" class="MyButton" @click="showAddDialog"> <i class="el-icon-circle-plus-outline"></i> Add Product </el-button>
        </div>
<!--        商品列表展示-->
        <el-table
                :data="products"
                height="100%"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="productId"
                    label="商品ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="productName"
                    label="商品名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="brand"
                    label="品牌"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="size"
                    label="规格"
                    width="100">
            </el-table-column>
            <el-table-column label="商品状态" width="100">
                <template slot-scope="scope" >
                    <div>
                        <el-tag v-show="scope.row.status === 1"
                                key="success"
                                type="success"
                                effect="dark">
                            在售
                        </el-tag>
                        <el-tag v-show="scope.row.status === 0"
                                key="failure"
                                type="danger"
                                effect="dark">
                            停售
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价（元）"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="120"
            >
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="info"
                            @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        添加商品的表单-->
        <el-dialog title="添加商品" :visible.sync="AddProductDialogVisible">
            <el-form :model="form" >
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" :label-width="formLabelWidth" >
                    <el-input v-model="form.brand" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                    <div class="MyRadio">
                        <el-radio-group v-model="form.size">
                            <el-radio  label="大">大</el-radio>
                            <el-radio  label="中">中</el-radio>
                            <el-radio  label="小">小</el-radio>
                        </el-radio-group>
                     </div>
                </el-form-item>
                <el-form-item label="商品状态" :label-width="formLabelWidth">
                    <div class="MyRadio">
                        <template>
                            <el-radio-group v-model="form.status">
                                <el-radio  :label=1>在售</el-radio>
                                <el-radio  :label=0>停售</el-radio>
                            </el-radio-group>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="单价（元）" :label-width="formLabelWidth">
                    <el-input v-model.number="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddProductDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddProduct">确 定</el-button>
            </div>
        </el-dialog>
<!--        编辑商品表单-->
        <el-dialog title="编辑商品" :visible.sync="EditProductDialogVisible">
            <el-form :model="formEdit" >
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" :label-width="formLabelWidth" >
                    <el-input v-model="formEdit.brand" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                    <div class="MyRadio">
                        <el-radio-group v-model="formEdit.size">
                            <el-radio  label="大">大</el-radio>
                            <el-radio  label="中">中</el-radio>
                            <el-radio  label="小">小</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="商品状态" :label-width="formLabelWidth">
                    <div class="MyRadio">
                        <template>
                            <el-radio-group v-model="formEdit.status">
                                <el-radio  :label=1>在售</el-radio>
                                <el-radio  :label=0>停售</el-radio>
                            </el-radio-group>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="单价（元）" :label-width="formLabelWidth">
                    <el-input v-model.number="formEdit.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditProductDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditProduct">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProductsManagement",
        data() {
            return {
                products: [{
                    productId: 1,
                    productName: '酒杯',
                    brand: '中大制造',
                    size: '大',
                    description: '测试用例',
                    status: 1,
                    price: 100.00,
                    stock: 0,
                },{
                    productId: 1,
                    productName: '酒杯',
                    brand: '中大制造',
                    size: '大',
                    description: '测试用例',
                    status: 0,
                    price: 100.00,
                    stock: 0,
                }],
                AddProductDialogVisible: false,
                EditProductDialogVisible: false,
                formLabelWidth: '120px',
                form: {
                    productId: 1,
                    productName: '酒杯',
                    brand: '中大制造',
                    size: '大',
                    description: '测试用例',
                    status: 1,
                    price: 100.00,
                    stock: 0,
                },
                formEdit: {
                    productId: 1,
                    productName: '酒杯',
                    brand: '中大制造',
                    size: '大',
                    description: '测试用例',
                    status: 1,
                    price: 100.00,
                    stock: 0,
                },
                currentEditIndex: 0,
            }
        },
        mounted: function () {
            this.getProductsList()
        },
        methods: {
            showEditDialog(index, row) {
                console.log(index, row);
                this.EditProductDialogVisible = true;
                this.currentEditIndex = index;
                this.formEdit = JSON.parse(JSON.stringify(this.products[this.currentEditIndex]));
            },
            handleEditProduct(){
                console.log(this.formEdit);
                this.$api.product.updateProduct(this.formEdit).then(res => {
                    if(res.status === 200){
                        this.getProductsList()
                    }
                })
                this.EditProductDialogVisible = false;
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            showAddDialog () {
                this.AddProductDialogVisible = true
            },
            handleAddProduct() {
                console.log("提交的表单",this.form)
                this.$api.product.addProduct(this.form).then(res =>{
                    if(res.status === 200){
                        this.getProductsList()
                    }
                })
                this.AddProductDialogVisible = false
            },
            getProductsList() {
                return this.$api.product.getProductsList().then(res => {
                    this.products = res.data.data;
                })
            }
        }

    }
</script>

<style >

    .el-table__header-wrapper{
        line-height: 20px;
    }
    .el-dialog__header {
        height: 40px;
    }
    .el-dialog__header {
        position: relative;
        top: -20px;
    }
    .addUser {
        /*margin-left: 0px;*/
        width: 100px;
        height: 40px;
    }
    .dialog-footer {
        height: 40px;
        position: relative;
        top: -80px;
    }
    .el-button {
        margin-left: 0px;
        top: -60px;
    }
    .MyButton {
        position: relative;
        top: -60px;
    }
    .MyRadio {
        margin-left: 0px;
        width: 200px;
    }
    .divClass {
        height: 80%;
    }
</style>