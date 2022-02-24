// <개별스위치>
// 스위치 종류 : F(FAN), V(Valve), A(AC)
// [default] 스위치 개수에 따라 그룹 번호 설정 : 한 그룹에 스위치 개수 3개
// [default] 개별스위치의 개수 최대 18개로 제한 : 18개 이하에서 동적인 화면 적용 가능
// 스위치 개수 18개 초과 : 
//  1) Node-RED Dashboard 개별스위치 Tab에 그룹 추가 - 그룹 이름 : 번호목록 + 그룹 번호, 그룹 크기: 17
//  2) 개별스위치 flow에 스위치 정보에 들어가는 Dashboad 위젯 추가 후 flow 설정 및 그룹 설정 - 장비 이름 button 위젯 크기 : 2 x 1, 열림·정지·닫힘 button 위젯 크기 : 1 x 1
//  3) switch.js 코드 수정 - 그룹 번호 설정에 추가된 그룹의 수만큼 else if문 추가, 동적 화면 적용에 추가된 그룹의 수만큼 show, hide 수정
//      ex) 스위치 개수 20개일 때
//          번호목록7 그룹 생성 
//          -> 위젯 추가 
//          -> 코드 수정 : 그룹 번호 설정 - else if (switchCount <= 21) groupCount = 7 추가,
//                         동적 화면 적용 - show에 "개별스위치_번호목록 + (groupCount - 6)" 추가, 
//                         동적 화면 적용 - hide에 "개별스위치_번호목록 + (groupCount + 6)" 추가

// <history>
//  1) 2022.02.21 최초 생성

// db에서 불러온 data를 활용하여 스위치의 수에 맞게 ui가 동적으로 적용되도록 하는 코드 작성
// db를 통해 얻은 스위치의 개수에 따라 생성한 번호목록의 수만큼 그룹을 나타내고 그 이상의 그룹은 숨김 처리

var switchCount = msg.payload.length // 스위치 개수

// 그룹 번호 설정
if (switchCount <= 3) groupCount = 1
else if (switchCount <= 6) groupCount = 2
else if (switchCount <= 9) groupCount = 3
else if (switchCount <= 12) groupCount = 4
else if (switchCount <= 15) groupCount = 5
else if (switchCount <= 18) groupCount = 6

// 동적 화면 적용
msg.payload = {
    "group": {
        "show": [   // 대시보드에 해당 그룹을 나타냄
            "개별스위치_번호목록" + groupCount, "개별스위치_번호목록" + (groupCount - 1), "개별스위치_번호목록" + (groupCount - 2), "개별스위치_번호목록" + (groupCount - 3), "개별스위치_번호목록" + (groupCount - 4), "개별스위치_번호목록" + (groupCount - 5)    // 번호목록
        ], 
        "hide": [   // 대시보드에서 해당 그룹을 숨김
            "개별스위치_번호목록" + (groupCount + 1), "개별스위치_번호목록" + (groupCount + 2), "개별스위치_번호목록" + (groupCount + 3), "개별스위치_번호목록" + (groupCount + 4), "개별스위치_번호목록" + (groupCount + 5)    // 번호목록
        ], 
        "focus":true
    }
}

return msg;
