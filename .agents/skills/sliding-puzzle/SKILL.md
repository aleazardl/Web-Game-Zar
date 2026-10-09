---
name: sliding-puzzle
description: Build, improve, test, and debug a browser-based sliding image puzzle game. Use when asked to create or modify a sliding tile puzzle where players rearrange scrambled image tiles by sliding them into an empty space to reconstruct the original image.
---

# Sliding Image Puzzle Game Skill

## Purpose

Create a complete, playable sliding image puzzle game that runs in a web browser. The player must rearrange scrambled image tiles to reconstruct the original image by moving tiles into an empty space.

Prioritize correct gameplay, a clear user interface, responsive design, accessibility, and simple implementation.

## Technology

* Use HTML for the game structure.
* Use CSS for styling, layout, and animations.
* Use vanilla JavaScript for the puzzle logic and interactions.
* Do not use a frontend framework or unnecessary dependencies.
* Avoid requiring npm, a build process, or a backend server.
* Keep the game playable by opening `index.html` in a browser.

## Required Game Files

Create these files directly in the project directory:

* `index.html` — page structure and game interface.
* `style.css` — game styling, board layout, and responsive design.
* `game.js` — puzzle generation, tile movement, win detection, and game controls.

Do not merely output code snippets. Create or update the actual files in the project.

## Game Objective

The player must reconstruct a scrambled image by sliding individual tiles into the empty space until the original image is restored.

Display clear instructions explaining how to play.

## Puzzle Setup

1. Use a default 3×3 grid, producing eight image tiles and one empty space.
2. Allow the player to choose between 3×3, 4×4, and 5×5 difficulty levels.
3. Use one source image divided visually into equally sized square tiles.
4. Ensure each tile displays the correct portion of the original image.
5. Show the complete original image as a reference that the player can consult.
6. Randomize the starting board for each new game.
7. Ensure every generated puzzle configuration is solvable.

Do not shuffle tiles by assigning arbitrary random positions if that can produce an unsolvable puzzle. Prefer shuffling by performing a sequence of valid moves from the solved configuration.

## Tile Movement Rules

1. Only tiles directly adjacent to the empty space may move.
2. A tile may move horizontally or vertically into the empty space.
3. Diagonal movement is not allowed.
4. When a valid tile is selected, swap its position with the empty space.
5. Prevent invalid moves and ensure the board remains within the grid.
6. Support both mouse clicks and touch input.
7. Make valid moves visually responsive and intuitive.

## Image Handling

* First, inspect the existing project for a suitable image that can be used for the puzzle.
* If no suitable local image exists, find a suitable free-to-use image online. Prefer sources with clear reuse permissions, such as Unsplash or Pixabay.
* Download the selected image into the project and save it as `assets/puzzle-image.jpg`. Create the `assets` folder if it does not already exist.
* Use the downloaded local image file in the game rather than depending on an external image URL.
* If internet access or image downloading is unavailable, ask the user to provide an image instead of silently leaving the game without one.
* Use a single source image divided into individual image tiles. Each tile must display only its own corresponding portion of the original image.
* **The image portion must remain attached to its tile at all times. When a tile moves, its image portion must move with it. Never move the image independently of the tiles or display the complete, correctly aligned image across the scrambled board.**
* Implement the tiles so that their image sections are determined by each tile's original solved position, not its current position on the board.
* Use CSS `background-image`, `background-size`, and `background-position`, or an equivalent technique, to display the correct image section on each tile.
* When a tile changes position, update its board position without changing its original image section. The empty space must contain no image.
* Calculate image positioning correctly for all supported grid sizes: 3×3, 4×4, and 5×5.
* Show the complete original image separately as a reference preview.
* Ensure the image is divided seamlessly, without stretching, misalignment, or gaps that reveal incorrect portions.
* If the image fails to load, display a helpful error message or provide a fallback image.
* Do not depend on copyrighted images without appropriate permission.

## User Interface

Include the following interface elements:

* Game title.
* Short instructions.
* Puzzle board.
* Original image preview.
* Difficulty selector.
* Move counter.
* Elapsed-time display.
* Restart button.
* Shuffle or new-game button.
* Clear victory message when the puzzle is solved.

Keep the interface clean, visually appealing, and easy to understand.

## Move Counter and Timer

* Increment the move counter only after a valid move.
* Start the timer when the player makes the first valid move.
* Update the elapsed time while the game is active.
* Stop the timer when the puzzle is solved.
* Reset both the timer and move counter when a new game starts.
* Display the time in a readable format, such as minutes and seconds.

## Win Condition

The puzzle is solved when every tile is in its correct position and the empty space is in the final position.

When the player wins:

1. Display a clear success message.
2. Stop the timer.
3. Prevent additional moves until a new game begins.
4. Show the final time and total number of moves.
5. Provide an option to play again.

Do not declare victory based only on the empty space's position. Validate the entire board.

## Restart and Difficulty Changes

* Restarting must generate a new valid puzzle.
* Reset the move counter and timer.
* Changing difficulty must rebuild the board using the selected grid size.
* Prevent old timers or event handlers from continuing to affect the new game.
* Keep the interface functional after repeated restarts and difficulty changes.

## Design and Responsiveness

* Use a responsive layout that works on desktop, tablet, and mobile screens.
* Keep the puzzle board square.
* Ensure tiles align without gaps that reveal incorrect portions of the image.
* Make tiles large enough to select comfortably on touchscreens.
* Provide clear hover, focus, and selected-tile states where appropriate.
* Use smooth but brief movement animations.
* Avoid excessive animation that interferes with gameplay.
* Maintain readable text and sufficient color contrast.

## Code Quality

* Separate game logic from presentation where practical.
* Use descriptive variable and function names.
* Keep the implementation straightforward and maintainable.
* Avoid unnecessary global variables.
* Validate tile positions before moving tiles.
* Ensure the timer cannot create multiple simultaneous intervals.
* Handle missing elements and image-loading errors gracefully.
* Do not use fake controls or buttons that do nothing.

## Testing Requirements

After implementing the game, test the following:

1. The game loads without JavaScript errors.
2. The initial board contains exactly one empty space.
3. Tiles display the correct image sections.
4. Only tiles adjacent to the empty space can move.
5. Invalid moves do not change the board or move counter.
6. Mouse and touch interactions work.
7. Every generated starting puzzle is solvable.
8. A solved board triggers the victory message.
9. The timer and move counter work correctly.
10. Restarting resets the game properly.
11. All difficulty levels work.
12. The layout remains usable on mobile and desktop.
13. Repeatedly starting new games does not create duplicate timers or broken event handlers.

If a bug is found, identify the cause, fix it, and repeat the relevant test to verify the fix.

## Development Workflow

1. Inspect the existing project before creating or modifying files.
2. Read and follow this skill.
3. Implement the smallest complete playable version first.
4. Add the required controls and visual improvements.
5. Test the game and fix any discovered bugs.
6. Verify that all required files are present and work together.
7. Provide a concise summary of the implementation and any remaining limitations.

## Final Deliverable

The finished project must contain the playable game files and any required local image assets.

The game must have a clear objective, functional puzzle mechanics, a victory condition, and a way to start a new game.

Prioritize a working, tested game over unnecessary features or complicated architecture.
