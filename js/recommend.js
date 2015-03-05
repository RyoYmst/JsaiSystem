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
                $(".center").css({
                   "background-image":"url(../~artuhr0912/img/"+ data.title +".jpeg)"
                })
        })

       .error(function(msg){
              console.log(msg);
              console.log("error");
        });
        return tmp;
}