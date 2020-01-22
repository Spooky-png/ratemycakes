var express = require('express');
    app = express();
    mongoose = require('mongoose');

    app.use(express.static( __dirname + '/public/dist/public' ));


const cakeSchema = new mongoose.Schema({
    baked_by: String,
    image: String,
    ratings: [{
        rating: Number,
        comment: String
      }],
    }, {timestamps: true});
   const Cake = mongoose.model('Cake', cakeSchema);

mongoose.connect('mongodb://localhost/cake_db', { useNewUrlParser: true })

app.use(express.json());
app.get('/cakes',(req, res) =>{
    Cake.find()
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
}),
app.post('/cakes',(req, res) =>{
    Cake.find()
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
}),
app.post('/new', (req,res) =>{
    const cake = new Cake();
    cake.baked_by = req.body.baked_by;
    cake.image = req.body.image;
    cake.save()
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
}),
app.get('cakes/:id', (req,res) =>{
    Cake.findOne({_id: req.params.id})
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
});
app.put('/cakes/:id', (req,res) =>{
    Cake.findOne({_id: req.params.id})
        .then(cakes =>{
            cakes.baked_by = req.body.baked_by;
            cakes.image = req.body.image;
            return cakes.save()
        })
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
});
app.post('/cakes/:id/ratings', (request,response) =>{
    console.log(request.body.rating)
    Cake.findById(request.params.id)
        .then(cake =>{
            cake.ratings.push(request.body)
            return cake.save();
        })
        .then(cake => response.json(cake))
        .catch(err => response.json(err));
});
  app.delete('/remove/:id', (req, res) =>{
    const cake = Cake.findOne({_id: req.params.id})
        cake.remove({_id: req.params.id})
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err));
}),
app.listen(8000, function () {
    console.log("server running on port 8000");
});