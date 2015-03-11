
$(document).on("mouseover",".title,.center",function() {
		var DbComic = LoadJson();
		var check_title = [];
		var split_genre = [];
		
		for (var i = 0 ; i < DbComic.length ; i++){
			if (DbComic[i].title == $(this).text()){
				check_title.push(DbComic[i]);
			}
		}
		//console.log(check_title)

		for (var i = 0 ; i < check_title[0].genres.length ; i ++){
			split_genre.push(check_title[0].genres[i]);
			split_genre.push("\n");
		}

		$(this).animate({
			width:"128px",
			height:"182px"
		},256);

		$(this).showBalloon({
			contents:split_genre,
			tipSize:32,
			css:{
				fontSize:"28px"
			}
		})
})

$(document).on("mouseout",".title",function(){
	$(this).hideBalloon();
	$(this).animate({
		width:"64px",
		height:"91px"
	},256);
})

$(document).on("mouseout",".center",function(){
	$(this).hideBalloon();
	$(this).animate({
		width:"96px",
		height:"136.5px"
	},256);
})
				
$(document).on("click",".title",function(){
	$(this).hideBalloon();
	$(this).animate({
		width:"64px",
		height:"91px"
	},256);
})



