$(function(){
	// formInputText 제어
	$(".formInputText input").bind("focusin focusout", function(){
		if ($(this).attr("value") == "") {
			$(this).siblings("label").toggleClass("hide");
		}
	});

	// formInputFile 제어
	$(".formInputFile input[type='file']").change(function(){
		$(this).parent().siblings(".fileTxt").val($(this).val());
	});
});

// formLayer 제어
var scrollTopVal;
function formLayerCtrlOpen(obj) {
	// var winHeight = $(window).height();
	var winHeight = window.innerHeight;
	$("html,body").addClass("layerOpen");
	if (obj.hasClass("applyLayer")) { //채용관 리스트 지원하기
		//var ObjOffsetTop = parseInt(obj.attr("data-objtop"));
		//var ObjHeight = parseInt(obj.attr("data-objheight"));
		//var ObjOffsetVal = ObjOffsetTop - winHeight + objContent + ObjHeight;
		//$(window).scrollTop(ObjOffsetVal);
	} else {
		scrollTopVal = $(window).scrollTop();

		// 레이어 열렀을때 백그라운드 스크롤 제거를 위해 적용
		$("html,body").addClass('layerOpen');

		if(obj.find(".layerWrap").height() >= winHeight) {
			obj.find(".layerContents").css("height",winHeight - 200 + "px");
		}

		obj.find(".layerWrap").css("margin-top","-" + (obj.find(".layerWrap").height() / 2) + "px");
		// 레이어 안에 input 포커싱 일 때 키보드 때문에
		var layerTop = parseInt(obj.find(".layerWrap").css("margin-top"));
		$(window).bind("resize",function(){
			var winHeightGap = winHeight - $(this).height();
			if (winHeightGap >= 0 && $(this).height() <= obj.find(".layerWrap").height()) {
				obj.find(".layerWrap").css("margin-top", layerTop + (winHeightGap / 2) + "px");
			} else {
				obj.find(".layerWrap").css("margin-top", layerTop + "px");
				winHeight = $(this).height();
			}
		});
	}
}

var winHeightOrgin = $(window).height();
function formLayerCtrl(obj) {
	var ua = window.navigator.userAgent;
	var isAndroid = ua.indexOf('Android');
	var winHeightChange = $(window).height() + 130;
	// var androidVersion = parseFloat(ua.slice(isAndroid+8));

	// if (isAndroid >= 0 && androidVersion <= 4.4) { //킷캣 이하 버전
	if (isAndroid >= 0) {
		if (winHeightOrgin > winHeightChange) {	//입력창 구분 체크
			setTimeout(function() {
				formLayerCtrlOpen(obj);
			}, 500);
		} else {
			formLayerCtrlOpen(obj);
		}
	} else {
		formLayerCtrlOpen(obj);
	}
}

// formLayer 닫기
function formLayerClose() {
	$("html,body").removeClass("layerOpen");
	$("body").css("height","auto");
	$('.formLayer, .formLayer1, .bizFormLayer, .biz__layer-wrap, .layer-pop').hide();
	$("html, body").animate({
		scrollTop : scrollTopVal
	}, 100);
}

// 클릭수저장
function clickCounterJQuery(_catcd) {
	try{
		jQuery.ajax({
			type : "POST",
			url : "/rsc/ajax/ajaxClickCounter.asp",
			data : "catcd=" + _catcd,
			success : function(resultText) {return true},
			error: function() {return true}
		});
	}
	catch (e){
		return true;
	}
}

// JS Lazy 로딩
function loadJS(url, callfunc) {
	var blnLoaded = false;
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.async = true;
	s.src = url;
	s.onreadystatechange = function() {
		if (this.readyState == "loaded" || this.readyState == "complete") {
			if (blnLoaded) return;
			blnLoaded = true;
			callfunc();
		}
	}
	s.onload = function() {callfunc();};
	document.getElementsByTagName("head")[0].appendChild(s);
	//console.log(url);
}