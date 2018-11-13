function start(start)
{ // Generate the form for difficulty selection and number of turns
  if (!$("#difficulty").length)
    {
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
    }
  $("body").append("<button type='button' onclick='$(\"game\").hexed({\"difficulty\":$(\"#difficulty_val\").val(), \"turns\":$(\"#num_of_turns\").val()});'>Start</button>");
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
      console.log("hi");
      console.log(options);
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

