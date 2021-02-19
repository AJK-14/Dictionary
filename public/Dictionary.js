window.onload = function() {
  $("#Find").click(function() {
    let word = $("#Input").val();
    $.getJSON("https://dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=cd553b9d-6437-4edb-8bf2-0815de2385af"
    ).done(function(data) {
      var str1 = JSON.stringify(data).match(/(?<="shortdef" *: *\[")[\r\n]*.+?[\r\n]*(?= *\")/i)
      var str2 = JSON.stringify(data).match(new RegExp(`(?<="shortdef" *: *\\[ *"${str1}" *, *").+?(?=".*\\])`, "i"))
      var str3 = JSON.stringify(data).match(/(?<="t" *: *")[\r\n]*.+?(?={wi})/i)
      var str4 = JSON.stringify(data).match(/(?<={wi})[\r\n]*.+?(?={\\\/wi})/i)
      
      if (str1) {
        if (str2) {
          $("#definition").html(`Definition for ${word} (${data[0].fl}): <br> #1: ${str1} <br> #2: ${str2} <br> Sentence: ${str3} ${str4}`)
        } else {
          $("#definition").html(`Definition for ${word} (${data[0].fl}): <br> ${JSON.stringify(data).match(/(?<="shortdef" *: *\[")[\r\n]*.+?[\r\n]*(?= *\")/i)} <br> Sentence: ${str3} ${str4}`);
        }
      } else {
        $("#definition").html(`Couldn't find a definition.`)
      }
    });
  });
};
