var areaCount = 0;
document.addEventListener('DOMContentLoaded', function(){
	initPage();
	document.getElementById('addButton').addEventListener('click', addArea, false);
});
function getWeatherForecast(event) {
	document.getElementById(event.target.id + "-div").textContent = event.target.options[event.target.selectedIndex].text;
	GetWeatherForecast.displayWeather(event.target.value, event.target.id.replace('select-area', ''));
}
function initPage() {
	var DEFAULT_MSG  = "エリアを選択";
	var templateArea = document.createElement('select');
	templateArea.setAttribute('id', 'area_template');
	var defaultOption = document.createElement('option');
	defaultOption.textContent = DEFAULT_MSG;
	defaultOption.hidden = true;
	templateArea.appendChild(defaultOption);
	var appendHtml = '';
	Object.keys(P_list).forEach(function(key) {
		if (key != "0") {
			if (key == "1") {
				appendHtml = appendHtml + "<optgroup label='北海道'>" + P_list[key].replace(/selected=\'selected\'/g, '') + "</optgroup>";
			} else {
				appendHtml = appendHtml + P_list[key].replace(/selected=\'selected\'/g, '');
			}
		}
	});
	templateArea.insertAdjacentHTML('beforeend', appendHtml);

	document.getElementsByClassName('areaInfo')[0].prepend(templateArea);
	
	// エリアのselect要素をコピー
	addArea();
}
function addArea() {
	var DELETE_CAPTION = "この行を削除";
	var newArea = document.getElementById('area_template').cloneNode(true);
	newArea.setAttribute('id', 'select-area' + String(areaCount));
	var ulObj = document.createElement('ul');
	ulObj.setAttribute('id', String(areaCount));
	var areaLiObj = document.createElement('li');
	areaLiObj.classList.add('select-area');
	var areaDivObj = document.createElement('div');
	areaDivObj.setAttribute('id', 'select-area' +  String(areaCount) + "-div");
	areaDivObj.classList.add('areaName');
	var removeButtonObj = document.createElement('div');
	removeButtonObj.textContent = DELETE_CAPTION;
	removeButtonObj.classList.add('remove-button');
	removeButtonObj.setAttribute('data-id', String(areaCount));
	removeButtonObj.addEventListener('click', removeArea, false);
	areaLiObj.appendChild(newArea);
	areaLiObj.appendChild(removeButtonObj);
	areaLiObj.appendChild(areaDivObj);
	ulObj.appendChild(areaLiObj);
	var WEEK_DAYS = 17;
	for (var i = 0; i < WEEK_DAYS; i++) {
		var dayLiObj = document.getElementById('template-forecast-li').cloneNode(true);
		dayLiObj.setAttribute('id', String(areaCount) + '-' + String(i));
		ulObj.appendChild(dayLiObj);
	}
	document.getElementById('display-forecast').appendChild(ulObj);
	newArea.addEventListener('change', getWeatherForecast, false);
	areaCount++;
}
function removeArea(event) {
	var targetObj = document.getElementById(String(event.target.getAttribute('data-id')));
	targetObj.parentNode.removeChild(targetObj);
}
