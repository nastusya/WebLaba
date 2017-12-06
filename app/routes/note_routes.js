var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.post('/comments', function (req,res){
        console.log(req.body);
        res.send(req.body)
    })
};

module.exports = function(app, db) {
    app.get('/comments/:id', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('comments').findOne(details, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/comments', function(req, res) {
        const comments = { text: req.body.body, title: req.body.title };
        db.collection('comments').insert(comments, function(err, result){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/comments/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('comments').remove(details, function(err, item){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Comment ' + id + ' deleted!');
            }
        });
    });
    app.put('/comments/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('comments').update(details, note, function(err, result){
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });
};
