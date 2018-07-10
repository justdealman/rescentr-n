$(function(){
    $('.slider__list').flickity({
        pageDots: false,
        prevNextButtons: true,
        wrapAround: true,
        contain: true
    });

    $('.notify__next').on('click', function() {
        $('.slider__list').flickity('next');
    });

    function slideShow() {
        var slides = $('.slideshow__item').length,
            mar = Math.round(100/slides),
            mar2 = (100-mar)/100,
            margin = Math.round(100/(slides*mar2));

        $('.slideshow__item').each(function(i, slide) {
            var m = margin*i,
                img = $(slide).find('img');

            $(slide).css({
                'left': m+'%',
                'bottom': m+'%',
                'transform': 'translate(-'+m+'%,'+m+'%)'
            })
        });
    }

    slideShow();

    $('.slideshow__item').hover(function() {
        $(this).addClass('active');
    }, function(e) {
        $('.slideshow__item.active').removeClass('active');
    })

    ymaps.ready(init);
    var myMap, 
        myPlacemark;

    function init(){ 
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        }); 
        
        myPlacemark = new ymaps.Placemark([55.76, 37.64], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        });
        
        myMap.geoObjects.add(myPlacemark);
    }

    $('[data-img]').on('click', function() {
        var img = $(this).data('img');
        $.fancybox.open({
            src  : img, // Source of the content
            type : 'image', // Content type: image|inline|ajax|iframe|html (optional)
            opts : {} // Object containing item options (optional)
        });
    });

    $('[data-modal]').on('click', function(e) {
        e.preventDefault();
        
        var id = $(this).data('modal'),
            modal = $('#'+id).get(0);

        $.fancybox.open({
            src: modal
        })
    });

    $('.search__tip strong').on('click', function() {
        var val = $(this).text();

        $('.search__field input').val(val);
    });

    $('.menu').on('click', function() {
        $(this).toggleClass('open');
        $('.nav').toggleClass('open');
    });

    $('.nav__item_drop').on('click', function(e) {
        if (e.target.tagName === 'A') return;
        var winWidth = $(window).width();


        if (winWidth <= 768) {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open')
            } else {
                $('.nav__item_drop.open').removeClass('open');
                $(this).addClass('open');
            }
        }
    });

    $('.index .wrapper').parallax({
        src: 'img/bg.png',
        speed: .3
    })

    // Табы

    $('.newslist [data-tab]').hide();

    $('.newslist [data-content]').on('click', function(e) {
        e.preventDefault();

        $('.newslist [data-content]').removeClass('active');
        $('.newslist [data-tab]').hide();
        $(this).addClass('active');

        var content = $(this).data('content');

        $('[data-tab="'+content+'"]').show();

    })

}); 