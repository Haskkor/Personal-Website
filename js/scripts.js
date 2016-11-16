// Tooltips
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
});

// Navbar
$(document).ready(function(){
	$(".navbar a, footer a[href='#myPage']").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1200, function(){
			window.location.hash = hash;
			});
    	}
  	});
});

// Navbar responsive
function navFunction() {
	var x = document.getElementById("myNav");
	if (x.className === "nav navbar-nav navbar-right") {
		x.className += " responsive";
	} else {
		x.className = "nav navbar-nav navbar-right";
	}
}

// Smooth scroll
$(window).scroll(function() {
	var hT = $('#skills').offset().top,
	hTb = $('#portfolio-content').offset().top,
	wH = $(window).height(),
	wS = $(this).scrollTop();
	if (wS > (hT-wH) && wS < (hTb-wH)){
		$(".progress-bar").each(function(){
			each_bar_width = $(this).attr('aria-valuenow');
			$(this).width(each_bar_width + '%');
		});
	} else if (wS < (hT-wH) || wS > (hTb-wH)){
		$(".progress-bar").each(function(){
			$(this).width(0 + '%');
		});	
	}
});

// Portfolio images
$(document).ready(function(){
    $(".img").mouseenter(function(){
    	var viewportWidth = $(window).width();
    	if (viewportWidth > 800) {
	        $(this).addClass("hover");
	        $(".expand").addClass("appears");
	    }
    })
    .mouseleave(function(){
        $(this).removeClass("hover");
        $(".expand").removeClass("appears");
    });
});

// Modal images portfolio
$(document).ready(function(){

    loadGallery(true, '.icon-zoom-portfolio span');

    function disableButtons(counter_max, counter_current){
        $('#show-previous-image, #show-next-image').show();
        if(counter_max == counter_current){
            $('#show-next-image').hide();
        } else if (counter_current == 1){
            $('#show-previous-image').hide();
        }
    }

    function loadGallery(setIDs, setClickAttr){
        var current_image,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image').click(function(){
            if($(this).attr('id') == 'show-previous-image'){
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });

        function updateGallery(selector) {
            var $sel = selector;
            current_image = $sel.data('image-id');
            $('#image-gallery-caption').text($sel.data('caption'));
            $('#image-gallery-title').text($sel.data('title'));
            $('#image-gallery-image').attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if(setIDs == true){
            $('[data-image-id]').each(function(){
                counter++;
                $(this).attr('data-image-id',counter);
            });
        }

        $(setClickAttr).on('click',function(){
            updateGallery($(this));
        });
    }
});

// Google maps
var myCenter = new google.maps.LatLng(43.907154, 1.688826);
var awayCenter = new google.maps.LatLng(-36.874670, 174.744214);
function initialize() {
	var mapProp = {
		center:myCenter,
		zoom:9,
		scrollwheel:false,
		draggable:true,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var marker = new google.maps.Marker({
		position:myCenter,
		animation:google.maps.Animation.BOUNCE,
	});
	var markerAway = new google.maps.Marker({
		position:awayCenter,
		animation:google.maps.Animation.BOUNCE,
	});

	marker.setMap(map);
	markerAway.setMap(map);

	google.maps.event.addListener(map,'mouseover',function() {
		map.setZoom(10);
		map.setCenter(markerAway.getPosition());
	});
	google.maps.event.addListener(map,'mouseout',function() {
		map.setZoom(9);
		map.setCenter(marker.getPosition());
	});
}
google.maps.event.addDomListener(window, 'load', initialize);