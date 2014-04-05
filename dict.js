var ctrlDown = false, altDown = false;
var doParse = true;


$( document ).ready( function() {
    $("#mainform").submit(function(e) {
        $("#defField").html("Getting definitions...");
        e.preventDefault();

        $.ajax({
            url: "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + $.trim($("#word").val()) + "?key=7b628162-b243-4743-9a47-79432409a8b1",   
            dataType: "xml",
            type: "GET",
            success: function( data ) {
                $("#defField").html("Parsing response...");
                console.log(data);
                doParse = true;
                parseXML(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#defField").html("Sorry, we had an error.");
            },
            async: true

        });
    });
});

function parseXML(data) {
    if(data == null) {
        alert("Error parsing xml");
    }
    if(!doParse) {
        return;
    }
    doParse = false;
    $("#defField").html("<ul><ul>");
    $(data).find("entry").each(function() {
        var $entry = $(this);
        var word = $entry.find("ew").text();
        word = capitalize(word);
        console.log("Word: " + word);
        var meanings = "";
        $entry.find("def").find("dt").each(function() {
            var $def = $(this);
            meanings += "<li>" + $def.text() + "</li>";
        });
        var text = word + "<br><ol>" + meanings + "</ol>";
        $("<li></li>").html(text).appendTo("#defField ul");
    });
}

$( document ).keydown(function(event) {
    if(event.which == 17 ) { 
        ctrlDown = true;
    }
    else if(event.which == 18) {
        altDown = true;
    }
    else if(event.which == 68) {
        if(ctrlDown && altDown) {
            console.log('ctrl-alt-d event');
            try {
            var t = document.selection.createRange();
            chrome.browerAction.getPopup(null, function() {'Success!;'});
            if(document.selection.type == 'Text' && t.text>' ') {
                t = t.replace(/(^[\s]+|[\s]+$)/g);
                $('#mainform').val(t);
                $('#btnSun').click(getDef);
            }
            }
            catch(e) {
                // do nothing
            }
        }
    }
});

$(document).keyup( function(event) {
    if(event.which == 17) {
        ctrlDown = false;
    }
    else if(event.which == 18) {
        altDown = false;
    }
});


function capitalize(word) {
    if(typeof word == "string") {
        return word.charAt(0).toUpperCase() + word.substring(1);
    } else {
        return word;
    }
}
