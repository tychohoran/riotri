$(document).ready(function(){

	$(".post-section").each(function(){
		$(this).find("h1").clone().addClass("header-clone").appendTo(".wrapper");
	});

	// $(".post-title").each( function() {
	// 	var content = $(this).html().replace(/,/g,"<span class='comma'>,</span>");
	// 	$(this).html(content);
	// });

	var slideIndex = 0;
	showSlides();

	function showSlides() {
	  var i;
	  var slides = $(".slideshow").find("img");
	  //var dots = document.getElementsByClassName("dot");
	  $(".slideshow").css("transform","translateX("+(-slideIndex*100)+"%)");
	  slideIndex++;
	  if (slideIndex >= slides.length) {slideIndex = 0}
	  setTimeout(showSlides, 4000); // Change image every 2 seconds
	}

	$(".nav-trigger").click(function(){
		$(".site-header").css("width", "");
		$(".site-header").toggleClass("selected");
	});

	$(document).scroll(function(){
		var scroll = $(document).scrollTop();
		console.log($(document).innerWidth());
		if($(document).innerWidth() >= 1100){
			$(".post-section").each(function(){
				var offset = $(this).offset();
				var height = $(this).height();
				var headerHeight = $(this).find("h1").height();
				var point1 = offset.top;
				var point2 = point1 + height - headerHeight;
				var move = Math.max(scroll - point1, 0);
				var id = $(this).find("h1").attr('id');
				if( height > $(window).innerHeight() && scroll >= point1 && scroll <= point2){
					$(this).find("h1").css("opacity", "0");
					$(".header-clone").each(function() {
						if($(this).attr('id') == id){
							$(this).css("display", "block");
						};
					});
				} else {
					$(this).find("h1").css("opacity", "1");
					$(".header-clone").each(function() {
						if($(this).attr('id') == id){
							$(this).css("display", "");
						};
					});
				};
				if(height > $(window).innerHeight() && scroll >= point1) {
					$(this).find("h1").css("transform", "translateY("+(height-headerHeight)+"px)");
				} else {
					$(this).find("h1").css("transform", "");
				};
			});
		} else {
			$(".post-section").find("h1").css("transform", "");
			$(".post-section").find("h1").css("opacity", "");
			$(".header-clone").css("display", "");
		};
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