var ctrlDown = false, altDown = false;


$( document ).ready( function() {
    
    $("#mainform").submit(function(e) {
        e.preventDefault();
        $.ajax({
        url : "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=" + $.trim($("#word").val()) + "&pretty=true",
        dataType: "jsonp",
        jsonp: 'callback',
    jsonpCallback: 'jsonpCallback'
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



function capitalize(word) {
    if(typeof word == "string" && word.length > 0) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    } else {
        return word;
    }
}
