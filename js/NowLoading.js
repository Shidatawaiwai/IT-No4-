let Loading = function(id){
    let selector = $(`#${id}`) ;
    selector.css({
     "background-color": "hsl(214, 100%, 50%)",
     "color": "#FFF",
     "text-align": "center",
     "height": "100%",
     "width": "100%",
     "z-index": "100",
     "position": "absolute",
     "top": "0",
     "left": "0",
     "opacity": "0.8"
     });
     selector.text("Now Loading...\n終わったら画面下部または右部にある結果欄をご覧ください");
 
 }
 
 let DeleteLoading = function(id){
     let selector = $(`#${id}`) ;
     selector.css({
         "height": "0",
         "width": "0"
     });
     selector.text("");
}