$(function() {
	$("#loading").hide(1000);
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22taiwan%2C%20tnn%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    var getWeather = $.getJSON(url, function(date) {
        console.log(date);
        var temp = Math.floor((date.query.results.channel.item.condition.temp - 32) * 5 / 9) + "℃";
        var weather = function(w) {
            var weatherText = "";
            var weatherIcon = "";
            switch (w) {
                case 'Thunderstorms':
                    weatherText = '雷雨';
                    weatherIcon = 'wi-thunderstorm';
                    break;
                case 'Showers':
                    weatherText = '陣雨';
                    weatherIcon = 'wi-showers';
                    break;
                case 'Mostly Cloudy':
                    weatherText = '晴時多雲';
                    weatherIcon = 'wi-day-cloudy';
                    break;
                case 'Scattered Showers':
                    weatherText = '局部陣雨';
                    weatherIcon = 'wi-sprinkle';
                    break;
                case 'Partly Cloudy':
                    weatherText = '局部有雲';
                    weatherIcon = 'wi-day-cloudy-high';
                    break;
                case 'Rain':
                    weatherText = '雨天';
                    weatherIcon = 'wi-rain';
                    break;
                case 'Cloudy':
                    weatherText = '多雲';
                    weatherIcon = 'wi-cloudy';
                    break;
                case 'Mostly Sunny':
                    weatherText = '晴偶有雲';
                    weatherIcon = 'wi-day-sunny';
                    break;
                case "Sunny":
                    weatherText = "晴天";
                    weatherIcon = "wi-day-sunny";
                    break;
            }
            return [weatherText, weatherIcon];
        };
        $(".weather").html("<div class='wi " + weather(date.query.results.channel.item.forecast[0].text)[1] + " card' >" + "<p>" + date.query.results.channel.location.country + ", " + date.query.results.channel.location.region + "</p><p>" + weather(date.query.results.channel.item.forecast[0].text)[0] + ", " + temp + "</p>");
        for (var i = 1; i < 8; i++) {
            var low = Math.floor((date.query.results.channel.item.forecast[i].low - 32) * 5 / 9) + "℃";
            var high = Math.floor((date.query.results.channel.item.forecast[i].high - 32) * 5 / 9) + "℃";
            var day = "";
            switch (date.query.results.channel.item.forecast[i].day) {
                case 'Mon':
                    day = '星期一';
                    break;
                case 'Tue':
                    day = '星期二';
                    break;
                case 'Wed':
                    day = '星期三';
                    break;
                case 'Thu':
                    day = '星期四';
                    break;
                case 'Fri':
                    day = '星期五';
                    break;
                case 'Sat':
                    day = '星期六';
                    break;
                case 'Sun':
                    day = '星期日';
                    break;
            }
            $(".forecast").append("<div class='wi " + weather(date.query.results.channel.item.forecast[i].text)[1] + " card' ><p>" + date.query.results.channel.item.forecast[i].date + ", " + day+ "</p>" + "<p>" + weather(date.query.results.channel.item.forecast[i].text)[0] + ", " + low + "~" + high+"</p>");
        }
    });

})
