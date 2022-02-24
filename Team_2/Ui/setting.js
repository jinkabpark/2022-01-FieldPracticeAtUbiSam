// <Setting>
// [default] Setting 목록의 개수는 최대 6개로 제한 : 6개 이하에서 동적인 화면 적용 가능 
// Setting 목록 개수 6개 초과 : 
//  1) Node-RED Dashboard Setting Tab에 그룹 추가 - 그룹 이름 : 설정입력 + 목록번호, 그룹 크기 : 16
//  2) Setting flow에 Setting 정보에 들어가는 Dashboad 위젯 추가 후 flow 설정 및 그룹 설정 - text input 위젯 크기 : 2 x 1
//  3) setting.js 코드 수정 - 동적 화면 적용에 추가된 목록의 수만큼 show, hide 수정 
//      ex) 목록 개수 8개일 때
//          설정입력7, 설정입력8 그룹 생성 
//          -> 위젯 추가 
//          -> 코드 수정 : show에 "Setting_설정입력 + (dvcCount - 6)", "Setting_설정입력 + (dvcCount - 7)"  추가, 
//                         hide에 "Setting_설정입력 + (dvcCount + 6)", "Setting_설정입력 + (dvcCount + 7)" 추가

// <history>
//  1) 2022.02.15 최초 생성

// db에서 불러온 data를 활용하여 Setting 목록의 수에 맞게 ui가 동적으로 적용되도록 하는 코드 작성
// db를 통해 얻은 Setting 목록의 수만큼 그룹을 나타내고 그 이상의 그룹은 숨김 처리

var dvcCount = msg.payload.length // 설정 장비 개수

// 동적 화면 적용
msg.payload = {
    "group": {
        "show": [   // 대시보드에 해당 그룹을 나타냄
            "Setting_설정입력" + dvcCount, "Setting_설정입력" + (dvcCount - 1), "Setting_설정입력" + (dvcCount - 2), "Setting_설정입력" + (dvcCount - 3), "Setting_설정입력" + (dvcCount - 4), "Setting_설정입력" + (dvcCount - 5)    // Setting 목록
        ], 
        "hide": [   // 대시보드에서 해당 그룹을 숨김
            "Setting_설정입력" + (dvcCount + 1), "Setting_설정입력" + (dvcCount + 2), "Setting_설정입력" + (dvcCount + 3), "Setting_설정입력" + (dvcCount + 4), "Setting_설정입력" + (dvcCount + 5)    // Setting 목록
        ], 
        "focus":true
    }
}

return msg;
