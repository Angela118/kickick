var listText = new Array();
        var listValue = new Array();

        //서울
        listText[0] = new Array('강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구');
        listValue[0] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25');

        //부산
        listText[1] = new Array('강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구');
        listValue[1] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16');

        //대구
        listText[2] = new Array('남구', '동구', '달서구', '달성군', '북구', '서구', '수성구', '중구');
        listValue[2] = new Array('1', '2', '3', '4', '5', '6', '7', '8');

        //인천
        listText[3] = new Array('강화군', '계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구');
        listValue[3] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

        //광주
        listText[4] = new Array('광산구', '남구', '동구', '북구', '서구');
        listValue[4] = new Array('1', '2', '3', '4', '5');

        //대전
        listText[5] = new Array('동구', '대덕구', '서구', '유성구', '중구');
        listValue[5] = new Array('1', '2', '3', '4', '5');

        //울산
        listText[6] = new Array('남구', '동구', '북구', '울주군', '중구');
        listValue[6] = new Array('1', '2', '3', '4', '5');

        //경기도
        listText[7] = new Array('가평구', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '이천시', '의왕시', '의정부시', '파주시', '평택시', '포천시', '하남시', '화성시');
        listValue[7] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31');

        //강원도
        listText[8] = new Array('강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군');
        listValue[8] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18');

        //충청북도
        listText[9] = new Array('괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시', '충주시');
        listValue[9] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');

        //충청남도
        listText[10] = new Array('공주시', '계룡시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군');
        listValue[10] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15');

        //전라북도
        listText[11] = new Array('고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군');
        listValue[11] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14');

        //전라남도
        listText[12] = new Array('강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '화순군', '해남군');
        listValue[12] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22');

        //경상북도
        listText[13] = new Array('경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시');
        listValue[13] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23');

        //경상남도
        listText[14] = new Array('거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군');
        listValue[14] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18');

        //제주도
        listText[15] = new Array('제주시', '서귀포시');
        listValue[15] = new Array('1', '2');

        //지역무관
        //listText[16] = new Array();
        //listValue[16] = new Array();        
        
        
        function regionChange(val) {
            var f = document.getElementsByName('region');
            
            var val = val - 1;
            
            if(val >= 0) {
                f[1].options.length = listText[val].length;
                for (var i=0; i<listText[val].length; i++) {
                    f[1].options[i] = new Option(listText[val][i], listValue[val][i]);
                }
            } else {
                f[1].options.length = 1;
                f[1].options[0].text = "-----";
                f[1].options[0].value=0;
            }
        }