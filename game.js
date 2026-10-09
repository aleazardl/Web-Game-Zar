(() => {
  const boardElement = document.querySelector("#puzzle-board");
  const messageElement = document.querySelector("#game-message");
  const moveCountElement = document.querySelector("#move-count");
  const elapsedTimeElement = document.querySelector("#elapsed-time");
  const difficultySelect = document.querySelector("#difficulty");
  const newGameButton = document.querySelector("#new-game");
  const restartButton = document.querySelector("#restart");
  const playAgainButton = document.querySelector("#play-again");
  const referenceImage = document.querySelector("#reference-image");
  const imagePath = "assets/puzzle-image.jpg";

  if (
    !boardElement ||
    !messageElement ||
    !moveCountElement ||
    !elapsedTimeElement ||
    !difficultySelect ||
    !newGameButton ||
    !restartButton ||
    !playAgainButton ||
    !referenceImage
  ) {
    throw new Error("Sliding puzzle setup failed: a required game element is missing.");
  }

  let size = 3;
  let tiles = [];
  let moves = 0;
  let timerId = null;
  let startedAt = null;
  let locked = false;

  function handleImageError() {
    messageElement.textContent =
      "The puzzle image could not be loaded. Make sure assets/puzzle-image.jpg is present.";
    messageElement.classList.remove("is-win");
  }

  referenceImage.addEventListener("error", handleImageError);
  if (referenceImage.complete && referenceImage.naturalWidth === 0) handleImageError();

  difficultySelect.addEventListener("change", () => {
    size = Number(difficultySelect.value);
    startNewGame();
  });
  newGameButton.addEventListener("click", startNewGame);
  restartButton.addEventListener("click", startNewGame);
  playAgainButton.addEventListener("click", startNewGame);
  boardElement.addEventListener("click", handleBoardClick);

  function solvedBoard() {
    return Array.from({ length: size * size - 1 }, (_, index) => index + 1).concat(null);
  }

  function isSolved(board) {
    const target = solvedBoard();
    return board.length === target.length && board.every((value, index) => value === target[index]);
  }

  function adjacentIndices(index) {
    const row = Math.floor(index / size);
    const column = index % size;
    const neighbors = [];

    if (row > 0) neighbors.push(index - size);
    if (row < size - 1) neighbors.push(index + size);
    if (column > 0) neighbors.push(index - 1);
    if (column < size - 1) neighbors.push(index + 1);
    return neighbors;
  }

  function createScrambledBoard() {
    const shuffledTiles = solvedBoard();
    let emptyIndex = shuffledTiles.length - 1;
    let previousEmptyIndex = -1;
    const shuffleSteps = size * size * 30;

    for (let step = 0; step < shuffleSteps; step += 1) {
      const options = adjacentIndices(emptyIndex).filter((index) => index !== previousEmptyIndex);
      const nextIndex = options[Math.floor(Math.random() * options.length)];
      [shuffledTiles[emptyIndex], shuffledTiles[nextIndex]] = [
        shuffledTiles[nextIndex],
        shuffledTiles[emptyIndex],
      ];
      previousEmptyIndex = emptyIndex;
      emptyIndex = nextIndex;
    }

    if (isSolved(shuffledTiles)) {
      const nextIndex = adjacentIndices(emptyIndex)[0];
      [shuffledTiles[emptyIndex], shuffledTiles[nextIndex]] = [
        shuffledTiles[nextIndex],
        shuffledTiles[emptyIndex],
      ];
    }
    return shuffledTiles;
  }

  function startNewGame() {
    stopTimer();
    moves = 0;
    startedAt = null;
    locked = false;
    tiles = createScrambledBoard();
    moveCountElement.value = "0";
    elapsedTimeElement.value = "00:00";
    messageElement.textContent = "Slide a tile next to the empty space. Rebuild the picture to win.";
    messageElement.classList.remove("is-win");
    playAgainButton.hidden = true;
    renderBoard();
  }

  function renderBoard() {
    boardElement.style.setProperty("--grid-size", String(size));
    boardElement.replaceChildren();

    tiles.forEach((tileValue, boardIndex) => {
      if (tileValue === null) {
        const emptySlot = document.createElement("div");
        emptySlot.className = "empty-slot";
        emptySlot.setAttribute("aria-label", "Empty space");
        boardElement.append(emptySlot);
        return;
      }

      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.dataset.index = String(boardIndex);
      tile.setAttribute("aria-label", `Tile ${tileValue}; move into empty space`);

      const originalIndex = tileValue - 1;
      const originalRow = Math.floor(originalIndex / size);
      const originalColumn = originalIndex % size;
      const positionX = size === 1 ? 0 : (originalColumn / (size - 1)) * 100;
      const positionY = size === 1 ? 0 : (originalRow / (size - 1)) * 100;

      tile.style.backgroundImage = `url("${imagePath}")`;
      tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;
      tile.style.backgroundPosition = `${positionX}% ${positionY}%`;
      boardElement.append(tile);
    });
  }

  function handleBoardClick(event) {
    const tileElement = event.target.closest(".tile");
    if (!tileElement || !boardElement.contains(tileElement)) return;
    moveTile(Number(tileElement.dataset.index));
  }

  function moveTile(tileIndex) {
    if (locked || !Number.isInteger(tileIndex) || tileIndex < 0 || tileIndex >= tiles.length) return;

    const emptyIndex = tiles.indexOf(null);
    if (!adjacentIndices(emptyIndex).includes(tileIndex)) return;

    [tiles[emptyIndex], tiles[tileIndex]] = [tiles[tileIndex], tiles[emptyIndex]];
    moves += 1;
    moveCountElement.value = String(moves);

    if (startedAt === null) {
      startedAt = Date.now();
      timerId = window.setInterval(updateElapsedTime, 250);
    }

    renderBoard();
    if (isSolved(tiles)) finishGame();
  }

  function updateElapsedTime() {
    if (startedAt === null) return;
    elapsedTimeElement.value = formatTime(Math.floor((Date.now() - startedAt) / 1000));
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function finishGame() {
    updateElapsedTime();
    stopTimer();
    locked = true;
    messageElement.textContent = `Puzzle solved in ${elapsedTimeElement.value} with ${moves} moves.`;
    messageElement.classList.add("is-win");
    playAgainButton.hidden = false;
  }

  startNewGame();
})();
