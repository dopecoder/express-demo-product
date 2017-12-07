
const express = require('express');
const router = express.Router();
var Product = require('../models/Product');
var extend = require('extend'); 

const API = 'localhost';

router.route('/product')

// create a product at POST http://localhost:8080/product
.post(function(req, res) {

	if(req.body.name == undefined || req.body.status == undefined){
		console.log("Not enough fields.");
		res.json({"message":"submit all the details."})
	}else{
		//crete product object
		console.log("Creating Product");
                console.log(req.body.status.toString().toLowerCase().trim().valueOf());
                if(req.body.status.toLowerCase() == 'enabled' || req.body.status.toLowerCase() == 'disabled'){
		    var product = new Product({
			name : req.body.name,
			status : req.body.status
		    });
		    console.log(product);

		    product.save(function(err, product){
			if(err){
				console.log(err);
				res.send(err);
			}
			res.json("Product " + product.name + " saved!");
		    });
	        }else{
		   res.json({"message":"Enter either enabled or disabled as value for status."});
		}
	}
})

// get all the products at GET http://localhost:8080/api/product
.get(function(req, res) {
	try{

            Product.find(function(err, products) {
		    if (err)
		        res.send(err);

		    res.json(products);
	    });
        }catch(err){
		    res.send(err);
	}  
});


// -------------------------------------------------------------------
router.route('/product/:status')

// get the bear with that id
.get(function(req, res) {
    try{
        if(req.params.status){
	    Product.find({'status':req.params.status.toLowerCase()}, function(err, products) {
    	        if (!err){ 
        	    console.log(products);
        	    res.json(products);
    	        } else { res.send(err);}
	    });
        }else{
		res.json({'message':'Please enter the status as enabled or disabled'});
	}
   
    } catch(err){ res.send(err);}	
});


router.route('/product/:id/:status')

.put(function(req, res) {

    try{
        if(!req.params.id || !req.params.status || !(req.params.status.toLowerCase() == 'enabled' || req.body.status.toLowerCase() == 'disabled')){
      	    res.json({'message':'Please enter the id of the product and the new status'});
        }else{
	
	    Product.findById(req.params.id, function(err, product) {

	        if (err)
		    res.send(err);
		
		product.status = req.params.status;
	        console.log(product);
		
		product.save(function(err, product) {
			if (err)
				res.send(err);
			res.json(product);
		});

	     });
        }
    }catch(err){res.send(err);}
});


router.route('/product/:id')

.delete(function(req, res) {
	Product.remove({
		_id: req.params.id
	}, function(err, classroom) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});



module.exports = router;
