const express=require('express');
const router=express.Router();
const Post=require('../models/Post')

//Routes
router.get('',async (req,res)=>{

    try{
    const locals={
        title: "Cooking Blog",
        description: "simple cooking blog"
    }

        let items=6;
        let page= req.query.page || 1;

        const data=await Post.aggregate([{$sort:{createdAt: 01}}])
        .skip(items*page-items)
        .limit(items)
        .exec();
        
        const count=await Post.count();
        const nextPage=parseInt(page)+1;
        const isPossible=nextPage<=Math.ceil(count/items);

        res.render('index',{locals,data,current: page,nextPage: isPossible?nextPage:null});
    } catch(error){
        console.log(error);
    }
});


function insertdata(){
    Post.insertMany([
        {
          "title": "Mango Lassi",
          "body": "Tasty and refreshing treat"
        },
        {
          "title": "Chicken tikka masala",
          "body": "Rich and creamy chicken curry"
        },
        {
          "title": "Paneer Tikka",
          "body": "Delicious grilled cottage cheese cubes"
        },
        {
          "title": "Gulab Jamun",
          "body": "Soft and sweet syrup-soaked dumplings"
        },
        {
          "title": "Butter Chicken",
          "body": "Creamy tomato-based chicken curry"
        },
        {
          "title": "Aloo Paratha",
          "body": "Flaky and stuffed potato flatbread"
        },
        {
          "title": "Samosa",
          "body": "Crispy and savory pastry filled with spiced potatoes"
        },
        {
          "title": "Tandoori Chicken",
          "body": "Marinated and grilled chicken with smoky flavors"
        },
        {
          "title": "Rasmalai",
          "body": "Spongy cottage cheese dumplings soaked in sweetened milk"
        },
        {
          "title": "Biryani",
          "body": "Aromatic rice dish with meat, spices, and fragrant herbs"
        },
        {
        "title": "Spaghetti Bolognese",
        "body": "Classic Italian pasta dish with rich meat sauce"
        },
        {
        "title": "Croque Monsieur",
        "body": "French grilled ham and cheese sandwich"
        },
        {
        "title": "Fish and Chips",
        "body": "British deep-fried fish with crispy chips"
        },
        {
        "title": "Caesar Salad",
        "body": "Fresh salad with romaine lettuce, croutons, and Caesar dressing"
        },
        {
        "title": "Paella",
        "body": "Spanish saffron-infused rice dish with seafood and meat"
        },
        {
        "title": "Wiener Schnitzel",
        "body": "Austrian breaded and fried veal cutlet"
        },
        {
        "title": "Hamburger",
        "body": "Classic American beef patty served in a bun with toppings"
        },
        {
        "title": "Moules Marinière",
        "body": "French dish of mussels cooked in white wine and herbs"
        },
        {
        "title": "Goulash",
        "body": "Hungarian hearty meat stew with paprika and spices"
        },
        {
        "title": "Shepherd's Pie",
        "body": "Traditional British dish with minced meat and mashed potatoes"
        }
      ])
};

router.get('/post/:id',async (req,res)=>{

    try{

        let slug=req.params.id;
        const data=await Post.findById({_id:slug});

        const locals={
            title: data.title,
            description: "simple cooking blog"
        }

        res.render('post',{locals,data});
    } catch(error){

    }
});



router.post('/search',async (req,res)=>{
    try{
    const locals={
        title: "search",
        description: "simple cooking blog"
    }

    let searchTerm=req.body.searchTerm;
    const searchCleaned=searchTerm.replace(/[^a-zA-Z0-9]/g,"");
    const data=await Post.find({
        $or:[
            { title: {$regex: new RegExp(searchCleaned,'i')}},
            { body: {$regex: new RegExp(searchCleaned,'i')}}
        ]
    });
        res.render('search',{locals,data});
    } catch(error){

    }
});




// insertdata();
router.get('/about',(req,res)=>{
    res.render('about');
});

module.exports=router;

// router.get('',async (req,res)=>{
//     const locals={
//         title: "Cooking Blog",
//         description: "simple cooking blog"
//     }

//     try{
//         const data=await Post.find();
//         res.render('index',{locals,data});
//     } catch(error){

//     }
// });
