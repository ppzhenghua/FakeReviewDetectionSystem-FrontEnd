module.exports={
  mysql:{
    host: 'localhost',
    user: 'root',
    password: '70798089',
    database: "dazhongdianping",
  }
};

const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '70798089',
  database: 'dazhongdianping',
  multipleStatements: true,   // 多语句查询
});

var userSearch=function(req,res,next){
  pool.getConnection((err,connection)=> {
    var sql = 'select * from User';
    connection.query(sql, (err, result) => {
      // res.json(result);
      console.log(result);
      connection.release();

    })
  })
};

// userSearch();

var userUpdate=function(req,res,next){
  pool.getConnection((err,connection)=>{
    var sql='update User set Password=\'654321\' where UserID=?';
    connection.query(sql,'010002',(err,result)=>{
      console.log(result);
      connection.release();
    })
  })
};

// userUpdate();


var userInsert=function(req,res,next){
  let data={
    type:'3-商家',
    ID:'030004',
    account:'9876521',
    password:'982043819',
    registerTime:'2018-06-07',
    phone:'09876543233',
    resultNum:['13','20','56'],
    operate:'',
  };
  pool.getConnection((err,connection)=>{

    var sql='insert into User(UserID,UserPhone,UserRight,UserRegister,Account,Password,ResultNum)values(?,?,?,?,?,?,JSON_ARRAY(?)) ';
    connection.query(sql,
      [data.ID,data.phone,parseInt(data.type.substring(0,1)),data.registerTime,data.account,data.password,data.resultNum],
      (err,result)=>{
        console.log(result);
        connection.release();
      })
  })
};
// userInsert();







