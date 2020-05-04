<template>
    <div class="divClass">
<!--        header     -->
        <el-page-header  content="供应商列表">
        </el-page-header>
<!--        添加供应商-->
        <div class="addSupplier">
            <el-button size="mini" type="primary" class="MyButton" @click="showAddDialog"> <i class="el-icon-circle-plus-outline"></i> Add Supplier </el-button>
        </div>
<!--供应商列表展示-->
        <el-table
                :data="suppliers"
                height="100%"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="supplierId"
                    label="供应商ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="supplierName"
                    label="供应商名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="contact"
                    label="联系人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="电话"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="120">
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
<!--        添加供应商Dialog-->
        <el-dialog title="添加供应商" :visible.sync="AddSupplierDialogVisible">
            <el-form :model="formAdd" >
                <el-form-item label="供应商名称" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.supplierName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth" >
                    <el-input v-model="formAdd.contact" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddSupplierDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSupplier">确 定</el-button>
            </div>
        </el-dialog>
<!--        编辑供应商Dialog-->
        <el-dialog title="编辑供应商" :visible.sync="EditSupplierDialogVisible">
            <el-form :model="formEdit" >
                <el-form-item label="供应商名称" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.supplierName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth" >
                    <el-input v-model="formEdit.contact" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditSupplierDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditSupplier">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "SuppliersManagement",
        data() {
            return {
                suppliers: [{
                    supplierId: 1,
                    supplierName: 'momogongsi',
                    contact: 'xiaozhang',
                    phoneNumber: '19000000000',
                    address: 'zhongguo',
                    description: '测试用例'
                }],
                formAdd: {
                    supplierId: null,
                    supplierName: 'momogongsi',
                    contact: 'xiaozhang',
                    phoneNumber: '19000000000',
                    address: 'zhongguo',
                    description: '测试用例'
                },
                formEdit: {
                    supplierId: '',
                    supplierName: 'momogongsi',
                    contact: 'xiaozhang',
                    phoneNumber: '19000000000',
                    address: 'zhongguo',
                    description: '测试用例'
                },
                temp: '',
                formLabelWidth: '120px',
                AddSupplierDialogVisible: false,
                EditSupplierDialogVisible: false,
                currentEditIndex: 0


            }
        },
        mounted: function(){
            this.getSupplierList()
        },
        methods: {
            showAddDialog() {
                this.AddSupplierDialogVisible = true
            },
            handleAddSupplier(){
                this.AddSupplierDialogVisible = false
                this.$api.supplier.addSupplier(this.formAdd).then(res => {
                    if(res.status === 200){
                        this.getSupplierList()
                    }
                })
                console.log(this.formAdd)
            },
            showEditDialog(index, row) {
                console.log(index,row)
                this.currentEditIndex = index
                this.formEdit = JSON.parse(JSON.stringify(this.suppliers[this.currentEditIndex]))
                this.EditSupplierDialogVisible = true
            },
            handleEditSupplier(){
                console.log(this.formEdit)
                this.EditSupplierDialogVisible = false
                this.$api.supplier.updateSupplier(this.formEdit).then(res => {
                    if(res.status === 200){
                        this.getSupplierList()
                    }
                })
            },
            handleDelete(index, row){
                console.log(index,row)
            },
            getSupplierList() {
                this.$api.supplier.getSupplierLists().then(res => {
                    this.suppliers = res.data.data
                })
            }
        }
    }
</script>

<style>
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
    .addSupplier {
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
    .div {
        height: 80%;
    }
    .divClass {
        height: 80%;
    }
</style>