var ctrlDown = false, altDown = false;


$( document ).ready( function() {
    //var xhr = new XMLHttpRequest();
    //xhr.open('GET', 'cat.xml', false);
    //xhr.onreadystatechange = function() {
        //if(xhr.readyState ===4 && xhr.status===200) {
            //var $items = $(xhr).find("entry");
            //console.log(items);
        //}
    //}
    //xhr.send();
    
    $("#mainform").submit(function(e) {
        $("#defField").html("Getting definitions...");
        e.preventDefault();

        $.ajax({
            //url: "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=xml&phrase=" + $.trim($("#word").val()) + "&pretty=true",
            url: "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + $.trim($("#word").val()) + "?key=7b628162-b243-4743-9a47-79432409a8b1",   
            dataType: "xml",
            type: "GET",
            success: function( data ) {
                $("#defField").html("Parsing response...");
                console.log(data);
                //var xmlDoc = $.parseXML(data);
                //var xml = $(xmlDoc);
                //processGlosbe(xml);
                parseXML(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#defField").html("Sorry, we had an error.");
            },
            async: true

        });
    });
});

//function callback() {
    //if(this.readyState == this.DONE) {
        //if(this.status == 200 &&
                //this.responseXML != null) {
            //var data = JSON.parse(this.responseXML);
            //processGlosbe(data);
            //return;
        //}
        //else { 
            //$("#defField").html("Error getting definition. Sorry!");
        //}a);
    //}
//}

function parseXML(data) {
    if(data == null) {
        alert("Error parsing xml");
    }
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

function contains(item, array) {
    $(array).each(function (key, value) {
        if(String(item) === String(value)) {
            return true;
        }
    });
    return false;
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
    //alert("Capitalize this!");
    if(typeof word == "string") {
        return word.charAt(0).toUpperCase() + word.substring(1);
    } else {
        return word;
    }
}
