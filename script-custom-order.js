let recipe_app_id = "89847b8a";
let recipe_app_key = "a944688cd129618b0d53390ed3838607";

let firstHealthLabel = true;

function check(id) {
  if (document.getElementById(id).checked === true) {
    if (firstHealthLabel) {
      firstHealthLabel = false;
      return id;
    }
    return "&" + id;
  }
  else {
    return "";
  }
}

/*document.getElementById("custom-order-submit-button").addEventListener("click", function() {*/
function sendRecipeQuery() {
  var query_value = document.getElementById("item_description").value;
  if (query_value == "") {
    alert("Description must be filled out");
    return false;
  }
  let max_return_num = 3;
  query_value = query_value.replace(/[ ]/g, "-");

  firstHealthLabel = true;
  let healthInfo = "&healthLabels=";
  healthInfo += check("dairy-free");
  healthInfo += check("egg-free");
  healthInfo += check("fish-free");
  healthInfo += check("low-sugar");
  healthInfo += check("paleo");
  healthInfo += check("pescatarian");
  healthInfo += check("pork-free");
  healthInfo += check("shellfish-free");
  healthInfo += check("soy-free");
  healthInfo += check("tree-nut-free");
  healthInfo += check("vegan");
  healthInfo += check("vegetarian");
  healthInfo += check("wheat-free");

  const recipe_url = "https://api.edamam.com/search?q=" + query_value + "&app_id=" + recipe_app_id + "&app_key=" + recipe_app_key + "&from=0&to=" + max_return_num + healthInfo;
  let recipe_xhr = new XMLHttpRequest();
  recipe_xhr.open('GET', recipe_url, true);
  recipe_xhr.onload = function(e) {
    if (recipe_xhr.readyState == 4 && recipe_xhr.status == 200) {
      let response = JSON.parse(recipe_xhr.responseText);
      let recipe_list = "";
      for (let i = 0; i < response.hits.length; i++) {
        let title = response.hits[i].recipe.label;
        /*title = label.replace(/["]/g, "\"");
        title = label.replace(/[']/g, "\'");*/
        let recipe = "<div class=\"recipe_response\"><h3>" + title + "</h3>";
        recipe += "<p>";
        for (let j = 0; j < response.hits[i].recipe.healthLabels.length; j++) {
          if (j > 0) {
            recipe += ", ";
          }
          let label = response.hits[i].recipe.healthLabels[j];
          label = label.replace(/[-]/g, " ");
          recipe += label;
        }
        recipe += "</p>";
        recipe += "<img src=\"" + response.hits[i].recipe.image + "\"></div>";
        recipe_list += recipe;
      }
      document.getElementById("query-answer").innerHTML = recipe_list;
      document.getElementById("query-answer").style.marginTop = "100px";
      document.getElementById("query-answer").style.marginBottom = "100px";
    }
    else {
      console.log(e);
    }
  }
  recipe_xhr.send(null);
  /*document.getElementById("query-answer").style.height = "500px";*/
}
