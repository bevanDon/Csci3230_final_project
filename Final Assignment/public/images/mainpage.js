$.support.cors = true;
$(document).ready(function() {
    var results= $("#results");
    var scores;
    $("#results").hide();
    $("#schedule").click(function() {
        $("#myVideo").hide();
        $("#results").show();


        $.getJSON("https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json", function(response) {
            scores = response["rounds"];
            var div = $("<div>")
            div.addClass("final_results");
            var content = $("<div>");
            var r= $('<input type="date"  max="2017-5-21" value="2016-08-13" name = "Schedule"/>');
            content.append('<input type ="submit">');
            $("body").append(r);
            $(scores).each(function() {
                matches = this["matches"];
                $(matches).each(function() {
                var div = $("<div>")
                div.addClass("final_results");
                var content = $("<div>");
                content.addClass("result_data");
                content.append("<h4><b>" + this["date"] + "</b></h4>")
                content.append("<img id='img' src='BPL.png' width = '20' height = 30/>")
                content.append("<p>" + this["team1"]["code"]  +"  " +  this["score1"] +
                "-"+ this["score2"]+ "  "  + this["team2"]["code"] + "<br>"
                + "</p>")

                div.append(content);
                results.append(div);

                })
            })
        });
    });
});
