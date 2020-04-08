$(document).ready(function(){
	$(".nav-trigger").click(function(){
		$(".site-header").css("width", "");
		$(".site-header").toggleClass("selected");
	});

	$(document).scroll(function(){
		var scroll = $(document).scrollTop();
		$(".post-section").each(function(){
			var offset = $(this).offset();
			var height = $(this).height();
			var point1 = offset.top;
			var point2 = point1 + height;

			var move = Math.max(scroll - point1, 0);
			if( height > $(window).innerHeight()){
				$(this).find("h1").css("transform", "translateY("+ move +"px)");
			};
		});
	});
	$(".wrapper").mouseover( function(){
		$(".site-header").css("width", "");
	});
	$(".page-link").mouseout(function(){
		$(".site-header").css("width", "");
		$(".subpages").css("opacity", "0");
		$(this).parent().find(".page-link").each( function() {
			$(this).css("opacity", "1");
		});
	});
	$(".page-link").mouseover(function(){
		$(".site-header").css("width", "500px");
		$(this).next(".subpages").css("opacity", "1");
		$(this).parent().find(".page-link").each( function() {
			$(this).css("opacity", "0.4");
		});
		$(this).css("opacity", "1");
	});
});