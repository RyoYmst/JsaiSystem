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

function generate_random(count){
  var generated = [];
  //for (var i = 0; i < 5 ; i++){
  for (var i = 0; i < count; i++){
    var candidate = Math.floor(Math.random()*count);
    if ($.inArray(candidate,generated) == -1){
      generated.push(candidate);  
    }else{
      continue
    }
    if (generated.length >= 10){
      break
    }
  }
  return generated
}

$(function(){//main関数
    DbComic = LoadJson();//収集したコミックのタイトルとジャンル　title: genre:
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
          var count = 0;
          for (var j = 0; j < recomend_genres.length; j++){
            if ($.inArray(recomend_genres[j],DbComic[i].genres) !== -1){
              if (RecomendComic[0] !== DbComic[i].title){
                count = count + 1;
                //if (count > 0){
                  node_title = NodeTitle(DbComic[i]);
                  titles.push(node_title);
                  break;
                //}
              }
            }
          }
        }
        //console.log(titles)
        random_titles = []
        random_count = generate_random(titles.length)
        for (var i = 0; i< random_count.length; i++){
           random_titles.push(titles[random_count[i]])
        }

        var $title = $("#titles");
        var $expect_like_comic = $(".center");
        var pos = $expect_like_comic.position();
        var centerX = pos.left;
        var centerY = pos.top;
        //random_titles
        for(var i = 0; i < titles.length; i++){
            var each_title = titles[i];//random_titles
            $title.append(each_title);
            each_title.css({
              left:centerX,
              top:centerY,
              "background-image":"url(../~artuhr0912/img/"+ each_title.text() +".jpg)",     
            })
         }

    r = 200;
    spread(titles,r) //random_titles
    $("#like_comic_titles").remove();
  })
})


