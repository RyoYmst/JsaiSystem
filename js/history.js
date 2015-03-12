function HistoryNode(title){
  var node = $("<div>").text(title).addClass("histories");
  return node;
}

function HistoryNodes(titles){
  var nodes = []
  for (var i = 0; i < titles.length; i++){
       var node = HistoryNode(titles[i]);
      nodes.push(node);
  }
  return nodes;
}

	history_list  = []
	$(document).on("click",".center",function(){
		var check_title = []
		for (var i = 0 ; i < DbComic.length ; i++){
			if (DbComic[i].title == $(this).text()){
				check_title.push(DbComic[i]);
			}
		}

		history_list.push(check_title[0].title)
		var history_nodes = HistoryNodes(history_list)
		var history = $("#history");
		for (var i = 0; i<history_nodes.length; i++){
			var left = i * 80;
			var history_node = history_nodes[i];
			history.append(history_node);
			history_node.css({
				left:left + "px",
              	top:"90%",
              	width:"51.2px",
              	height:"76.8px",
              	"background-image":"url(../~artuhr0912/img/"+ history_node.text() +".jpg)"
			})
		}	
	})		

$(document).on("click",".histories",function(){
	console.log($(this).text())
	for(var i = 0; i< DbComic.length; i++){
		if($(this).text() == DbComic[i].title){
			$(this).showBalloon({
				contents:DbComic[i].genres,
				tipSize:32,
				css:{
					fontSize:"28px"
				}
			})

		}
	}
})