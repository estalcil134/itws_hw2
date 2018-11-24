(function ($)
{
  $.fn.defaults = {
    options : {
      difficulty:5,
      turns:10
    },
    game_state : {
      curr_difficulty : 5,
      turns_left : 0,
      start_time : 0
    },
    set_options : function (options)
    { // Has to return $.fn.defaults
      this.game_state.curr_difficulty = options.difficulty;
      this.game_state.turns_left = options.turns;
      return this;
    },
    restart : function()
    {
      data = this; // this always refers to $.fn.defaults and will always work on the stored game_elem in it
      // Generate the form for difficulty selection and number of turns
      $(document).ready(function(){
        data.game_elem.html('<h1>Let\'s play Hexed!</h1>\
          <h2>Here\'s how to play:</h2>\
          <p>First commit your difficulty and number of turns, then hit start. If you want to restart at anytime, press the restart button. For each turn, press the \"checkit\" button to submit your solution for that turn and click "next" for the next color. Your goal is to move the three sliders so your guess on the provided color is as close as possible. Your score is determined on how quickly you provide an answer and how accurate your color guess is.</p>\
          <div id = "container">\
            <div id = "colors">\
              <span class="dot" id = "random"></span>\
              <span class="dot" id = "answer"></span>\
            </div>\
          </div>\
          <div id="label">\
            <p class="left">Color:</p>\
            <p class="right">Your Guess</p>\
          </div>\
          <div id="game">\
            <form action=\"http://hack.and.slash/test.php\" method=\"post\">\
              <div id="difficulty">\
                <label for="difficulty_val">Difficulty</label>\
                <select id="difficulty_val" required>\
                  <option value = "0">0</option>\
                  <option value = "1">1</option>\
                  <option value = "2">2</option>\
                  <option value = "3">3</option>\
                  <option value = "4">4</option>\
                  <option value = "5" selected>5</option>\
                  <option value = "6">6</option>\
                  <option value = "7">7</option>\
                  <option value = "8">8</option>\
                  <option value = "9">9</option>\
                  <option value = "10">10</option>\
                </select>\
                <button id="submit_difficulty" type="button" onclick="$(this).set_game_param($(\'#difficulty_val\'));">Confirm</button>\
              </div>\
              <div>\
                <label for="num_of_turns">Desired Number oF Turns</label>\
                <input type="number" id="num_of_turns" min="1" value="10" name=\"num_of_turns\">\
                <button id="submit_num_turns" type="button" onclick="$(this).set_game_param($(\'#num_of_turns\'));">Confirm</button>\
              </div>\
              <input type=\"submit\" value=\"submit\">\
            </form>\
            <button type=\'button\' id=\'start\' onclick=\'$(\"#game\").hexed({\"difficulty\":$(\"#difficulty_val\").val(), \"turns\":$(\"#num_of_turns\").val()});\'>Start</button>\
          </div>\
          <div class="left">\
            <p id="red_value"></p>\
            <input type="range" min="0" max="255" value="127" class="slider" id="red">\
            <br/>\
            <p id="green_value"></p>\
            <input type="range" min="0" max="255" value="127" class="slider" id="green">\
            <br/>\
            <p id="blue_value"></p>\
            <input type="range" min="0" max="255" value="127" class="slider" id="blue">\
            <br/>\
            <p id="hex_value"></p>\
            <br/>\
          </div>\
          <div class="right">\
            <button type="button" id = "random_circ" style="display:none">Next</button>\
            <h2 id="turns_left">Turns Left: <span id="turns"></span></h2>\
            <h2 id="score">Score:<p id="scoreTotal">0</p></h2>\
            <div id="list">\
              <h2>Percents Off:</h2>\
              <ul id="percentOff"></ul>\
            </div>\
          </div>\
        <footer>Made by Team 1</footer>');
        var r_slider = document.getElementById("red");
        var g_slider = document.getElementById("green");
        var b_slider = document.getElementById("blue");
        var color_block = document.getElementById("answer");

        var r_output = document.getElementById("red_value");
        var g_output = document.getElementById("green_value");
        var b_output = document.getElementById("blue_value");
        //var hex_output = document.getElementById("hex_value");

        r_output.innerHTML = "Red: " + r_slider.value;
        g_output.innerHTML = "Green: " + g_slider.value;
        b_output.innerHTML = "Blue: " + b_slider.value;
        //hex_output.innerHTML = "Color in Hexadecimal Form: " + val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
        color_block.style.backgroundColor = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);

        r_slider.oninput = function() {
          var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
            r_output.innerHTML = "Red: " + r_slider.value;
            //hex_output.innerHTML = "Color in Hexadecimal Form: " + tmp;
            color_block.style.backgroundColor = tmp;
        }
        g_slider.oninput = function() {
          var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
            g_output.innerHTML = "Green: " + g_slider.value;
            //hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
            color_block.style.backgroundColor = tmp;
        }
        b_slider.oninput = function() {
          var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
            b_output.innerHTML = "Blue: " + b_slider.value;
            //hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
            color_block.style.backgroundColor = tmp;
        }
        // Ensure both circles have the same starting colors
        $("#random").css("backgroundColor","#7f7f7f");

        // Next color / Check it button
        $("#random_circ").click(function() {
          if (data.game_state.turns_left == 0)
          {
            $("#difficulty_val").attr("disabled", false);
            $("#submit_difficulty").css("display", "inline");
            $("#num_of_turns").attr("disabled", false);
            $("#submit_num_turns").css("display", "inline");
            $("#start").html("New Game");
            $("#random_circ").css("display","none");
            $("#turns").html(data.game_state.turns_left);
          }
          else
          {
            var are = Math.floor(Math.random() * 255);
            var r = (are).toString(16);
            var r_inv = (255 - are).toString(16);
            var ge = Math.floor(Math.random() * 255);
            var g = (ge).toString(16);
            var g_inv = (255 - ge).toString(16);
            var be = Math.floor(Math.random() * 255);
            var b = (be).toString(16);
            var b_inv = (255 - be).toString(16);
            var hexid = "#" + r + g + b;
            // Set the colors of the random circle and the next button
            var dot = document.getElementById("random");
            dot.style.backgroundColor = hexid;
            var but = document.getElementById("random_circ");
            but.style.color = hexid;
            // Reset the answer sliders
            r_slider.value = g_slider.value = b_slider.value = 127;
            r_output.innerHTML = "Red: " + r_slider.value;
            g_output.innerHTML = "Green: " + g_slider.value;
            b_output.innerHTML = "Blue: " + b_slider.value;
            $("#answer").css("backgroundColor","#7f7f7f");
            // Update turns left
            $("#turns").html(data.game_state.turns_left--);

            // Scoreing calculation
            if ($("#random_circ").html() == "Next")
            {
              data.game_state.start_time = new Date();
              $("#random_circ").html("Check it!");
            }
            else
            { // It would be Check it button here
              var milliseconds_taken = new Date() - data.game_state.start_time;
              var difficulty = data.game_state.curr_difficulty;
              //Calculate percentage
              let percentRed = (Math.abs(r_slider.value - are) / 255) * 100;
              let percentGreen = (Math.abs(g_slider.value - ge) / 255) * 100;
              let percentBlue = (Math.abs(b_slider.value - be) / 255) * 100;
    
              var avgPercentOff = (percentRed + percentGreen + percentBlue) / 3;
    
              //Calculate final score
              var finalScore = ((15 - difficulty - avgPercentOff)/(15 - difficulty))*(15000 - milliseconds_taken);
              finalScore = (finalScore < 0 ? 0:Number(finalScore.toFixed(2)));
              //appending final score to the user
              finalScore += Number(document.getElementById("scoreTotal").innerHTML);
              document.getElementById("scoreTotal").innerHTML = finalScore;
              $("#random_circ").html("Next");
              $("#percentOff").html("<li>Percent Off Red: "+percentRed.toFixed(2)+"%</li><li>Percent Off Green: "+percentGreen.toFixed(2)+"%</li><li>Percent Off Blue: "+percentBlue.toFixed(2)+"%</li>");
            }
          }      
        });   
      });
      return data.game_elem;
    }
  };

  // Private functions
  function val_to_hexa(val){
  var ans = "";
  var d16 = Math.floor(val / 16);
  var m16 = val % 16;
  if (d16 < 10) { ans += d16; }
  else
  {
    if (d16 == 10) { ans += "a"; }
    if (d16 == 11) { ans += "b"; }
    if (d16 == 12) { ans += "c"; }
    if (d16 == 13) { ans += "d"; }
    if (d16 == 14) { ans += "e"; }
    if (d16 == 15) { ans += "f"; }
  }
  if (m16 < 10) { ans += m16; }
  else
  {
    if (m16 == 10){ans += "a"; }
    if (m16 == 11){ans += "b"; }
    if (m16 == 12){ans += "c"; }
    if (m16 == 13){ans += "d"; }
    if (m16 == 14){ans += "e"; }
    if (m16 == 15){ans += "f"; }
  }
    return ans;
  }

  function val_to_hexa3(val1, val2, val3){
    var ans = "#";
    ans += val_to_hexa(val1);
    ans += val_to_hexa(val2);
    ans += val_to_hexa(val3);
    return ans;
  }

  // Actual public jQuery functions
  $.fn.hexed = function ( settings )
  { // difficulty is in options.difficulty  turns is in options.turns
    var options = $.extend({}, $.fn.defaults.options, settings);

    if (!this.has("button#start").length)
    { // If it is the first time calling this function, initialize the page
      $(this).append("<div id=\"page-wrapper\"></div>");
      $.fn.defaults.game_elem = $("#page-wrapper");
      $.fn.defaults.set_options(options).restart();
    }
    else if ($("#start").html() == "Restart")
    { // If the "Restart" button was clicked, reload the entire page's content
      $.fn.defaults.restart();
    }
    else if ($("#difficulty_val").attr("disabled") && $("#num_of_turns").attr("disabled"))
    { // If they are both set, start the game.
      $("#start").html("Restart");
      $.fn.defaults.set_options(options);
      $("#random_circ").css("display","block");
      $("#random_circ").trigger("click");
      $("#scoreTotal").html(0);
    }
    else
    { // Output error message
      var output = "Please Select a ";
      if (!$("#difficulty_val").attr("disabled"))
      {
        output+="\nDifficulty";
      }
      if (!$("#num_of_turns").attr("disabled"))
      {
        output+="\nNumber Of Turns To Play"
      }
      alert(output);
    }
    return this;
  };

  $.fn.set_game_param = function (form)
  {
    form.attr("disabled", true);
    this.css("display","none");
    return this;
  };
}( jQuery ));






