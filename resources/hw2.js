function set_game_param(button, id)
{
  document.getElementById(id).disabled = true;
  button.style.display = "none";
}

(function ($)
{
  $.fn.options = {
    difficulty:5,
    turns:10
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
  $.fn.restart = function ()
  {
    var obj = this;
    // Generate the form for difficulty selection and number of turns
    $(document).ready(function(){
      $(obj).html('<div id="page-wrapper">\
      <h1>Let\'s play Hexed!</h1>\
      <h2>Here\'s how to play:</h2>\
      <p>Use the sliders to choose...... blah blah blah</p>\
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
        <form>\
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
        <h2 id="score">Score<p id="scoreTotal"></p></h2>\
        <div id="list">\
          <h2>Percents Off</h2>\
          <ul id="percentOff"></ul>\
        </div>\
      </div>\
    </div><footer>Made by Team 1</footer>');
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
      if ($("#game").data("turns_left") == 0)
      {
        $("#difficulty_val").attr("disabled", false);
        $("#submit_difficulty").css("display", "inline");
        $("#num_of_turns").attr("disabled", false);
        $("#submit_num_turns").css("display", "inline");
        $("#start").html("New Game");
        $("#random_circ").css("display","none");
        $("#turns").html($("#game").data("turns_left"));
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
        //var hexid_inv = "#" + r_inv + g_inv + b_inv;
        //console.log(hexid);
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
        $("#turns").html($("#game").data("turns_left"));
        $("#game").data("turns_left", $("#game").data("turns_left")-1);
        // Scoreing calculation
        if ($("#random_circ").html() == "Next")
        {
          $("#game").data("s_time", new Date());
          $("#random_circ").html("Check it!");
        }
        else
        { // It would be Check it button here
          var milliseconds_taken = new Date() - $("#game").data("s_time");
          var difficulty = Number($("#game").data("options")["difficulty"]);
          //$("#game").data("s_time", -1);
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
return obj;
  };

  $.fn.hexed = function ( settings )
  { // difficulty is in options.difficulty  turns is in options.turns
    var options = $.extend({}, $.fn.options, settings);
    if (!$("#start").length)
    { // If it is the first time calling this function, initialize it
      $(this).restart();
      $("#game").data("main", this.selector);
    }
    else if ($("#start").html() == "Restart")
    { // If the "Restart" button was clicked, empty the element and 
      $($("#game").data("main")).empty().restart();
    }
    else if ($("#difficulty_val").attr("disabled") && $("#num_of_turns").attr("disabled"))
    { // If they are both set, start the game.
      document.getElementById("start").innerHTML="Restart";
      $("#random_circ").css("display","block");
      $("#game").data("options", options);
      $("#game").data("turns_left", Number(options["turns"]));
      $("#random_circ").trigger("click");
      $("#scoreTotal").empty();
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
