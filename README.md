# TheOdinProject-WhereIsWaldo-Frontend

This project follows the specifications within the curriculum of The Odin Project 
https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app

React App
---------

This React App uses the Fetch API method to make requests to the Nodejs server.<br>
The url of the frontend is https://whereisthegame.netlify.app <br>
The url of the backend is https://top-whereis-backend.onrender.com <br>

Functionality
-------------
The app includes the following core functionality:

### Getting the coordinates ###
Because different screen sizes may produce different coordinates, to get the coordinates of a user’s clicks, was implemented methods in the click logic that will normalize coordinates across different screensizes.

### Targeting box and dropdown menu ###
Was created the functionality that pops the targeting box and dropdown menu on the screen when the user clicks on the photo.
When the user clicks outside the image the targeting box is not displayed.

### Tagging game ###
- At first start a player will be generated immediately and will have a duration of 24 hours and will be able to play each game once.
- When each image is displayed for the first time, it starts to count the time, one counter for each image.
- Click on the character found and send it. If the answer is correct, the character is tagged. Otherwise the character is not tagged and the time continues to run. No points are deducted.
- When you get all the characters in each image, finish the game, display the score, and if the score is in the top ten, ask for the player's name to be included in the Top Ten list. The player can remain anonymous if desired.
- If the character has not been found within 24 hours, the session expires and the game and the player too.

### Top scores ###
The best scores and their players are kept stored in the database

### Css styles ###
Responsive design for screens of different sizes. however due to the size of the images it is recommended to use on medium or large screens.

### Repositories ###
Backend: https://github.com/manelly67/TheOdinProject-WhereIsWaldo-Backend <br>
Frontend: https://github.com/manelly67/TheOdinProject-WhereIsWaldo-Frontend

### Credit ###
- The image of Waldo hidden in a galactic city is part of the "Where's Waldo?" series of Martin Handford. Courage the Cowardly Dog and R2D2 invited themselves to be part of the drawing.
- The image four leaf clover optical ilusion is part of the article "Only 1% Visually Powerful Can Find The Four Leaf Clover in 5 Seconds" by Roopashree Sharma published in  the web https://www.jagranjosh.com
- The ThemeLightDark icon was imported from @mdi/react library.




