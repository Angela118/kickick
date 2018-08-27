/**
 * 패스포트 라우팅 함수 정의
 *
 */
  


module.exports = function(router, passport, upload) {
    console.log('user_passport 호출됨.');
	var profile_img;
	var profile_photo;
	var flag=1;
	
	var event_search = {
        'teamname':'',
        'region': '',
        'gender': '',
        'age': '',
        'event_time': '',
        'event_day': ''
    };	

	
	//홈 화면, 추천
	router.route('/').get(function(req, res) {
		 console.log('/main 패스 get 요청됨.');		 
     
        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var fs = require('fs');
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
			
			const Json2csvParser = require('json2csv').Parser;
			const fields = ['email', 'age', 'gender', 'nofteam', 'geoLng', 'geoLat', 'teamname', 'region', 'place', 'move', 'event_date', 'event_time', 'event_day', 'event_day', 'mention', 'created_month', 'creted_day'];
			const eventData = [];	
			
			var userdata = {
				'email':req.user.email,
				'age':req.user.age,
				'gender':req.user.gender,
				'nofteam':req.user.nofteam,
				'geoLng':req.user.geoLng,
				'geoLat':req.user.geoLat,
	//			'teamname':req.user.teamname, 
	//			'region':req.user.region, 
	//			'place':req.user.place, 
	//			'move':req.user.move, 
			};
			var j=1;
			eventData[0] = userdata;

			dbm.ApplicationModel.find(function (err, result) {				
			for(var i = 0 ; i < result.length ; i++) {
				var data = {
					'email' : result[i]._doc.email, 
					'teamname' : result[i]._doc.teamname,
					'region' : result[i]._doc.region,
					'place' : result[i]._doc.place,
					'move' : result[i]._doc.move,
					'age' : result[i]._doc.age,	
					'gender' : result[i]._doc.gender,
					'event_date' : result[i]._doc.event_date,
					'event_time' : result[i]._doc.event_time,
					'event_day' : result[i]._doc.event_day,
					'mention' : result[i]._doc.mention,	
					'nofteam' : result[i]._doc.nofteam,
					'geoLng' : result[i]._doc.geoLng,
					'geoLat' : result[i]._doc.geoLat,
					'created_month' : result[i]._doc.created_month,
					'created_day' : result[i]._doc.created_day
				};										
				eventData[j] = data;
				j+=1;
			}
			const json2csvParser = new Json2csvParser({ fields });
			const csv = json2csvParser.parse(eventData);

			fs.writeFile('recEvent.csv', csv, 'utf8', function(err){
				if(err) throw err
				console.log('File Write.');
			});	
		});			
			
			
			
			
			var pythonShell = require('python-shell');
			
			var options = {
				pythonPath: '',
				pythonOptions:['-u'],
				scriptPath: ''
			};
			
			
			
			pythonShell.run('recEvent.py', options, function(err, results){
				if(err) throw err
				
				console.log('Python run');
				console.log('%j', results)
			});
			
			
			
			setTimeout(function(){
				var csvf = require('csvtojson');
				var eventData2;
				
				csvf()
				.fromFile('recOutput.csv')
				.then(function(output){
	
					profile_photo = req.user.profile_img;			
					if(profile_img == null)
						profile_img = req.user.profile_img;
					if(profile_img != req.user.profile_img)
						profile_photo = profile_img;

					var user_context = {
						'email':req.user.email,
						'teamname':req.user.teamname, 
						'gender':req.user.gender, 
						'age':req.user.age,
						'region':req.user.region,
						'move':req.user.move,
						'nofteam':req.user.nofteam,
						'career_year':req.user.career_year,
						'career_count':req.user.career_count,
						'introteam':req.user.introteam,
						'profile_img':profile_photo,
						'event_data':output
					};

					console.dir(user_context);

					res.render('main.ejs', user_context);				
				});
				
			}, 1500);
		}        
    });
	
	router.route('/').post(function(req, res){
		var kofsort = req.body.sort || req.query.sort;
		console.log(kofsort);
			
			if(kofsort == 1){
				res.redirect('/regionsort');
			}else if(kofsort == 2){
				res.redirect('gendersort');
			}else if(kofsort == 3){
				res.redirect('/agesort');
			}
	});
	
	router.route('/regionsort').get(function(req, res){
		
	});
	
	router.route('/gendersort').get(function(req, res){
		console.log('Search by gender');
		
		// 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
			const eventData = [];
			
			dbm.ApplicationModel.find({gender:req.user.gender},function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'region' : result[i]._doc.region,
							'place' : result[i]._doc.place,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'gender' : result[i]._doc.gender,
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'event_day' : result[i]._doc.event_day,
							'mention' : result[i]._doc.mention,	
							'nofteam' : result[i]._doc.nofteam,
							'geoLng' : result[i]._doc.geoLng,
							'geoLat' : result[i]._doc.geoLat,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day
						};
					eventData[i] = data;
					}
				
				var user_context = {
					'email':req.user.email,
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};
				
				console.dir(user_context);
				
							
            	res.render('main.ejs', user_context);			
			});			
		}
			
	});
	
	router.route('/agesort').get(function(req, res){
		console.log('Search by age');
		// 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
			const eventData = [];
			
			dbm.ApplicationModel.find({age: { $gt: req.user.age-5 , $lte: req.user.age+5 } },function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'region' : result[i]._doc.region,
							'place' : result[i]._doc.place,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'gender' : result[i]._doc.gender,
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'event_day' : result[i]._doc.event_day,
							'mention' : result[i]._doc.mention,	
							'nofteam' : result[i]._doc.nofteam,
							'geoLng' : result[i]._doc.geoLng,
							'geoLat' : result[i]._doc.geoLat,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day
						};
					eventData[i] = data;
					}
				
				var user_context = {
					'email':req.user.email,
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};
				
				console.dir(user_context);
				
							
            	res.render('main.ejs', user_context);			
			});			
		}
			
	});
	
	
    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 get 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
	 
	
    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

	
	
    // 회원가입 화면
    router.route('/teamsignup').get(function(req, res) {
        console.log('/teamsignup 패스 get 요청됨.');
		flag=0;
        res.render('team_signup.ejs', {message: req.flash('signupMessage')});
    });
	
	// 회원가입 인증
    router.route('/teamsignup').post(passport.authenticate('local-signup', {
        successRedirect : '/uploadimg', 
        failureRedirect : '/teamsignup', 
        failureFlash : true 
    }));
	
	
	// 프로필 사진
	router.route('/uploadimg').get(function(req, res){
		console.log('/uploadimg 패스 get 요청됨.');
		
		
		// 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
			
			console.log(profile_img);
			console.log(req.user.profile_img);
			
			if(flag == 0)
				profile_photo = req.user.profile_img;
			else{
				profile_photo = req.user.profile_img;			
				if(profile_img == null)
					profile_img = req.user.profile_img;
				if(profile_img != req.user.profile_img)
					profile_photo = profile_img;
			}
			
			console.log(profile_img);
			console.log(req.user.profile_img);

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
						
			flag=1;
            res.render('upload_img.ejs', user_context);
		}
	});
	
	
	router.route('/uploadimg').post(upload.array('photo'), function(req, res){
		
		try{
			
			var files = req.files;
			console.log(req.files);

			console.log('===== 업로드 된 첫 번째 파일 정보 =====');
			console.dir(files[0]);
			console.log('===================================');

			var originalname = '',
				filename = '',
				mimetype = '',
				size = 0;

			if(Array.isArray(files)){
				for(var i=0; i<files.length; i++){
					originalname = files[i].originalname;
					filename = files[i].filename;
					mimetype = files[i].mimetype;
					size = files[i].size;
				}	
			}


			console.log('파일 업로드 성공!');
			console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
			
		
			if(filename)
				profile_img = filename;
			
			
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
		
		
			var user_context = {
				'email':req.user.email, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam,
				'profile_img':profile_img
			};			
			
			
		
			
			console.dir(user_context);
			

		dbm.db.collection("users6").updateOne({email: req.user.email},  {$set: {
			'email':user_context.email, 
			'teamname':user_context.teamname, 
			'gender':user_context.gender, 
			'age':user_context.age,
			'region':user_context.region,
			'move':user_context.move,
			'nofteam':user_context.nofteam,
			'career_year':user_context.career_year,
			'career_count':user_context.career_count,
			'introteam':user_context.introteam,
			'profile_img':user_context.profile_img
		 }}, function(err, res) {
    		if (err) throw err;
    		console.log("======== set profile image =======");
			console.dir(req.user);
  		});


		}catch(err){
			console.dir(err.stack);
		}
		
		

		
		res.redirect('/');
		
		
	});


	
    // 프로필 
    router.route('/teamprofile').get(function(req, res) {
        console.log('/teamprofile 패스 get 요청됨.');

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
            console.log('사용자 인증된 상태임.');
   
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;
			
			
						
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
			
			console.log(user_context.profile_img);
						
			
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
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};	
			
            console.log('사용자 인증된 상태임.');
            res.render('team_profile_edit.ejs', user_context);
        }
		
	})
	
    router.route('/teamprofileedit').post(function(req, res) {
        console.log('/teamprofileedit 패스 post 요청됨.');
		
		var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
		
		
		
		profile_photo = req.user.profile_img;			
		if(profile_img == null)
			profile_img = req.user.profile_img;
		if(profile_img != req.user.profile_img)
			profile_photo = profile_img;


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
			'introteam':req.user.introteam,
			'profile_img':profile_photo
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
		
			

		dbm.db.collection("users6").updateOne({email: user_context.email},  {$set: {
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
			res.redirect('/login');
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
            res.redirect('/login');
        }else{
			
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
			
            res.render('chat_room.ejs', user_context);
        }
    });
    
    
    router.route('/chat').get(function(req, res){
        console.log('/chat 패스 get으로 요청됨.');

        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};	
			
			
            res.render('chat_.ejs', user_context);
        }
    });
