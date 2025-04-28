

var output_ele = document.getElementsByTagName("span");
//jsonファイルからの読み込み
let jsonData = 0;
let inputMapInst;
let reslutsMapInst;
let MapPosition = null;
window.onload = async function(){
    let jData =await fetch(" ./js/Data.json");
    jsonData = await jData.json();
    inputMapInst = new apperMap("inputMap","#manual",5);//第1引数は地図を表示するセレクタ
    reslutsMapInst = new apperMap("map",".smoke",16);
}


//手動入力欄の表示非表示
let instance1 = new manualAppearDisappear("manual","manualBtn");
let selectorObj = instance1.getSelector();
instance1.manualDisappear(selectorObj);
console.log(instance1.getSelector().htmlText);

let btnManual = function(){
    if(selectorObj.btnSelector.val() == "非表示"){
        instance1.manualDisappear(selectorObj);
    }else{
        
        instance1.manualAppear(selectorObj);
        inputMapInst.buildMap(jsonData.location.lat,jsonData.location.lon);
        inputMapInst.map.on('click',function(e){
            MapPosition = inputMapInst.getPosition(e);
        });
        
        
        
    }
}
  
let btnclicked = function(){
    doSomething(MapPosition.lat,MapPosition.lng);
}

{
    var GPS = function(){
        //output.ele[0],[1]は緯度経度の出力用
        Loading("Loading"); //Loading画面を表示する関数
        navigator.geolocation.getCurrentPosition(succses,errorCall);
        //位置情報を取得
        
    }
    
    var succses = function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        doSomething(lat,lon);
        DeleteLoading("Loading");  
    }

    function errorCall(error){
        //エラー表示と諸々の表示のリセット
        alert("位置情報が入手できませんでした");
        for(let i=0;i<output_ele.length;i++){
            output_ele[i].innerHTML = "error";
        }
        DeleteLoading("Loading");
    }
}

let doSomething = async function(lat,lon){

    output_ele[0].innerHTML = lat;
    output_ele[1].innerHTML = lon;
    
    let Weather_data = await CallApi(lat,lon,jsonData.weather);    //緯度経度を引数にAPIを呼び出す
    //地図を表示
    reslutsMapInst.mapDisappear();
    reslutsMapInst.buildMap(lat,lon);
    reslutsMapInst.makePin(lat,lon);
    console.log(Weather_data);
    resluts(Weather_data);

    
}

var resluts = function(data){
    for(let i=2;i<output_ele.length;i++){
        output_ele[i].innerHTML = "";
    }
    let alert = document.getElementById("alert");
    alert.innerHTML = "";
    let allow = document.getElementById("allow");
    allow.style.height = "0px"
    //疑似要素をjsで制御する方法が分からない
    //upper: clear before text

    output_ele[2].innerHTML = data.humidity;
    output_ele[3].innerHTML = data.windP;
    output_ele[4].innerHTML = data.windD_name;

    var divideValue = {
        humidity : 25,  //最小湿度が25%以下で火災が発生しやすく
        windP : 10, //平均風速がおおむね10m/sを超える場合に強風注意報が発令
    };
    

    if(data.humidity <= divideValue.humidity){
        alert.innerHTML += "湿度が低いため野焼きには向いていません<br>";
    }
    if(data.windP >= divideValue.windP){
        alert.innerHTML += "風速が大きいため野焼きには向いていません";
    }
    if(data.humidity > divideValue.humidity && data.windP < divideValue.windP){
        alert.innerHTML += "危険性なし<br>";
    }

    //GUI上に矢印を表示
    allow.style.height = `${data.windP*50}px`;  //風速1mあたり50px
    allow.style.transform = `rotate(${data.windD_deg + 180}deg)`;

    $("html").animate({
        scrollTop : $(".resluts").offset().top
    });
    //画面を結果欄まで自動遷移

}
