function LoadJson(){
  json_data = [];
  $.ajax({
    url:"../~artuhr0912/data/data.json",
    dateType: "json",
    async:false,
    data:{"data" : "data"}
  })
    .success(function(json){
      for (var i = 0; i < json.length ; i++){
        json_data.push(json[i]);
      }
    })
    .error(function(msg){
      console.log("error(LoadJson)");
    })
  return json_data;
};


function ExpectLikeComic(){
        var hoge = $("textarea[name='titles']").val();
        var tmp = [];
        title_list = hoge.split(",");
        if(title_list.length === 0){
            $("#test").text("コミックタイトルを入力して下さい");
        }
       $.ajax({
              url:"../~artuhr0912/cgi-bin/jsai_calc.py",
              type:"POST",
              dataType:"json",
              async: false,
              data: { "query": $("textarea[name='titles']").val() }
       })
       .success(function(data){
                tmp.push(data.title,data.genres);
                var recommend = $("#recommend");
                var $node = $("<div>").text(data.title).addClass("center");
                recommend.append($node);

        })
       .error(function(msg){
              console.log(msg);
              console.log("error");
        });
        return tmp;
}

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


$(function(){
    var DbComic = LoadJson();//収集したコミックのタイトルとジャンル　title: genre:
    $(document).on("click","#button",function(){
        var RecomendComic = ExpectLikeComic();//レコメンドされたコミック
        recomend_genres = RecomendComic[1];
        var $genre = $("#genres");
        nodes_genre = NodesGenre(recomend_genres)
        for (var i = 0; i< nodes_genre.length; i++){
          //console.log(nodes_genre[i])
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

    r = 256;
    spread(titles,r) 
    $("#like_comic_titles").remove();
  })
})



$(document).on("click",".title",function() {
    //console.log($(this).text();
    console.log($(this));
});

$(document).on("click",".genre",function() {
    console.log($(this).text());
});
















//     $(document).on("click",".titles",function(){
//         $("#expect_like_comic").text($(this).text());
//         genres = []
//         for(var i = 0; i < DbComic.length; i++){
//             if ($(this).text() == DbComic[i].title){
//           　    $(".genres").remove();
//                 $(".titles").remove();
//                 for (var j =0; j < DbComic[i].genres.length ; j++){
//                     $("<div class = genres>"+DbComic[i].genres[j]+"</div>").appendTo("body");
//                     genres.push(DbComic[i].genres[j])
//                 }   
//             }
//         }


//         for (var i = 0; i< DbComic.length; i++){
//             for (var j = 0 ; j < genres.length; j ++){
//                 if ($.inArray(genres[i],DbComic[i].genres) != -1){
//                     if ($(this).text() != DbComic[i].title){
//                         $("<div class = titles>"+DbComic[i].title+"</div>").appendTo("body");
//                         break
//                     }
//                 }
//             }
//         }
//     })
// })


//        $.ajax({
//            url: "data/data.json",
//            type: "GET",
//            dataType: "json"
//        })
//                   
//        .success(function(data){
//            
//            $.ajax({
//                url:"../~artuhr0912/cgi-bin/test.py",
//                type:"POST",
//                dataType:"text",
//                data: { 'query': $("textarea[name='titles']").val() }
//            })
//             .success(function(data){
//                      console.log(data);
//            })
//             .error(function(msg){
//                console.log(msg)
//                console.log('error')
//            });
//        })
//                   
//        .error(function(msg) {
//            console.log(msg);
//        });



/*
 $(function() {
 $(document).on("click","#button",function(){
 var hoge = $("textarea[name='titles']").val();
 title_list = hoge.split(",");
 
 $.ajax({
 url: "data/data.json",
 type: "GET",
 dataType: "json"
 })
 .success(function(data){
 var tmp = [];
 for(var i = 0; i < data.length; i++){
 tmp.push(data[i]);
 }
 console.log(title_list);
 for(var i = 0; i< tmp.length; i ++){
 console.log(tmp[i].title)
 }
 })
 .error(function(msg) {
 console.log(msg);
 });
 })
 });
 */






