const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aboubacar:65498124@cluster0.a218o.mongodb.net/mymoviz?retryWrites=true&w=majority')
.then(()=>{
    console.log("✅ Database connected successfully ✨✨")
}).catch(()=>{
    console.log("❌Database is not connected❌")
})