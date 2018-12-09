// Wait for the entire file to load before execution
$(document).ready(function () {

  // Global Objects, Arrays and Variables related to the scripting logic
  let initialClickEvent = false;

  // Global Functions


  // ********** Kick off and continue with click events **********
  $(document).on('touchstart click', document, function () {

    if (initialClickEvent == false) {
      console.log("$(document).click(function()... initialClickEvent=" + initialClickEvent); // TEST
      // Get rid of the landing page
      $("#htmlLandingPage").text("");

    } // end of "if (initialClickEvent === false)"
  }); // End of $(document).click(function ()


  
  // Click on Lightning
  $(document).on('touchstart click', '#__________', function () {
    if (initialClickEvent == true) {
      afterAttack = ""; // reset
      console.log("Lightening Attack = damagePoints + attacks.attackValue[0] = " + damagePoints + "+" + attacks.attackValue[0]);
      damagePoints = damagePoints + attacks.attackValue[0];
      recordDamageAndResult();
    }
  });





}); // end of $(document).ready(function()
// End of file