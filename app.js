var express = require('express')

var app = express();

var fortunes = [
    "幸运饼干1",
    "幸运饼干2",
    "幸运饼干3",
    "幸运饼干4",
    "幸运饼干5",
]


//设置handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars')


app.set('port',process.env.PORT || 3000);

//旧路由
//添加路由的方法  一个路径,一个函数  app.VERB   指代HTTP（get,post）
// 默认忽略了大小写或反斜杠，并在进行匹配时也不考虑查询字符串
// app.get('/',function (req, res) {
//     res.type('text/plain');
//     res.send('Home')
// })
//
// app.get('/about',function (req, res) {
//     res.type('text/plain');
//     res.send('about')
// })

//express 能根据回调函数中参数的个数 区分 404 和 500 处理器
//定制404页面
// app.use(function (req, res) {
//     res.type('text/plain');
//     res.status(404);
//     res.send('404- - Not Found')
// })
//
// //定制500页面
// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.type('text/plain');
//     res.status(500);
//     res.send('404- - Not Found')
// })


app.use(express.static(__dirname + '/public'));

//新路由
app.get('/',function (req, res) {
    res.render('home');
});

app.get('/about',function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about',{fortunes:randomFortune});
});

//404  catch-all处理器（中间件）
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

//500错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'),function () {
    console.log(' Server started on http://localhost:'+ app.get('port')+ ';press Ctrl+C to terminate...');
})
