	function option_create(oSelect, sNum, eNum, step, defVal, strEnd){
		var i;

		//일일 근무시간 30분 단위 추가
		if (eNum == 24) {
			oSelect.options[oSelect.length] = new Option("30분", 0.5);
			for (i=sNum; i<=eNum; i+=step) {
				oSelect.options[oSelect.length] = new Option(i+strEnd, i);
				if (String(i) == String(defVal)) oSelect.options[oSelect.length-1].selected = true;
				if (i < 24) oSelect.options[oSelect.length] = new Option(i+strEnd+"30분", i+0.5);
			}
		} else {
			for (i=sNum; i<=eNum; i+=step) {
				oSelect.options[oSelect.length] = new Option(i+strEnd, i);
				if (String(i) == String(defVal)) oSelect.options[oSelect.length-1].selected = true;
			}
		}
	}

	//환산할 급여타입
	function getpayTypeAfter(val,sel) {
		var strSelected = "";

		$("#payTypeAfter option").remove();

		$.each($("#payTypeBefore option"),function(){
			if (val != $(this).val()){
				strSelected = (sel == $(this).val()) ? "selected = 'selected'" : ""
				$("#payTypeAfter").append("<option value='" + $(this).val() + "' " + strSelected + ">" + $(this).text() + "</option>");
			}
		});

		if (val == "1")
		{
			$("#payment").text("시급");
		}
		else if (val == "2")
		{
			$("#payment").text("일급");
		}
		else if (val == "3")
		{
			$("#payment").text("주급");
		}
		else if (val == "4")
		{
			$("#payment").text("월급");
		}
		else if (val == "5")
		{
			$("#payment").text("연봉");
		}

		// 근무시간/근무일수 display 처리
		displayDayTime();

		//예상 시급/일급/주급/월급 텍스트
		displayLayerText();

		//주휴수당 display 처리
		displayHolidayPay();
	}

	// 변환값에 따른 스타일정의
	function displayDayTime() {
		var PTypeB	= $.trim($("#payTypeBefore").val());
		var PTypeA	= $.trim($("#payTypeAfter").val());

		//일일 근무시간
		$("#li_perDay").css("display",((PTypeB != "1" && PTypeA != "1") && (PTypeB != "2" || PTypeA > "5") ? "none":"block"));
		//일주 근무일수
		$("#li_perWeek").css("display",(((PTypeB != PTypeA && PTypeB < "3" && PTypeA < "3") || ((PTypeB != PTypeA && PTypeB > "2" && PTypeA > "2"))) ? "none":"block"));
		//한달 근무일수
		$("#li_perMonth").css("display",(("1" < PTypeB < "4" && "1" < PTypeA < "4" || (PTypeB =="5" && PTypeA =="4" || PTypeB =="4" && PTypeA =="5")) ? "none":"block"));
		//주 연장 근무시간
		$("#li_perWeekOvertime").css("display",((PTypeB =="1" && PTypeA =="3") ? "block":"none"));
		//월 연장 근무시간
		$("#li_perMonthOvertime").css("display",((PTypeB =="1" && PTypeA =="4") ? "block":"none"));

		//숨김일때 옵션초기화
		option_init(  $("#li_perDay").css("display")
					, $("#li_perWeek").css("display")
					, $("#li_perMonth").css("display"));
		/*
		option_init(  $("#li_perDay").css("display")
					, $("#li_perWeek").css("display")
					, $("#li_perMonth").css("display")
					, $("#li_perWeekOvertime").css("display")
					, $("#li_perMonthOvertime").css("display"));
		*/

		/*
		option_init(  $("#li_perDay").css("display")
					, $("#li_perWeek").css("display")
					, $("#li_perMonth").css("display")
					, $("#li_perYear").css("display"));
		*/
	}

	// 변환된 값에 따른 result 텍스트 정의
	function displayLayerText() {
		var PTypeB	= $.trim($("#payTypeBefore").val());
		var PTypeA	= $.trim($("#payTypeAfter").val());

		$('[id^="cal"]').hide();
		$("#cal" + $.trim($("#payTypeAfter").val())).show();

		$("#WeekOvertime").css("display",((PTypeB =="1" && PTypeA =="3") ? "block":"none"));
		$("#MonthOvertime").css("display",((PTypeB =="1" && PTypeA =="4") ? "block":"none"));
	}

	//환산하기
	function calculate() {
		var PTypeB		=  $.trim($("#payTypeBefore").val());
		var PTypeA		=  $.trim($("#payTypeAfter").val());
		var PayOrigin	=  $.trim($("#payOrigin").val());
		var perDay		=  $.trim($("#perDay").val());
		var perWeek		=  $.trim($("#perWeek").val());
		var perMonth	=  $.trim($("#perMonth").val());
		var perWeekOT	=  $.trim($("#perWeekOvertime").val());
		var perMonthOT	=  $.trim($("#perMonthOvertime").val());

		var payResult	= 0;
		var payResultHoliday = 0;

		var payResultWeekOvertime = 0;		//주 연장수당
		var payResultMonthOvertime = 0;		//월 연장수당

		//최저시급임시변수
		var tempPayResult1= 0;
		var tempPayResult2 = 0;

		var tempPayResultHoliday1 = 0;
		var tempPayResultHoliday2 = 0;
		var tempPayResultHoliday3 = 0;
		var tempPayResultHoliday4 = 0;

		$('.calculator__result, .reset__btnwrap').show();

		if ((PayOrigin == "") || (PayOrigin == "0")) {
			$("#payOriginAlert").html($("#payTypeBefore option:selected").text()+"을 입력해주세요");
			$('#payOrigin').focus();
			return;
		} else {
			$("#payOriginAlert").empty();
		}

		if ($("#perDay").val() == "" && $("#li_perDay").css("display") == "block"){
			$("#perDayAlert").html("일일 근무시간을 선택해주세요.");
			$("#perDay").focus();
			return;
		} else {
			$("#perDayAlert").empty();
		}
		if ($("#perWeek").val() == "" && $("#li_perWeek").css("display") == "block"){
			$("#perWeekAlert").html("일주 근무일수를 선택해주세요.");
			$("#perWeek").focus();
			return;
		} else {
			$("#perWeekAlert").empty();
		}
		if ($("#perMonth").val() == "" && $("#li_perMonth").css("display") == "block"){
			$("#perMonthAlert").html("한달 근무일수를 선택해주세요.");
			$("#perMonth").focus();
			return;
		} else {
			$("#perMonthAlert").empty();
		}

		PayOrigin	= PayOrigin.replace(/,/g, "");
		perDay		= (perDay == "") ? 1 : parseFloat(perDay);
		perWeek		= (perWeek == "") ? 1 : parseInt(perWeek);
		perMonth	= (perMonth == "") ? 1 : parseInt(perMonth);

		switch (PTypeB) {
			case "1" :	//시급
				if (PTypeA == "2" )
				{
					payResult = Math.round(PayOrigin * perDay);
				}
				else if (PTypeA == "3")
				{
					payResult = PayOrigin * perDay * perWeek;

					if (perDay * perWeek >= 15) {
						if (perWeek * perDay >= 40) {
							payResultHoliday = (8 * 60 * 5) / 40 * 8 * (PayOrigin / 60);
						} else {
							payResultHoliday = (perDay * 60 * perWeek) / 40 * 8 * (PayOrigin / 60);
						}
					}

					payResultWeekOvertime = PayOrigin * perWeekOT * 1.5;
				}
				else if (PTypeA == "4")
				{
                    tempPayResult1 = perDay * perWeek * (365 / 12 / 7);

					if (perDay * perWeek >= 15) {
						//tempPayResult2 = Math.round(tempPayResult1);
						tempPayResult2 = tempPayResult1;

						if (perWeek * perDay >= 40) {
							tempPayResultHoliday1 = (8 * 60 * 5) / 40 * 8 * (365 / 12 / 7);
						} else {
							tempPayResultHoliday1 = (perDay * 60 * perWeek) / 40 * 8 * (365 / 12 / 7);
						}

						//tempPayResultHoliday2 = Math.round(tempPayResultHoliday1) / 60;
						//tempPayResultHoliday3 = Math.round(tempPayResultHoliday2);
						tempPayResultHoliday2 = tempPayResultHoliday1 / 60;
						tempPayResultHoliday3 = tempPayResultHoliday2;
						tempPayResultHoliday4 = tempPayResultHoliday3 * 60;
						payResultHoliday = tempPayResultHoliday4 * (PayOrigin / 60);

						payResultMonthOvertime = PayOrigin * perMonthOT * 1.5;
					} else {
                        tempPayResult2 = tempPayResult1;
                    }

                    payResult = Math.round(tempPayResult2 * PayOrigin);
				}
				else if (PTypeA == "5")
				{
                    tempPayResult1 = perDay * perWeek * (365 / 12 / 7);
					//tempPayResult2 = Math.round(tempPayResult1);
					tempPayResult2 = tempPayResult1;


					if (perDay * perWeek >= 15) {
						//tempPayResult2 = Math.round(tempPayResult1);
						tempPayResult2 = tempPayResult1;

						if (perWeek * perDay >= 40) {
							tempPayResultHoliday1 = (8 * 60 * 5) / 40 * 8 * (365 / 12 / 7);
						} else {
							tempPayResultHoliday1 = (perDay * 60 * perWeek) / 40 * 8 * (365 / 12 / 7);
						}

						//tempPayResultHoliday2 = Math.round(tempPayResultHoliday1) / 60;
						//tempPayResultHoliday3 = Math.round(tempPayResultHoliday2);
						tempPayResultHoliday2 = tempPayResultHoliday1 / 60;
						tempPayResultHoliday3 = tempPayResultHoliday2;
						tempPayResultHoliday4 = tempPayResultHoliday3 * 60;
						payResultHoliday = tempPayResultHoliday4 * (PayOrigin / 60) * 12;
					} else {
                        tempPayResult2 = tempPayResult1;
                    }

                    payResult = Math.round(tempPayResult2 * PayOrigin * 12);
				}
				break;
			case "2" :	//일급
				if (PTypeA == "1" )
				{
					payResult = Math.round(PayOrigin / perDay);
				}
				else if (PTypeA == "3")
				{
					payResult = Math.round((PayOrigin / perDay) * perDay * perWeek);

					if (perDay * perWeek >= 15) {
                        if (perDay * perWeek >= 40) {
							payResultHoliday = Math.round(((PayOrigin / perDay) * 40) / 40 * 8);
                        } else {
							payResultHoliday = Math.round(((PayOrigin / perDay) * perDay * perWeek) / 40 * 8);
                        }
                    } else {
						//payResultHoliday = Math.round(((PayOrigin / perDay) * 0) / 40 * 8);
						payResultHoliday = 0
					}
				}
                else if (PTypeA == "4")
				{
					payResult = Math.round((PayOrigin / perDay) * perDay * perWeek * (365 / 12 / 7));

					if (perDay * perWeek >= 15) {
						if (perDay * perWeek >= 40) {
							payResultHoliday = Math.round(((PayOrigin / perDay) * 40) / 40 * 8 * (365 / 12 /7));
						} else {
							payResultHoliday = Math.round(((PayOrigin / perDay) * perDay * perWeek) / 40 * 8 * (365 / 12 /7));
						}
					} else {
						//payResultHoliday = Math.round(((PayOrigin / perDay) * 0) / 40 * 8 * (365 / 12 /7));
						payResultHoliday = 0
					}

					/*
                    tempPayResult1 = 8 * perWeek * (365 / 12 / 7);

                    if (perWeek * 8 >= 15) {
                        tempPayResult2 = Math.round(tempPayResult1);

                        if (perWeek * 8 >= 40) {
                            tempPayResultHoliday1 = (8 * 60 * 5) / 40 * 8 * (365 / 12 / 7);
                        } else {
                            tempPayResultHoliday1 = (8 * 60 * perWeek) / 40 * 8 * (365 / 12 / 7);
                        }

                        tempPayResultHoliday2 = Math.round(tempPayResultHoliday1) / 60;
                        tempPayResultHoliday3 = Math.round(tempPayResultHoliday2);
                        tempPayResultHoliday4 = tempPayResultHoliday3 * 60;
                        payResultHoliday = tempPayResultHoliday4 * (PayOrigin / 60);

                        payResultMonthOvertime = PayOrigin * perMonthOT * 1.5;
                    } else {
                        tempPayResult2 = tempPayResult1;
                    }
					payResult = Math.round(tempPayResult2 * PayOrigin);
					*/
                }
                else if (PTypeA == "5")
				{
					payResult = Math.round((PayOrigin / perDay) * perDay * perWeek * (365 / 12 / 7) * 12);

					if (perDay * perWeek >= 15) {
						if (perDay * perWeek >= 40) {
							payResultHoliday = Math.round(((PayOrigin / perDay) * 40) / 40 * 8 * (365 / 12 /7) * 12);
						} else {
							payResultHoliday = Math.round(((PayOrigin / perDay) * perDay * perWeek) / 40 * 8 * (365 / 12 /7) * 12);
						}
					} else {
						//payResultHoliday = Math.round(((PayOrigin / perDay) * 0) / 40 * 8 * (365 / 12 /7) * 12);
						payResultHoliday = 0
					}


					/*
                    tempPayResult1 = 8 * perWeek * (365 / 12 / 7);
                    tempPayResult2 = Math.round(tempPayResult1);


                    if (perWeek * 8 >= 15) {
                        tempPayResult2 = Math.round(tempPayResult1);

                        if (perWeek * 8 >= 40) {
                            tempPayResultHoliday1 = (8 * 60 * 5) / 40 * 8 * (365 / 12 / 7);
                        } else {
                            tempPayResultHoliday1 = (8 * 60 * perWeek) / 40 * 8 * (365 / 12 / 7);
                        }
                        tempPayResultHoliday2 = Math.round(tempPayResultHoliday1) / 60;
                        tempPayResultHoliday3 = Math.round(tempPayResultHoliday2);
                        tempPayResultHoliday4 = tempPayResultHoliday3 * 60;
                        payResultHoliday = tempPayResultHoliday4 * (PayOrigin / 60) * 12;
                    } else {
                        tempPayResult2 = tempPayResult1;
                    }

                    payResult = Math.round(tempPayResult2 * PayOrigin * 12);
					*/
                }
				break;
			case "3" :	//주급
				if (PTypeA == "1" ) //보류
				{
					payResult = Math.floor(PayOrigin / perWeek / perDay);
				}
				else if (PTypeA == "2")
				{
					payResult = Math.round(PayOrigin / perWeek);
				}
				else if (PTypeA == "4")
				{
					payResult = Math.round(PayOrigin * (365/7/12));
				}
				else if (PTypeA == "5")
				{
					payResult = Math.round(PayOrigin * (365/7));
				}
				break;
			case "4" :	//월급
				if (PTypeA == "1" )
				{
					payResult = Math.round((PayOrigin / perWeek / perDay) / (365/7/12));
				}
				else if (PTypeA == "2")
				{
					payResult = Math.round(PayOrigin / perWeek / (365/7/12));
				}
				else if (PTypeA == "3")
				{
					payResult = Math.round(PayOrigin / (365/7/12));
				}
				else if (PTypeA == "5")
				{
					payResult = Math.round(PayOrigin * 12);
				}
				break;
			case "5" :	//연봉
				if (PTypeA == "1" )
				{
					payResult = Math.round(PayOrigin / (365/7) / perWeek / perDay);
				}
				else if (PTypeA == "2")
				{
					payResult = Math.round(PayOrigin / (365/7) / perWeek);
				}
				else if (PTypeA == "3")
				{
					payResult = Math.round((PayOrigin / (365/7) / perWeek) * perWeek);
				}
				else if (PTypeA == "4")
				{
					payResult = Math.round(PayOrigin / 12);
				}
				break;
		}

		$("#how1").hide();
		$("#how2").show();

		$("#payResult").text(numberFormat(tax(payResult)));
		$("#payResultWeekOvertime").text(numberFormat(tax(payResultWeekOvertime)));
		$("#payResultMonthOvertime").text(numberFormat(tax(payResultMonthOvertime)));

		$('.calculator__result-space--holiday').show();
		if($('#holidayPayY').attr('checked')){
			$("#payResultHoliday").text(numberFormat(tax(payResultHoliday)));
			$("#LastPay").text(numberFormat(tax(payResult + payResultHoliday + payResultWeekOvertime + payResultMonthOvertime)));
		}else{
			$("#payResultHoliday").text('-');
			$('.calculator__result-space--holiday').hide();
			$("#LastPay").text(numberFormat(tax(payResult + payResultWeekOvertime + payResultMonthOvertime)));
		}

		$("#pc").text(Math.floor(tax(payResult) / 1100));
		$("#song").text( Math.floor(tax(payResult) / 20000));
		$("#movie").text(Math.floor(tax(payResult) / 9000));
		$("#play").text(Math.floor(tax(payResult) / 37000));
	}

	// 세금계산
	function tax(val) {
		var taxResult = Math.round(val);

		var tempTax = $("#tax1 option:selected").val();
		taxResult = taxResult * (1 - parseFloat(tempTax)); //세금 계산결과 금액 표시

		var tempProbation = $("input[name=probation]:checked").val();
		if (tempProbation == "1") {
			taxResult = taxResult * 0.9; //수습 계산결과 금액 표시
		}

		return Math.round(taxResult);
	}

	//콤마변환
	function cvtMoney(obj, val){
		val = val.replace(/,/g, "");
		obj.val(numberFormat(val));
	}

	// 3자리 마다 콤마찍기
	function numberFormat(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
		return x1 + x2;
	}

	//옵션 초기화
	function option_init(displayDay, displayWeek, displayMonth) {
		if(displayDay=="none") $("#perDay option:eq(0)").attr("selected", "selected");;
		if(displayWeek=="none") $("#perWeek option:eq(0)").attr("selected", "selected");
		if(displayMonth=="none")$("#perMonth option:eq(0)").attr("selected", "selected");
		if(displayMonth=="none")$("#perWeekOvertime option:eq(0)").attr("selected", "selected");
		if(displayMonth=="none")$("#perperMonthOvertime option:eq(0)").attr("selected", "selected");
	}

	//전체초기화
	function init(val) {
		var PayOriginVal = $("#intPayOrigin").val().replace(/,/g, "");

		var WorkTime = $.trim($("#intWorkTime").val());
		var WorkWeek = $.trim($("#intWorkWeek").val());

		var str_adid_link = "N";

		var payCd = parseInt($("#strPaycd").val()) - 1;
		//상세페이지에서 넘어왔을경우 변환전금액처리
		if($("#intPayOrigin").val() != "" && $("#intPayOrigin").val() != "0") {
			//cvtMoney($("#payOrigin"),$("#intPayOrigin").val());
			//$("#payOrigin").val($("#intPayOrigin").val());
			$("#payOrigin").val(PayOriginVal);
			//I01:시급/I02:일급/I03:주급/I04:월급/I05:연봉
			$("#payTypeBefore option:eq(" + payCd + ")").attr("selected", "selected");
			//시급일경우 월급으로.월급/일급/주급/연봉일경우 시급으로 환산.
			if (payCd == 0 || payCd == 4) {
				getpayTypeAfter($("#payTypeBefore").val(), 4);
			} else {
				getpayTypeAfter($("#payTypeBefore").val(), 1);
			}
		}
		else{
			$("#payOrigin").val("");
			$("#payTypeBefore option:eq(0)").attr("selected", "selected");
			getpayTypeAfter($("#payTypeBefore").val(), 4);
		}

		$("#tax1").attr("checked",false);
		$("#tax2").attr("checked",false);
		$("#perDay option:eq(0)").attr("selected", "selected");
		$("#perWeek option:eq(0)").attr("selected", "selected");
		$("#perMonth option:eq(0)").attr("selected", "selected");
		$("#perWeekOvertime option:eq(0)").attr("selected", "selected");
		$("#perMonthOvertime option:eq(0)").attr("selected", "selected");

		$("#holidayPayY").attr("checked", true);
		$("#probation_no").attr("checked", true);
		//getpayTypeAfter($("#payTypeBefore").val(), 4);
		$("#pc").text(0);
		$("#song").text(0);
		$("#movie").text(0);
		$("#play").text(0);
		if (val !="recal") {
			if (WorkTime != "") {
				option_create(document.getElementById("perDay"), 1, 24, 1, WorkTime, "시간");
			} else {
				option_create(document.getElementById("perDay"), 1, 24, 1, "", "시간");
			}
			if (WorkWeek != "")
			{
				option_create(document.getElementById("perWeek"), 1, 7, 1, WorkWeek, "");
			} else {
				option_create(document.getElementById("perWeek"), 1, 7, 1, "", "");
			}
			option_create(document.getElementById("perMonth"), 1, 31, 1, "", "일");
			option_create(document.getElementById("perWeekOvertime"), 1, 24, 1, "", "시간");
			option_create(document.getElementById("perMonthOvertime"), 1, 24, 1, "", "시간");
		}
		$("#payResult").text(0);

		$("#payResultHoliday").text(0);
		$("#LastPay").text(0);

		$("#how1").show();
		$("#how2").hide();
		$('.calculator__result-space--holiday').show();
		selectEmptyCheck();

		if (str_adid_link == "Y")
		{
			calculate();
		}
	}

	//전체초기화
	function init_Clear(val) {
		$("#payOrigin").val("");
		$("#payTypeBefore option:eq(0)").attr("selected", "selected");
		getpayTypeAfter(1, 4);


		$("#tax2").attr("checked",false);
		$("#tax1 option:eq(0)").attr("selected", "selected");
		$("#perDay option:eq(0)").attr("selected", "selected");
		$("#perWeek option:eq(0)").attr("selected", "selected");
		$("#perMonth option:eq(0)").attr("selected", "selected");
		$("#perWeekOvertime option:eq(0)").attr("selected", "selected");
		$("#perMonthOvertime option:eq(0)").attr("selected", "selected");
		$("#holidayPayY").attr("checked", true);
		$("#probation_no").attr("checked", true);
		$("#pc").text(0);
		$("#song").text(0);
		$("#movie").text(0);
		$("#play").text(0);

		if (val !="recal") {
			option_create(document.getElementById("perDay"), 1, 24, 1, "", "시간");
			//option_create(document.getElementById("perWeek"), 1, 7, 1, "", "");
			option_create(document.getElementById("perMonth"), 1, 31, 1, "", "일");
			option_create(document.getElementById("perWeekOvertime"), 1, 24, 1, "", "시간");
			option_create(document.getElementById("perMonthOvertime"), 1, 24, 1, "", "시간");
		}

		$("#payResult").text(0);

		$("#payResultHoliday").text(0);
		$("#LastPay").text(0);

		$("#how1").show();
		$("#how2").hide();
		$('.calculator__result-space--holiday').show();
		$('.calculator__result, .reset__btnwrap').hide();
	}

	// 숫자 1부터 입력
	function num_only(obj){
		evt = window.event; // Window의 event를 잡는다.
		if(evt.keyCode == 16){
			alert("shift키는 사용할 수 없습니다.");
		}
		//숫자열 0 ~ 9 : 48 ~ 57, 키패드 0 ~ 9 : 96 ~ 105 ,8 : backspace, 46 : delete -->키코드값을 구분
		if(evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode >= 96 && evt.keyCode <= 105 || evt.keyCode == 8 || evt.keyCode == 46 || evt.keyCode == 16 ){
			if(evt.keyCode == 48 || evt.keyCode == 96)//0을 눌렀을경우
			{
				if(obj.value == "" ) //아무것도 없는상태에서 0을 눌렀을경우
					evt.returnValue=false; //-->입력되지않는다.
				else //다른숫자뒤에오는 0은
					return; //-->입력시킨다.
			}
			else //0이 아닌숫자
				return; //-->입력시킨다.
		}
			else //숫자가 아니면 넣을수 없다.
				evt.returnValue=false;
	}

	function RePayCalculate() {
		if ($("#payOrigin").val() != "") {
			if ($("#LastPay").text() != "" && $("#LastPay").text() != "0") {
				calculate();
			}
		} else {
			init_Clear();
		}
	}

	function reCalculate() {
		if ($("#LastPay").text() != "" && $("#LastPay").text() != "0") {
			calculate();
		}
	}

