const images = [];
let level = 1;
let min = 0;
let sec = 1;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateImages() {
  //let j = getRandomInteger(1, 8);
  images.length = 0;

  for (i = 1; i <= 8; i++) {
    //images.push("https://picsum.photos/300/300?random=" + i);
    images.push("images/data/" + i + ".png");
  }
  
  //images.push(images[Math.ceil(Math.random(1, 5))]);
  images.push(images[getRandomInteger(0, 7)]);
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
    } else if (clickedImageIndex === parseInt(firstImage.getAttribute("data-index"))) {
      firstImage.parentElement.classList.remove("selected");
      firstImage = null;
    } else if (secondImage === null && clickedImageIndex !== parseInt(firstImage.getAttribute("data-index"))) {
      console.log(secondImage);
      // Second image click
      secondImage = clickedImage;

      if (firstImage.getAttribute("src") === secondImage.getAttribute("src")) {
        if (!firstImage.parentElement.className.includes("success")) {
          secondImage.parentElement.className += ' selected-success';
        }

        if (firstImage.parentElement.className.includes("selected" ) && !firstImage.parentElement.className.includes("success")) {
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
      if (level === parseInt(document.querySelector(".active").value)) {
        isPlaying = false;
        Swal.fire({
            title: 'Gratulujeme',
            text: 'Vyhrál jsi! Tvůj čas je '  + customizeTime(),
            imageUrl: "images/components/Mouse.png",
            imageHeight: 150,
            imageWidth: 150,
            confirmButtonText: 'Pokračovat',
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
    document.getElementById("buttons").style.display = "none";
    document.getElementById("level").style.display = "block";
    document.getElementById("game").style.marginTop = "10%";
    document.getElementById("timer").style.marginBottom = "2%";
    document.getElementById("exit").style.display = "block";
    document.getElementById("gameSettings").style.display = "none";

  
  generateGameBoard();
    isPlaying = true;
  }

  function nextLevel() {
      startGame();
      level++;
      document.getElementById("level").innerHTML = "Úroveň " + level;
  }

function myTimer() {

  switch(min) {
    case min === 1:
      minLabel = " minuta ";
      break;
    case min >= 2 && min <= 4:
      minLabel = " minuty ";
      break;

    default:
      minLabel = " minut ";
  }

  switch(sec) {
    case sec === 1:
      secLabel = " sekunda ";
      break;
    case sec >= 2 && sec <= 4:
      secLabel = " sekundy ";
      break;

    default:
      secLabel = " sekund ";
  }

  document.getElementById("timer").innerHTML = min + minLabel + sec + secLabel;
  sec++;
  
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}

function customizeTime() {
  let timeToReturn = '';

  switch(min) {
    case min === 1:
      minLabel = " minuta ";
      break;
    case min >= 2 && min <= 4:
      minLabel = " minuty ";
      break;

    default:
      minLabel = " minut ";
  }

  switch(sec) {
    case sec === 1:
      secLabel = " sekunda ";
      break;
    case sec > 1 && sec < 5:
      secLabel = " sekundy ";
      break;

    default:
      secLabel = " sekund ";
  }

  if (min !== 0) {
      timeToReturn += min + minLabel;
  }

  return timeToReturn += sec + secLabel;
}

document.getElementById("startGame").addEventListener('click', () => {
  setInterval(myTimer, 1000);
}, { once: true });

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("help").style.display = 'none';
});


function showHelp() {
  document.getElementById("help").style.display = 'block';
  document.getElementById("gameData").style.display = 'none';
  document.getElementById("buttons").style.display = 'none';
  document.getElementById("gameSettings").style.display = "none";
}

function goBackToMenu() {
  document.getElementById("help").style.display = 'none';
  document.getElementById("gameData").style.display = 'block';
  document.getElementById("buttons").style.display = 'block';
  document.getElementById("gameSettings").style.display = "block";
}

function exitGame() {
  window.location = 'index.html';
}

let prevButton = document.getElementById("level6");
const wrapper = document.getElementById("gameSettings");

wrapper.addEventListener('click', (e) => {

  const isButton = e.target.nodeName === 'BUTTON'; 
  
  if (!isButton) {
    return;
  }
  
  e.target.classList.add('active'); 

  if(prevButton !== null) {
    prevButton.classList.remove('active');
  }
  
  prevButton = e.target;

});

