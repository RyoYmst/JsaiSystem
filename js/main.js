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
        nodes_genre = NodesGenre(recomend_genres);
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




