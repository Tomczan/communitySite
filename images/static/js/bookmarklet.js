(function(){
    var jquery_version = '3.4.1';
    var site_url = 'http://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;

    function bookmarklet(msg) {
        //alert('bookmarkled loaded!');
        //wczytanie css
        var css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*999999999999)
        });
        jQuery('head').append(css);
        //wczytanie html
        box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Wybierz obraz do dodania:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html)
        //zdarzenie close
        jQuery('#bookmarklet #close').click(function(){
            jQuery('#bookmarklet').remove();
        });
        //wyszukanie i wyswietlanie obrazow
        jQuery.each(jQuery('img[src$="jpg"]'), function(index, image){
            if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height){
                image_url = jQuery(image).attr('src');
                jQuery('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
            }
        });

        //po zaznaczeniu obrazu przejdz pod podany adres URL wraz z obrazem
        jQuery('#bookmarklet .images a').click(function(e){
            selected_image = jQuery(this).children('img').attr('src');
            //ukrycie bookmarkletu
            jQuery('#bookmarklet').hide();
            //otworzenie nowego okna w celu przekazania obrazu
            window.open(site_url +'images/create/?url='
                  + encodeURIComponent(selected_image)
                  + '&title='
                  + encodeURIComponent(jQuery('title').text()),
                  '_blank');
        });
    };
    if(typeof window.jQuery != 'undefined'){
        bookmarklet();
    } else {
        // sprawdzanie konfliktów.
        var conflict = typeof window.$ != 'undefined';
        // utworzenie skryptu i wskazanie na Google API
        var script = document.createElement('script');
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' + jquery_version + '/jquery.min.js';
        // dodanie znacznika skrtyptu do znacznika <head> w celu przetworzenia.
        document.getElementsByTagName('head')[0].appendChild(script);
        // mechanizm pozwalajacy na zaczekanie az skrypt zostanie wczytany
        var attempts = 15;
        (function(){
            //ponowne sprawdzenie czy zdefiniowano jQuery.
            if(typeof window.jQuery == 'undefined') {
                if(--attempts > o) {
                    //wywołanie skryptu w ciagu kilku miliseknd
                    window.setTimeout(arguments.callee, 250)
                } else {
                    //zbyt duzo prób wczytania, zgłoszenie błedu
                    alert('Wystąpił błąd podczas wczytywania jQuery.')
                }
            } else {
                bookmarklet();
            }
        })();
    }
})()