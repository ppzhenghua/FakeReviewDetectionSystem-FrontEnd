<template>
  <div class="layout">
    <Layout>
      <Header  :style="{width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><img src="../../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <!--<MenuItem name="1">-->
            <!--<Icon type="ios-navigate"></Icon>-->
            <!--Item 1-->
            <!--</MenuItem>-->
            <!--<MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoReturn">-->
              <!--<Icon type="ios-arrow-dropleft" size="35"/>-->
              <!--RETURN-->
            <!--</MenuItem>-->
            <!--<MenuItem name="3">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--Item 3-->
            <!--</MenuItem>-->
            <!--<MenuItem name="4">-->
            <!--<Icon type="ios-paper"></Icon>-->
            <!--Item 4-->
            <!--</MenuItem>-->
          </div>
        </Menu>
      </Header>
      <Layout :style="{ minHeight: '700px'}">
        <Sider hide-trigger :style="{background: '#d7dde4',textAlign:'center',borderRadius:'25px',marginTop:'24px',marginLeft:'10px'}">
          <List item-layout="vertical" style="text-align:center; margin-top: 20%">
            <ListItem v-model="admin" :key="admin.ID">
              <li>
                <h1>-Welcome-</h1>
                <h2>administer</h2>
                <Icon type="md-person" size="70" />
              </li>
              <li>
                <h2>{{admin.Account}}</h2>
              </li>
              <li>
                <br>
                <Icon type="md-arrow-dropright" size="20"/> {{admin.Description}}（{{admin.Right}}级权限）
              </li>
              <li>
                <Icon type="md-arrow-dropright" size="20"/>
                ID：{{admin.ID}}
              </li>
              <li>
                <Icon type="md-arrow-dropright" size="20"/>
                注册时间：{{admin.RegisterTime}}
              </li>
              <br>
                <li @click="revise_Pass">
                  <Icon type="md-alert" size="20"/>Revise Password
                </li>
                <li @click="Logout">
                  <Icon type="ios-leaf" size="20"/> Logout
                </li>
            </ListItem>
          </List>
          <Modal
            v-model="modal"
            title="Revise Password"
            ok-text="Confirm"
            cancel-text="cancel"
            @on-ok="revisePw"
            @on-cancel="cancel">
            Please Enter Old Password:<br>
            <Input v-model="origin" type="password" password placeholder="Enter something..." style="width: 400px" size="large"/>
            <br>
            New Password:<br>
            <Input v-model="revise" type="password" password placeholder="Enter something..." style="width: 400px" size="large"/>
          </Modal>
        </Sider>
        <Layout :style="{padding: '0 24px 0 24px '}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',marginTop:'25px',borderRadius:'25px'}">

            <Form>
              <FormItem>
                Identity：
                <Select v-model="outform.select" filterable style="width:150px;margin-right: 30px" clearable @on-change="func(outform.select)">
                  <Option v-for="item in rightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                Account：
                <Input v-model="outform.account" placeholder="Enter something..." clearable style="width: 180px;margin-right: 30px" />
                UserID：
                <Input v-model="outform.ID" placeholder="Enter something..." clearable style="width: 150px;margin-right: 30px" />
                RegisterTIme：
                <DatePicker format="yyyy-MM"
                            type="month"
                            placeholder="Select date"
                            style="width: 150px"
                            @on-change="chooseTime">
                </DatePicker>&nbsp;&nbsp;
              </FormItem>
              <FormItem>
                <Button type="warning" @click="add">Add</Button>
                <Button type="primary" @click="search">Search</Button>
                <Button type="primary" @click="getCommand" v-show="showCommand">Command</Button>
              </FormItem>
            </Form>
            <Table border stripe :columns="columns" :data="data1"></Table>
            <Modal
              title="Please Edit"
              v-model="showEdit"
              @on-ok="editUser"
              v-bind="editData"
              :loading="loading"
              draggable>
              <Form>
                <FormItem>
                  UserID：
                  <Input v-model="editData.UserID" disabled placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                  Account：
                  <Input v-model="editData.Account" disabled placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                </FormItem>
                <FormItem>
                  Identity：
                  <Select v-model="editData.UserRight" filterable style="width:150px;margin-right: 30px" clearable disabled>
                    <Option v-for="item in rightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  </FormItem>
                <FormItem>
                  Phone：
                  <Input v-model="editData.UserPhone" placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                </FormItem>
              </Form>
              <div slot="footer">
                <Button type="default" size="large" @click="editCancel">cancel</Button>
                <Button type="primary" size="large" @click="editUser">Yes</Button>
              </div>
            </Modal>
            <Modal
              title="Please Confirm"
              v-model="showDel"
              class-name="vertical-center-modal"
              @on-ok="userDel"
              ok-text="Delete"
              cancel-text="cancel"
              v-bind="editData"
              draggable>
              <Form>
                <FormItem>
                  UserID：
                  <Input v-model="editData.UserID"  disabled placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                  Account：
                  <Input v-model="editData.Account" disabled placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                </FormItem>
                <FormItem>
                  Identity：
                  <Select v-model="editData.UserRight" disabled filterable style="width:150px;margin-right: 30px" clearable >
                    <Option v-for="item in rightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  Phone：
                  <Input v-model="editData.UserPhone" disabled placeholder="Enter something..." clearable style="width: 130px;margin-right: 30px" />
                </FormItem>
              </Form>
            </Modal>
            <Modal
              v-model="showAdd"
              title="Add a new Admin"
              ok-text="Add"
              cancel-text="cancel"
              @on-ok="addAdmin('formValidate')">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
                <FormItem label="Account" prop="account" style="width:400px;margin:auto" >
                  <Input v-model="formValidate.account" placeholder="Enter your account" size="large" clearable >
                  <Icon type="ios-contact" slot="prefix" size="30"/>
                  </Input>
                </FormItem>
                <br>
                <FormItem label="Password" prop="password" style="width:400px;margin:auto" >
                  <Input v-model="formValidate.password" placeholder="Enter your password" size="large" clearable type="password">
                  <Icon type="ios-key" slot="prefix" size="30"/>
                  </Input>
                </FormItem>
                <br>
                <FormItem label="Phone" prop="phone" style="width:400px;margin:auto" >
                  <Input v-model="formValidate.phone" placeholder="Enter your phone number" size="large" clearable>
                  <Icon type="ios-call" slot="prefix" size="30"/>
                  </Input>
                </FormItem>
                <br>
                <FormItem label="Identity" style="width:400px;margin:auto" >
                  <Select disabled v-model="formValidate.right" filterable  placeholder="Enter your identity" size="large">
                    <Icon type="ios-body" slot="prefix" size="30"/>
                    <Option v-for="item in rightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  </Input>
                </FormItem>
              </Form>
            </Modal>
            <Modal
              v-model="showCommandModal"
              title="Command/Key"
              ok-text="Add"
              cancel-text="cancel"
              @on-ok="addCommand('Command')">
              Now Command：{{this.Command.key}}<br>
              Deadline：{{this.Command.time}}<divider/>
              <br>
              <Form ref="Command" :model="Command" :rules="ruleValidate" >
                <FormItem label="New Command/Key" prop="newKey">
                  <Input v-model="Command.newKey" placeholder="Enter new Command" style="width: 200px" clearable>
                  </Input>
                </FormItem>
              <FormItem label="New Deadline" prop="time" >
                <DatePicker
                  type="datetime"
                  placeholder="Select date and time"
                  :options="options1"
                  style="width: 200px"
                  @on-change="chooseTime2">
                </DatePicker>
              </FormItem>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">PXJ-FakeCommentsTest</Footer>
    </Layout>
  </div>
