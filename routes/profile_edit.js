/**
 * 패스포트 설정 파일
 * 
 * 로컬 인증방식에서 회원가입에 사용되는 패스포트 설정
 *
 */


module.exports = function(req, user_context, done) {
	console.log('profile_edit 호출됨.' + user_context.email);
	

	console.log('/////////////////////////////////////'+user_context.email);


	if(req.body.nickname || req.query.nickname){
		user_context.nickname = req.body.nickname || req.query.nickname;
	}
	if(req.body.region || req.query.region){
		user_context.region = req.body.region || req.query.region;
	}
	if(req.body.gender || req.query.gender){
		user_context.gender = req.body.gender || req.query.gender;
	}
	if(req.body.birth || req.query.birth){
		user_context.birth = req.body.birth || req.query.birth;

		//나이 계산
		var today = new Date();
		var nowYear = today.getFullYear();
		user_context.age = nowYear - user_context.birth + 1;
	}
	
	
	
	
	
	var database = req.app.get('database');
	
	database.UserModel.update(
		{'email' : user_context.email}, {$set: {
				
                    'name':user_context.name, 
                    'nickname':user_context.nickname,
					'region':user_context.region,
                    'gender':user_context.gender, 
                    'age':user_context.age,
					'birth':user_context.birth
            }
										
										
	});
	
/*	
	
    database.UserModel.findOne({'email' : user_context.email}, function (err, user){
	   // 에러 발생 시
//		if (err) {   
//			return done(err);
//		}
		
		console.log('/////////////////////////////////////'+user_context.birth);


		// 기존에 사용자 정보가 있는 경우
		if (user){

			console.log('/////////////////////////////////////');
			


			user = database.UserModel.update({'email' : user_context.email}, {$set: {
				
                    'name':user_context.name, 
                    'nickname':user_context.nickname,
					'region':user_context.region,
                    'gender':user_context.gender, 
                    'age':user_context.age,
					'birth':user_context.birth
            }});
			
			console.dir(user);
/*
			edited_user.save(function(err) {
				if(err){
					throw err;
				}
*/
//				console.log("사용자 데이터 수정함.");
		//		return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
//			});
			
/*			
		}
	});


*/
};