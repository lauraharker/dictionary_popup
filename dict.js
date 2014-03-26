//var f = "";
//var word = "hi";
//var capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//var lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//function fillDefinition(parsed_json) {
    //$("#defField").html(parsed_json.phrase);
    //alert('Did that work?');
}
var ctrlDown = false, altDown = false;


$( document ).ready( function() {
    
    $("#mainform").submit(function(e) {
        e.preventDefault();
        $.ajax({
        url : "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=" + $.trim($("#word").val()) + "&pretty=true",
        dataType: "jsonp",
        jsonp: 'callback',
    jsonpCallback: 'jsonpCallback'
        //success : function(data) {
            //jsonpCallback(data);
        //}
        });
    });
});

function jsonpCallback(data) {
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


function yep() {
    $.ajax({
        dataType : jsonp,
        url : "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=hi&pretty=true",
        success : function(parsed_json) {
        alert('you did it');
    }
});
}

function capitalize(word) {
    if(typeof word == "string" && word.length > 0) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    } else {
        return word;
    }
}
