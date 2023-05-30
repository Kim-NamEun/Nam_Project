/**
 * common js 컨트롤 클래스
 *
 * 인스턴스를 생성
 * var _commonctrl = new CommonCtrl('');
 *
 * @date    : 2023-05-19
 * @author  : Kim,Nam-Eun
 * @moddate : 2023-05-19
 * @caution : Common에 사용되는 함수는 json형태의 parameter로 전달 (확장성 고려)
 */

var CommonCtrl = function(param) {
	// jquery Verson
	this.strVersion			= (typeof(param.version) != "undefined") ? param.version : "";
	// 전화번호(정규식)
	this.strRegTel				= /^\d{2,4}-\d{3,4}-\d{4}$/;
	// 연락처포함여부(정규식)
	this.strRegExistTel			= /[\d|일|이|삼|사|오|육|칠|팔|구|공]{2,4}[-|.|_|/|\s]{0,3}[\d|일|이|삼|사|오|육|칠|팔|구|공]{3,4}[-|.|_|/|\s]{0,3}[\d|일|이|삼|사|오|육|칠|팔|구|공]{4}/;
	// 대표전화(정규식) ****-****
	this.strRegKeyTel 			= /^\d{4}-\d{4}$/;
	// 사업자번호(정규식)
	this.strRegComReg			= /^\d{3}-\d{2}-\d{5}$/;
	// 주민번호(정규식)
	this.strRegJumin			= /^\d{7}-\d{8}$/;
	// 이메일(정규식)
	this.strRegEmail			= /^([0-9a-zA-Z_\-\.]+)@([0-9a-zA-Z_\-\.]+)\.([a-zA-Z]{2,4})$/;
	// 숫자(정규식)
	this.strRegNumeric			= /[^0-9]/;
	// 알파벳(정규식)
	this.strRegAlpha			= /[^a-z]/i;
	// 알파벳&숫자(정규식)
	this.strRegAlphaNumeric		= /[^a-z0-9]/i;
	// 한글&알파벳&숫자(정규식)
	this.strRegHangulAlphaNumeric = /[^가-힣a-z0-9]/i;
	// 특수문자(정규식)
	this.strRegSpecial = /[!@\\#$^*"`∙·•€£¥《》¡¿<>=★♣■☎♥▶◀◆※☆○●◎◇□△▲▽▼→←↑↓↔〓◁▷♤♠♡♧⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☜☞¶‡↕↗↙↖↘♭♩♪♬㉦、。¿¤〃≠±≪≫×÷∏∑∧∨∩∪∫≒≡≤≥⊃⊆⊇⊥⌒⇒⇔§®°∬♀♂¼½¾ÆđÐĦºØßÞ;─━│┃┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋]/gi;
	// 특정특수문자중복(정규식)
	this.strRegSpecialDouble	= "-+()[]%&,.㈜㈔'/";
	// 숫자콤마추가(정규직)
	this.strRegNumberComma		= /(^[+-]?\d+)(\d{3})/;
	// 홈페이지 정규식
	this.strRegHomepage = /^((([a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))|(([0-9]{1,3}\.){3}([0-9]{1,3})))((\/|\\?)[a-z0-9~#%&'_\+=:\?\.-]*)*)$/;
	//이모티콘 체크(정규식)
	this.strRegEmojis = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	//날짜포멧 체크 (정규식) YYYY-MM-DD 형식
	this.strRegDate = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	// 제목 특수문자(정규식)
	this.strRegTitleSpecial = /[@\\#$^*"`•€£¥《》¡¿<>=★♣■☎♥▶◀◆※☆○●◎◇□△▲▽▼→←↑↓↔〓◁▷♤♠♡♧⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☜☞¶‡↕↗↙↖↘♭♩♪♬㉦、。¿¤〃≠±≪≫×÷∏∑∧∨∩∪∫≒≡≤≥⊃⊆⊇⊥⌒⇒⇔§®°∬♀♂¼½¾ÆđÐĦºØßÞ;─━│┃┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋]/gi;
	// 해당 문자만 허용
	this.strRegNotSpecial = /[^ㄱ-ㅎ가-힣a-zA-Z0-9ㅏ-ㅣ\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55\~\<\>\?\＇\ㆍ\ᆢ\-\+\(\)\[\]\%\&\,\.\㈜\㈔\'\/\s]/g
};

// CommonCtrl prototype
CommonCtrl.prototype = {
	/**
	 * Undefinded 체크
	 *
	 * @param obj
	 * @return true or false
	 */
	isUndefined: function(obj) {
		return typeof(obj) != "undefined" ? true : false;
	},

	/**
	 * 정규식 패턴 비교
	 *
	 * _commonctrl.isRegulation({type:'TEXT', txt:'txt'});
	 *
	 * @param type (패턴타입)
	 * @param txt  (문자열)
	 * @return true or false
	 */
	isRegulation: function(param) {
		var strType						= this.isUndefined(param.type) ? param.type.toUpperCase() : "";
		var strTxt						= this.isUndefined(param.txt) ? param.txt : "";

		var strState					= "";
		var strRegTel					= this.strRegTel;
		var strRegExistTel				= this.strRegExistTel;
		var strRegKeyTel				= this.strRegKeyTel;
		var strRegComReg				= this.strRegComReg;
		var strRegJumin					= this.strRegJumin;
		var strRegEmail					= this.strRegEmail;
		var strRegNumeric				= this.strRegNumeric;
		var strRegAlpha					= this.strRegAlpha;
		var strRegAlphaNumeric			= this.strRegAlphaNumeric;
		var strRegHangulAlphaNumeric	= this.strRegHangulAlphaNumeric;
		var strRegSpecial				= this.strRegSpecial;
		var strRegSpecialDouble			= this.strRegSpecialDouble;
		var strRegHomepage				= this.strRegHomepage;
		var strRegEmojis				= this.strRegEmojis;
		var strRegDate					= this.strRegDate;
		var strRegTitleSpecial			= this.strRegTitleSpecial;
		var strRegNotSpecial			= this.strRegNotSpecial;


		try {
			var regTypeJson = {
				// ****(2,4)-****(3,4)-****(4)
				"TEL": function(strTxt) {
					if (strRegTel.test(strTxt)) {
						return true;
					} else {
						// ****(4)-****(4)
						return (strRegKeyTel.test(strTxt)) ? true : false;
					}
				},
				// ****(2,4)-****(3,4)-****(4)
				"EXISTTEL": function(strTxt) {
					if (strRegExistTel.test(strTxt)) {
						return true;
					} else {
						return false;
					}
				},
				// ***(3)-**(2)-*****(5)
				"COMREG": function(strTxt) {
					return (strRegComReg.test(strTxt)) ? true : false;
				},
				// ******(7)-*******(8)
				"JUMIN": function(strTxt) {
					return (strRegJumin.test(strTxt)) ? true : false;
				},
				// ****@***.***
				"EMAIL": function(strTxt) {
					return (strRegEmail.test(strTxt)) ? true : false;
				},

				"NUMERIC": function(strTxt) {
					return (strRegNumeric.test(strTxt)) ? false : true;
				},

				"ALPHA": function(strTxt) {
					return (strRegAlpha.test(strTxt)) ? false : true;
				},

				"ALPHANUMERIC": function(strTxt) {
					return (strRegAlphaNumeric.test(strTxt)) ? false : true;
				},

				"HANGULALPHANUMERIC": function(strTxt) {
					return (strRegHangulAlphaNumeric.test(strTxt)) ? false : true;
				},

				"SPECIAL": function(strTxt) {
					strRegSpecial.lastIndex = 0; //정규식에 플래그 g 가 포함 될 경우 초기화해야 처음부터 다시 찾음
					return (strRegSpecial.test(strTxt)) ? false : true;
				},

				"NOTSPECIAL": function(strTxt) {
					strRegNotSpecial.lastIndex = 0;
					return (strRegNotSpecial.test(strTxt)) ? false : true;
				},

				"SPECIALDOUBLE": function(strTxt) {
					var s;

					for (var i = 0, intMax = strRegSpecialDouble.length; i < intMax; i++) {
						s = strRegSpecialDouble.substr(i, 1);
						if (strVal.indexOf(s + s) > -1) {
							return false;
						}
					}
					return true;
				},

				"HOMEPAGE": function(strTxt) {
					return (strRegHomepage.test(strTxt)) ? true : false;
				},

				"EMOTICON": function(strTxt) {
					strRegEmojis.lastIndex = 0; //정규식에 플래그 g 가 포함 될 경우 초기화해야 처음부터 다시 찾음
					return (strRegEmojis.test(strTxt)) ? true : false;
				},

				"DATE": function(strTxt) {
					return (strRegDate.test(strTxt)) ? true : false;
				},

				"TITLESPECIAL": function(strTxt) {
					strRegTitleSpecial.lastIndex = 0; //정규식에 플래그 g 가 포함 될 경우 초기화해야 처음부터 다시 찾음
					return (strRegTitleSpecial.test(strTxt)) ? true : false;
				}

			};

			strState = regTypeJson[strType];

			return strState(strTxt);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Json으로 정의된 key:value 화면출력 (Select Box, Layer ...)
	 *
	 * _commonctrl.drawOption({id:'id', empty:'Y', group:'JobStateArray', name:'JobList', key:'', val:'', selected:''})
	 *
	 * @param id      (id)
	 * @param empty   (초기화 여부)
	 * @param group   (Json 그룹명)
	 * @param name    (Json 명)
	 * @param key     (Json Key)
	 * @param val     (Json Value)
	 * @param selected(선택값)
	 */
	drawOption: function(param) {
		var strId 		= this.isUndefined(param.id) ? param.id : "";
		var strEmpty 	= this.isUndefined(param.empty) ? param.empty : "N";
		var strGroup 	= this.isUndefined(param.group) ? param.group : "";
		var strName 	= this.isUndefined(param.name) ? param.name : "";
		var strKey 		= this.isUndefined(param.key) ? param.key : "NM";
		var strVal 		= this.isUndefined(param.val) ? param.val : "CD";
		var strSelected = this.isUndefined(param.selected) ? param.selected : "";

		var strJson 	= eval(strGroup + "." + strName);
		var strTxt 		= "";

		try {
			$.each(strJson, function(index, entry) {
				if (strSelected == entry[strVal]) {
					strTxt += "<option value='" + entry[strVal] + "' selected>" + entry[strKey] + "</option>";
				} else {
					strTxt += "<option value='" + entry[strVal] + "'>" + entry[strKey] + "</option>";
				}
			});
			if (strEmpty == "Y") {
				$("#" + strId).empty();
				$("#" + strId).html(strTxt);
			} else {
				$("#" + strId).append(strTxt);
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Json으로 정의된 key:value 화면출력 (Select Box, Layer ...)
	 *
	 * _commonctrl.drawOptionMid({id:'id', empty:'Y', group:'JobStateArray', name:'JobList', mkey:'MCD', mval:'01000000', key:'', val:'', selected:''})
	 *
	 * @param id      (id)
	 * @param empty   (초기화 여부)
	 * @param group   (Json 그룹명)
	 * @param name    (Json 명)
	 * @param key     (Json Key)
	 * @param val     (Json Value)
	 * @param selected(선택값)
	 */
	drawOptionMid: function(param) {
		var strId 		= this.isUndefined(param.id) ? param.id : "";
		var strEmpty 	= this.isUndefined(param.empty) ? param.empty : "N";
		var strGroup 	= this.isUndefined(param.group) ? param.group : "";
		var strName 	= this.isUndefined(param.name) ? param.name : "";
		var strMkey 	= this.isUndefined(param.mkey) ? param.mkey : "MCD";
		var strMval 	= this.isUndefined(param.mval) ? param.mval : "";
		var strKey 		= this.isUndefined(param.key) ? param.key : "NM";
		var strVal 		= this.isUndefined(param.val) ? param.val : "CD";
		var strSelected = this.isUndefined(param.selected) ? param.selected : "";

		var strJson 	= eval(strGroup + "." + strName);
		var strTxt 		= "<option value=''>직종하위</option>";

		try {
			$.each(strJson, function(index, entry) {
				if (strMval == entry[strMkey]) {
					if (entry[strMkey] != entry[strVal]) {
						if (strSelected == entry[strVal]) {
							strTxt += "<option value='" + entry[strVal] + "' selected>" + entry[strKey] + "</option>";
						} else {
							strTxt += "<option value='" + entry[strVal] + "'>" + entry[strKey] + "</option>";
						}
					}
				}
			});

			if (strEmpty == "Y") {
				$("#" + strId).empty();
				$("#" + strId).html(strTxt);
			} else {
				$("#" + strId).append(strTxt);
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 시작페이지 설정
	 *
	 * _commonctrl.setStartPage({link:'http://www.alba.co.kr'})
	 *
	 * @param link     (url 주소)
	 */
	setStartPage: function(param) {
		var strLink = this.isUndefined(param.link) ? param.link : "";

		startpage.style.behavior = "url(#default#homepage)";
		startpage.setHomePage(strLink);
	},

	/**
	 * 즐겨찾기 설정
	 *
	 * _commonctrl.setBookMark({title:'알바천국', link:'http://www.alba.co.kr', msg:''})
	 *
	 * @param title 	(즐겨찾기 제목)
	 * @param link 		(url 주소)
	 * @param msg 		(메세지)
	 */
	setBookMark: function(param) {
		var strTitle 	= this.isUndefined(param.title) ? param.title : "";
		var strLink 	= this.isUndefined(param.link) ? param.link : "";
		var strMsg 		= this.isUndefined(param.msg) ? param.msg : "확인을 클릭하신 후 Ctrl + D를 눌러주세요.";

		try {
			if (document.all) { // IE
				window.external.AddFavorite(strLink, strTitle);
			} else if (window.sidebar && window.sidebar.addPanel) { // FF
				window.sidebar.addPanel(strTitle, strLink, "");
			} else if (window.opera && window.print) { // OPERA
				var obj = document.createElement("a");
				obj.setAttribute('href',strLink);
				obj.setAttribute('title',strTitle);
				obj.setAttribute('rel','sidebar');
				obj.click();
			} else {
				alert(strMsg);
			}
		} catch (err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 스크립트 헤드 추가
	 *
	 * _commonctrl.setCreateScript({link:'www.alba.co.kr'});
	 *
	 * @param link
	 */
	setCreateScript: function(param) {
		var strLink = this.isUndefined(param.link) ? param.link : "";

		try {
			var s = document.createElement('script');
			s.type ='text/javascript';
			s.charset ='euc-kr';
			s.src = strLink;
			document.getElementsByTagName('head')[0].appendChild(s);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Script Excepion 처리
	 *
	 * @param strError
	 */
	_setException: function(strError) {
		//Exception
		var strURL = "/error/error_ok.asp?e=" + strError;

		//$.get(strURL, function(data) {});
	},

	/**
	 * get CheckBox Toggle
	 *
	 * _commonctrl.getCheckBoxToggle({id:'aa',target:'target'});
	 *
	 * @param id (Toggle ID)
	 * @param target (선택&취소 ID)
	 */
	getCheckBoxToggle: function(param) {
		var strId		=  this.isUndefined(param.id) ? param.id : "";
		var strTarget	=  this.isUndefined(param.target) ? param.target : "";

		var strChecked	= $('input:checkbox[id=' + strId + ']').is(':checked');
		$('input:checkbox[name=' + strTarget+']').attr('checked', strChecked);
	},

	/**
	 * get CheckBox Valid
	 *
	 * _commonctrl.getCheckboxValid({id:'userid'});
	 *
	 * @param id (checkbox id)
	 */
	getCheckboxValid: function(param) {
		var strId	= this.isUndefined(param.id) ? param.id : "";

		var strObj	= [];
		var strIdx	= "";

		try {
			$('input:checkbox[name=' + strId + ']:checked').each(function(){strObj.push(this.value)});
			$.each(strObj,function(index, item) {
				strIdx += (strIdx == "") ? item : ',' + item;
			});
			return strIdx;
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 체크박스 체크 수
	 *
	 * _commonctrl.getCheckboxCnt({name:'checkbox', cnt:'2', msg:'최대..', event:e});
	 *
	 * @param name 		(체크박스 명)
	 * @param cnt 		(최대 체크 수)
	 * @param msg 		(메세지)
	 */
	getCheckboxCnt: function(param) {
		var strName	= this.isUndefined(param.name) ? param.name : "";
		var intCnt	= this.isUndefined(param.cnt) ? param.cnt : 0;
		var strMsg	= this.isUndefined(param.msg) ? param.msg : "최대 " + intCnt + "까지 선택가능합니다";
		var objEvt	= this.isUndefined(param.event) ? param.event : "";

		try {
			if ($('input:checkbox[name=' + strName + ']:checked').length > intCnt) {
				alert(strMsg);
				if (objEvt != "") {
					if (objEvt.preventDefault) {
						objEvt.preventDefault();
					} else {
						event.returnValue = false;
					}
				} else {
					event.returnValue = false;
				}
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Left Pixel
	 *
	 * _commonctrl.getLeftPixel(param)
	 *
	 * @param pixel
	 * @param event
	 */
	getLeftPixel: function(param) {
		var intPixel 	= this.isUndefined(param.pixel) ? param.pixel : 0;
		var objEvent 	= this.isUndefined(param.event) ? param.event : "";

		var strLeftPixel;

		try {
			if (document.all) {												//IE
				strLeftPixel = (document.documentElement.scrollLeft + event.clientX + intPixel);
			} else {
				if (navigator.userAgent.indexOf('Chrome') > 0) {			//Chrome
					strLeftPixel = (document.body.scrollLeft + objEvent.clientX + intPixel) + 'px';
				} else {													//Firefox
					strLeftPixel = (document.documentElement.scrollLeft + objEvent.clientX + intPixel) + 'px';
				}
			}
			return strLeftPixel;
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Top Pixel
	 *
	 * _commonctrl.getTopPixel(pixel, e)
	 *
	 * @param pixel
	 * @param e (event)
	 */
	getTopPixel: function(param) {
		var intPixel 	= this.isUndefined(param.pixel) ? param.pixel : 0;
		var objEvent 	= this.isUndefined(param.event) ? param.event : "";

		var strTopPixel;

		try {
			if (document.all) {												//IE
				strTopPixel = (document.documentElement.scrollTop + event.clientY + intPixel);
			} else {
				if (navigator.userAgent.indexOf('Chrome') > 0) {			//Chrome
					strTopPixel = (document.body.scrollTop + objEvent.clientY + intPixel) + 'px';
				} else {													//Firefox
					strTopPixel = (document.documentElement.scrollTop + objEvent.clientY + intPixel) + 'px';
				}
			}
			return strTopPixel;
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 숫자 -> 콤마 return
	 *
	 * _commonctrl.formatNumber(param)
	 *
	 * @param num
	 */
	formatNumber: function(param) {
		var intNum	= this.isUndefined(param.num) ? param.num : 0;

		intNum = Number(intNum);
		intNum = String(intNum);

		while (this.strRegNumberComma.test(intNum)) {
			intNum = intNum.replace(this.strRegNumberComma, '$1' + ',' + '$2');
		}
		return intNum;
	},

	/**
	 * 팝업창 띄우기
	 *
	 * caution : 필수(name, link, width, height), 선택(그외 값, default:false)
	 * @param {position:'TL', name:'alba', link:'http://www.alba.co.kr', width:'500', height:'100', toolbar:no ...}
	 * align (TL: 왼쪽위, RT:오른쪽위, RB:오른쪽밑, LB:왼쪽밑, CE:정중앙)
	 */
	openPopup: function(param) {
		var strPosition		= this.isUndefined(param.position) ? param.position : "LT";
		var strName			= this.isUndefined(param.name) ? param.name : "";
		var strLink			= this.isUndefined(param.link) ? param.link : "";
		var intWidth		= this.isUndefined(param.width) ? param.width : 0;
		var intHeight		= this.isUndefined(param.height) ? param.height : 0;
		var strToolbar		= this.isUndefined(param.toolbar) ? param.toolbar : 'no';
		var strMenubar		= this.isUndefined(param.menubar) ? param.menubar : 'no';
		var strStatusbar	= this.isUndefined(param.statusbar) ? param.statusbar : 'no';
		var strScrollbar	= this.isUndefined(param.scrollbar) ? param.scrollbar : 'no';
		var strLocationBar	= this.isUndefined(param.locationBar) ? param.locationBar : 'no';
		var strResizable	= this.isUndefined(param.resizable) ? param.resizable : 'no';

		var intTop = 0;
		var intLeft = 0;

		try {
			switch (strPosition) {
				case "LT":
					intTop = 0;
					intLeft = 0;
					break;
				case "RT":
					intTop = 0;
					intLeft = (screen.availWidth - intWidth);
					break;
				case "RB":
					intTop = (screen.availHeight - intHeight);
					intLeft = (screen.availWidth - intWidth);
					break;
				case "LB":
					intTop = (screen.availHeight - intHeight);
					intLeft = 0;
					break;
				case "CE":
					intTop = (screen.availHeight - intHeight) / 2;
					intLeft = (screen.availWidth - intWidth) / 2;
					break;
			}

			window.open(strLink, strName, 'top=' + intTop + ',left=' + intLeft + ',width=' + intWidth + ',height=' + intHeight + ',toolbar=' + strToolbar + ',menubar=' + strMenubar + ',location=' + strLocationBar + ',status=' + strStatusbar + ',scrollbars=' + strScrollbar + ',resizable=' + strResizable);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 모달창 띄우기
	 *
	 * caution : 필수(link, width, height)
	 * @param {link:'http://www.alba.co.kr', width:'500', height:'100'}
	 */
	openModeless: function(param) {
		var strLink			= this.isUndefined(param.link) ? param.link : "";
		var intWidth		= this.isUndefined(param.width) ? param.width : 0;
		var intHeight		= this.isUndefined(param.height) ? param.height : 0;
		var strCenter		= this.isUndefined(param.center) ? param.center : "yes";
		var strHelp			= this.isUndefined(param.help) ? param.help : 'no';
		var strResizable	= this.isUndefined(param.resizable) ? param.resizable : 'no';
		var strStatus		= this.isUndefined(param.status) ? param.status : 'no';
		var intScroll		= this.isUndefined(param.scroll) ? param.scroll : 0;

		try {
			window.showModalDialog(strLink, window, 'dialogWidth:' + intWidth + 'px; dialogHeight:' + intHeight + 'px;' + 'center:' + strCenter + ';help:' + strHelp + ';resizable:' + strResizable + ';status:' + strStatus + ';scroll:' + intScroll + ';');
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Html Validator
	 *
	 * _commonctrl.chkValidator({type:'TEXT', id:'id'});
	 *
	 * @param type    (태그 체크 타입)
	 * @param id      (체크 ID)
	 */
	chkValidator: function(param) {
		var strType		= this.isUndefined(param.type) ? param.type.toUpperCase() : "";
		var strId		= this.isUndefined(param.id) ? param.id : "";

		var strState	= "";

		try {
			var chkTypeVal = {
				"TEXT": function(strId) {
					return ($.trim($("#" + strId).val()) == "") ? false : true;
				},

				"RADIO": function(strId) {
					return ($("input:radio[name=" + strId + "]:checked").length == 0) ? false : true;
				},

				"CHECKBOX": function(strId) {
					return ($("input:checkbox[name=" + strId + "]:checked").length == 0) ? false : true;
				},

				"SELECTBOX": function(strId) {
					return ($("#" + strId + " option:selected").val() == "") ? false : true;
				}
			};

			strState = chkTypeVal[strType];

			return strState(strId);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 키보드 입력된 값 체크 [숫자]
	 *
	 * _commonctrl.chkNumeric({event:e});
	 *
	 * reference
	 * 48~57 : 키보드 위쪽의 숫자키
	 */
	chkNumeric: function(param) {
		try {
			var objEvent = this.isUndefined(param) && this.isUndefined(param.event) ? param.event : event;
			var keyCode = (objEvent.keyCode) ? objEvent.keyCode : objEvent.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode != 0 && keyCode != 8 && keyCode != 37 && keyCode !=39 && keyCode != 46) {
				(objEvent.preventDefault) ? objEvent.preventDefault(): objEvent.returnValue = false;
				return false;
			} else {
				return true;
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 숫자인지 값 체크
	 */
	isNumber: function(s) {
		var re = new RegExp("[^0-9]");
		if (!re.test(s))
			return true;
		else
			return false;
	},

	/**
	 * 마우스 이벤트시 Layer 노출 및 이동 (관리자)
	 *
	 * @param id  		(해당ID)
	 * @param layer		(레이어 유무: Y)
	 */
	moEvent: function(param) {
		var strId		= this.isUndefined(param.id) ? param.id : "";
		var strLayer	= this.isUndefined(param.layer) ? param.layer : "";

		var obj			= eval("window." + strId);
		var doc			= (navigator.appVersion.indexOf("MSIE 8") > -1) ? document.body : document.documentElement

		if ( strLayer == "Y") {
			if ($("#" + strId).css("visibility") == "hidden") {
				$("#" + strId).css("visibility", "visible");
			} else {
				$("#" + strId).css("visibility", "hidden");
			}
		} else {
			if ($("#" + strId).css("visibility") == "hidden") {
				obj.style.pixelLeft = doc.scrollLeft + event.x - 1;
				obj.style.pixelTop = doc.scrollTop + event.y - 1;
				$("#" + strId).css("visibility", "visible");
			} else {
				$("#" + strId).css("visibility", "hidden");
			}
		}
	},

	/**
	 * URL 이동
	 *
	 * _commonctrl.goUrl({confirm:'Y', ment:'삭제하시겠습니까?', link:'www.alba.co.kr', submit:'', id:'', method:'post', iframe:"Y"});
	 *
	 * @param confirm (컨펌 여부)
	 * @param ment    (컨펌시멘트)
	 * @param link 	  (이동페이지)
	 * @param submit  (Submit 여부)
	 * @param id 	  (form ID)
	 * @param method  (form 방식)
	 * @param iframe  (아이프레임 여부 - name & id 는 반드시 "ifrm")
	 */
	goUrl: function(param) {
		var strConfirm	= this.isUndefined(param.confirm) ? param.confirm : "N";
		var strMent		= this.isUndefined(param.ment) ? param.ment : "";
		var strLink		= this.isUndefined(param.link) ? param.link : "";
		var strSubmit	= this.isUndefined(param.submit) ? param.submit: "N";
		var strId		= this.isUndefined(param.id) ? param.id: "";
		var strMethod	= this.isUndefined(param.method) ? param.method: "get";
		var strIframe	= this.isUndefined(param.iframe) ? param.iframe: "N";
		var strTarget	= this.isUndefined(param.target) ? param.target: "_self";

		try {
			if (strConfirm == "Y") {
				if (confirm(strMent)) {
					this._goSubmitOrHref(strIframe, strLink, strSubmit, strId, strMethod, strTarget);
				} else {
					return false;
				}
			} else {
				this._goSubmitOrHref(strIframe, strLink, strSubmit, strId, strMethod, strTarget);
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * Submit Or Href 이동
	 *
	 * @param strIframe
	 * @param strLink
	 * @param strSubmit
	 * @param strId
	 * @param strMethod
	 */
	_goSubmitOrHref: function(strIframe, strLink, strSubmit, strId, strMethod, strTarget) {
		try {
			if (strIframe == "Y") {
				if (strSubmit == "Y") {
					$("#" + strId).attr("target", "ifrm");
					$("#" + strId).attr("method", strMethod);
					$("#" + strId).attr("action", strLink);
					$("#" + strId).submit();
				} else {
					ifrm.location.href = strLink;
				}
			} else {
				if (strSubmit == "Y") {
					$("#" + strId).attr("target", strTarget);
					$("#" + strId).attr("method", strMethod);
					$("#" + strId).attr("action", strLink);
					$("#" + strId).submit();
				} else {
					document.location.href = strLink;
				}
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 텍스트박스의 입력길이 리턴
	 *
	 * _commonctrl.chkTextNum({id:'',size:'',target:'',msg:''});
	 *
	 * @param id 		(id)
	 * @param size 		(제한글자 수)
	 * @param target 	(글자 입력수)
	 * @param msg 		(메세지)
	 */
	chkTextNum: function (param) {
		var strId		= this.isUndefined(param.id) ? param.id : "";
		var intSize		= this.isUndefined(param.size) ? param.size: 0;
		var strTarget	= this.isUndefined(param.target) ? param.target : "";
		var strMsg		= this.isUndefined(param.msg) ? param.msg : intSize + "자까지만 입력가능 합니다";

		var strVal		= $("#" + strId).val();
		var intLen		= strVal.length;

		try {
			if (intLen > intSize) {
				alert(strMsg);
				$("#" + strId).val(strVal.substring(0, intSize));
				return false;
			}
			$("#" + strTarget).html(intLen);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 텍스트박스의 입력 Byte 리턴
	 *
	 * _commonctrl.chkTextByte({id:'',size:'',target:''});
	 *
	 * @param id 		(id)
	 * @param size 		(제한글자 수)
	 * @param target 	(글자 입력수)
	 * @param msg 		(메세지)
	 */
	chkTextByte: function(param) {
		var strId		= this.isUndefined(param.id) ? param.id : "";
		var intSize		= this.isUndefined(param.size) ? param.size: 0;
		var strTarget	= this.isUndefined(param.target) ? param.target : "";
		var strMsg		= this.isUndefined(param.msg) ? param.msg : intSize + "Byte까지만 입력가능 합니다";

		var strVal		= $("#" + strId).val();
		var intLen		= strVal.length;
		var intL		= 0;

		try {
			for (var i = 0; i < intLen; i++) {
				intL += (strVal.charCodeAt(i) > 128) ? 2 : 1;

				if (intL > intSize) {
					alert(strMsg);
					$("#" + strId).val(strVal.substring(0, i));
					return false;
				}
			}
			$("#" + strTarget).html(intL);
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 이메일 SelectBox onChange 이벤트 발생시
	 *
	 * _commonctrl.chgEmail({id:'',target:''});
	 *
	 * @param id 		(id)
	 * @param target 	(타겟 id)
	 */
	chgEmail: function(param) {
		var strId		= this.isUndefined(param.id) ? param.id : "";
		var strTarget	= this.isUndefined(param.target) ? param.target : "";

		try {
			if ($("#" + strId).val() != "") {
				$("#" + strTarget).attr("readonly", true);
				$("#" + strTarget).val($("#" + strId).val());
			} else {
				if ($("#" + strId + " option").index($("#" + strId + " option:selected")) > 0 && $("#" + strId).val() == "") {
					$("#" + strTarget).attr("readonly", false);
					$("#" + strTarget).val("");
					$("#" + strTarget).focus();
				} else {
					$("#" + strTarget).val("");
					$("#" + strTarget).attr("readonly", true);
				}
			}
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 특수문자 제한
	 *
	 * _commonctrl.chkSpecial({id:''});
	 *
	 * @param id 	(대상 id)
	 * @param msg1 	(특수문자 제한 메세지)
	 * @param msg2 	(동일 특수문자 2회 제한 메세지)
	 */
	chkSpecial: function(param) {
		var strId	= this.isUndefined(param.id) ? param.id : "";
		var strVal	= $("#" + strId).val();
		var strMsg1 = this.isUndefined(param.msg1) ? param.msg1 : strVal + "에는 허용된 특수문자( - + ( )[ ] % & , . ㈜ ㈔ ' / )\n\n외에는 입력 불가합니다.";
		var strMsg2 = this.isUndefined(param.msg2) ? param.msg2 : "동일한 특수문자를 2회 이상 입력이 불가능합니다.\n" + strVal + "을 다시 한번 확인 해 주세요.";

		try {
			if (this.strRegSpecial.test(strVal)) {
				if (strMsg1 != "") {
					alert(strMsg1);
				}
				$("#" + strId).val(strVal.replace(this.strRegSpecial, ""));
				return true;
			}
			var s;
			for (var i = 0, intMax = this.strRegSpecialDouble.length; i < intMax; i++) {
				s = this.strRegSpecialDouble.substr(i, 1);
				if (strVal.indexOf(s + s) > -1) {
					alert(strMsg2);
					$("#" + strId).val(strVal.replace(s + s, ""));
					return true;
				}
			}
			return false;
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	/**
	 * 문자열 체크
	 *
	 * _commonctrl.chkInStr({strchar:'', sch:'', len:''});
	 *
	 * @param strchar	(대상 문자열)
	 * @param sch		(찾을 문자)
	 * @param len		(길이)
	 */
	chkInStr: function(param) {
		var strChar		= this.isUndefined(param.strchar) ? param.strchar : "";
		var strSch		= this.isUndefined(param.sch) ? param.sch : "";
		var strLen		= this.isUndefined(param.len) ? param.len : "";
		var i;
		var intMax		= strChar.length;
		for (var i = 0; i < intMax; i++) {
			if (strSch == strChar.substring(i, i + strLen)) {
				return true;
				break;
			}
		}
		return false;
	},

	/**
	 * 텍스트박스의 Length Byte 입력길이 리턴
	 *
	 * _commonctrl.chkTextByteNum({id:'',size:'',targetId:'' ,targetByteId:'',targetRemoveSpaceId:'',targetRemoveSpaceByteId:'',msg:''});
	 *
	 * @param id 						(input textArea id)
	 * @param size 						(제한글자 수)
	 * @param targetId					(공백 포함 글자 입력수)
	 * @param targetByteId				(공백 포함 글자 바이트 입력수)
	 * @param targetRemoveSpaceId		(공백 포함 글자 입력수)
	 * @param targetRemoveSpaceByteId	(공백 포함 글자 바이트 입력수)
	 * @param msg 						(메세지)
	 */
	chkTextByteNum: function(param) {
		var strId = this.isUndefined(param.id) ? param.id : "";
		var intSize = this.isUndefined(param.size) ? param.size : 0;
		var strTargetId = this.isUndefined(param.targetId) ? param.targetId : "";
		var strTargetByteId = this.isUndefined(param.targetByteId) ? param.targetByteId : "";
		var strTargetRemoveSpaceId = this.isUndefined(param.targetRemoveSpaceId) ? param.targetRemoveSpaceId : "";
		var strTargetRemoveSpaceByteId = this.isUndefined(param.targetRemoveSpaceByteId) ? param.targetRemoveSpaceByteId : "";
		var strMsg = this.isUndefined(param.msg) ? param.msg : intSize + "자까지만 입력가능 합니다";

		var strVal = $('#' + strId).val();	//input TextArea 입력된 값
		var intLen = strVal.length;	// input TextArea 입력된 글자수 + 공백 포함 글자수
		var byteCnt = this.textByte(strVal);	//공백 포함 바이트

		var strTrimContents = this.trim(strVal);	//공백 제거
		var textCntBlankExcept = strTrimContents.length;	//공백 미포함 글자수
		var byteCntBlankExcept = this.textByte(strTrimContents);	//공백 미포함 바이트

		try {
			//기본 제한 글자수 size 기준 체크처리
			if(intLen > intSize) {
				alert(strMsg);
				$("#" + strId).val(strVal.substring(0, intSize));
				return false;
			}

			//공백 포함
			$("#" + strTargetId).html(this.formatNumber({ num: intLen }));
			$("#" + strTargetByteId).html(this.formatNumber({ num: byteCnt }));

			//공백 미포함
			$("#" + strTargetRemoveSpaceId).html(this.formatNumber({ num: textCntBlankExcept }));
			$("#" + strTargetRemoveSpaceByteId).html(this.formatNumber({ num: byteCntBlankExcept }));
		} catch(err) {
			this._setException(err.name + ":" + err.message);
		}
	},

	textByte: function(paramText) {
		for(r = i = 0; s = paramText.toString().charCodeAt(i++); r += s >> 11 ? 2 : s >> 7 ? 2 : 1);
		return r;
	},

	trim: function(paramText) {
		return paramText.replace(/\s*/g, '');
	},

	/**
	 * 이모티콘 삭제
	 * @param id
	 */
	removeEmojis: function(strId) {
		var strVal = $("#" + strId).val();

		const regex = this.strRegEmojis;

		$("#" + strId).val(strVal.replace(regex, ''));
		return true;
	}
};