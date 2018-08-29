/**
 * 패스포트 설정 파일
 * 
 * 로컬 인증방식에서 회원가입에 사용되는 패스포트 설정
 *
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, email, password, done) {
    // 요청 파라미터 중 name 파라미터 확인
 // var name = req.body.name || req.query.name;
    var teamname = req.body.teamname || req.query.teamname;
    var gender = req.body.gender || req.query.gender;
	var age = req.body.age || req.query.age;
	var region = req.body.region || req.query.region;
	var add = req.body.add || req.query.add;
	var geoLng = req.body.resultLng || req.query.resultLng;
	var geoLat = req.body.resultLat || req.query.resultLat;
	var move = req.body.move || req.query.move;
	var nofteam = req.body.nofteam || req.query.nofteam;
	var career_year = req.body.career_year || req.query.career_year;
	var career_count = req.body.career_count || req.query.career_count;
	var introteam = req.body.introteam || req.query.introteam;
	var profile_img = "profile_basic.png";
	
	
	var addr = [];
	addr= add.split(' ');
	add = [addr[0], addr[1]];
	


	console.log('passport의 local-signup 호출됨.');
	
    // findOne 메소드가 blocking되지 않도록 하고 싶은 경우, async 방식으로 변경
	process.nextTick(function() {
        
        var database = req.app.get('database');
        database.UserModel.findOne({ 'email' :  email }, function(err, user) {
            
            // 에러 발생 시
            if (err) {
                return done(err);
            }
            
            
            // 기존에 사용자 정보가 있는 경우
		    if (user) {
                console.log('기존에 계정이 있음.');
		        return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
            } else {
                // 모델 인스턴스 객체 만들어 저장
		        var user = new database.UserModel({		//15개
                    'email':email, 
                    'password':password, 
                    'teamname':teamname, 
                    'gender':gender, 
                    'age':age,
					'region':region,
					'add':add,
					'move':move,
					'nofteam':nofteam,
					'career_year':career_year,
					'career_count':career_count,
					'introteam':introteam,
					'profile_img':profile_img,
					'geoLat':geoLat,
					'geoLng':geoLng
                });
                
                user.save(function(err) {
                    if(err){
                        throw err;
                    }
                    
                    console.log("사용자 데이터 추가함.");
		        	return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
                });
            }
        });
    });
});