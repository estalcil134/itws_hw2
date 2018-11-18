function temp()
{ // Generate the form for difficulty selection and number of turns
  if ($("body").length)
    { // If #game was created.
      $("body").append('<div id="page-wrapper">\
      <h1>Let\'s play Hexed!</h1>\
      <h2>Here\'s how to play:</h2>\
      <p>Use the sliders to choose...... blah blah blah</p>\
      <div id="game"></div>\
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
      </div>\
    </div>');
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
    <button type=\'button\' id=\'start\' onclick=\'$(\"game\").hexed({\"difficulty\":$(\"#difficulty_val\").val(), \"turns\":$(\"#num_of_turns\").val()});\'>Start</button>');
      $(document).ready(function(){
  var r_slider = document.getElementById("red");
  var g_slider = document.getElementById("green");
  var b_slider = document.getElementById("blue");
  var color_block = document.getElementById("color");

  var r_output = document.getElementById("red_value");
  var g_output = document.getElementById("green_value");
  var b_output = document.getElementById("blue_value");
  var hex_output = document.getElementById("hex_value");

  r_output.innerHTML = "Red: " + r_slider.value;
  g_output.innerHTML = "Green: " + g_slider.value;
  b_output.innerHTML = "Blue: " + b_slider.value;
  hex_output.innerHTML = "Color in Hexadecimal Form: " + val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
  color_block.style.backgroundColor = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);

  r_slider.oninput = function() {
    var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
      r_output.innerHTML = "Red: " + r_slider.value;
      hex_output.innerHTML = "Color in Hexadecimal Form: " + tmp;
      color_block.style.backgroundColor = tmp;
  }
  g_slider.oninput = function() {
    var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
      g_output.innerHTML = "Green: " + g_slider.value;
      hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
      color_block.style.backgroundColor = tmp;
  }
  b_slider.oninput = function() {
    var tmp = val_to_hexa3(r_slider.value, g_slider.value, b_slider.value);
      b_output.innerHTML = "Blue: " + b_slider.value;
      hex_output.innerHTML = "Color in Hexadecimal Form: #" + tmp;
      color_block.style.backgroundColor = tmp;
  }


});
  }
}

function set_game_param(button, id)
{
  document.getElementById(id).disabled = true;
  button.style.display = "none";
}

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

(function ($)
{
  $.fn.hexed = function ( settings )
  { // difficulty is in options.difficulty  turns is in options.turns
    var options = $.extend({"difficulty":5, "turns":10}, settings);
    // If difficulty is fixed, 
    if ($("#difficulty_val").attr("disabled") && $("#num_of_turns").attr("disabled"))
    { // If they are both set, start the game.
      document.getElementById("start").innerHTML="Restart";
      $("#random_circ").trigger("click");
    }
    else
    {
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
    // Create the game to inject into page-wrapper
    /*if (!$("#difficulty").length)
    {
      this.append('<form>\
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
    }*/
    /*this.append("<div class='slider'><div id='display_val'></div></div>");
    var display_val = $(".display_val");
    $(".slider").slider({
      classes:
      {
        "ui-slider": "highlight"
      },
      create: function()
      {
        display_val.text( $(this).slider("value") );
      },
      slide: function( event, ui )
      {
        display_val.text( ui.value );
      }
    });
*/
    // Handling submission

    return this;
  };
}( jQuery ));

