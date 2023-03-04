const images = [];
let level = 1;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateImages() {
  let j = getRandomInteger(1, 4);
  images.length = 0;

  for (i = j; i <= (j + 4); i++) {
    images.push("https://picsum.photos/300/300?random=" + i);
    console.log(i);
  }
  
  images.push(images[Math.ceil(Math.random(1, 5))]);
}

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
    generateImages();
    gameContainer.innerHTML = "";
    shuffle(images);
    for (let i = 0; i < images.length; i++) {
      let parentElement = document.createElement("div")
      parentElement.setAttribute("class", "card")

      let image = document.createElement("img");
      image.setAttribute("src", images[i]);
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

      if (!firstImage.parentElement.className.includes("selected")) {
        firstImage.parentElement.className += ' selected';
      }
    } else if (secondImage === null && clickedImageIndex !== parseInt(firstImage.getAttribute("data-index"))) {
      // Second image click
      secondImage = clickedImage;

      if (firstImage.getAttribute("src") === secondImage.getAttribute("src")) {
        secondImage.parentElement.className += ' selected-success';

        if (firstImage.parentElement.className.includes("selected")) {
          firstImage.parentElement.className += '-success';
        }
      } else {
        firstImage.parentElement.className += '-error';
        secondImage.parentElement.className += ' selected-error';
      }

      
      setTimeout(() => {
        if (firstImage.getAttribute("src") === secondImage.getAttribute("src")) {
          // Match found
          firstImage = null;
          secondImage = null;
          checkGameEnd();
        } else {  
          firstImage.parentElement.classList.remove("selected-error");
          secondImage.parentElement.classList.remove("selected-error");
  
          firstImage.removeAttribute("data-index")
          secondImage.removeAttribute("data-index")
  
          firstImage = null;
          secondImage = null;
          isPlaying = true;
        }
      }, "1000");
    }
  }
  
  // Check if the game has ended
  function checkGameEnd(images) {
    let matchedImages = gameContainer.querySelectorAll(".selected-success");
    if (matchedImages.length === 2) {
      if (level === 5) {
        isPlaying = false;
        Swal.fire({
            title: 'Gratulujeme',
            text: 'Vyhrál jsi! Mrdko!',
            icon: 'success',
            confirmButtonText: 'Pokračovat'
          }).then(() => {
            window.location.reload();
          });
        } else {
            nextLevel();
          }
    }
  }
  
  // Start the game
  function startGame() {
    generateGameBoard();
    isPlaying = true;
  }

  function nextLevel() {
      startGame();
      level++;
      document.getElementById("level").innerHTML = "Kolo " + level;
  }


  let min = 0;
  let sec = 1;

function myTimer() {
  document.getElementById("timer").innerHTML = min + " sekund " + sec + " sekund";
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}

  document.addEventListener('click', () => {
    setInterval(myTimer, 1000);
  }, { once: true });