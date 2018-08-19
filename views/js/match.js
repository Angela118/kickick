var listText = new Array();
        var listValue = new Array();
        
        listText[0] = new Array('강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구');
        listValue[0] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25');
        
        listText[1] = new Array('강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구');
        listValue[1] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16');
        
        listText[2] = new Array('남구', '동구', '달서구', '달성군', '북구', '서구', '수성구', '중구');
        listValue[2] = new Array('1', '2', '3', '4', '5', '6', '7', '8');
        
        listText[3] = new Array('강화군', '계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구');
        listValue[3] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
        
        listText[4] = new Array('광산구', '남구', '동구', '북구', '서구');
        listValue[4] = new Array('1', '2', '3', '4', '5');
        
        listText[5] = new Array('동구', '대덕구', '서구', '유성구', '중구');
        listValue[5] = new Array('1', '2', '3', '4', '5');
        
        listText[6] = new Array('남구', '동구', '북구', '울주군', '중구');
        listValue[6] = new Array('1', '2', '3', '4', '5');
        
        listText[7] = new Array('수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', '평택시', '동두천시', '안산시', '고양시', '과천시', '구리시', '남양주시', '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시', '이천시', '김포시', '화성시', '광주시', '양주시', '포천시', '여주군', '연천군', '가평군', '양평군');
        listValue[7] = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30');
        
        listText[8] = new Array();
        listValue[8] = new Array();
        
        listText[9] = new Array();
        listValue[9] = new Array();
        
        listText[10] = new Array();
        listValue[10] = new Array();
        
        listText[11] = new Array();
        listValue[11] = new Array();
        
        listText[12] = new Array();
        listValue[12] = new Array();
        
        listText[13] = new Array();
        listValue[13] = new Array();
        
        listText[14] = new Array();
        listValue[14] = new Array();
        
        listText[15] = new Array();
        listValue[15] = new Array();
        
        listText[16] = new Array('제주시', '서귀포시');
        listValue[16] = new Array('1', '2');
        
        
        
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
                f[1].options[0].text = "----";
                f[1].options[0].value=0;
            }
        }