</template>

<script>
    import {getCookie,delCookie} from "../../../assets/js/cookie";

    export default {
        name: "User",
      data(){
        return{
          options1: {
            disabledDate (date) {
              return date && date.valueOf() < Date.now();
            }
          },
          showAdd:false,
          msg:'000',
          loading:true,
          origin:'',
          revise:'',
          admin:{
            Account: '',
            ID:'',
            Right:1,
            Description:'管理员',
            RegisterTime:'',
            // Phone:'',
            Password:''
          },
          modal:false,
          editIdRight:false,
          editPhone:true,
          account:'',
          rightList: [
            {
              value: '1',
              label: '1-系统管理员'
            },
            {
              value: '2',
              label: '2-平台监管人员'
            },
            {
              value: '3',
              label: '3-商家'
            },
          ],
          showEdit:false,
          showDel:false,
          outform:{
            select:'',
            account:'',
            ID:'',
            time:'',
          },
          inform:{
            select:'',
            account:'',
            ID:'',
            time:'',
          },
          columns:[
            {
              title: '用户类型',
              key:'UserRight'
            },
            {
              title:'用户编号',
              key:'UserID',
            },
            {
              title:'用户账号',
              key:'Account',
            },
            {
              title:'注册时间',
              key:'UserRegister',
              formatter:'yyyy-MM-dd HH:mm:ss',
            },
            {
              title:'联系方式',
              key:'UserPhone',
            },
            {
              title:'可视化结果编号',
              key:'ResultNum',
            },
            {
              title:'操作',
              key:'operate',
              render:(h,params)=> {
                return h('div',[
                h('Button', {
                  props: {
                    value: params.row.status,
                    type:'success',
                  },
                  on: {
                    click: () => {
                      this.showEdit=true;
                      this.editData=params.row;
                      // console.log(this.editData);
                    }
                  }
                },'Edit'),h('Button',{
                  props:{
                    value:params.row.status,
                    type:'error',
                  },
                  on:{
                    click:()=>{
                      this.showDel=true;
                      this.editData=params.row;
                    }
                  }
                },'Del')])
              }
            },
          ],
          Command:{
            key:'',
            time:'',
            newKey:'',
            newTime:'',
          },
          data1:[],
          gettime:'',
          editData:{
            UserRight:'',
            UserID:'',
            UserPhone:'',
            UserRegister:'',
          },
          formValidate: {
            account: '',
            password: '',
            phone:'',
            time:'',
            right:'1',
          },
          ruleValidate: {
            account: [
              { required: true, message: 'The account cannot be empty', trigger: 'blur' },
              { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
            ],
            password: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
              { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: 'phone number cannot be empty', trigger: 'blur' },
              { type: 'string', min: 11, message: 'Introduce no less than 11 words', trigger: 'blur' },
              { type: 'string', max: 11, message: 'Introduce no more than 11 words', trigger: 'blur' }
            ],
            newKey:[
              {required:true, message: 'The command cannot be empty', trigger: 'blur'},
              { type: 'string', min: 4, message: 'Introduce no less than 4 words', trigger: 'blur' }
            ],
            time:[
              { required: true, type: 'date', message: 'Please select the date and time', trigger: 'change' }
          ]
          },
          showCommand:false,
          showCommandModal:false,
        }
      },
      mounted(){
        let Account=getCookie('Account');
        this.account=Account;
        console.log("account",Account);
        if(Account === ""){
          this.$Modal.error({
            title:'error',
            content:'Please Login First!',
          });
          this.$router.push('/login')
        }else{
          this.admin.Account=Account;
          this.$http.get('api/userSearch',{
            params:{
              Account:this.account,
            }
          }).then((res)=>{
            console.log(res.data);
            this.admin.ID=res.data[0].UserID;
            this.admin.Password=res.data[0].Password;
            let d=res.data[0].UserRegister;
            d=new Date(d);
            d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.admin.RegisterTime=d;
          })
        }
      },
      methods:{
        revise_Pass(){
          this.modal=true;
        },
        ok () {
          this.$Message.info('Clicked ok');
        },
        cancel () {
          this.$Message.info('Clicked cancel');
        },
        gotoReturn(){
          delCookie('Account','Right');
          this.$router.push({path:'/'})
        },
        Logout(){
          delCookie('Account','Right');
          this.$router.push({path:'/'})
        },
        chooseTime(date){
          this.outform.time=date;
        },
        chooseTime2(date){
          this.Command.newTime=date;
        },
        func(value){
          console.log(value);
          if(value==='2'){
            this.showCommand=true;
          }else{
            this.showCommand=false;
          }
        },
        getCommand(){
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth() + 1;
          let dd = new Date().getDate();
          let hh = new Date().getHours();
          let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
          let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
          this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
          this.$http.get('api/commandSearch',{
            params:{time:this.gettime}
          }).then((res)=>{
            console.log('command',res.data);
            this.Command.key=res.data[0].command;
            let d=res.data[0].time;
            d=new Date(d);
            d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.Command.time=d;
            // console.log('Commanddata',this.Command);
            this.showCommandModal=true;
          })
        },
        addCommand(){
            if(this.Command.newTime!=='' && this.Command.newKey!=='' ){
              console.log(this.Command);
              this.$http.post('api/commandAdd',{
                time:this.Command.newTime,command:this.Command.newKey
              }).then((res)=>{
                console.log(res);
                this.$Message.success('Add Command Success!')
              })
            }else{
              this.$Message.error('Please enter Command and Time');
            }
        },
        add(){
          this.showAdd=true;
        },
        addAdmin(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$http.get('api/accountSearch',{
                params:{account:this.formValidate.account}
              }).then((res)=>{
                console.log('account',res.data[0]);
                if(res.data === undefined || res.data.length <= 0){
                  let yy = new Date().getFullYear();
                  let mm = new Date().getMonth() + 1;
                  let dd = new Date().getDate();
                  let hh = new Date().getHours();
                  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                  this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
                  console.log('time', this.gettime);
                  this.formValidate.time = this.gettime;
                  console.log('form',this.formValidate);
                  this.$http.post('api/userAdd',{
                    account:this.formValidate.account,password:this.formValidate.password,
                    phone:this.formValidate.phone,right:this.formValidate.right,
                    time:this.formValidate.time,
                  }).then((res)=>{
                    console.log(res);
                    this.$Message.success('Add Admin Success!');
                  });
                }else{
                  this.$Message.error('This account already exist! Please Change!')
                }
              });
            }else{
              this.$Message.error('Please Check Again!');
            }
          })
        },
        search(){
          this.inform.account=this.outform.account;
          this.inform.select=this.outform.select;
          this.inform.ID=this.outform.ID;
          this.inform.time=this.outform.time;
          if(this.inform.select==='') {
            this.inform.select = '/';
          }
          if(this.inform.account==='') {
            this.inform.account = '/';
          }
          if(this.inform.ID==='') {
            this.inform.ID = '/';
          }
          if(this.inform.time==='') {
            this.inform.time = '/';
          }
          console.log(this.outform);
          this.$http.get('api/userSearch',{
            params:{
              UserID:this.inform.ID,Account:this.inform.account,UserRight:this.inform.select,
              UserRegister:this.inform.time
            }
          }).then((res)=>{
            // console.log(111);
            // console.log(res);
            this.data1=res.data;
            for(let i in this.data1){
              let d=this.data1[i].UserRegister;
              d=new Date(d);
              d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
              // console.log(d);
              this.data1[i].UserRegister=d;
            }
          })
        },
        edit_IdRight(){
          if(this.editData.UserID.substring(1,2)!==this.editData.UserRight){
            this.$Message.warning('请保持用户权限和ID的第二位一致！');
            this.editIdRight=false;
          }
          else{
            this.editIdRight=true;
          }
        },
        edit_Phone(){
          if(this.editData.UserPhone.length!==11){
            this.$Message.warning('请输入正确的手机号！');
            this.editPhone=false;
          }
          else{
            this.editPhone=true;
          }
        },
        editUser(){
          // if(this.editData.UserID.substring(1,2)!==this.editData.UserRight){
          //   this.$Message.error('请保持用户权限和ID的第二位一致！');
          //   this.editIdRight=false;
          // }
          // else{
          //   this.editIdRight=true;
          // }
          if(this.editData.UserPhone.length!==11){
            this.$Message.error('Phone number must has 11 digits！');
            this.editPhone=false;
          }
          else{
            this.editPhone=true;
          }
          // console.log(this.editIdRight);
          // console.log(this.editPhone);
          if(this.editPhone===true){
            // console.log('0090909');
            this.$http.post('api/userUpdate',{
              UserID:this.editData.UserID,
              UserPhone:this.editData.UserPhone,
            }).then((res) => {
              console.log(res);
              // console.log('111');
              this.search();
              this.$Modal.success({
                title: 'success',
                content: 'Edit Success！'
              });
              this.showEdit=false;
            })
          }
        },
        editCancel(){
          this.search();
          this.showEdit=false;
        },
        userDel(){
          this.$http.post('api/userDel',{
            UserID:this.editData.UserID
          }).then((res)=>{
            console.log(res);
            console.log('111');
            this.search();
            this.$Modal.success({
              title: 'success',
              content: 'Delete Success！'
            });
            this.showDel=false;
          })
        },
        revisePw(){
          if(this.revise===''){
            this.$Modal.error({
              title: 'error',
              content: 'Please enter new password',
            })
          }else{
            if(this.origin===this.admin.Password){
              this.$http.post('api/pwRevise',{
                Password:this.revise,Account:this.admin.Account
              }).then((res)=>{
                console.log('re',res);
                this.$Modal.success({
                  title:'success',
                  content:'Revise Success！'
                })
              })
            }else {
              this.$Modal.error({
                title: 'error',
                content: 'Wrong old password',
              })
            }
          }
        }
      }
    }
</script>

<style scoped>
  .layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  }
  .layout-logo{
    width: 250px;
    height: 60px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 3px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
    margin-left: 1070px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
