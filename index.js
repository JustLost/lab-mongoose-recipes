const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
let newRecipe = {
  title: "Spaghetti Bolognese",
  level: "Easy Peasy",
  ingredients:
    ["Spaghetti", "beef", "bay leaves", "beef cube of powder", "tomato", "red wine", "tomato sauce", "onion & garlic"],
  cuisine: "main_course",
  image:
    "https://www.recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg?resize=650,910",
  duration: 30,
  creator: "Rita",  
};
  
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(newRecipe);
  })
  
  //     let receitas = data;
  //     return Recipe.insertMany(receitas);
          
  .then(() => {    
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    // console.log(recipe.title )
    // console.log(recipe.duration)
  })  
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })




