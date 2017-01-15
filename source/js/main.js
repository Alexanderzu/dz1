$('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $('.fullscreen-nav').toggleClass('open');
});

$('.btn-authorization').on('click', function () {
    $('#flip-toggle').addClass('hover');
    $('.btn-authorization').hide();
});
$('.btn-home').on('click', function () {
    $('#flip-toggle').removeClass('hover');
    $('.btn-authorization').show();
});






$("form").submit(function (event) {
    event.preventDefault();

    var name = $("#name").val();
    var email = $("#email").val();

    if (name == "") {
        $("#name").removeClass("has-success").addClass("has-error");

        validName = false;
    } else {
        $("#name").removeClass("has-error").addClass("has-success");

        validName = true;
    }

    if (email == "") {
        $("#email").removeClass("has-success").addClass("has-error");

        validEmail = false;
    } else {
        $("#email").removeClass("has-error").addClass("has-success");

        validEmail = true;
    }


    if (validName == true && validEmail == true) {
        $("form").unbind('submit').submit();
    }

});
$("#reset").on('click', function () {
    $("#name").removeClass("has-success has-error");
    $("#email").removeClass("has-error has-success");
})


// navigate blog  -->


$('.navigate__item_link').on('click', function (e) {
    e.preventDefault();
    showSection($(this).attr('href'), true);
});

showSection(window.location.hash, false);

$(window).scroll(function () {
    checkSection();
});

