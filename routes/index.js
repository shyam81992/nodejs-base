var HomeController = require('../controllers/homeController.js');

app.get('/',function(req,res,next){
  res.render('index.html');
});


// Start of Home page

app.get('/cms',HomeController.cms);

/*  

app.get('/url/:id',HomeController.url_get);

app.post('/url',HomeController.url_post);

app.put('/url',HomeController.url_put);

app.delete('/url/:id',HomeController.url_delete);

*/

