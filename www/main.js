

var Animator = function () {
	var that = this;
	
	this.body = $("body");
	this.queryInput = $("#text");
	
	$("#go").click(function () {
		that.fetchAndStart()
	});
	
	$("#text").keydown(
		function(e) { 
			if(e.which === 13)  {
				that.fetchAndStart(); 
			}
		}
	);
};

Animator.prototype.fetchAndStart = function() {
	var url = "http://search.twitter.com/search.json?callback=triggerAnimator&q=" + this.queryInput.val();
	$("<script/>").attr("src", url).appendTo("body");
};

Animator.prototype.retrieveResults = function(r){
	this.results = r.results;
	this.theIndex = 0;
	$("#container")
		.css({
			"z-index": 0,
			position: "relative"
		})
	
	this.displayNextTweet();
};

Animator.prototype.displayNextTweet = function() {
	var that = this;
	if(this.theIndex >= this.results.length) {
		$(".status").remove();
		$("#container").zoomTo();
		return;
	}

	this.createTweetElement( this.results[this.theIndex] );
	this.theIndex++;
	setTimeout(function () {
		that.displayNextTweet();
	}, 4000);
};

Animator.prototype.createTweetElement = function(status) {
	$("<div class='status'>").css(this.createStyleProperties())	
		.html(status.text)
		.appendTo(this.body)
		.zoomTo();
};

Animator.prototype.createStyleProperties = function() {
	var size = (Math.random() + 1) * 30;
	return {
		left: Math.random() * window.innerWidth,
		top: Math.random() * window.innerHeight,
		width: 500 * Math.random() + 5 * size,
		fontSize: size,
		backgroundColor: "hsla(" + 360 * Math.random() + ", 40%, 50%,.8)",
		"-moz-transform": "rotate(" + Math.random()*180 + "deg)",
		"-webkit-transform": "rotate(" + Math.random()*180 + "deg)"
	};
};

// create animator
var animator = new Animator();
function triggerAnimator (response) {
	animator.retrieveResults(response);
};

$("#orig").zoomTo();
