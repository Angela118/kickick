/**
 * 패스포트 라우팅 함수 정의
 *
 */
  


module.exports = function(router, passport, upload) {
    console.log('user_passport 호출됨.');
			
	var an = 0;
	var dbm = require('../database/database');
		console.log('database 모듈 가져옴');
	
	var profile_img;
	var profile_photo;
	var flag=1,
		flag2=1;
	
	var event_search = {
        'teamname':'',
        'add': '',
        'gender': '',
        'age': '',
        'event_time': '',
        'event_day': ''
    };	
	
	var selectone = {
			user:'',
			date:'',
			time:'',
			region:''
		}

	
	//홈 화면, 추천
	router.route('/').get(function(req, res) {
		 console.log('/main 패스 get 요청됨.');		 
     
        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/login');
        } else {
			var fs = require('fs');
			
			const Json2csvParser = require('json2csv').Parser;
			const fields = ['email', 'age', 'gender', 'nofteam', 'geoLng', 'geoLat',/**/ 'teamname', 'region', 'add', 'move', 'event_date', 'event_time', 'event_day', 'event_day', 'mention', 'created_month', 'creted_day', 'application_number'];
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
	//			'add':req.user.add,
	//			'place':req.user.place, 
	//			'move':req.user.move, 
			};
			var j=1;
			eventData[0] = userdata;

			dbm.ApplicationModel.find({email:{$ne:req.user.email}}, function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
					var data = {
						'email' : result[i]._doc.email, 
						'teamname' : result[i]._doc.teamname,
						'region' : result[i]._doc.region,
						'add' : result[i]._doc.add,
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
						'created_day' : result[i]._doc.created_day,
						application_number : result[i]._doc.application_number
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
						'password':req.user.password, 
						'teamname':req.user.teamname, 
						'gender':req.user.gender, 
						'age':req.user.age,
						'region':req.user.region,
						'add':req.user.add,
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

	
	
	/*
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
	*/
	
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
		flag=0, flag2=0;
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
	//			'region':req.user.region,
	//			'add':req.user.add,
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
			else
				profile_img = req.user.profile_img;

			/*
			var user_context = {
				'email':req.user.email, 
				'password':req.user.password, 
				'teamname':req.user.teamname, 
				'gender':req.user.gender, 
				'age':req.user.age,
				'region':req.user.region,
				'add':req.user.add,
				'move':req.user.move,
				'nofteam':req.user.nofteam,
				'career_year':req.user.career_year,
				'career_count':req.user.career_count,
				'introteam':req.user.introteam,
				'profile_img':profile_photo
			};			
			*/

			dbm.db.collection("users6").updateOne({email: req.user.email},  {$set: {'profile_img':profile_img}}, function(err, res) {
				if (err) throw err;
				console.log("======== set profile image =======");
				console.dir(req.user.profile_img);
			});


		}catch(err){
			console.dir(err.stack);
		}
		
		if(flag2 == 0){
			flag2=1;
			res.redirect('/login');
		}		
		else{
			flag2=1;
			res.redirect('/');
		}
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
				'add':req.user.add,
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
				'add':req.user.add,
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
			'add':req.user.add,
			'geoLat':req.user.geoLat,
			'geoLng':req.user.geoLng,
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
			user_context.add = req.body.add || req.query.add;
			var addr = [];
			addr= user_context.add.split(' ');
			user_context.add = [addr[0], addr[1]];
			user_context.region = req.body.region || req.query.region;
			user_context.geoLat = req.body.resultLat || req.query.resultLat;
			user_context.geoLng = req.body.resultLng || req.query.resultLng;
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
		
		console.log('=== Profile edit ===')
		console.dir(user_context);

		dbm.db.collection("users6").updateOne({email: user_context.email},  {$set: user_context}, function(err, res) {
    		if (err) throw err;
    		console.log("=== Profile updated ===");
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
				'add':req.user.add,
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
				'add':req.user.add,
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
				'add':req.user.add,
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
      
		var event = {
			'email':req.user.email,
			'teamname':req.user.teamname,
			'event_date': req.user.event_date,
			'event_time': req.user.event_time,
			'event_region': req.user.event_region,
			'event_add': req.user.event_add,
			'event_nofteam': req.user.event_nofteam
		};
            
      
		event.event_date = req.body.event_date || req.query.event_date;
		event.event_time = req.body.event_time || req.query.event_time;
		event.event_region = req.body.region || req.query.region;
		event.event_add = req.body.add || req.query.add;
		event.event_nofteam = req.body.event_nofteam || req.query.event_nofteam;

		var addr = [];
		addr= event.event_add.split(' ');
		event.event_add = [addr[0], addr[1]];

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
				'add':req.user.add,
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

		event_search = {
			'teamname':req.body.search_team || req.query.search_team,
			'add': req.body.add || req.query.add,
			'gender': req.body.gender || req.query.gender,
			'age': req.body.age || req.query.age,
	//     'event_date': req.body.event_date || req.query.event_date,
			'event_time': req.body.event_time || req.query.event_time,
			'event_day': req.body.event_day || req.query.event_day
		};

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


			var eventData = new Array();			
				
			
			if(event_search.teamname == 'none')
				delete event_search.teamname;
			if(event_search.add[0] == 'none')
				delete event_search.add;
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
						'add' : result[i]._doc.add,
						'region' : result[i]._doc.region,
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
						'nofteam' : result[i]._doc.nofteam,
						'application_number' : result[i]._doc.application_number
					};
					eventData[i] = data;
				}			
				
				var user_context = {
					'email':req.user.email, 
					'password':req.user.password, 
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'add':req.user.add,
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


            var eventData = new Array();

            dbm.AppointmentModel.find(function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc.email == req.user.email) {

                        var data = {
                            'teamname': result[i]._doc.teamname,
                            'event_date': result[i]._doc.event_date,
                            'event_time': result[i]._doc.event_time,
                            'event_region': result[i]._doc.event_region,
                            'event_nofteam': result[i]._doc.event_nofteam
                        };

                    }
                    eventData[i] = data;
                }


                var user_context = {
					'email':req.user.email, 
					'password':req.user.password, 
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'add':req.user.add,
					'move':req.user.move,
					'nofteam':req.user.nofteam,
					'career_year':req.user.career_year,
					'career_count':req.user.career_count,
					'introteam':req.user.introteam,
					'profile_img':profile_photo,
					'event_data':eventData
				};

                res.render('team_schedule.ejs', user_context);

            });
        }
    });
    
    
    //팀 리뷰
    router.route('/teamreceivedreview').get(function(req, res){
        console.log('/teamreceivedreview 패스 get 요청됨');
        
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
				'add':req.user.add,
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


        var event = {
            'email': req.user.email,
            'teamname': req.user.teamname,
            'region': req.body.region || req.query.region,
			'add':req.body.add ||req.query.add,
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
            'nofteam' : req.user.nofteam || req.user.nofteam,
			'application_number' : an
        };
		
		var addr = [];
		addr= event.add.split(' ');
		event.add = [addr[0], addr[1]];

        console.dir(event);


        var event_application = new dbm.ApplicationModel(event);

        event_application.save(function (err, data) {
            if (err) {// TODO handle the error
                console.log("application save error");
            }
            console.log('New application inserted');
        });
		
		an+=1;

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
			
			
			var eventData = new Array();			


			dbm.ApplicationModel.find({email : req.user.email} ,function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
		//			if(result[i]._doc.email == req.user.email){
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'region' : result[i]._doc.region,
							'add' : result[i]._doc.add,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'mention' : result[i]._doc.mention,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day,
							'geoLng' : result[i]._doc.geoLng,
							'geoLat' : result[i]._doc.geoLat,
							'application_number' : result[i]._doc.application_number
						};
		//			}					
					eventData[i] = data;
				}
										
				var user_context = {
					'email':req.user.email, 
					'password':req.user.password, 
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'add':req.user.add,
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
	
	
	router.route('/mymatch').post(function(req, res){
		console.log('/mymatch 패스 post 요청함.');
		
		selectone = {
			user:req.body.user || req.query.user,
			date:req.body.date || req.query.date,
			time:req.body.time || req.query.time,
			region:req.body.event_region || req.query.event_region,
			application_number:req.body.event_application_number || req.query.event_application_number
		};
		
		if(req.body.opt == 'del' || req.query.opt == 'del'){
			dbm.ApplicationModel.remove(
				{application_number:selectone.application_number}, 
				{
					justOne:true
				}, function(err){
					if(err) throw err
					
					console.log('=== Delete Application ===');			
				}
			);
			res.redirect('/mymatch');
		}
		
		else
			res.redirect('/matchapplicationedit')

		
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
		
			
			var eventData = new Array();			
			
			
			console.dir(selectone);

			dbm.ApplicationModel.find({$and:[{email:selectone.user}, {event_date:selectone.date}, {event_time:selectone.time}, {region:selectone.region}]}, function (err, result) {				
				for(var i = 0 ; i < result.length ; i++) {
					if(result[i]._doc.email == req.user.email){
						var data = {
							'email' : result[i]._doc.email, 
							'teamname' : result[i]._doc.teamname,
							'add' : [result[i]._doc.add[0], result[i]._doc.add[1]],
							'region' : result[i]._doc.region,
							'move' : result[i]._doc.move,
							'age' : result[i]._doc.age,	
							'event_date' : result[i]._doc.event_date,
							'event_time' : result[i]._doc.event_time,
							'mention' : result[i]._doc.mention,
							'created_month' : result[i]._doc.created_month,
							'created_day' : result[i]._doc.created_day,
							'application_number' : result[i]._doc.application_number
						};
					}					
					eventData[i] = data;
				}
				
				
				var user_context = {
					'email':req.user.email, 
					'password':req.user.password, 
					'teamname':req.user.teamname, 
					'gender':req.user.gender, 
					'age':req.user.age,
					'region':req.user.region,
					'add':req.user.add,
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
	

	router.route('/matchapplicationedit').post(function(req, res){
		console.log('/matchapplicationedit 패스 post 요청됨.');
	
		var update = {
			'add': req.body.add || req.query.add,
			'region' : req.body.region || req.query.region,
			'move' : req.body.move || req.query.move,
			'age': req.body.age || req.query.age,
			'gender': req.body.gender || req.query.gender,
			'event_date': req.body.event_date || req.query.event_date,
			'event_time': req.body.event_time || req.query.event_time,
			'mention': req.body.mention || req.query.mention,
			'geoLat': req.body.geoLat || req.query.geoLat,
			'geoLng': req.body.geoLng || req.query.geoLng,
			'nofteam': req.body.nofteam || req.query.nofteam,
			'application_number': selectone.application_number
		};
		
		var addr = [];
		addr= update.add.split(' ');
		update.add = [addr[0], addr[1]];
		
		if(update.add[0] == undefined)
			delete update.add;
		if(update.region == undefined)
			delete update.region;
		if(update.move == undefined)
			delete update.move;
		if(update.age == undefined)
			delete update.age;
		if(update.gender == undefined)
			delete update.gender;
		if(update.event_date == undefined)
			delete update.event_date;
		if(update.event_time == undefined)
			delete update.event_time;
		if(update.mention == undefined)
			delete update.mention;
		if(update.geoLat == undefined)
			delete update.geoLat;
		if(update.geoLng == undefined)
			delete update.geoLng;
		if(update.nofteam == undefined)
			delete update.nofteam;
			
		console.dir(update);
		
		dbm.ApplicationModel.updateOne({application_number:selectone.application_number},  {$set: update}, function(err, res) {
    		if (err) throw err;
    		console.log("=== Application updated ===");
  		});
		
		res.redirect('/mymatch');
	});
	
	
	
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
				'add':req.user.add,
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
		profile_img=null;
		profile_photo=null;
        req.logout();
        res.redirect('/login');
    });

};
