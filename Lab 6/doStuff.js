
function callRiot() {

	var handle = $("#summonerName").val();
	var champArray;
	var champInfoArray = [];

	//reduce to one line after
			var magejson = '{"name": "Champion Masteries","children": [{"name": "Mage","children": [ ';
			  var fighterjson = '{"name": "Fighter","children": [ ';

			  var tankjson = '{"name": "Tank","children": [ ';

			  var supportjson = '{"name": "Support","children": [ ';

			  var assassinjson = '{"name": "Assassin","children": [ ';

			  var marksmanjson = '{"name": "Marksman","children": [ ';

					

	$.ajax(
	{
		url:"https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + handle,
		data: {api_key:"40d9381a-2ed7-4ab0-a620-726a0bddd5c6"},
		dataType: "json",
		success:function(result) {
			console.log(result);
			handle = handle.toLowerCase();
			handle = handle.replace(/\s+/g, '');
			var id = result[handle].id;
			console.log(id);
			$.ajax(
			{
				url:"https://na.api.pvp.net/championmastery/location/NA1/player/" + id +"/champions",
				data: {api_key:"40d9381a-2ed7-4ab0-a620-726a0bddd5c6"},
				dataType: "json",
				success:function(result) {
					console.log(result);
					champArray=result;
					console.log(champArray);
					checkChamp(champArray);				
				}
			})

		}
	})

	var currentI = 0;
	function checkChamp(champArray) {
			if(currentI == champArray.length) {
				closeJSON();
				return false;
			}
			$.ajax(
			{
				url:"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+champArray[currentI].championId,
				data: {champData: "tags", api_key:"40d9381a-2ed7-4ab0-a620-726a0bddd5c6"},
				dataType:"json",
				success:function(result2) {
					//console.log(result2);
					champInfoArray[currentI] = result2;
					if(result2.tags[0] == "Mage") {
						magejson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}
					if(result2.tags[0] == "Fighter") {
						fighterjson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}	
					if(result2.tags[0] == "Tank") {
						tankjson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}
					if(result2.tags[0] == "Support") {
						supportjson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}
					if(result2.tags[0] == "Assassin") {
						assassinjson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}
					if(result2.tags[0] == "Marksman") {
						marksmanjson += '{"name": "'+ result2.name +'", "size":'+ champArray[currentI].championPoints +'},';
					}

					currentI++;

					if(currentI <= champArray.length) {
						checkChamp(champArray);
					}


				}

			})
	}

	function closeJSON() {
		magejson = magejson.substring(0, magejson.length - 1);
		magejson += ']},';

		fighterjson = fighterjson.substring(0, fighterjson.length - 1);
		fighterjson += ']},';

		tankjson = tankjson.substring(0, tankjson.length - 1);
		tankjson += ']},';

		supportjson = supportjson.substring(0, supportjson.length - 1);
		supportjson += ']},';

		assassinjson = assassinjson.substring(0, assassinjson.length - 1);
		assassinjson += ']},';

		marksmanjson = marksmanjson.substring(0, marksmanjson.length - 1);
		marksmanjson += ']}]}';


		var finaljson = magejson + fighterjson + tankjson + supportjson + assassinjson + marksmanjson;


		console.log(finaljson);
		//setCookie(finaljson);
		//d3.json(JSON.stringify(finaljson), visualize);
		visualize(JSON.parse(finaljson));
	}





}


function setCookie(finaljson) {

    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    //console.log(d.toGMTString());
    var cvalue = document.getElementById("summonerName").value;
    console.log(cvalue);
    document.cookie = "json="+finaljson+"; "+expires;
    console.log(document.cookie);
    //greeting();
}

function getCookie() {

}