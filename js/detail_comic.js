$(function(){
	$(document).on("mouseover",".title,.center",function() {
					var DbComic = LoadJson();
					check_title = [];
					split_genre = [];
					for (var i = 0 ; i < DbComic.length ; i++){
						if (DbComic[i].title == $(this).text()){
							check_title.push(DbComic[i]);
						}
					}

					for (var i = 0 ; i < check_title[0].genres.length ; i ++){
						split_genre.push(check_title[0].genres[i]);
						split_genre.push("\n");
					}

					$(this).showBalloon({
						contents:split_genre,
						tipSize:32,
						css:{
							fontSize:"28px"
						}
					})
				})

				.on("mouseout",".title,.center",function(){
					$(this).hideBalloon();
				})
				
				.on("click",".title,.center",function(){
					$(this).hideBalloon();

				})
})


$(document).on("mouseover",".center",function() {
	console.log($(this).text());
})