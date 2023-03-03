const images = [];


  for (i = 0; i <=18;i++) {
    images[i] = "https://picsum.photos/200/200?random=" + (i + 1);

  }

  images[18] = "https://picsum.photos/200/200?random=18";
  
  let gameContainer = document.getElementById("game");
  let firstImage = null;
  let secondImage = null;
  let isPlaying = false;
  
  // Shuffle the images array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Generate the game board with shuffled images
  function generateGameBoard() {
    gameContainer.innerHTML = "";
    shuffle(images);
    for (let i = 0; i < images.length; i++) {
      let parentElement = document.createElement("div")
      parentElement.setAttribute("class", "card")

      let image = document.createElement("img");
      image.setAttribute("src", images[i]);
      image.setAttribute("class", "mrdat");
      image.setAttribute("data-index", i);
      image.addEventListener("click", onImageClick);
      parentElement.appendChild(image);
      gameContainer.appendChild(parentElement);
    }
  }
  
  // Handle image click event
  function onImageClick(event) {
    if (!isPlaying) {
      return;
    }
    let clickedImage = event.target;
    let clickedImageIndex = parseInt(clickedImage.getAttribute("data-index"));
    if (firstImage === null) {
      // First image click
      firstImage = clickedImage;
      firstImage.setAttribute("class", "selected");
    } else if (secondImage === null && clickedImageIndex !== parseInt(firstImage.getAttribute("data-index"))) {
      // Second image click
      secondImage = clickedImage;
      secondImage.setAttribute("class", "selected");
      if (firstImage.getAttribute("src") === secondImage.getAttribute("src")) {
        // Match found
        firstImage = null;
        secondImage = null;
        checkGameEnd();
      } else {
        // No match found
        isPlaying = false;
        setTimeout(function() {
          firstImage.removeAttribute("class");
          secondImage.removeAttribute("class");
          firstImage = null;
          secondImage = null;
          isPlaying = true;
        }, 1000);
      }
    }
  }
  
  // Check if the game has ended
  function checkGameEnd() {
    let matchedImages = gameContainer.querySelectorAll(".selected");
    if (matchedImages.length === 2) {
        isPlaying = false;
        Swal.fire({
            title: 'Congratulations!',
            text: 'You won the game!',
            icon: 'success',
            confirmButtonText: 'Play again'
          }).then(() => {
            window.location.reload();
          });
    }
  }
  
  // Start the game
  function startGame() {
    generateGameBoard();
    isPlaying = true;
  }