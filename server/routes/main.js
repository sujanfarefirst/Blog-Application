import express from "express";

const router = express.Router();
import Post from "../models/Post.js";



// router.get("", async (req, res) => {
//   try {
//     const locals = {
//       title: "NodeJs Blog",
//       dec: "Simple Blog Application",
//     };

//     let perPage = 10;
//     let page = req.query.page || 1;

//     const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();

//     const count = await Post.countDocuments();
//     const nextPage = parseInt(page) + 1;
//     const hasNextPage = nextPage <= Math.ceil(count / perPage);

//     res.render("index", {
//       locals,
//       data,
//       current: page,
//       nextPage: hasNextPage ? nextPage : null,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });



/*
GET/
index
*/
router.get("", async (req, res) => {
  const locals={
    title:"NodeJs Blog",
    dec:"Simple Blog Application"
  }
  try{
    const data = await Post.find();
    
    
    res.render('index',{ locals, data});
  }catch(error){
    console.log(error);
  }
});
/*
GET
Post :id
*/

router.get('/post/:id', async (req, res) => {
  
  try{

    let slug = req.params.id;
    const data = await Post.findById({_id: slug });

    const locals={
    title:data.title,
    dec:"Simple Blog Application"
  }
  
    res.render('post',{ locals, data});
  }catch(error){
    console.log(error);
  }
});

/*
POST/
search
*/
router.post("/search", async (req, res) => {
  
  try{
    let searchTerm=req.body.searchTerm;
    
    res.send(searchTerm);
    console.log(searchTerm);
    
  }catch(error){
    console.log(error);
  }
});



// GET - Show Edit Form
router.get('/edit-post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const locals = {
      title: "Edit Post",
      dec: "Edit your blog post"
    };
    res.render('edit-post', { locals, post });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// POST - Submit Edit
router.post('/edit-post/:id', async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });
    res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/delete-post/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.post("/posts", async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).send("Title and body are required.");
    }

    const newPost = new Post({ title, body });
    await newPost.save();

    res.status(201).redirect('/');
    
  } catch (error) {
    console.error(" Error creating post:", error.message);
    res.status(500).send("Server Error");
  }
});


export default router;

//modules.exports = router; used in Commonjs

// async function insertPostData() {
//   try {
//     await Post.insertMany([
//       {
//         title: "Building a Blog",
//         body: "This post walks through the process of setting up a basic blog using Node.js, Express, MongoDB, and EJS."
//       },
//       {
//         title: "Understanding REST APIs",
//         body: "Learn the fundamentals of RESTful API design and how to structure your backend for clean, scalable services."
//       },
//       {
//         title: "JavaScript Array Methods You Should Know",
//         body: "Discover powerful JavaScript array methods like map, filter, reduce, and how to use them effectively."
//       },
//       {
//         title: "How to Style Websites with Flexbox and Grid",
//         body: "A beginner-friendly guide to mastering modern CSS layout tools: Flexbox and CSS Grid."
//       },
//       {
//         title: "Deploying Node.js Apps to Render",
//         body: "This article explains how to deploy a Node.js Express application to the Render platform step-by-step."
//       },
//       {
//         title: "Using MongoDB with Mongoose",
//         body: "Get hands-on with MongoDB and Mongoose by learning how to define schemas, connect to the database, and perform CRUD operations."
//       },
//       {
//         title: "Creating a Contact Form with Express",
//         body: "Build a contact form in EJS, handle form submissions in Express, and send email responses using nodemailer."
//       },
//       {
//         title: "Top 5 VS Code Extensions for Developers",
//         body: "Speed up your workflow with these essential Visual Studio Code extensions for web developers."
//       }
//     ]);

//     console.log("✅ Sample posts inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting posts:", error.message);
//   }
// }

// insertPostData();

////If dont want pagination dont touch this

// router.get("", async (req, res) => {
//   const locals={
//     title:"NodeJs Blog",
//     dec:"Simple Blog Application"
//   }
//   try{
//     const data = await Post.find();
//     res.render('index',{ locals, data});
//   }catch(error){
//     console.log(error);
//   }
// });
