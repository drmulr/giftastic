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
              var gifUrl = response.data[i].images.fixed_height.url;
              var gifImage = $("<img>");
              gifImage.attr("src", gifImageStill);
              gifImage.attr("data-still", gifImageStill);
              gifImage.attr("data-animate", gifUrl);
              gifImage.attr("data-state", "still");
              gifImage.addClass("gif");
              gifImage.attr("alt", "gifImage");



              $("#animalGifs").append(gifImageStill);

              console.log(response.data[0].images);

//Rating append needs work
              // console.log(gifRating);
              // var gifRating = response.data[i].rating;
              // $("#animalGifs").prepend("Rating: " + gifRating);

// Beginning still gif work
              var gifUrlStill = response.data[i].images.fixed_height_still.url;
              var gifImageStill = $("<img>");
              gifImageStill.attr("src", gifUrlStill);
              gifImageStill.attr("alt", "Gif Image Still");

              console.log("Still: " + gifUrlStill);

              // <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
              // <img src="http://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="http://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="http://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">
              // <img src="http://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="http://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="http://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
          }
      renderButtons();
    });
  }

  // Function for displaying animal data
  function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
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
