/* PULL RESULTS FROM JSON FEED AND DISPLAY ON RESULTS PAGES */

function raceResultsCouncil(json, races) {

    /* set no cache */
    $.ajaxSetup({ cache: false });

    $.getJSON(json, function(data){ 
        var html = [];
        var html2 = [];
        var html3 = [];
        var precinctsReporting, precinctsTotal, precinctsPercent, raceID, location;
        /* loop through array */
        for(var i = 0; i < races.length; i++){
            html = [];
            html2 = [];
            html3 = [];
            raceID = races[i][0];
            location = races[i][1];
            $.each(data, function(index,key){          
                if (key.raceid == raceID) {

                    /* identify percentage, multiply x 100 and round */
                    var percent = Math.round((key.votepct) * 100);

                    var updated = new Date(key.lastupdated);
                    updated = updated.toString();
                    updated = updated.replace("GMT-0400", " ");

                    var votecount = key.votecount;

                    /* if winner, add check */
                    if (key.winner === true) {
                        won = "winner";
                    } else {
                       won = "";
                    }

                    html.push("<table class=\"candidate-row\"><tr><td class=\"candidate name ", won, "\"> ", key.first, " ", key.last, "</td><td class=\"party-col\">", key.party, "</td><td class=\"votes\">", votecount.toLocaleString('en'), "</td><td class=\"percent\"><div class=\"percent-bar-bg\"><div class=\"percent-bar\" style=\"width:", percent, "%;\"></div></div><div class=\"vote-percent\">", percent, "%</div></td></tr></table>");

                  
                    $(location).html(html.join(''));
                    $(".updated").html(html2);
                    $( ".update" ).last().css( "display", "inline" );
             
                    if ( html3.length === 0){

                        precinctsReporting = key.precinctsreporting;
                        precinctsTotal = key.precinctstotal;
                        precinctsPercent = key.precinctsreportingpct;    

                    }
                    $(location).append(html3);
                }
            });
        }
    });
}


