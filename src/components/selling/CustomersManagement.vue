<template>
    <div class="divClass">
        <!--        header     -->
        <el-page-header  content="客户列表">
        </el-page-header>
        <!--        添加客户-->
        <div class="addCustomer">
            <el-button size="mini" type="primary" class="MyButton" @click="showAddDialog"> <i class="el-icon-circle-plus-outline"></i> Add Customer </el-button>
        </div>
        <!--客户列表展示-->
        <el-table
                :data="customers"
                height="100%"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="customerId"
                    label="客户ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="客户名称"
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
        <el-dialog title="添加客户" :visible.sync="AddCustomerDialogVisible">
            <el-form :model="formAdd" >
                <el-form-item label="供应商名称" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.customerName" autocomplete="off"></el-input>
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
                <el-button type="primary" @click="handleAddCustomer">确 定</el-button>
            </div>
        </el-dialog>
        <!--        编辑供应商Dialog-->
        <el-dialog title="编辑客户" :visible.sync="EditCustomerDialogVisible">
            <el-form :model="formEdit" >
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.customerName" autocomplete="off"></el-input>
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
                <el-button @click="EditCustomerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditCustomer">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CustomersManagement",
        data(){
            return {
                customers: [{
                    customerId: 1,
                    customerName: '某某公司',
                    contact: 'xiaohong',
                    phoneNumber: '666666666',
                    address: '中国',
                    description: '测试用例'
                }],
                formAdd: {
                    customerId: null,
                    customerName: '某某公司',
                    contact: 'xiaohong',
                    phoneNumber: '666666666',
                    address: '中国',
                    description: '测试用例'
                },
                formEdit: {
                    customerId: null,
                    customerName: '某某公司',
                    contact: 'xiaohong',
                    phoneNumber: '666666666',
                    address: '中国',
                    description: '测试用例'
                },
                formLabelWidth: '120px',
                AddCustomerDialogVisible: false,
                EditCustomerDialogVisible: false,
            }
        },
        mounted: function() {
            this.getCustomerList()
        },
        methods: {
            showAddDialog(){
                this.AddCustomerDialogVisible = true
            },
            handleAddCustomer(){
                console.log('添加的客户', this.formAdd)
                this.$api.customer.addCustomer(this.formAdd).then(res => {
                    if(res.status === 200){
                        this.getCustomerList()
                    }
                })
                this.AddCustomerDialogVisible = false
            },
            showEditDialog(index, row){
                console.log(index,row)
                this.formEdit = JSON.parse(JSON.stringify(row))
                this.EditCustomerDialogVisible = true
                console.log('formEdit = ', this.formEdit)
            },
            handleEditCustomer(){
                console.log('formEdit = ', this.formEdit)
                this.$api.customer.updateCustomer(this.formEdit).then(res => {
                    if(res.status === 200){
                        this.getCustomerList()
                    }
                })
                this.EditCustomerDialogVisible = false
            },
            handleDelete(index, row){
                console.log(index,row)
            },
            getCustomerList(){
                this.$api.customer.getCustomerList().then(res => {
                    this.customers = res.data.data
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
    .addCustomer {
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