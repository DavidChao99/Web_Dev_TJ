function showSearch() {

    var startText = document.getElementById("startText").value;
    var endText = document.getElementById("endText").value;
    var nNum = document.getElementById("nNum").value;
    var nText = document.getElementById("nText").value;
    var nCharText = document.getElementById("nCharText").value;
    var nVowText = document.getElementById("nVowText").value;
    var letterAvail = document.getElementById("letterAvail").value;


    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState != 4 || ajax.status != 200) {
            return;
        }
        var response = ajax.responseText;
        var res = response.split("\n");

        var sel = document.getElementById("results");
        while (sel.length > 0) {
            sel.remove(sel.length - 1);
        }

        for (var i = 0; i < res.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = res[i];
            opt.value = res[i];
            sel.appendChild(opt);
        }



    }
    ajax.open("GET", "scrabbleSearch.php?startText=" + startText + "&endText=" + endText + "&nCharText=" + nCharText + "&nNum=" + nNum + "&nText=" + nText + "&nVowText=" + nVowText + "&letterAvail=" + letterAvail, true);
    ajax.send();

}