Wilson Wong
wongw6@rpi.edu

I was in charge of creating the sliders. I first made the sliders in HTML and customized them, fitting them within our bounds and making them more aesthetically pleasing. 
Next, I assigned values to the sliders (0-255), and dynamically drew the values from them to get the hexadecimal values (which I also wrote a simple function for). I strung together the RGB values from the sliders to get the hexadecimal color value, and displayed that as well. At the same time, I updated the color in real time as the sliders were dragged. 

1. 
Using a jQuery plugin is preferable over using JavaScript that uses jQuery because it ensure that "this" is a jQuery object, as a non-jQuery object will throw an error. It's also more extensible, and easier to read when chaining. 

2. 
Our jQuery and JavaScript tags are placed at the bottom so our HTML is served first. The code is also well commented, and we use our own JavaScript and jQuery libraries to prevent web traffic. 

3. 
JavaScript and jQuery are front-end and thus client-side. In order for the scores to be saved on a server, there must be back-end code (like as a PHP page). Otherwise, the JavaScript / jQuery cannot be posted onto a server/database. 
