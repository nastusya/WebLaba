var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.post('/news', function (req,res){
        console.log(req.body);
        res.send(req.body)
    })
};

module.exports = function(app, db) {
    app.get('/news/:id', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('news').findOne(details, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/news', function(req, res) {
        const news = { caption: req.body.caption, text: req.body.text};
        db.collection('news').insert(news, function(err, result){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/news/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('news').remove(details, function(err, item){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('News ' + id + ' deleted!');
            }
        });
    });
    app.put('/news/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { caption: req.body.caption, text: req.body.text};
        db.collection('news').update(details, note, function(err, result){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });
};
