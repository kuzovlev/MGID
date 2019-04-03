var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    direction: 'horizontal',
    loop: false,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});


$(document).ready(function () {
    $('.menu-trigger').click(function () {
        $('.navigation').slideToggle(500);
    });

    $(window).resize(function () {
        if ($(window).width() > 500) {
            $('.navigation').removeAttr('style');
        }
    });
    $('.select').each(function () {
        var $this = $(this),
            selectOption = $this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            dur = 500;
        $this.hide();
        $this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'select__gap',
            text: 'Country'
        }).insertAfter($this);
        var selectGap = $this.next('.select__gap'),
            caret = selectGap.find('.caret');
        $('<ul>', {
            class: 'select__list'
        }).insertAfter(selectGap);
        var selectList = selectGap.next('.select__list');
        for (var i = 0; i < selectOptionLength; i++) {
            $('<li>', {
                class: 'select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }
        var selectItem = selectList.find('li');
        selectList.slideUp(0);
        selectGap.on('click', function () {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                selectList.slideDown(dur);
                selectItem.on('click', function () {
                    var chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectGap.text($(this).find('span').text());

                    selectList.slideUp(dur);
                    selectGap.removeClass('on');
                });
            } else {
                $(this).removeClass('on');
                selectList.slideUp(dur);
            }
        });

    });
});