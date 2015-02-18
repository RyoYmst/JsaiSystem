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