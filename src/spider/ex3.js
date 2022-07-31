let request = require('superagent');
let cheerio = require('cheerio');

function confirmShop(URL){
  request
    .get(URL)
    .end(function (err, res) {
      if (err) return console.log(err.stack);
      else {
        let $ = cheerio.load(res.text);
        let t = $('span', '.breadcrumb').text();
        console.log(t);
        return (t);
      }

    });
}
confirmShop('http://www.dianping.com/shop/110620927');



// var express = require('express');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
//
//   superagent.get('http://www.cnblogs.com/LIUYANZUO')
//     .end(function (err, sres) {
//       if (err) {
//         return next(err);
//       }
//       console.log(sres);
//       // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//       // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//       // 剩下就都是 jquery 的内容了
//       var $ = cheerio.load(sres.text);
//       var items = [];
//       $('.day .postTitle2').each(function (index, element) {
//         var $element = $(element);
//         items.push({
//           标题: $element.text(),
//           网址: $element.attr('href')
//         });
//       });
//       console.log(items);
//     });
