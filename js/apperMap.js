let map = null;

let apperMap = function(lat,lon,map_id,map_parent_class){
    
    //latitude:緯度;longitude:経度
    
    //地図を表示するスペースを確保
    let win = $(window);  //画面幅
    let parent = $(`.${map_parent_class}`);
    let selector = $(`#${map_id}`);

    if(map){
        map.remove()
        map = null;
    }

    let map_len = "500px";  //初期値
    if(win.width()>600){
        map_len = "500px";
    }else{
        map_len = `${parent.width()}px`;    //map_idの親要素のwidth
    }
    selector.width(map_len);
    selector.height(map_len);
    

    map = L.map(map_id).setView([lat,lon],16);
    const accessUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const copyright = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

    L.tileLayer(accessUrl,{
        attribution:copyright
    }).addTo(map);

    let nowPosition = L.marker([lat,lon]).addTo(map);
    nowPosition.bindPopup("現在地").openPopup();
}
