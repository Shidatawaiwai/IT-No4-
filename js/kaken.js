


var output_ele = document.getElementsByTagName("span");


alert("HTML,CSSを絶賛編集中です\n一時的に表示が崩れている可能性があります");

{
    //手動
    var btnclick =  function (){
        var input_ele = document.getElementsByTagName("input");
        let number1 = parseFloat(input_ele[1].value); //サイトに入力された値の入手
        let number2 = parseFloat(input_ele[2].value);
        let windD_name,windD_deg;

        //radioボタンの値の入手for度数法に変換
        var radio_ele = document.getElementsByName("direction");
        for(let i=0;i < radio_ele.length;i++){
            if(radio_ele[i].checked == 1){
                windD_name = radio_ele[i].value;
                windD_deg = i * 45;
            }
        }

        var dataObj ={
            humidity : number1,
            windP : number2,
            windD_name : windD_name,
            windD_deg : windD_deg,
            
            //諸々のデータをオブジェクトにまとめる
        };
        
        resluts(dataObj);    //オブジェクトを引数に指定して関数を呼び出す
    } 

    /*閾値：湿度30％、風速10m/s（要変更）*/
}

{
    var GPS = function(){
        //output.ele[0],[1]は緯度経度の出力用
        Loading("Loading"); //Loading画面を表示する関数
        navigator.geolocation.getCurrentPosition(succses,errorCall);
        //位置情報を取得
        
    }
    
    var succses = async function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        output_ele[0].innerHTML = latitude;
        output_ele[1].innerHTML = longitude;
        
        let Weather_data = await CallApi(latitude,longitude);    //緯度経度を引数にAPIを呼び出す
        //地図を表示
        apperMap(latitude, longitude,"map","smoke");//"map"は地図を表示するセレクタ
        console.log(Weather_data);
        resluts(Weather_data);

        

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
        alert.innerHTML += "問題なし";
    }

    //GUI上に矢印を表示
    allow.style.height = `${data.windP*50}px`;  //風速1mあたり50px
    allow.style.transform = `rotate(${data.windD_deg + 180}deg)`;

    $("html").animate({
        scrollTop : $(".resluts").offset().top
    });
    //画面を結果欄まで自動遷移

}