/*	
	router.route('/chat').post(function(req, res){
		console.log('/chat appointment 패스 post 요청됨.');
		
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
	*/
	
	router.route('/chatappointment').get(function(req, res){
        console.log('/chatappointment 패스 get으로 요청됨.');

        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
         profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};	      
         
         
            res.render('chat_appointment.ejs', user_context);
        }
    });
	
	router.route('/chatappointment').post(function(req, res) {
       console.log('/chatappointment 패스 post 요청됨');
       
       var dbm = require('../database/database');
       console.log('database 모듈 가져옴');
      
      
      var event = {
         'email':req.user.email,
         'teamname':req.user.teamname,
         'event_date': req.user.event_date,
         'event_time': req.user.event_time,
         'event_place': req.user.event_place,
         'event_nofteam': req.user.event_nofteam
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
	   
      res.redirect('/chat');
   })
    
	
    
    
    // ===== 메뉴
	
	
	//경기 검색
    router.route('/mainsearch').get(function(req, res){
        console.log('/main_search 패스 get 요청됨.');
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/login');
		}
		else{
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
			
			console.log('/mainsearch 사용자 인증 된 상태임.');
        	res.render('main_search.ejs', user_context);
		}
    });
	
	
	router.route('/mainsearch').post(function(req, res){
		console.log('/mainsearch 패스 post 요청됨.');


//		var dbm = require('../database/database');
//		console.log('database 모듈 가져옴');

		event_search = {
			'teamname':req.body.search_team || req.query.search_team,
			'region': req.body.region || req.query.region,
			'gender': req.body.gender || req.query.gender,
			'age': req.body.age || req.query.age,
	//     'event_date': req.body.event_date || req.query.event_date,
			'event_time': req.body.event_time || req.query.event_time,
			'event_day': req.body.event_day || req.query.event_day
		};
	
		
 
/*		
		if(event_search.gender == 0)
			event_search.teamname = 'none';
		if(event_search.age == 0)
			event_search.age = 'none';
*/

		res.redirect('/mainsearchresult');
      
   });
   
      
      
   router.route('/mainsearchresult').get(function(req, res){
	   
		console.log('/mainsearchresult 패스 get 요청됨.');


		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/login');
		}
		else{
			profile_photo = req.user.profile_img;         
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;


			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');

			var eventData = new Array();
			
				
			
			if(event_search.teamname == 'none')
				delete event_search.teamname;
			if(event_search.region[0] == 'none')
				delete event_search.region;
			if(event_search.gender == 0)
				delete event_search.gender;
			if(event_search.age == 0)
				delete event_search.age;
			if(event_search.event_time == 'none')
				delete event_search.event_time;
			if(event_search.event_day == 'none')
				delete event_search.event_day;
			
			

			var search = [];
			search.push()
			
			for(var key in event_search) {
				var testobj = new Object();
				var testkey = event_search;
				console.log(key)
				testobj[key] = event_search[key];
				search.push(testobj);
			}
			
			console.dir(search);

			dbm.ApplicationModel.find({$and: search}, function (err, result) {
				for (var i = 0; i < result.length; i++) {
					var data = {
						'email' : result[i]._doc.email,
						'teamname' : result[i]._doc.teamname,
						'city' : result[i]._doc.city,
						'place' : result[i]._doc.place,
						'move' : result[i]._doc.move,
						'age' : result[i]._doc.age,
						'gender' : result[i]._doc.gender,
						'event_date' : result[i]._doc.event_date,
						'event_time' : result[i]._doc.event_time,
						'event_day' : result[i]._doc.event_day,
						'mention' : result[i]._doc.mention,
						'created_month' : result[i]._doc.created_month,
						'created_day' : result[i]._doc.created_day,
						'geoLng' : result[i]._doc.geoLng,
						'geoLat' : result[i]._doc.geoLat,
						'nofteam' : result[i]._doc.nofteam
					};
					eventData[i] = data;
				}			
				
				var user_context = {
					'email':req.user.email, 
					'password':req.user.password, 
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'city':req.user.city,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};
				
				console.dir(eventData);

				res.render('main_search_result.ejs', user_context);                
			});
        }
    });

    //경기 스케쥴
    router.route('/teamschedule').get(function(req, res) {
        console.log('/teamschedule 패스 get 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {

            profile_photo = req.user.profile_img;
            if (profile_img == null)
                profile_img = req.user.profile_img;
            if (profile_img != req.user.profile_img)
                profile_photo = profile_img;

            var dbm = require('../database/database');
            console.log('database 모듈 가져옴');

            var eventData = new Array();

            dbm.AppointmentModel.find(function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc.email == req.user.email) {

                        var data = {
                            'teamname': result[i]._doc.teamname,
                            'event_date': result[i]._doc.event_date,
                            'event_time': result[i]._doc.event_time,
                            'event_place': result[i]._doc.event_place,
                            'event_nofteam': result[i]._doc.event_nofteam
                        };

                    }
                    eventData[i] = data;
                }


                var user_context = {
                    'email': req.user.email,
                    'password': req.user.password,
                    'teamname': req.user.teamname,
                    'gender': req.user.gender,
                    'age': req.user.age,
                    'region': req.user.region,
                    'move': req.user.move,
                    'nofteam': req.user.nofteam,
                    'career_year': req.user.career_year,
                    'career_count': req.user.career_count,
                    'introteam': req.user.introteam,
                    'profile_img': profile_photo,
                    'event_data':eventData
                };

                res.render('team_schedule.ejs', user_context);

            });
        }
    });
    
    
    //팀 리뷰
    router.route('/teamreceivedreview').get(function(req, res){
        console.log('/teamreceivedreview 패스 get 요청됨')
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
			
			
            res.render('team_received_review.ejs', user_context);
        }
    });
    
    
    //매칭 등록
    router.route('/matchapplication').get(function(req, res){
        console.log('/match_application 패스 get 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
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
            'region': req.body.city || req.query.city,
            'place' : req.body.place || req.query.place,
            'move' : req.body.move || req.query.move,
            'age': req.body.age || req.query.age,
            'gender': req.body.gender || req.query.gender,
            'event_date': req.body.event_date || req.query.event_date,
            'event_time': req.body.event_time || req.query.event_time,
            'event_day' : req.body.event_day || req.query.event_day,
            'mention': req.body.mention || req.query.mention,
            'geoLng': req.body.resultLng || req.query.resultLng,
            'geoLat': req.body.resultLat || req.query.resultLat,
            'nofteam' : req.user.nofteam || req.user.nofteam
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
	
	
	router.route('/mymatch').get(function(req, res){
		console.log('/mymatch 패스 get 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
			
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;
			
			
			
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
			
			
			var eventData = new Array();			


			dbm.ApplicationModel.find({email : req.user.email} ,function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
					if(result[i]._doc.email == req.user.email){
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'region' : result[i]._doc.region,
							'place' : result[i]._doc.place,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'mention' : result[i]._doc.mention,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day,
							'geoLng' : result[i]._doc.geoLng,
							'geoLat' : result[i]._doc.geoLat
						};
					}					
					eventData[i] = data;
				}
										
				var user_context = {
					'email':req.user.email,
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};
				
							
            	res.render('my_match.ejs', user_context);
			
			});
        }
	});
	
	
	router.route('/matchapplicationedit').get(function(req, res){
		console.log('/matchapplicationedit 패스 get 요청됨.');
        
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        }else{
			
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;
			
			
			
			var dbm = require('../database/database');
			console.log('database 모듈 가져옴');
			
			
			var eventData = new Array();			


			dbm.ApplicationModel.find(function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
					if(result[i]._doc.email == req.user.email){
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'city' : result[i]._doc.city,
							'district' : result[i]._doc.district,
							'place' : result[i]._doc.place,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'mention' : result[i]._doc.mention,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day
						};
					}					
					eventData[i] = data;
				}
				
				
				var user_context = {
					'email':req.user.email,
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};
				
				
				console.dir(user_context);
				
							
            	res.render('match_application_edit.ejs', user_context);
			
			});


        }
	});
	
	
	/*
	* 화면 동기화 된 후에 할 수 있음
	*
	router.route('/matchapplicationedit').post(function(req, res){
		console.log('/matchapplicationedit 패스 post 요청됨.');
		
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
		
		
		dbm.db.collection("application").updateOne({email:req.user.email},  {$set: {
			event[i].city: event.city,
			'district': event.district,
			'place': event.place,
			'move': event.move,
			'age': event.age,
			'event_date': event.event_date,
			'event_time': event.event_time,
			'mention': event.mention
		 }}, function(err, res) {
    		if (err) throw err;
    		console.log("application updated");
  		});
		
		
 
        event_application.save(function (err, data) {
          if (err) {// TODO handle the error
              console.log("application save error");
          }
          console.log('New application inserted');
        });
		
		res.redirect('/');
	});
	
	*/
	
	
	router.route('/contact').get(function(req, res){
		console.log('/contact 패스 get 요청됨.');
		
		
		if(!req.user){
			console.log('사용자 인증 안된 상태임.');
			res.redirect('/login');
		}
		else{
			
			profile_photo = req.user.profile_img;			
			if(profile_img == null)
				profile_img = req.user.profile_img;
			if(profile_img != req.user.profile_img)
				profile_photo = profile_img;

			
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
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};
			
        	res.render('contact.ejs', user_context);
		}
	});
    
	
    
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 get 요청됨.');
		profile_img =null;
		profile_photo=null;
        req.logout();
        res.redirect('/login');
    });

};
