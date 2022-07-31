let request = require('superagent');
let cheerio = require('cheerio');


module.exports = {
  confirmShop(req,res,next){
    let URL=req.URL;
    console.log(URL);
    request
      .get(URL)
      .end(function (err, res) {
        if (err) return console.log(err.stack);
        else {
          let $ = cheerio.load(res.text);
          let t = $('span', '.breadcrumb').text();
          console.log(t);
          res.t=t;
        }

      });
  }
};
