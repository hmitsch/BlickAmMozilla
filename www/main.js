

function go(){
	var url = "http://search.twitter.com/search.json?callback=retrieveResults&q=" + $("#text").val();
	$("<script/>").attr("src", url).appendTo("body");  
}

$("#go").click(go);
$("#text").keydown(
	function(e) { 
		if(e.which === 13)  {
			go(); 
		}
	}
);

function retrieveResults(r){
	window.results = r.results;
	window.theIndex = 0;
	displayNext();
}

function displayNext(){
	if( window.theIndex >= window.results.length ){
		$("body").zoomTo();
		return;
	}

	createDiv( window.results[window.theIndex] );
	window.theIndex++;
	setTimeout(displayNext, 4000);
}

function createDiv(status){
	var size = (Math.random()+1)*30;

	$("<div class='status'>").css({
		left: Math.random()*window.innerWidth,
		top: Math.random()*window.innerHeight,
		width: 500*Math.random()+5*size,
		fontSize: size,
		backgroundColor: "hsla(" + 360 * Math.random() + ", 40%, 50%,.8)",
			"-moz-transform": "rotate(" + Math.random()*180 + "deg)",
			"-webkit-transform" : "rotate(" + Math.random()*180 + "deg)"
	})	
	.html(status.text)
	.appendTo("body")
	.zoomTo();
}

$("#orig").zoomTo();