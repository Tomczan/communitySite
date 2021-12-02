$('a.like').click(function(e){
    alert("eee")
    e.preventDefault();
    $.post('{% url "images:like" %}',
      {
        id: $(this).data('id'),
        action: $(this).data('action')
      },
      function(data){
        if (data['status'] == 'ok')
        {
          var previous_action = $('a.like').data('action');
            
            //zmiana wartosci atrybutu data-action
            $('a.like').data('action', previous_action == 'like' ? 'unlike' : 'like');
            //zmiana tekstu wyswietlanego przez lacze
            $('a.like').text(previous_action == 'like' ? 'Unlike' : 'Like');
            //uaktualnienie calkowitej liczby polubienia danego obrazu
            var previous_likes = parseInt($('span.count .total').text());
            $('span.count .total').text(previous_action == 'like' ? previous_likes + 1 : previous_likes - 1);
        }
    }
  );
});

