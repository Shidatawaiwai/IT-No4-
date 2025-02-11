let Loading = function(id){
    let selector = $(`#${id}`) ;
    selector.css({
     "background-color": "hsl(214, 100%, 50%)",
     "height": "100%",
     "width": "100%",
     "z-index": "2",
     "position": "fixed",
     "top" : "0px",
     "left" : "0px",
     "top": "0",
     "left": "0",
     "opacity": "0.8",

     "color": "#FFF",
     "text-align": "center"

     });
     selector.html('Now Loading...<div style="font-size: 15px;">終わったら画面下部または右部にある結果欄をご覧ください</div>');
 
 }
 
 let DeleteLoading = function(id){
     let selector = $(`#${id}`) ;
     selector.css({
         "height": "0",
         "width": "0"
     });
     selector.text("");
}
