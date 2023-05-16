var GetWeatherForecast = {
	getWeather : function(areaId) {
		var jsonId = '1';
		Object.keys(P_list).forEach(function(key) {
			if (key != '0' && P_list[key].indexOf(areaId) > 0) {
				jsonId = key;
			}
		});
		var url = "https://forecast.weathermap.jp/public_datas/fcst_json/fcst-" + jsonId + ".json?" + String(new Date().getTime());
		return $.ajax({
			url: 'php/cdxml.php',
			type: 'GET',
			dataType: 'json',
			data: {
				url: url
			}
		});
	},
	displayWeather : function(areaId, elemId) {
		this.getWeather(areaId).done(function(data, status) {
			GetWeatherForecast.setForecastData(data, areaId, elemId);
		}).fail(function(jqXHR, status) {
			console.log(jqXHR + status);
		}).always(function(jqXHR) {
		});
	},
	setForecastData : function(data, areaId, elemId) {
		var DATE_TEXT = "date-text";
		var IMG_ICON = "forecast-icon";
		var IMG_DIR = "https://forecast.weathermap.jp/assets/images/telop_57x43/"
		var TEMP_MAX = "temp-max";
		var TEMP_MIN = "temp-min";
		var RAIN_RATE = "rain-rate";
		var RELIABLE = "reliability";
		
		for (var i = 0; i < 17; i++) {
			var setLi = document.getElementById(elemId + "-" + i);
			var setObj = setLi.getElementsByClassName(DATE_TEXT)[0];
			setObj.textContent = data["dates"]["D"+i];
			setObj = setLi.getElementsByClassName(IMG_ICON)[0];
			setObj.setAttribute('src', IMG_DIR + data[areaId]["D"]["weather"]["D"+i] + ".png");
			setObj = setLi.getElementsByClassName(TEMP_MAX)[0];
			setObj.textContent = data[areaId]["D"]["T_max"]["D"+i];
			if (setObj.textContent == "") {
				setObj.textContent = "-";
			}
			setObj = setLi.getElementsByClassName(TEMP_MIN)[0];
			setObj.textContent = data[areaId]["D"]["T_min"]["D"+i];
			if (setObj.textContent == "") {
				setObj.textContent = "-";
			}
			setObj = setLi.getElementsByClassName(RAIN_RATE)[0];
			setObj.textContent = Math.floor(parseInt(data[areaId]["D"]["P_rain"]["D"+i])/5+0.5)*5+"%";
			setObj = setLi.getElementsByClassName(RELIABLE)[0]
			setObj.textContent = data[areaId]["D"]["conf"]["D"+i];
		}
	}
}