//	$("input[name='probation']").change(function() {
//		if ($("#LastPay").text() != "" && $("#LastPay").text() != "0") {
//			calculate();
//		}
//	});

//	$("input[name='holidayPay']").change(function() {
//		if ($("#LastPay").text() != "" && $("#LastPay").text() != "0") {
//			calculate();
//		}
//	});

	function selectEmptyCheck(){
		$('option:selected').each(function(){
			var target = $(this);
			( target.val() === '' )
			? target.parent().addClass('invalid')
			: target.parent().removeClass('invalid')
		});
	}

	function displayHolidayPay() {
		var PTypeB	= $.trim($("#payTypeBefore").val());
		var PTypeA	= $.trim($("#payTypeAfter").val())

		switch (PTypeB) {
			//시급:1, 일급:2, 주급:3, 월급:4, 연봉:5
			case "3" : //주급
				if (PTypeA == "1" || PTypeA == "2" || PTypeA == "4" || PTypeA == "5") {
					$(".holiday").hide();
				} else {
					$(".holiday").show();
				}
				break;
			case "4" : //월급
				if (PTypeA == "1" || PTypeA == "2" || PTypeA == "3" || PTypeA == "5") {
					$(".holiday").hide();
				} else {
					$(".holiday").show();
				}
				break;
			case "5" : //연봉
				if (PTypeA == "1" || PTypeA == "2" || PTypeA == "3" || PTypeA == "4" ) {
					$(".holiday").hide();
				} else {
					$(".holiday").show();
				}
				break;
			default :
				$(".holiday").show();
		}
	}

