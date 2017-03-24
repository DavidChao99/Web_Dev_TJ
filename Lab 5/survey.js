
$(document).ready(function() {
    $("#inputZip").keyup(function() {
        var el = $(this);
        console.log("HI");
        console.log(el.val().length);

        if (el.val().length === 5) {
            $.ajax({
                url: "https://zip.getziptastic.com/",
                cache: false,
                dataType: "json",
                type: "GET",
                data: "zip=" + el.val(),
                success: function(result, success) {
                    console.log("HI AGAIN");
                    $("#inputCity").val(result.city);
                    $("#inputState").val(result.state);
                }
                
            });
        }
    });
});

function handleChangeDrop() {
    var x = document.getElementsByTagName("select");
    var i;
    for(i = 0; i < x.length; i ++) {
        x[i].size=1;
    }

}

function handleChangeList() {
    var x = document.getElementsByTagName("select");
    var i;
    for(i = 0; i < x.length; i ++) {
        x[i].size=x[i].length;
    }
}

function handleChangeType() {

    var e = document.getElementById("TypeList");
    var strType = e.options[e.selectedIndex].value;
    $.ajax({
                url: "https://www.pokeapi.co/api/v2/type/"+strType,
                cache: false,
                dataType: "json",
                type: "GET",
                success: function(result, success) {
                    console.log("HI AGAIN");
                    var pokemon = result.pokemon;
                    console.log(result);
                    var select = document.getElementById("Pokemon"); 

                    removeOptions(select);

                    for(var i = 0; i < pokemon.length; i++) {
                        var opt = pokemon[i];
                        var el = document.createElement("option");
                        el.textContent = opt.pokemon.name;
                        el.value = opt.pokemon.name;
                        select.appendChild(el);
                    }
                }
                
            });

    document.getElementById("Pokemon").disabled = false;
}

function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}

function handleChangePokemon() {

}

function setCookie() {

    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    //console.log(d.toGMTString());
    var cvalue = document.getElementById("inputName").value;
    //console.log(cvalue);
    document.cookie = "username="+cvalue+"; "+expires;
    console.log(document.cookie);
    //greeting();

}

function getCookie(cname) {
    var name =  "username=";
    console.log(document.cookie); 
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function greeting() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
        document.getElementById("inputName").value=username;
    }else{
        alert("Welcome to David's Pokemon Survey");
    }
}