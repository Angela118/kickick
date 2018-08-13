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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
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
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 get 요청됨.');
        res.render('signup_.ejs', {message: req.flash('signupMessage')});
    });
	 
	
	
	
    // 프로필 
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 get 요청됨.');

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.dir(req.user);
			
			
			var user_context = {
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
			};
			
			
            res.render('profile.ejs', user_context);
        
/*
            if (Array.isArray(req.user)) {
                res.render('profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('profile.ejs', {user: req.user});
            }
			
			*/
       }
    });
	
    
	router.route('/profileedit').get(function(req, res){
		console.log('/profileedit 패스 get 요청됨.');
	
		
		 // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var user_context = {
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
			};		
			
            console.log('사용자 인증된 상태임.');
            res.render('profile_edit.ejs', user_context);
        }
		
	})
	
    router.route('/profileedit').post(function(req, res) {
        console.log('/profileedit 패스 post 요청됨.');
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
		
		var user_context = {
			'email': req.user.email, 
            'password': req.user.password, 
         	'name': req.user.name, 
            'nickname': req.user.nickname,
			'region': req.user.region,
            'gender': req.user.gender, 
            'age': req.user.age,
			'birth': req.user.birth
		};		
		
		
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
			
		
		var db = req.app.get('database');
		dbm.db.collection("users6").updateOne({email: user_context.email},  {$set: {
				'name':user_context.name, 
				'nickname':user_context.nickname,
				'region':user_context.region,
				'gender':user_context.gender, 
				'age':user_context.age,
				'birth':user_context.birth
		 }}, function(err, res) {
    		if (err) throw err;
    		console.log("1 document updated");
  		});
		
		res.redirect('/profileeditok');
    });
	
	router.route('/profileeditok').get(function(req, res){
		
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>회원정보가 수정되었습니다.</h1>');
		res.write('<div><p>다시 로그인 해주세요.</p></div>');
		res.write("<br><br><a href='/logout'> 다시 로그인하기</a>");
		res.end();

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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
			};		
			
			
            res.render('chat.ejs', user_context);
        }
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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
			};		
        	res.render('main_search.ejs', user_context);
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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
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
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
			};
			
             res.render('match_application_form.ejs', user_context);
        }       
    });
	
	
	router.route('/contact').get(function(req, res){
		console.log('/contact 패스 get 요청됨.');
		
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/');
		}
		else{
			var user_context = {
				'email': req.user.email, 
				'password': req.user.password, 
				'name': req.user.name, 
				'nickname': req.user.nickname,
				'region': req.user.region,
				'gender': req.user.gender, 
				'age': req.user.age,
				'birth': req.user.birth
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
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/login', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));
	

	/*
	//프로필 수정
	router.route('/profileedit').post(passport.authenticate('local-pedit', {
		successRedirect : '/profile',
		failureRedirect : '/profileedit',
		failureFlash : true
	}));
*/

};