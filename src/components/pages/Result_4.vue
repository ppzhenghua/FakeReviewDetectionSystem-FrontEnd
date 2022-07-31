<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px', zIndex:'1000'}">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"><img src="../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <MenuItem name="1" style="font-size: large; margin-top: 5px" @click.native="gotoLogin">
              <Icon type="ios-contact-outline" size="35"/>
              LOGIN
            </MenuItem>
            <MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoReturn">
              <Icon type="ios-arrow-dropleft" size="35"/>
              RETURN
            </MenuItem>
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
      <Content :style="{margin: '88px 20px 0', background:'', minHeight: '900px', textAlign:'center'}">
        <Table width="1300" :row-class-name="rowClassName" border :columns="columns3" :data="data3" style="margin: auto;margin-top: 3%;border-radius: 25px"></Table>
        <br>
        <Table width="1300" :row-class-name="rowClassName" border :columns="columns4" :data="data4" style="margin: auto;border-radius: 25px"></Table>
        <br>
        <Table  width="1300" border :columns="columns5" :data="data5" height="800" style="margin: auto;border-radius: 25px"></Table>
      </Content>
      <Footer  class="layout-footer-center">PXJ-SpamReviewDetection</Footer>
    </Layout>
  </div>
</template>

<script>
    export default {
        name: "Result_4",
      data(){

        return {
          shopId:'',
          columns3: [
            {
              title: 'StoreID',
              key: 'StoreID',
              width:180,
            },
            {
              title: 'StoreName',
              key: 'StoreName',
            },
            {
              title: 'Address',
              key: 'Address',
              width:700,
            },
          ],
          columns4:[
            {
              title: 'StoreStar',
              key: 'StoreStar',
              render:(h,params)=>{
                return(h('Rate',{
                  props:{
                    value:params.row.StoreStar/10,
                    showText:true,
                    allowHalf:true,
                    disabled:true,
                  }
                }))
              }
            },
            {
              title: 'StoreScore',
              key: 'StoreScore',
            },
            {
              title: 'StoreAveCost',
              key: 'StoreAveCost',
            },
            {
              title: 'CommentCount',
              key: 'CommentCount',
            },
          ],
          columns5: [
            {
              title: 'CommentTime',
              key: 'CommentTime',
              sortable: true,
              fixed:'left',
              width:160,
              className:'demo-table-info-column',
            },
            {
              title: 'Name',
              key: 'CriticName',
              fixed:'left',
              className:'demo-table-info-column2',
              width:120,
            },
            // {
            //   title: 'Sex',
            //   key: 'CriticSex',
            //   width:70,
            // },
            {
              title: 'Star',
              key: 'CriticStar',
              width:70,
            },
            {
              title: 'AverageCost',
              key: 'CriticAveCost',
              width:130,
            },
            {
              title: 'Score',
              key: 'CriticScore',
              resizable: true,
              width:100,
            },
            {
              title: 'Favorite',
              key: 'CriticFavorite',
              width:100,
            },
            {
              title: 'Comment',
              key: 'Comment',
              resizable: true,
              width:800,
            },

            {
              title: 'Mood',
              key: 'Mood',
              sortable: true,
              fixed:'right',
              width:80,
              className:'demo-table-info-column3',
            },
          ],
          data5: [],
          data3:[{
            StoreID:'',
            StoreName:'',
            Address:'',
          }],
          data4:[{
            CommentCount:'',
            StoreAveCost:'',
            StoreScore:'',
            StoreStar:'',
          }],
        }

      },
      methods:{
        gotoLogin(){
          this.$router.push({path:'/login'})
        },
        gotoReturn(){
          this.$router.push({path:'/'})
        },
        rowClassName (row, index) {
          return 'demo-table-info-row';
        }

      },
      mounted() {
        this.shopId=window.location.href;
        // console.log(shopId);
        this.shopId=this.shopId.split('/')[5];
        console.log(this.shopId);
        this.$http.get('api/getReal',{
          params:{shop:this.shopId}
        }).then((res)=>{
          console.log('res',res.data);
          this.data5=res.data;
          for(let item in this.data5){
            let d=this.data5[item].CommentTime;
            d=new Date(d);
            d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.data5[item].CommentTime=d;
            let s=this.data5[item].CriticFavorite;
            s=s.substr(6);
            this.data5[item].CriticFavorite=s;
            let m=this.data5[item].Mood;
            if(m==='negative'){
              m='正向';
            }
            else if(m==='positive'){
              m='负向';
            }
            else if(m==='neutral'){
              m='正向'
            }
            this.data5[item].Mood=m;
          }
          // console.log(res.data[0].StoreID);
          this.$http.get('api/getShop',{
            params:{StoreID:res.data[0].StoreID}
          }).then((res)=>{
            console.log(res.data[0]);
            this.data3[0].StoreID=res.data[0].StoreID;
            this.data3[0].StoreName=res.data[0].StoreName;
            this.data3[0].Address=res.data[0].Address;
            this.data4[0].StoreScore=res.data[0].Score;
            this.data4[0].StoreScore=this.data4[0].StoreScore.split(';').join('/');
            this.data4[0].StoreStar=res.data[0].Star;
            this.data4[0].StoreAveCost=res.data[0].Price;
            this.data4[0].CommentCount=res.data[0].Num;
          })
        });


      }
    }
</script>
<style>
  .ivu-table .demo-table-info-row td{
    background-color: beige;
    /*color: #fff;*/
  }
  .ivu-table td.demo-table-info-column{
     background-color: cadetblue;
     color: #fff;
   }
  .ivu-table td.demo-table-info-column2{
    background-color: darkseagreen;
    color: #fff;
  }
  .ivu-table td.demo-table-info-column3{
    background-color: orange;
    color: #fff;
  }
</style>

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