//	$(document).ready(function(){
//		init('');
//		$('select').on('change', selectEmptyCheck);
//	});

	document.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		};
	}, true);




	// 페이지 스크롤시 상단 메뉴 고정
//    if ($("#Header").length > 0 && !$("body").hasClass("biz") && !$("body").hasClass("sub")) {
//        var headerHeight = $("#Header").outerHeight();
//        var navHeight;
//        var ObjHeader
//
//        if ($(".header-float").length > 0) {
//            navHeight = $(".header-float").outerHeight();
//        } else if ($(".header-sub").length > 0) {
//            navHeight = $(".header-sub").outerHeight();
//        }
//
//        if ($("#Header").hasClass("header-main")) {
//            var topBanner = 0;
//            if ($(".appdown-banner").length > 0) {
//                topBanner = $(".appdown-banner").height();
//            }
//            ObjHeader = headerHeight - navHeight + topBanner;
//        } else {
//            var headerOffset = $(".header-sub").offset().top;
//            ObjHeader = headerOffset;
//        }
//
//        function ScrollHeader() {
//            var ScrTop = $(this).scrollTop();
//
//            if (ScrTop > ObjHeader) {
//                if ($("#Header").hasClass("header-main")) {
//                    $("body").addClass("scroll-main");
//                    $("#Section").css("padding-top",navHeight);
//                } else {
//                    $("body").addClass("scroll-sub");
//                    $("#Section").css("padding-top",navHeight);
//                }
//            } else {
//                if ($("#Header").hasClass("header-main")) {
//                    $("body").removeClass("scroll-main");
//                } else {
//                    $("body").removeClass("scroll-sub");
//                }
//                $("#Section").css("padding-top","0");
//            }
//        }
//
//        $(window).scroll(function(){
//            ScrollHeader();
//        });
//        ScrollHeader();
//    }
//
//
//    //마이메뉴
//    $('.myMenuView').click(function(e){
//        e.preventDefault();
//        $(this).removeClass("on");
//        $('.myMenuListWrap').addClass("on");
//        $("html,body").addClass("fixed");
//    });
//    $('.myMenuList>.close').click(function(e){
//        e.preventDefault();
//        $('.myMenuView').addClass("on");
//        $('.myMenuListWrap').removeClass("on");
//        $("html,body").removeClass("fixed");
//    });
//
//    //푸터 copyright
//    $('.copyRight').click(function(e){
//        e.preventDefault();
//        $(this).next('address').slideToggle('fast', function(){
//            $('html,body').animate({
//                scrollTop: $('address').offset().top
//            }, 'fast')
//        });
//        if ($(this).children('.cssIcon-arrow').hasClass('bottom'))
//        {
//            $(this).children('.cssIcon-arrow').removeClass('bottom');
//            $(this).children('.cssIcon-arrow').addClass('top');
//        }
//        else if ($(this).children('.cssIcon-arrow').hasClass('top'))
//        {
//            $(this).children('.cssIcon-arrow').removeClass('top');
//            $(this).children('.cssIcon-arrow').addClass('bottom');
//        }
//    });
//
//    //설정된 마이메뉴 아이콘 노출
//    if (_lsCtrl.getProperty("MYMENU") != "") $("#mySelectMenu").html(_lsCtrl.getProperty("MYMENU").replace("현위치","알바맵") + "<li class='add'><a href='/aside/MyMenu.asp'><span>추가하기</span></a></li>");


//    _lsCtrl.setSessionProperty("PAGEURL", "/story/calculator.asp");

/* google-analytics start */

//(function($) {
//	$(function() {
//		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//
//		ga('create', 'UA-34867276-2', 'auto');
//		ga('require', 'displayfeatures');
//		ga('require', 'ecommerce', 'ecommerce.js');
//
//		//모바일 커뮤니티 부분 url구분 파라미터가 없어서 따로 추가
//		if(document.location.pathname.toLowerCase() == '/story/storydetail.asp' && _lsCtrl.getProperty("BTYPECD") != ""){
//			var page = document.location.pathname.toLowerCase() + "?btypecd=" + _lsCtrl.getProperty("BTYPECD");
//			ga('send', 'pageview', page);
//		}else{
//			ga('send', 'pageview');
//		}
//
//		loadJS("/rsc/js/GoogleAnalyticsEventHandler.js?202305151800", function() {});
//	});
//})(jQuery);

/* google-analytics end */

