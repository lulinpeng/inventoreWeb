<template>
    <div class="divClass">
        <!--        header     -->
        <el-page-header  content="商品列表">
        </el-page-header>
        <!--        add products button -->
        <div class="addUser">
            <el-button disabled size="medium" type="primary" class="MyButton" @click="showAddDialog"> <i class="el-icon-circle-plus-outline"></i> 添加库存信息 </el-button>
        </div>
        <!--        商品列表展示-->
        <el-table
                :data="products"
                height="100%"
                border

                :row-class-name="tableRowClassName"
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
            <el-table-column
                    prop="price"
                    label="单价（元）"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="stock"
                    label="库存数量（个）"
                    width="120">
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
        <el-dialog title="编辑商品库存" :visible.sync="EditProductDialogVisible">
            <el-form :model="formEdit" >
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input disabled v-model="formEdit.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" :label-width="formLabelWidth" >
                    <el-input disabled v-model="formEdit.brand" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                    <div class="MyRadio">
                        <el-radio-group disabled v-model="formEdit.size">
                            <el-radio  label="大">大</el-radio>
                            <el-radio  label="中">中</el-radio>
                            <el-radio  label="小">小</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="单价（元）" :label-width="formLabelWidth">
                    <el-input disabled v-model.number="formEdit.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item   label="库存数量(个)" :label-width="formLabelWidth">
                    <el-input v-model.number="formEdit.stock" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input disabled v-model="formEdit.description" autocomplete="off"></el-input>
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
        name: "StockManagement",
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
            },
            tableRowClassName({row, rowIndex}) {
                console.log(row,rowIndex)
                if (row.stock < 1000) {
                    return 'warning-row';
                } else{
                    return 'success-row';
                }

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
    .el-table .warning-row {
        background: lightsalmon;
    }

    .el-table .success-row {
        background: lightgreen;
    }
</style>