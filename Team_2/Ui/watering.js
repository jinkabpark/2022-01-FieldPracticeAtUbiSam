// <관수>
// [default] 관수의 개수는 최대 6개로 제한 : 6개 이하에서 동적인 화면 적용 가능 
// 관수 개수 6개 초과 : 
//  1) Node-RED Dashboard 관수 Tab에 그룹 추가 - 그룹 이름 : 관수 + 관수번호, 그룹크기 : 20
//  2) 관수 flow에 관수 정보에 들어가는 Dashboad 위젯 추가 후 flow 설정 및 그룹 설정 - switch, text 위젯 크기 : 4 x 1, button 위젯 크기 : 2 x 1
//  3) watering.js 코드 수정 - 동적 화면 적용에 추가된 관수의 수만큼 show, hide 수정 
//      ex) 관수 개수 8개일 때
//          관수7, 관수8 그룹 생성 
//          -> 위젯 추가 
//          -> 코드 수정 : show에 "관수_관수 + (wtrCount - 6)", "관수_관수 + (wtrCount - 7)"  추가, 
//                         hide에 "관수_관수 + (wtrCount + 6)", "관수_관수 + (wtrCount + 7)" 추가

// <history>
//  1) 2022.02.14 최초 생성

// db에서 불러온 data를 활용하여 관수의 수에 맞게 ui가 동적으로 적용되도록 하는 코드 작성
// db를 통해 얻은 관수의 수만큼 그룹을 나타내고 그 이상의 그룹은 숨김 처리

var wtrCount = msg.payload.length // 관수 개수

// 동적 화면 적용
msg.payload = {
    "group": {
        "show": [   // 대시보드에 해당 그룹을 나타냄
            "관수_관수" + wtrCount, "관수_관수" + (wtrCount - 1), "관수_관수" + (wtrCount - 2), "관수_관수" + (wtrCount - 3), "관수_관수" + (wtrCount - 4), "관수_관수" + (wtrCount - 5)    // 관수
        ], 
        "hide": [   // 대시보드에서 해당 그룹을 숨김
            "관수_관수" + (wtrCount + 1), "관수_관수" + (wtrCount + 2), "관수_관수" + (wtrCount + 3), "관수_관수" + (wtrCount + 4), "관수_관수" + (wtrCount + 5)    // 관수
        ], 
        "focus":true
    }
}

return msg;
