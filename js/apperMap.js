let apperMap = function(lat,lon,id){
    
    //latitude:緯度;longitude:経度
    
    //地図を表示するスペースを確保
    let win_width = $(window).width();  //画面幅
    let selector = $(`#${id}`);
    let map_len = "500px";  //初期値
    if(win_width>600){
        map_len = "500px";
    }else{
        map_len = `${win_width*0.85}px`;    //画面幅の85%
    }
    selector.width(map_len);
    selector.height(map_len);
    

    let map = L.map(id).setView([lat,lon],16);
    const accessUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const copyright = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

    L.tileLayer(accessUrl,{
        attribution:copyright
    }).addTo(map);

    let nowPosition = L.marker([lat,lon]).addTo(map);
    nowPosition.bindPopup("現在地").openPopup();
}
