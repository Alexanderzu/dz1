
$('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $('.fullscreen-nav').toggleClass('open');
});

$('.btn-authorization').on('click', function(){
   $('#flip-toggle').addClass('hover');
   $('.btn-authorization').hide();
});
$('.btn-home').on('click', function(){
    $('#flip-toggle').removeClass('hover');
    $('.btn-authorization').show();
});

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








var navPos, winPos, navHeight;
  
function refreshVar() {
  navPos = $('.navigate__list').offset().top;
  navHeight = $('.navigate__list').outerHeight(true);
}

refreshVar();
$(window).resize(refreshVar);

  $('<div class="clone-nav"></div>').insertBefore('navigate__list').css('height', navHeight).hide();
  
$(window).scroll(function() {
  winPos = $(window).scrollTop();
  
  if (winPos >= navPos) {
    $('.navigate__list').addClass('fixed');  
    $('.clone-nav').show();
  }  
  else {
    $('.navigate__list').removeClass('fixed');
    $('.clone-nav').hide();
  }
});



// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11
        , // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York
        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "administrative"
            , "elementType": "labels.text.fill"
            , "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape"
            , "elementType": "all"
            , "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi"
            , "elementType": "all"
            , "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road"
            , "elementType": "all"
            , "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway"
            , "elementType": "all"
            , "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial"
            , "elementType": "labels.icon"
            , "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit"
            , "elementType": "all"
            , "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water"
            , "elementType": "all"
            , "stylers": [{
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
        position: new google.maps.LatLng(40.6700, -73.9400)
        , map: map
        , title: 'Snazzy!'
    });
}