/*
//html for the difficulty and number of turns
<form>
  <div id="difficulty">
    <label for="difficulty_val">Difficulty</label>
    <select id="difficulty_val" required>
      <option value = "0">0</option>
      <option value = "1">1</option>
      <option value = "2">2</option>
      <option value = "3">3</option>
      <option value = "4">4</option>
      <option value = "5" selected>5</option>
      <option value = "6">6</option>
      <option value = "7">7</option>
      <option value = "8">8</option>
      <option value = "9">9</option>
      <option value = "10">10</option>
    </select>
    <button id="submit_difficulty" type="button" onclick="set_game_param(this, \'difficulty_val\');">Confirm</button>
  </div>
  <div>
    <label for="num_of_turns">Desired Number oF Turns</label>
    <input type="number" id="num_of_turns" min="1" value="10"></input>
    <button id="submit_num_turns" type="button" onclick="set_game_param(this, \'num_of_turns\');">Confirm</button>
  </div>
</form>
$("#game").append('<form>\
      <div id="difficulty">\
        <label for="difficulty_val">Difficulty</label>\
        <select id="difficulty_val" required>\
          <option value = "0">0</option>\
          <option value = "1">1</option>\
          <option value = "2">2</option>\
          <option value = "3">3</option>\
          <option value = "4">4</option>\
          <option value = "5" selected>5</option>\
          <option value = "6">6</option>\
          <option value = "7">7</option>\
          <option value = "8">8</option>\
          <option value = "9">9</option>\
          <option value = "10">10</option>\
        </select>\
        <button id="submit_difficulty" type="button" onclick="set_game_param(this, \'difficulty_val\');">Confirm</button>\
      </div>\
      <div>\
        <label for="num_of_turns">Desired Number oF Turns</label>\
        <input type="number" id="num_of_turns" min="1" value="10"></input>\
        <button id="submit_num_turns" type="button" onclick="set_game_param(this, \'num_of_turns\');">Confirm</button>\
      </div>\
    </form>');
    $("#game").append('<form>\
      <div id="difficulty">\
        <label for="difficulty_val">Difficulty</label>\
        <select id="difficulty_val" required>\
          <option value = "0">0</option>\
          <option value = "1">1</option>\
          <option value = "2">2</option>\
          <option value = "3">3</option>\
          <option value = "4">4</option>\
          <option value = "5" selected>5</option>\
          <option value = "6">6</option>\
          <option value = "7">7</option>\
          <option value = "8">8</option>\
          <option value = "9">9</option>\
          <option value = "10">10</option>\
        </select>\
        <button id="submit_difficulty" type="button" onclick="set_game_param(this, \'difficulty_val\');">Confirm</button>\
      </div>\
      <div>\
        <label for="num_of_turns">Desired Number oF Turns</label>\
        <input type="number" id="num_of_turns" min="1" value="10"></input>\
        <button id="submit_num_turns" type="button" onclick="set_game_param(this, \'num_of_turns\');">Confirm</button>\
      </div>\
    </form>\
    <div id="page-wrapper">\
      <h1>Let\'s play Hexed!</h1>\
      <h2>Here\'s how to play:</h2>\
      <p>Use the sliders to choose...... blah blah blah</p>\        
      <div class="left">\
        <p id="red_value"></p>\
        <input type="range" min="0" max="255" value="127" class="slider" id="red">\
        <br/>\
        <p id="green_value"></p>\
        <input type="range" min="0" max="255" value="127" class="slider" id="green">\
        <br/>\
        <p id="blue_value"></p>\
        <input type="range" min="0" max="255" value="127" class="slider" id="blue">\
        <br/>\
        <p id="hex_value"></p>\
      </div>\
      <div class="right" id="color"></div>\
        <h2>Score</h2>\
        <p id="score"></p>\
        <footer>Made by Team 1</footer>\
      </div>');
*/

// Need a timer
// Need a spot to display the score

// click NEXT and READY button -> 
