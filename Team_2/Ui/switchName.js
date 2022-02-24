// <switchName>
// 개별스위치 클릭 시 목록에 나타날 정보 중 장비이름에 들어갈 내용
// 그룹이름은 FAN, 관수, AC 번호로 나타냄

// <history>
//  1) 2022.02.21 최초 생성

var dvcCount = msg.payload.length // 장비 개수
var groupName = []  // 그룹이름 배열
var fanCount = 0 // FAN 수
var valveCount = 0  // 밸브 수
var acCount = 0 // AC 수

for (i = 0; i < dvcCount; i++) {
    var dvcType = msg.payload[i].ObjectType // 장비 타입(F or V or A)
    // FAN
    if (dvcType == 'F') {
        fanCount += 1 // FAN 수
        groupName.push("FAN" + fanCount) // FAN + FAN 수
    }
    // 관수
    else if (dvcType == 'V') {
        valveCount += 1 // 밸브 수
        groupName.push("관수" + valveCount) // 관수 + 밸브 수
    }
    // AC
    else if (dvcType == 'A') {
        acCount += 1 // AC 수
        groupName.push("AC" + acCount) // AC + AC 수
    }
}

msg.payload = groupName // payload에 그룹이름 배열 저장

return msg;