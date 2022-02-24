-- <sqlCollection>
--  Node-RED와 DB를 연결하여 원하는 정보를 불러오기 위한 코드 중 SQL문만 작성

--  <function 노드에 작성할 코드 형식>
--    msg.topic = "SQL문";
--    return msg;

-- <history>
--   1) 2022.02.07 최초 생성
--   2) 2022.02.07 장비의 개수를 조회하는 SELECT문 작성
--   3) 2022.02.22 각 Device flow에서 필요한 정보를 조회하는 SELECT문 작성
--   4) 2022.02.22 INSERT문, DELETE문 추가

-- <SELECT문>
-- 자동개폐기 정보 검색 - 모터(M), 온습도센서(Y, H, T)
SELECT *  FROM tMstObjectItemNew WHERE ObjectType = 'M' OR ObjectType = 'Y' OR ObjectType = 'H' OR ObjectType = 'T';
-- 개별스위치 정보 검색 - FAN(F), Valve(V), AC(A)
SELECT *  FROM tMstObjectItemNew WHERE ObjectType = 'F' OR ObjectType = 'V' OR ObjectType = 'A' order by ObjectType;
-- 관수 정보 검색 - Valve(V)
SELECT *  FROM tMstObjectItemNew WHERE ObjectType = 'V';
-- setting 정보 검색 - 모터(M), Valve(V)
SELECT *  FROM tMstObjectItemNew WHERE ObjectType = 'M' OR ObjectType = 'V' order by ObjectType, ObjectPositionName;


-- <INSERT문>
-- DB table에 값 넣기
-- tableSchema.sql 참고하여 값 설정하기(defalut insert 값)
INSERT INTO tMstObjectItemNew (ObjectExist, ObjectID4LoRa, LoRaNodeGpioRelayNo, ObjectType, TempHumiType, FanDevDriverType, ObjectCommunicationType, objectPin1, objectPin2, MotorOperTime, ObjectPositionName, OperationControlMode, OperationModeStatus, OperationStartTime, objectValueTemp, objectValueHumi, ThSensorRowNo, ThTempOpen, ThTempClose) 
    VALUES ('O', '00101', '1', 'Y', 'B', NULL, 'L', NULL, NULL, NULL, NULL, 'S', NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', '00102', '2', 'Y', 'B', NULL, 'L', NULL, NULL, NULL,NULL,'S',NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', NULL, '3', 'Y', 'V', NULL, 'G', 23, NULL, NULL, NULL, 'S', NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', NULL, '3', 'M', NULL, NULL, 'G', 17, 27, 50, 'TopLeft', NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', '00105', '3', 'M', NULL, NULL, 'L', NULL, NULL, 70, 'TopRight', NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', '00106', '1', 'F', NULL, 'F:C:2', 'L', NULL, NULL, NULL, NULL, NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', NULL,' 2', 'V', NULL, NULL, 'G', 9, NULL, NULL, NULL, NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', NULL,' 2', 'V', NULL, NULL, 'G', 6, NULL, NULL, NULL, NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL),
    ('O', NULL,' 2', 'V', NULL, NULL, 'G', 13, NULL, NULL, NULL, NULL, NULL, datetime('now','localtime'), 0, 0, -1, NULL, NULL);


-- <DELETE문>
-- DB table에 초기화
DELETE FROM tMstObjectItemNew;
