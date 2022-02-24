// <자동개폐기>
// 1. 온습도 - 온습도센서, 온도센서, 습도센서
//    [default] 최대 센서의 개수는 6개로 제한 : 6개 이하에서 동적인 화면 적용 가능
//    *보완 필요*
//    온습도센서 개수 6개 초과 : 
//      1) Node-RED Dashboard 자동개폐기 Tab에 그룹 추가 - 그룹 이름 : 센서 + 센서번호, 그룹 크기 : 6
//      2) 자동개폐기 flow에 온습도센서 정보에 들어가는 Dashboad 위젯 추가 후 그룹 설정 - button, text 위젯 크기 : 6 x 1
//      3) autoSwitch.js 코드 수정 - 동적 화면 적용의 센서 부분에 추가된 센서의 수만큼 show, hide 수정
//          ex) 온습도센서 개수 8개일 때
//              구분3, 센서7, 센서8 그룹 생성
//              -> 위젯 추가
//              -> 코드 수정 : 동적 화면 적용 - if 문에 조건 추가 후 show, hide 수정

// 2. 천창개폐기 - 모터
//    [default] 최대 모터의 개수는 3개로 제한 : 3개 이하에서 동적인 화면 적용 가능
//    모터 1개일 때, 모터 위치 : TopMid
//    모터 2개일 때, 모터 위치 : TopLeft, TopRight
//    모터 3개일 때, 모터 위치 : TopLeft, TopMid, TopRight

// <history>
//  1) 2022.02.08 최초 생성
//  2) 2022.02.08 온습도센서 개수 받아오는 코드 작성 
//  3) 2022.02.08 온습도센서 개수에 따라 동적 화면 적용하는 if문 작성
//  4) 2022.02.08 온습도센서 개수에 따라 동적 화면 적용하는 if문 -> for문 변경 시도
//  5) 2022.02.10 온습도센서 개수에 따라 동적 화면 적용하는 코드 확정
//  6) 2022.02.11 모터 개수에 따라 동적 화면 적용하는 코드 추가
//  7) 2022.02.11 모터 개수에 따라 천창 위치 다르게 표시하는 코드 추가

// db에서 불러온 data를 활용하여 장비 수에 맞게 ui가 동적으로 적용되도록 하는 코드 작성
// db를 통해 얻은 장비의 수만큼 그룹을 나타내고 그 이상의 그룹은 숨김 처리

var deviceCount = msg.payload.length // 센서와 모터 수의 합
var thCount = 0 // 센서 개수
var mtrCount = 0 // 모터 개수


for (i = 0; i < deviceCount; i++) { // 센서와 모터 수의 합만큼 반복
    if (msg.payload[i].OperationControlMode == "S") { // 장비 종류가 센서라면
        thCount += 1
    }
    else if (msg.payload[i].ObjectType == "M") { // 장비 종류가 모터라면
        mtrCount += 1
    }
}

// 모터 수에 따라 천창 위치 다르게 표시
if (mtrCount == 1) {    // 모터 1개일 때
    msg.autoSkyligthName_1 = "천창(중)" 
}
else if (mtrCount == 2) {   // 모터 2개일 때
    msg.autoSkyligthName_1 = "천창(좌)"
    msg.autoSkyligthName_2 = "천창(우)"
}
else if (mtrCount == 3) {   // 모터 3개일 때
    msg.autoSkyligthName_1 = "천창(좌)"
    msg.autoSkyligthName_2 = "천창(중)"
    msg.autoSkyligthName_3 = "천창(우)"
}

