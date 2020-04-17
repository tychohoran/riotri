$(document).ready(function(){

	$(".post-section").each(function(){
		$(this).find("h1").clone().addClass("header-clone").appendTo(".wrapper");
	});

	// $(".post-title").each( function() {
	// 	var content = $(this).html().replace(/,/g,"<span class='comma'>,</span>");
	// 	$(this).html(content);
	// });

	var slideIndex = 0;
	var timer;
	showSlides();

	$(".dot").click(function() {
		var num = $(".dot").index(this);
		slideIndex = num;
		clearTimeout(timer);
		showSlides();
	});

	function showSlides() {
	  var i;
	  var slides = $(".slideshow-carousel").find("img");
	  //var dots = document.getElementsByClassName("dot");
	  $(".slideshow-carousel").css("transform","translateX("+(-slideIndex*100)+"%)");
	  slides.removeClass("focused");
	  $(".slideshow-progress").find(".dot").removeClass("focused");
	  slideIndex++;
	  $(".slideshow-carousel").find("img:nth-child("+slideIndex+")").addClass("focused");
	  $(".slideshow-progress").find(".dot:nth-child("+slideIndex+")").addClass("focused");
	  if (slideIndex >= slides.length) {slideIndex = 0}
	  timer = setTimeout(showSlides, 10000);
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
	$(".link-group").mouseout(function(){
		$(".site-header").css("width", "");
		$(".subpages").css({"opacity":"0", "pointer-events":"none"});
		$(".page-link").each( function() {
			$(this).css("opacity", "1");
		});
	});
	$(".link-group").mouseover(function(){
		if(!$(this).hasClass("contact-group")){
			$(".site-header").css("width", "550px");
			$(this).find(".subpages").css({"opacity":"1", "pointer-events":"all"});
		};
		$(".link-group > .page-link").each( function() {
			$(this).css("opacity", "0.4");
		});
		$(this).find(".page-link").first().css("opacity", "1");
	});
	$(".subpages .page-link").mouseover(function(){
		$(".subpages .page-link").each( function() {
			$(this).css("opacity", "0.4");
		});
		$(this).css("opacity", "1");
	});
});