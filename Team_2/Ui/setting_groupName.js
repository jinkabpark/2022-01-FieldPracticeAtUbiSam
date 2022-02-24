// <setting_groupName>
// setting 클릭 시 목록에 나타날 정보 중 그룹이름에 들어갈 내용
// 그룹이름은 천창 위치, 관수 번호로 나타냄

// <history>
//  1) 2022.02.15 최초 생성

var dvcCount = msg.payload.length // 장비 개수
var groupName = []  // 그룹이름 배열
var valveCount = 0  // 밸브 수

for (i = 0; i < dvcCount; i++) {
    var dvcType = msg.payload[i].ObjectType // 장비 타입(M or V)
    var mtrPosition = msg.payload[i].ObjectPositionName // 장비 위치(TopLeft, TopMid, TopRight)
    // 천창
    if (dvcType == 'M' && mtrPosition == 'TopLeft') {
        groupName.push("천창(좌)")
    }
    else if (dvcType == 'M' && mtrPosition == 'TopMid') {
        groupName.push("천창(중)")
    }
    else if (dvcType == 'M' && mtrPosition == 'TopRight') {
        groupName.push("천창(우)")
    }
    // 관수
    else if (dvcType == 'V') {
        valveCount += 1 // 밸브 수
        groupName.push("관수" + valveCount) // 관수 + 밸브 수
    }
}

msg.payload = groupName // payload에 그룹이름 배열 저장
return msg;