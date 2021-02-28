let nutrition_app_id = "01808f24";
let nutrition_app_key = "e4ac1db466bc095b2c44f816dcc91ad3";

document.getElementById("blueberry-muffin-button").addEventListener("click", function() { sendRequest("recipe/blueberry-muffin-recipe.json", "blueberry-muffin-nutrition"); });
document.getElementById("croissant-button").addEventListener("click", function() { sendRequest("recipe/croissant-recipe.json", "croissant-nutrition"); });
document.getElementById("fudge-brownie-button").addEventListener("click", function() { sendRequest("recipe/fudge-brownie-recipe.json", "fudge-brownie-nutrition"); });
document.getElementById("macarons-button").addEventListener("click", function() { sendRequest("recipe/macarons-recipe.json", "macarons-nutrition"); });
document.getElementById("mousse-cake-button").addEventListener("click", function() { sendRequest("recipe/mousse-cake-recipe.json", "mousse-cake-nutrition"); });
document.getElementById("rolls-button").addEventListener("click", function() { sendRequest("recipe/rolls-recipe.json", "rolls-nutrition"); });
document.getElementById("fruit-tart-button").addEventListener("click", function() { sendRequest("recipe/fruit-tart-recipe.json", "fruit-tart-nutrition"); });

function sendRequest(filename, div_location) {
  //event.preventDefault();
  fetch(filename)
    .then(response => response.json())
    .then(function(jsonResponse) {
      let json_string = JSON.stringify(jsonResponse);
      const url = "https://api.edamam.com/api/nutrition-details?app_id=" + nutrition_app_id + "&app_key=" + nutrition_app_key;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(json_string);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          let text = "<p>Calories: " + Math.floor(parseInt(response.calories) / parseInt(jsonResponse.yield)) + "</p>";
          text += "<p>Allergin Info: ";
          let addGlutenFree = true;
          for (let i = 0; i < response.healthLabels.length; i++) {
            if (!(response.healthLabels[i] === "VEGETARIAN" || response.healthLabels[i] === "ALCOHOL_FREE")) {
              text += response.healthLabels[i].toLowerCase().replace(/_/g, " ");
              text += ", ";
            }
            if (response.healthLabels[i] === "GLUTEN_FREE") {
              addGlutenFree = false;
            }
          }
          if (addGlutenFree) {
            text += "gluten free";
          }
          else {
            text.substring(0, text.length - 2);
          }
          text += "</p>";
          document.getElementById(div_location).innerHTML = text;
        }
        else {
          console.log(e);
        }
      }
        /*fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: json_string
        })then(function(response) {
          return response.json();
        }).then(function(json) {
          let text = "<p>Calories: " + Math.floor(parseInt(json.calories) / parseInt(jsonResponse.yield)) + "</p>";
          text += "<p>Allergin Info: ";
          for (let i = 0; i < response.healthLabels.length; i++) {
            if (!(json.healthLabels[i] === "VEGETARIAN" || json.healthLabels[i] === "ALCOHOL_FREE")) {
              text += json.healthLabels[i].toLowerCase().replace(/_/g, " ");
              text += ", ";
            }
          }
          text = text.substring(0, text.length - 2);
          text += "</p>";
          document.getElementById(div_location).innerHTML = text;
        }).catch(function(e) {
          console.log(e);
        });*/
    });
}
