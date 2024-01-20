const app = require("./app");
const { mongoose } = require("./database"); 
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Server funcionando correctamente...");
});
