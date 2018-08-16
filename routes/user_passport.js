/**
 * 패스포트 라우팅 함수 정의
 *
 */
  
module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');
	
		
	
    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/main 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);
        

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
        //    res.render('main.ejs', {login_success:false});
            res.redirect('/login');
        } else {
			
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			
			
            console.log('사용자 인증된 상태임.');
            res.render('main.ejs', user_context /*, {login_success:true}*/);
        }
    });
    
	
	
    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 get 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
	 
	
	
    // 회원가입 화면
    router.route('/teamsignup').get(function(req, res) {
        console.log('/teamsignup 패스 get 요청됨.');
        res.render('team_signup.ejs', {message: req.flash('signupMessage')});
    });
		
	
    // 프로필 
    router.route('/teamprofile').get(function(req, res) {
        console.log('/teamprofile 패스 get 요청됨.');

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.dir(req.user);
			
			
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
						
			
            res.render('team_profile.ejs', user_context);
		}
    });
	
    
	router.route('/teamprofileedit').get(function(req, res){
		console.log('/teamprofileedit 패스 get 요청됨.');
	
		
		 // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};		
			
            console.log('사용자 인증된 상태임.');
            res.render('team_profile_edit.ejs', user_context);
        }
		
	})
	
    router.route('/teamprofileedit').post(function(req, res) {
        console.log('/teamprofileedit 패스 post 요청됨.');
		
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
		
		var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
		};			
		
		
		if(req.body.teamname || req.query.teamname){
			user_context.teamname = req.body.teamname || req.query.teamname;
		}
		if(req.body.gender || req.query.gender){
			user_context.gender = req.body.gender || req.query.gender;
		}
		if(req.body.age || req.query.age){
			user_context.age = req.body.age || req.query.age;
		}
		if(req.body.region || req.query.region){
			user_context.region = req.body.region || req.query.region;
		}
		if(req.body.move || req.query.move){
			user_context.move = req.body.move || req.query.move;
		}
		if(req.body.nofteam || req.query.nofteam){
			user_context.nofteam = req.body.nofteam || req.query.nofteam;
		}
		if(req.body.career_year || req.query.career_year){
			user_context.career_year = req.body.career_year || req.query.career_year;
		}
		if(req.body.career_count || req.query.career_count){
			user_context.career_count = req.body.career_count || req.query.career_count;
		}
		if(req.body.introteam || req.query.introteam){
			user_context.introteam = req.body.introteam || req.query.introteam;
		}
			
		
	//	var db = req.app.get('database');
		dbm.db.collection("users6").updateOne({email: user_context.email},  {$set: {
			'email':user_context.email, 
	//		'password':user_context.password, 
			'teamname':user_context.teamname, 
			'gender':user_context.gender, 
			'age':user_context.age,
			'region':user_context.region,
			'move':user_context.move,
			'nofteam':user_context.nofteam,
			'career_year':user_context.career_year,
			'career_count':user_context.career_count,
			'introteam':user_context.introteam
		 }}, function(err, res) {
    		if (err) throw err;
    		console.log("1 document updated");
  		});
		
		res.redirect('/profileeditok');
    });
	
	router.route('/profileeditok').get(function(req, res){
		console.log('/profileeditok 패스 get 요청됨.');
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/');
		}
		else{
			console.log('회원정보 수정 완료.');
			res.render('profile_edit_ok.ejs');
		}
	});
	
    
	
    
    //아이디, 비밀번호 찾기
    router.route('/findid').get(function(req, res){
        console.log('/findid 패스 get 요청됨.');
        res.render('find_id.ejs');        
    });
    
    router.route('/findpassword').get(function(req,res){
        console.log('/findpassword 패스 get 요청됨.');        
        res.render('find_password.ejs');
    });
    
       
    
    
    //채팅
    router.route('/chatroom').get(function(req, res){
       console.log('/chatrooom 패스 get으로 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			
            res.render('chat_room.ejs', user_context);
        }
    });
    
    
    router.route('/chat').get(function(req, res){
        console.log('/chat 패스 get으로 요청됨.');

        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};		
			
			
            res.render('chat.ejs', user_context);
        }
    });
	
	router.route('/chat').post(function(req, res){
		console.log('/chat 패스 post 요청됨.');
		
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
		
		var event = {
			'email':req.user.email,
			'teamname':req.user.teamname,
			'event_date': '',
			'event_time': '',
			'event_place': ''
		};
		
		
		
		event.event_date = req.body.event_date || req.query.event_date;
		event.event_time = req.body.event_time || req.query.event_time;
		event.event_place = req.body.event_place || req.query.event_place;
		event.event_nofteam = req.body.event_nofteam || req.query.event_nofteam;
		

		
		console.dir(event);
		
		
		var event_appointment = new dbm.AppointmentModel(event);
 
        event_appointment.save(function (err, data) {
          if (err) {// TODO handle the error
              console.log("appointment save error");
          }
          console.log('New appointment inserted');
        });
		
		

	});
    
	
    
    
    // ===== 메뉴
	
	
    router.route('/mainsearch').get(function(req, res){
        console.log('/main_search 패스 get 요청됨.');
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/');
		}
		else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			console.log('/mainsearch 사용자 인증 된 상태임.');
        	res.render('main_search_.ejs', user_context);
		}
    });
	
	
	router.route('/mainsearch').post(function(req, res){
		console.log('/mainsearch 패스 post 요청됨.');
		
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
	/*	
		var city =  req.body.city || req.query.city;
		var district =  req.body.district || req.query.district;
		var gender =  req.body.gender || req.query.gender;
		var age =  req.body.age || req.query.age;
		var event_date =  req.body.event_date || req.query.event_date;
		var event_time =  req.body.event_time || req.query.event_time;
		var event_day =  req.body.event_day || req.query.event_day;
	*/	
		
		var event = {
			'teamname':req.body.search_team || req.query.search_team,
			'city': req.body.city || req.query.city,
			'district': req.body.district || req.query.district,
			'gender': req.body.gender || req.query.gender,
			'age': req.body.age || req.query.age,
	//		'event_date': req.body.event_date || req.query.event_date,
			'event_time': req.body.event_time || req.query.event_time,
			'event_day': req.body.event_day || req.query.event_day,
		}
		
		console.dir(event);
		
		
		dbm.db.collection("matchings").find(event, function(err, result){
			
		});
		
		
		
		res.redirect('/mainsearchresult');
		
	});
	
	
	
	router.route('/mainsearchresult').get(function(req, res){
		console.log('/mainsearchresult 패스 get 요청됨.');
		
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/');
		}
		else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};		
        	res.render('main_search_result.ejs', user_context);
		}
	});

    
    //경기 스케쥴
    router.route('/teamschedule').get(function(req, res){
        console.log('/teamschedule 패스 get 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			
			
            res.render('team_schedule.ejs', user_context);
        }
    });
    
    
    //팀 리뷰
    router.route('/teamreceivedreview').get(function(req, res){
        console.log('/teamreceivedreview 패스 get 요청됨')
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			
            res.render('team_received_review.ejs', user_context);
        }
    });
    
    
    //매칭 등록
    router.route('/matchapplication').get(function(req, res){
        console.log('/match_application 패스 get 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};
			
             res.render('match_application_form.ejs', user_context);
        }       
    });
	
	router.route('/matchapplication').post(function(req, res){
		console.log('/match_application 패스 post 요청됨.');
		
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
		
		
		var event = {
			'email': req.user.email,
			'teamname': req.user.teamname,	
			'city': req.body.city || req.query.city,
			'district': req.body.district || req.query.district,
			'place' : req.body.place || req.query.place,
			'move' : req.body.move || req.query.move,
			'age': req.body.age || req.query.age,	
			'event_date': req.body.event_date || req.query.event_date,
			'event_time': req.body.event_time || req.query.event_time,
			'mention': req.body.mention || req.query.mention
		};
		
		
		
		console.dir(event);
		
		
		var event_application = new dbm.ApplicationModel(event);
 
        event_application.save(function (err, data) {
          if (err) {// TODO handle the error
              console.log("application save error");
          }
          console.log('New application inserted');
        });
		
		res.redirect('/');
		
	});
	
	
	router.route('/contact').get(function(req, res){
		console.log('/contact 패스 get 요청됨.');
		
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/');
		}
		else{
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam
			};	
			
        	res.render('contact.ejs', user_context);
		}
	});
    
	
    
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 get 요청됨.');
        req.logout();
        res.redirect('/');
    });

    
    
	
	
	
    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // 회원가입 인증
    router.route('/teamsignup').post(passport.authenticate('local-signup', {
        successRedirect : '/login', 
        failureRedirect : '/teamsignup', 
        failureFlash : true 
    }));


};