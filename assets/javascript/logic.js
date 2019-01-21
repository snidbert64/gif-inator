    var buttons = ["cat", "dog", "bird"];

    $("#add-category").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var category = $("#category-input").val().trim();
        // The category from the textbox is then added to our array
        buttons.push(category);

        // calling renderButtons which handles the processing of our category array
        $("#buttons").html("<button class='gif-button'>" + buttons.join("</button><button class='gif-button'>") + "</button>");
        buttonSetup();
      });


    $("#buttons").html("<button class='gif-button'>" + buttons.join("</button><button class='gif-button'>") + "</button>");
    buttonSetup();
    // Adding click event listen listener to all buttons
    
function buttonSetup(){
    $(".gif-button").off("click");
    $(".gif-button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).text();

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gif");

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);
            animalDiv.append(p);
            

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);

            $(".gif").off("click");

    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        console.log("Start Animating!");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        console.log("Stop Animating!");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
          }
        });
    });
}
    // $(".gif").on("click", function() {
    //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    //   var state = $(this).attr("data-state");
    //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    //   // Then, set the image's data-state to animate
    //   // Else set src to the data-still value
    //   if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    //   }
    // });