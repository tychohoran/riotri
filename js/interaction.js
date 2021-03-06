$(document).ready(function(){

	function placeProgress() {
		if($(".page-header").length) {
			var progressOffset = $(".page-header").offset().top - $(".announcement-banner").innerHeight();
			$(".slideshow-progress").css('top', progressOffset);
		};
	};

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
	  timer = setTimeout(showSlides, 8000);
	};

	function setupImages() {
		$(".post img").each(function(){
			var aspectRatio = $(this)[0].naturalHeight / $(this)[0].naturalWidth;
			if(aspectRatio > 0.75){
				$(this).css("object-fit", "contain");
			}
		});
		var imgMax = $(window).innerHeight() - $('.announcement-banner').innerHeight() - parseInt($('.slideshow').css('padding-bottom'));
		var videoMax = $(window).innerHeight() - $('.announcement-banner').innerHeight();
		console.log(videoMax + " dope");
		$(".wrapper:not(.home) .slideshow img").css('max-height', imgMax);
		$(".home .slideshow").css('height', videoMax);
	};

	var target = "#" + $('.post').first().attr('id');
	$(".scroll-arrow").attr('href', target);
	console.log(target);

	$(".post-section").each(function(){
		$(this).find("h1").clone().addClass("header-clone").appendTo(".wrapper");
	});
	function sizeHeaders() {
		$("h1").each(function(){
			$(this).css("overflow-x","scroll");
			console.log($(this).text() + " " + $(this)[0].scrollWidth + " " + $(this)[0].offsetWidth + " " +  $(this).next(".section-content").innerHeight() + " " +  $(this).innerHeight());
			if($(this)[0].scrollWidth > $(this)[0].offsetWidth || $(this).next(".section-content").innerHeight() < 100 && $(this).innerHeight() > 150){
				$(this).addClass("smaller-header");
				var tempId = $(this).attr('id');
				$(".header-clone").each(function(){
					if($(this).attr('id') == tempId){
						$(this).addClass("smaller-header");
					};
				});
			};
			$(this).css("overflow-x","");
		});
	};

	$(".post .post-header.hidden").each(function(){
		$(this).remove();
	});

	// $(".post-title").each( function() {
	// 	var content = $(this).html().replace(/,/g,"<span class='comma'>,</span>");
	// 	$(this).html(content);
	// });

	var slideIndex = 0;
	var timer;
	showSlides();
	placeProgress();

	$(".dot").click(function() {
		var num = $(".dot").index(this);
		slideIndex = num;
		clearTimeout(timer);
		showSlides();
	});

	$(".subpage-link").mouseover(function(){
		var h = $(this).find(".subpage-description p").innerHeight();
		$(this).find(".subpage-description").css('max-height', h + 18);
	});
	$(".subpage-link").mouseout(function(){
		$(this).find(".subpage-description").css('max-height', "");
	});

	$(".nav-trigger").click(function(){
		$(".site-header").css("width", "");
		$(".site-header").toggleClass("selected");
	});

	$(window).resize( function(){
		placeProgress();
	});

	$(document).scroll(function(){
		var scroll = $(document).scrollTop();
		$('.scroll-arrow').css({'opacity': '0', 'pointer-events': 'none'});
		if($(document).innerWidth() >= 1167){
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
		if(!$(this).is(".contact-group, .news-group")){
			$(".site-header").css("width", "500px");
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
	$(".page-link").click( function(){
		$(".site-header").css("width", "");
		$(".site-header").toggleClass("selected");
	});
	setupImages();
	setTimeout(function(){
		sizeHeaders();
		placeProgress();
	}, 50);
});