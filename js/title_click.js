function _NodeTitle(title){
  var node = $("<div>").text(title).addClass("title");
  return node;
}

function NodesTitle(titles){
  var nodes = []
  for (var i = 0; i < titles.length; i++){
       var node = _NodeTitle(titles[i]);
      nodes.push(node);
  }
  return nodes;
}

$(document).on("click",".title",function() {
    var this_pos = $(this).position();
    var thisX = this_pos.left;
    var thisY = this_pos.top;
    var center_pos = $(".center").position();
    var centerX = center_pos.left;
    var centerY = center_pos.top;
    var distaceX = centerX - thisX;
    var distaceY = centerY - thisY;

     $(this).animate({
       left:"+=" + distaceX,
       top:"+=" + distaceY },"slow");
    
    $(".center").removeClass(function(){
      $(this).remove();
    });
    $("#recommend").remove();
    $(this).removeClass("title");
    $(this).addClass("center");
  
    $(".title").not(this).hide(1000,function(){
      $(this).remove();
    });

    select_comic = []
    for (var i = 0; i < DbComic.length; i++){
        if ($(this).text() == DbComic[i].title){
          select_comic.push(DbComic[i]);
        }
    }

    titles = []
    for (var i=0; i< DbComic.length; i++){
      var count = 0;
      for(var j = 0; j < select_comic[0].genres.length; j++){
        if ($.inArray(select_comic[0].genres[j],DbComic[i].genres) !== -1){
          if(select_comic[0].title !== DbComic[i].title){
            count = count + 1;
            if (count > 1){
              titles.push(DbComic[i].title);
              break
            }
          }
        }
      }
    }
 
    random_titles = []
    random_count = generate_random(titles.length)
    for (var i = 0; i< random_count.length; i++){
       random_titles.push(titles[random_count[i]])
    }
    //console.log(random_titles)

    var node_titles = NodesTitle(titles);//ランダムの変更箇所
    var $title = $("#titles");
    for(var i = 0; i < node_titles.length; i++){
        var each_title = node_titles[i];
            $title.append(each_title);
            
            each_title.css({
              left:centerX,
              top:centerY,
              "background-image":"url(../~artuhr0912/img/"+ each_title.text() +".jpg)"　
            })
    }
    r = 200;
    spread(node_titles,r)

});