function showSection(section, isAnimate) {
    direction = section.replace(/#/, ''),
        reqSection = $('.blog__container_content').filter('[data-section="' + direction + '"]'),
        reqSectionPos = reqSection.top - 30;

    if (isAnimate) {
        $('body, html').animate({
            scrollTop: reqSectionPos
        }, 500);
    } else {
        $('body, html').scrollTop(reqSectionPos);
    }

}

function checkSection() {
    $('.blog__container_content').each(function () {
        var
            $this = $(this),
            topEdge = $this.offset().top - 200,
            bottomEdge = topEdge + $this.height(),
            wScroll = $(window).scrollTop();

        if (topEdge < wScroll && bottomEdge > wScroll) {
            var
                currentId = $this.data('section'),
                reqLink = $('.navigate__item_link').filter('[href="#' + currentId + '"]');
            reqLink.closest('.navigate__item').addClass('active').siblings().removeClass('active');

            window.location.hash = currentId;
        }

        var top = $(document).scrollTop();

        if (top < 500) {
            $("aside.navigate").removeClass("f-nav");
        } else {
            $("aside.navigate").addClass("f-nav");
        }
    });
}
// <-- navigate blog  



//var preloader = (function () {
//
//	var init = function () {
//		_setUpListeners();
//		_viewPreloader();
//		// то, что должно произойти сразу
//	};
//
//	var _setUpListeners = function () {
//		// прослушка событий...
//	};
//
//	var _viewPreloader = function () {
//
//		if($(window).width() < 1200) {
//			return false;
//		}
//
//		$('.preloader').show();
//		
//		// определяем массив для хранения картинок
//		var imgs = [];
//
//		// проходим по всем элементам страницы, где находим все картинки
//		$.each($('*'), function() {
//			var 
//					$this = $(this),
//					background = $this.css('background-image'), // значение фона каждого элемента
//					img = $this.is('img'); // картинка, вставленная через тег <img>
//
//			// задаем условие наличия фоновой картинки 
//			if (background != 'none') {
//				// создаем path, где храним путь картинки в виде http://img_1.jpg
//				var path = background.replace('url("', '').replace('")', '');
//				imgs.push(path); // добавляем путь картинки в массив imgs
//				
//			}
//
//			// в случае с картинкой, заданной через тег <img>, в path кладем значение атрибута src
//			if (img) {
//				var path = $this.attr('src');
//
//				if (path) {
//					imgs.push(path);
//				}
//			}
//			
//		});
//
//		var percentsTotal = 1;
//
//		// определяем загрузилась ли каждая картинка с путем из массива imgs
//		for (var i = 0; i < imgs.length; i++) {
//			// для этого создаем image, куда кладем тег img c атрибутом src
//			// таким образом эмулируем, как будто все картинки (в т.ч. и фоновые) заданы через <img>
//			var image = $('<img>', {
//				attr: {
//					src: imgs[i]
//				}
//			});
//
//			image.on({
//				load : function () {
//					setPercents(imgs.length, percentsTotal);
//					percentsTotal++;
//				},
//
//				error : function () {
//					percentsTotal++;
//				}
//			});
//			
//		}
//
//		function setPercents (total, current) {
//			var percent = Math.ceil(current / total * 100);
//
//			if (percent >= 10) {
//				$('.preloader').css({
//					'background-image': 'url(assets/img/bg_preload.jpg)',
//					'background-size': 'cover'
//				});
//			}
//
//			if (percent >= 100) {
//				$('.preloader').fadeOut();
//			}
//
//			$('.preloader__percents').text(percent + '%');
//		};
//
//	};
//
//	return {
//		init: init
//	};
//
//})();
//
//preloader.init();


var myMouseParallax = (function () {

    var layer = $('.parallax').find('.parallax__layer');

    var init = function () {
        _setUpListeners();

    };

    var _setUpListeners = function () {
        $(window).on('mousemove', _moveLayers);

    };

    var _moveLayers = function (e) {
        var mouse_dx = e.pageX,
            mouse_dy = e.pageY,
            w = (window.innerWidth / 2) - mouse_dx,
            h = (window.innerHeight / 2) - mouse_dy;

        layer.map(function (key, value) {
            var bottomPosition = ((window.innerHeight / 2) * ((key + 1) / 100)),
                widthPosition = w * ((key + 1) / 100),
                heightPosition = h * ((key + 1) / 100);

            $(value).css({
                'bottom': '-' + bottomPosition + 'px',
                'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0px)'
            });
        });
    };

    return {
        init: init
    };

})();

myMouseParallax.init();

var slider = (function () {

	var flag = true;

	var init = function () {

		_createDots();
		_setUpListeners();
		// то, что должно произойти сразу
	};

	var _setUpListeners = function () {
		// прослушка событий...
		$('.slider__controls-btn').on('click', _clickArrow);
		$('.slider__dots_link').on('click', _dotNavigation);
	};

	var _clickArrow = function (e) {
		e.preventDefault();

		var 
				$this = $(this),
				slides = $this.closest('.slider').find('.slider__item'),
				activeSlide = slides.filter('.active'),
				nextSlide = activeSlide.next(),
				prevSlide = activeSlide.prev(),
				firstSlide = slides.first(),
				lastSlide = slides.last();

		if ($this.hasClass('slider__controls-btn_next')) {

			if (nextSlide.length) {
				_moveSlide(nextSlide, 'forward');
			} else {
				_moveSlide(firstSlide, 'forward');
			}
			
		} else {
			
			if (prevSlide.length) {
				_moveSlide(prevSlide, 'backward');
			} else {
				_moveSlide(lastSlide, 'backward');
			}
		}
	};

	var _moveSlide = function (slide, direction) {
		var
				container = slide.closest('.slider'),
				slides = container.find('.slider__item'),
				activeSlide = slides.filter('.active'),
				slideWidth = slides.width(),
				duration = 500,
				reqCssPosition = 0,
				reqSlideStrafe = 0;

		if (flag) {

			flag = false;

			if (direction === 'forward') {
				reqCssPosition = slideWidth;
				reqSlideStrafe = -slideWidth;
			} else if (direction === 'backward') {
				reqCssPosition = -slideWidth;
				reqSlideStrafe = slideWidth;
			}

			slide.css('left', reqCssPosition).addClass('inslide');

			var movableSlide = slides.filter('.inslide');

			activeSlide.animate({left: reqSlideStrafe}, duration);

			movableSlide.animate({left: 0}, duration, function(){
				var $this = $(this);

				slides.css('left', '0').removeClass('active');

				$this.toggleClass('inslide active');

				_setActiveDot(container.find('.slider__dots'));

				flag = true;
			});
		}
		
	};

	var _createDots = function () {
		var container = $('.slider');

		var dotMarkup = '<li class="slider__dots_item"><a class="slider__dots_link" href="#"></a></li>';

		container.each(function(){
			var 
					$this = $(this),
					slides = $this.find('.slider__item'),
					dotContainer = $this.find('.slider__dots');

			for (var i = 0; i < slides.size(); i++) {
				dotContainer.append(dotMarkup);
			}

			_setActiveDot(dotContainer);

		});
	};

	var _setActiveDot = function (container) {
		var slides = container.closest('.slider').find('.slider__item');

		container
			.find('.slider__dots_item')
			.eq(slides.filter('.active').index())
			.addClass('active')
			.siblings()
			.removeClass('active');
	};

	var _dotNavigation = function (e) {
		e.preventDefault();

		var
				$this = $(this),
				dots = $this.closest('.slider__dots').find('.slider__dots_item'),
				activeDot = dots.filter('.active'),
				dot = $this.closest('.slider__dots_item'),
				curDotNum = dot.index(),
				direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
				reqSlide = $this.closest('.slider').find('.slider__item').eq(curDotNum);

		if(!dot.hasClass('active')) {
			_moveSlide(reqSlide, direction);
		}
		
	};

	return {
		init: init
	};

})();

slider.init();



// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11, // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York
        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#46bcec"
            }, {
                "visibility": "on"
            }]
        }]
    };
    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');
    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: 'Snazzy!'
    });
}