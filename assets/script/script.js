  // Initial array of movies
  var animals = ["Lion", "Tiger", "Bear"];

  // Function for dumping the JSON content for each button into the div
  function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=3cf166dc53e6415ba7c3f26d1e3da6c4&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
          $("#animalGifs").empty();
          console.log(response.data[0].images.fixed_height.url);

          for( var i = 0; i < 11; i++){
              var gifUrl = response.data[i].images.original.url;
              var gifImage = $("<img>");
              var gifUrlStill = response.data[i].images.fixed_height_still.url;
              var gifImageStill = $("<img>");

              // gifImage.attr("src", gifUrl);
              // gifImage.attr("data-still", gifImageStill);
              // gifImage.attr("data-animate", gifUrl);
              // gifImage.attr("data-state", "animate");
              // gifImage.addClass("gif");
              // gifImage.attr("alt", "gifImage");

              gifImageStill.attr("src", gifUrlStill);
              gifImageStill.attr("data-state", "still");
              gifImageStill.attr("data-still", gifUrlStill);
              gifImageStill.attr("data-animate", gifUrl);
              gifImageStill.addClass("gif");
              gifImageStill.attr("alt", "Gif Image Still");

              $("#animalGifs").append(gifImageStill);

              console.log("Data: " + response);
              console.log(response.data[0].images);
              console.log("Still: " + gifUrlStill);

              $(".gif").on("click", function() {
                  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                  var state = $(this).attr("data-state");
                  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                  // Then, set the image's data-state to animate
                  // Else set src to the data-still value
                  if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
                });

//Rating append needs work
              // console.log(gifRating);
              // var gifRating = response.data[i].rating;
              // $("#animalGifs").prepend("Rating: " + gifRating);

          }
      renderButtons();
    });
  }

  // Function for displaying animal data
  function renderButtons() {

    $("#animalButtons").empty();
      // Looping through the array of movies
      for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generating buttons for each animal in the array
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#animalButtons").append(a);
      }
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
    // Adding the movie from the textbox to our array
    animals.push(animal);
    console.log(animals)
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Function for displaying the animal info
  // Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
  $(document).on("click", ".animal", displayAnimalInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
