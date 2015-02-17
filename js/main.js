function CreateNodeGenre(genre){
  var $node = $("<div>").text(genre).addClass("genre");
  return $node;
}


function NodesGenre(genres){
  var nodes = []
  for (var i = 0; i < genres.length; i++){
    var node = CreateNodeGenre(genres[i]);
    nodes.push(node);
  }
return nodes;
}

function NodeTitle(title){
  var node = $("<div>").text(title.title).addClass("title");
  return node;
}

function _NodeTitle(title){
  var node = $("<div>").text(title).addClass("title");
  return node;
}

function NodesTitle(titles){
  var nodes = []
  for (var i = 0; i < titles.length; i++){
      //console.log(titles[i])
       var node = _NodeTitle(titles[i]);
      nodes.push(node);
  }
  return nodes;
}

function spread(titles,r){
  for (var i=0;i<titles.length; i++){
    var node = titles[i];
    var centerX = node.offset().left;
    var centerY = node.offset().top;
    var rad = 2*Math.PI * (i/titles.length);
    var x = r * Math.cos(rad) + centerX;
    var y = r * Math.sin(rad) + centerY;
    titles[i].animate({
      left:x,
      top:y },"slow");
    }
}


$(function(){//main関数
    var DbComic = LoadJson();//収集したコミックのタイトルとジャンル　title: genre:
    $(document).on("click","#button",function(){
        var RecomendComic = ExpectLikeComic();//レコメンドされたコミック
        recomend_genres = RecomendComic[1];
        var $genre = $("#genres");
        nodes_genre = NodesGenre(recomend_genres)
        for (var i = 0; i< nodes_genre.length; i++){
           var each_genre = nodes_genre[i];
           //$genre.append(each_genre);//ジャンル情報をdivに格納
        }

        titles = []
        for (var i=0; i< DbComic.length; i++){
          for (var j = 0; j < recomend_genres.length; j++){
            if ($.inArray(recomend_genres[j],DbComic[i].genres) != -1){
              node_title = NodeTitle(DbComic[i]);
              titles.push(node_title);
              break
            }
          }
        }

        var $title = $("#titles");
        var $expect_like_comic = $(".center");
        var pos = $expect_like_comic.position();
        var centerX = pos.left;
        var centerY = pos.top;
        for(var i = 0; i < titles.length; i++){
            var each_title = titles[i];
            $title.append(each_title);
            each_title.css({
              left:centerX,
              top:centerY
            })
         }
    r = 128;
    spread(titles,r) 
    $("#like_comic_titles").remove();
  })
})

$(document).on("click",".title",function() {
    var DbComic = LoadJson();
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
    $("div").removeClass("center");
    $("#recommend").remove();
    $(this).removeClass("title");
    $(this).addClass("center");
    $(".title").not(this).hide(1000);

    select_comic = []
    for (var i = 0; i < DbComic.length; i++){
        if ($(this).text() == DbComic[i].title){
          select_comic.push(DbComic[i]);
        }
    }

    titles = []
    for (var i=0; i< DbComic.length; i++){
      for(var j = 0; j < select_comic[0].genres.length; j++){
        if ($.inArray(select_comic[0].genres[j],DbComic[i].genres) !== -1){
          titles.push(DbComic[i].title);
          break
        }
      }
    }

    var node_titles = NodesTitle(titles);  
    r = 128;
    spread(node_titles,r)

});


$(document).on("click",".genre",function() {
    console.log($(this).text());

});



