var f = "";
var word = "hi";
var ctrlDown = false, altDown = false;
var capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function fillDefinition(parsed_json) {
    //$("#defField").html(parsed_json.phrase);
    //alert('Did that work?');
}


$( document ).ready( function() {
    //$("#defField").html("hi");
    $("#mainform").submit(function(e) {
        $("#defField").html("Getting definitions...");
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handler;
        xhr.open("GET", "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=" + $.trim($("#word").val()) + "&pretty=true");
        xhr.send();
        //$.ajax({
        //url : "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=" + $.trim($("#word").val()) + "&pretty=true",
        //dataType: "jsonp",
        ////jsonp: 'callback',
        //jsonpCallback: 'jsonpCallback'
        ////success : function(data) {
            ////jsonpCallback(data);
        ////}
        //});
    });
});

function handler() {
    if(this.readyState == this.DONE) {
        if(this.status == 200 &&
                this.responseXML != null) {
            var data = JSON.parse(this.responseXML);
            processGlosbe(data);
            return;
        }
    }
    $("#defField").html("Error getting definition. Sorry!");
}

function processGlosbe(data) {
    var entry = capitalize(data.phrase);
    $("#defField").html(entry + "<br><ol></ol>");
    $(data.tuc).each(function(index, value) {
        $(value.meanings).each(function(index, value){
        $("<li></li>").html(value.text).appendTo("#defField ol");
        });
    });
    console.log(entry);
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
