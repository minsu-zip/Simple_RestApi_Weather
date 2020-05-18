// default 서울
select_city("Seoul");


function select_city(city) {
    // api Current Weather Data
    var ApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bf33cd622a6f84f143c300c0757e43d3";

    $.ajax({
        url: ApiUrl,
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            Live_Weather(data);
        },
     
    })

    //  api  5 day / 3 hour forecast data
    var targeturi = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",KR&appid=bf33cd622a6f84f143c300c0757e43d3";
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: targeturi,
        data: {
        },
        success: function (data) {
            Day_Weather(data);

        }
    });

}

// 현재 도시의 실시간 날씨 스크립트
function Live_Weather(data) {
    var imaURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $("#Weather-main").html(data.name);
    $('#Weather-img').attr("src", imaURL);
    var text = "날씨: " + data.weather[0].main;
    text += "<br> 온도: " + Math.floor(data.main.temp - 273.15);
    text += "<br> 바람: " + data.wind.speed + "m/s";
    text += "<br> 구름: " + data.clouds.all + "%";
    $('#Weather').html(text);
}


// 오늘날짜 구하기
let today = new Date();
var year = today.getFullYear(); // 년도
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var date = today.getDate();  // 날짜


// 현재 도시의 5day / 3hour 정보
function Day_Weather(data) {
    var wf = "";
    wf += "<h5>현재 " + data.city.name + "도시의 3시간 간격 날씨 간격입니다. </h2>";

    var wf2 = "";
    wf2 += "<h5>현재 " + data.city.name + "도시의 5일간 날씨 정보입니다. </h2>";

    $.each(data.list, function (index, val) {

        var str = val.dt_txt.split(" ");

        // 현재 날짜에 대한 3시간 간격 날씨
        if (str[0] == (year + '-' + month + '-' + date)) {
            wf += str[1];
            wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>";
            wf += ((val.main.temp) - 273.15).toFixed(1) + "'c ";
            wf += val.wind.speed + ("m/s <br>");
        }

        var str2 = val.dt_txt.split(" ");

        // 5일간의 날씨 중 12:00만 보고 싶을때 
        if (str[1] == "12:00:00") {
            wf2 += str[0];
            wf2 += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>";
            wf2 += ((val.main.temp) - 273.15).toFixed(1) + "'c ";
            wf2 += val.wind.speed + ("m/s <br>");
        }
    });
    $("#demo").html(wf);
    $("#demo2").html(wf2);
}