// 동적 화면 적용
if (thCount < 3 || thCount == 5) {  // 센서 수가 1, 2, 5 일 때
    msg.payload = {
        "group": {
            "show": [   // 대시보드에 해당 그룹을 나타냄
                "자동개폐기_구분1", "자동개폐기_구분" + (thCount - 3),  // 구분
                "자동개폐기_spacerLeft_dvc" + thCount, "자동개폐기_spacerLeft_dvc" + (thCount + 1), "자동개폐기_spacerRight_dvc" + thCount, "자동개폐기_spacerRight_dvc" + (thCount + 1), // spacer
                "자동개폐기_센서" + thCount, "자동개폐기_센서" + (thCount - 1), "자동개폐기_센서" + (thCount - 2),  // 센서
                "자동개폐기_천창" + (mtrCount - 1), "자동개폐기_천창" + mtrCount    // 천창
            ], 
            "hide": [   // 대시보드에서 해당 그룹을 숨김
                "자동개폐기_구분" + (thCount * thCount + 1), "자동개폐기_구분" + (thCount * thCount - 2),   // 구분
                "자동개폐기_spacerLeft_dvc" + (thCount - 3),"자동개폐기_spacerLeft_dvc" + (thCount - 1), "자동개폐기_spacerLeft_dvc" + (thCount + 2), "자동개폐기_spacerLeft_dvc" + (thCount + 3), "자동개폐기_spacerLeft_dvc" + (thCount + 4), "자동개폐기_spacerRight_dvc" + (thCount - 3), "자동개폐기_spacerRight_dvc" + (thCount - 1), "자동개폐기_spacerRight_dvc" + (thCount + 2), "자동개폐기_spacerRight_dvc" + (thCount + 3), "자동개폐기_spacerRight_dvc" + (thCount + 4),   // spacer
                "자동개폐기_센서" + (thCount + 1), "자동개폐기_센서" + (thCount + 2), "자동개폐기_센서" + (thCount + 3), "자동개폐기_센서" + (thCount + 4), "자동개폐기_센서" + (thCount + 5), "자동개폐기_(2)센서3",   // 센서
                "자동개폐기_천창" + (mtrCount + 1), "자동개폐기_천창" + (mtrCount + 2)  // 천창
            ], 
            "focus":true
        }
    }
}
else if (thCount == 4) {    // 센서 수가 4 일 때
    msg.payload = {
        "group": {
            "show": [   // 대시보드에 해당 그룹을 나타냄
                "자동개폐기_구분1", "자동개폐기_구분2",     // 구분
                "자동개폐기_spacerLeft_dvc" + thCount, "자동개폐기_spacerLeft_dvc" + (thCount - 2), "자동개폐기_spacerRight_dvc" + thCount, "자동개폐기_spacerRight_dvc" + (thCount - 2),   // spacer
                "자동개폐기_센서" + thCount, "자동개폐기_(2)센서" + (thCount - 1), "자동개폐기_센서" + (thCount - 2), "자동개폐기_센서" + (thCount - 3), "자동개폐기_센서" + (thCount - 4), "자동개폐기_센서" + (thCount - 5), // 센서
                "자동개폐기_천창" + (mtrCount - 1), "자동개폐기_천창" + mtrCount    // 천창
            ], 
            "hide": [   // 대시보드에서 해당 그룹을 숨김
                "자동개폐기_spacerLeft_dvc" + (thCount - 3), "자동개폐기_spacerLeft_dvc" + (thCount + 1), "자동개폐기_spacerRight_dvc" + (thCount - 3), "자동개폐기_spacerRight_dvc" + (thCount + 1),   // spacer
                "자동개폐기_센서" + (thCount -1), "자동개폐기_센서" + (thCount + 1), "자동개폐기_센서" + (thCount + 2), "자동개폐기_센서" + (thCount + 3), "자동개폐기_센서" + (thCount + 4), "자동개폐기_센서" + (thCount + 5),    // 센서
                "자동개폐기_천창" + (mtrCount + 1), "자동개폐기_천창" + (mtrCount + 2)  // 천창
            ], 
            "focus":true
        }
    }
}
else {  // 센서 수가 3, 6 일 때
    msg.payload = {
        "group": {
            "show": [   // 대시보드에 해당 그룹을 나타냄
                "자동개폐기_구분1", "자동개폐기_구분" + (thCount - 4),  // 구분
                "자동개폐기_센서" + thCount, "자동개폐기_센서" + (thCount - 1), "자동개폐기_센서" + (thCount - 2), "자동개폐기_센서" + (thCount - 3), "자동개폐기_센서" + (thCount - 4), "자동개폐기_센서" + (thCount - 5), // 센서
                "자동개폐기_천창" + (mtrCount - 1), "자동개폐기_천창" + mtrCount    // 천창
            ], 
            "hide": [   // 대시보드에서 해당 그룹을 숨김
                "자동개폐기_구분" + (thCount - 1),  // 구분
                "자동개폐기_spacerLeft_dvc" + (thCount + 1), "자동개폐기_spacerLeft_dvc" + (thCount + 2), "자동개폐기_spacerLeft_dvc" + (thCount - 1), "자동개폐기_spacerLeft_dvc" + (thCount - 2), "자동개폐기_spacerLeft_dvc" + (thCount - 4), "자동개폐기_spacerLeft_dvc" + (thCount - 5), "자동개폐기_spacerRight_dvc" + (thCount + 1), "자동개폐기_spacerRight_dvc" + (thCount + 2), "자동개폐기_spacerRight_dvc" + (thCount - 1), "자동개폐기_spacerRight_dvc" + (thCount - 2), "자동개폐기_spacerRight_dvc" + (thCount - 4), "자동개폐기_spacerRight_dvc" + (thCount - 5),  // spacer
                "자동개폐기_센서" + (thCount + 1), "자동개폐기_센서" + (thCount + 2), "자동개폐기_센서" + (thCount + 3), "자동개폐기_(2)센서3", // 센서
                "자동개폐기_천창" + (mtrCount + 1), "자동개폐기_천창" + (mtrCount + 2)  // 천창
            ], 
            "focus":true
        }
    }
}



return msg;