let apperMap = function(lat,lon,id){
    
    //latitude:緯度;longitude:経度
    
    //地図を表示するスペースを確保
    selector = $(`#${id}`);
    selector.width(500);
    selector.height(500);

    let map = L.map(id).setView([lat,lon],16);
    const accessUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const copyright = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

    L.tileLayer(accessUrl,{
        attribution:copyright
    }).addTo(map);

    let nowPosition = L.marker([lat,lon]).addTo(map);
    nowPosition.bindPopup("現在地").openPopup();
}
