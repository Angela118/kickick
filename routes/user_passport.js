/**
 * 패스포트 라우팅 함수 정의
 *
 */



module.exports = function(router, passport, upload) {
    console.log('user_passport 호출됨.');
    var profile_img;
    var profile_photo;

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/main 패스 요청됨.');


        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            //    res.render('main.ejs', {login_success:false});
            res.redirect('/login');
        } else {
            profile_photo = req.user.profile_img;
            if(profile_img == null)
                profile_img = req.user.profile_img;
            if(profile_img != req.user.profile_img)
                profile_photo = profile_img;

            console.log('===== profile photo : ' + profile_photo);


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
            res.render('main.ejs', user_context /*, {login_success:true}*/);
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

            profile_photo = req.user.profile_img;
            if(profile_img == null)
                profile_img = req.user.profile_img;
            if(profile_img != req.user.profile_img)
                profile_photo = profile_img;


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


            dbm.db.collection("users6").updateOne({email: user_context.email},  {$set: {
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
            res.redirect('/');
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

    });

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

    //채팅
    router.route('/chatroomchat').get(function(req, res){
        console.log('/chatrooomchat 패스 get으로 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
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

            res.render('chat_room_chat.ejs', user_context);
        }
    });

    router.route('/chat').get(function(req, res){
        console.log('/chat 패스 get으로 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
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

    router.route('/chatappointment').get(function(req, res){
        console.log('/chatappointment 패스 get으로 요청됨.');

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
    });

    router.route('/chatroommessage').get(function(req, res){
        console.log('/chatroommessage 패스 get으로 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }else {
            profile_photo = req.user.profile_img;
            if (profile_img == null)
                profile_img = req.user.profile_img;
            if (profile_img != req.user.profile_img)
                profile_photo = profile_img;

            var dbm = require('../database/database');
            console.log('database 모듈 가져옴');

            var eventData = new Array();
            var j = 0;

            // 내가 올린 매칭을 상대방이 신청할 경우 찾기

            // 내가 아닌 사람이 올린 매칭 찾기
            dbm.MatchModel.find({email : {"$ne" : req.user.email}} ,function (err, result) {
                for (var i = 0; i < result.length; i++) {

                    // 그 중 내가 올렸던 매칭(others의 sEmail이 나인 것) 찾기
                    if (result[i]._doc.others.sEmail === req.user.email) {

                        // data는 내가 올린 글에 매칭 신청한 상대방 정보
                        var data = {
                            'sameEmailIndex' : 0,
                            'email': result[i]._doc.email,
                            'teamname': result[i]._doc.teamname,
                            'region': result[i]._doc.region,
                            'place': result[i]._doc.place,
                            'move': result[i]._doc.move,
                            'age': result[i]._doc.age,
                            'gender': result[i]._doc.gender,
                            'event_date': result[i]._doc.event_date,
                            'event_time': result[i]._doc.event_time,
                            'event_day': result[i]._doc.event_day,
                            'mention': result[i]._doc.mention,
                            'created_month': result[i]._doc.created_month,
                            'created_day': result[i]._doc.created_day,
                            'geoLng': result[i]._doc.geoLng,
                            'geoLat': result[i]._doc.geoLat,
                            'nofteam': result[i]._doc.nofteam,
                            // others는 내가 올린 매칭 등록 정보
                            'others': result[i]._doc.others
                        };
                        eventData[j++] = data;
                        console.log(data);
                    }
                }

                // 같은 매칭 신청자 & 매칭 등록자 조합이 또 존재하는 경우 index++
                for (var a = 0; a < eventData.length; a++) {
                    for (var b = a + 1; b <eventData.length; b++ ){
                        if(eventData[a].email == eventData[b].email) {
                            eventData[b].sameEmailIndex++;
                        }
                    }
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
                    'event_data':eventData // 메시지 보낸 상대팀 정보
                };
                console.dir(eventData);
                res.render('chat_room_message.ejs', user_context);
            });
        }
    });

    // message get 역할 함
    router.route('/chatroommessage').post(function(req, res) {
        // ------------------------------- data 삽입위치 수정
        console.log('/chatroommessage 패스 post 요청됨.');

        var dbm = require('../database/database');
        console.log('database 모듈 가져옴');

        //나한테 신청한 사람 이메일
        var otherEmail = req.body.sEmail;
        console.log('otherEmail : ' + req.body.sEmail);

        // 등록한 사람 나 : & 신청한 사람 : 그사람 중복되는 경우 index
        var sSameEmailIndex = req.body.sSameEmailIndex;
        console.log('sSameEmailIndex : ' + req.body.sSameEmailIndex);

        var j = 0;
        var eventData = new Array();

        // 나한테 신청한 사람 이메일 받아온거로 matches에서 email 찾아서
        dbm.MatchModel.find({email: otherEmail}, function (err, result) {
            console.log('result.length : ' + result.length);

            for (var i = 0; i < result.length; i++) {
                console.log('result[' + i + '].doc_others.email : ' + result[i]._doc.others.sEmail);
                console.log('req.user.email : ' + req.user.email);

                // 그 사람이 올린 것 중 신청자가 나일 경우
                if (result[i]._doc.others.sEmail === req.user.email) {

                    // 나한테 신청한 사람 정보
                    var data = {
                        'email': result[i]._doc.email,
                        'teamname': result[i]._doc.teamname,
                        'region': result[i]._doc.region,
                        'place': result[i]._doc.place,
                        'move': result[i]._doc.move,
                        'age': result[i]._doc.age,
                        'gender': result[i]._doc.gender,
                        'event_date': result[i]._doc.event_date,
                        'event_time': result[i]._doc.event_time,
                        'event_day': result[i]._doc.event_day,
                        'mention': result[i]._doc.mention,
                        'created_month': result[i]._doc.created_month,
                        'created_day': result[i]._doc.created_day,
                        'geoLng': result[i]._doc.geoLng,
                        'geoLat': result[i]._doc.geoLat,
                        'nofteam': result[i]._doc.nofteam,
                        'others': result[i]._doc.others //내가 등록한 매칭 정보
                    };
                    eventData[j++] = data;
                }
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
                'event_data': eventData,
                'sSameEmailIndex' : sSameEmailIndex // email 중복시 index
            };
            console.log(eventData);

            console.log('chatmessagepostend----------------------');
            res.render('message.ejs', user_context);
            console.log('render 함');
        });
    });

    router.route('/message').post(function(req, res) {
        console.log('/message 패스 post 요청됨');

        // 매칭 여부 (1: 승인 / 2: 거절 / 0: 대기);
        var match = req.body.match;
        console.log('match : ' + match);

        // 매칭 신청한 애
        var otherEmail = req.body.sEmail;
        console.log('otherEmail : ' + otherEmail);

        // 걔 동일 이메일 인덱스 있는지 확인
        var sSameEmailIndex = req.body.sSameEmailIndex;
        console.log('sSameEmailIndex : ' + sSameEmailIndex);

        var dbm = require('../database/database');
        console.log('database 모듈 가져옴');

        var eventData = new Array();
        var j = 0;

        // 나한테 신청한 사람 이메일 받아온거로 matches에서 email 찾아서
        dbm.MatchModel.find({email: otherEmail}, function (err, result) {
            console.log('result.length : ' + result.length);

            for (var i = 0; i < result.length; i++) {
                console.log('result[' + i + '].doc_others.email : ' + result[i]._doc.others.sEmail);
                console.log('req.user.email : ' + req.user.email);

                // 그 사람이 올린 것 중 신청자가 나일 경우
                if (result[i]._doc.others.sEmail === req.user.email) {

                    // 나한테 신청한 사람 정보
                    var data = {
                        'email': result[i]._doc.email,
                        'teamname': result[i]._doc.teamname,
                        'others': result[i]._doc.others //내가 등록한 매칭 정보
                    };
                    console.log(i + '번째 data.others : ');
                    console.dir(data.others);
                    console.log('j : ' + j);
                    eventData[j++] = data;
                    console.log('eventData: ');
                    console.log(eventData);
                }
            }

            console.log('00000000000000000000000000000000000000000000');
            console.log('eventData : ');
            console.log(eventData);

            var teamname = eventData[sSameEmailIndex].teamname;
            console.log('teamname : ' + teamname);

            var findEventDate = eventData[sSameEmailIndex].others.sEvent_date;
            console.log('findEventDate : ' + findEventDate);

            var findEventTime = eventData[sSameEmailIndex].others.sEvent_time;

            console.log('findEventTime ; ' + findEventTime);

            dbm.MatchModel.update(
                {email: otherEmail, "others.sEvent_date": findEventDate, "others.sEvent_time": findEventTime},
                {$set: {match_success: match}}, function (err, result) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.dir(result);
                    }
                });

        });
        res.redirect('/chatroommessage');
    });



// ===== 메뉴


    router.route('/mainsearch').get(function(req, res){
        console.log('/mainsearch 패스 get 요청됨.');

        if(!req.user){
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
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


// 검색 결과
    router.route('/mainsearchresult').get(function(req, res){
        // ------------------------------- data 삽입위치 수정
        console.log('/mainsearchresult 패스 get 요청됨.');

        if(!req.user){
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        }
        else {
            profile_photo = req.user.profile_img;
            if (profile_img == null)
                profile_img = req.user.profile_img;
            if (profile_img != req.user.profile_img)
                profile_photo = profile_img;

            var dbm = require('../database/database');
            console.log('database 모듈 가져옴');

            var eventData = new Array();
            var j = 0;

            dbm.ApplicationModel.find({email : {"$ne" : req.user.email}} ,function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc.email != req.user.email) {
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
                            'created_month' : result[i]._doc.created_month,
                            'created_day' : result[i]._doc.created_day,
                            'geoLng' : result[i]._doc.geoLng,
                            'geoLat' : result[i]._doc.geoLat,
                            'nofteam' : result[i]._doc.nofteam,
                        };
                        eventData[j++] = data;
                    }
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
                console.dir(eventData);

                res.render('main_search_result.ejs', user_context);
            });
        }
    });

    router.route('/mainsearchresult').post(function(req, res){
        console.log('/mainsearchresult 패스 post 요청됨.');

        var dbm = require('../database/database');
        console.log('database 모듈 가져옴');

        var others = {
            'sEmail': req.body.sEmail,
            'sTeamname': req.body.sTeamname,
            'sRegion': req.body.sRegion,
            'sPlace' : req.body.sPlace,
            'sMove' : req.body.sMove,
            'sAge': req.body.sAge,
            'sGender': req.body.sGender,
            'sEvent_date': req.body.sDate,
            'sEvent_time': req.body.sTime,
            'sEvent_day' : req.body.sDay,
            'sCreatedMonth' : req.body.sCreatedMonth,
            'sCreatedDay' : req.body.sCreatedDay,
            'sMention': req.body.sMention,
            'sGeoLng': req.body.sGeoLng,
            'sGeoLat': req.body.sGeoLat,
            'sNofteam': req.body.sNofteam,
            'sScore': 0,
            'sReview' : 0
        }

        var event = {
            'email':req.user.email,
            'teamname':req.user.teamname,
            'region':req.user.region,
            'place':req.user.place,
            'move':req.user.move,
            'age':req.user.age,
            'gender':req.user.gender,
            'career_year':req.user.career_year,
            'career_count':req.user.career_count,
            'introteam':req.user.introteam,
            'nofteam':req.user.nofteam,
            'others': others
        };

        //console.dir(event);

        var event_match = new dbm.MatchModel(event);

        event_match.save(function (err, data) {
            if (err) {// TODO handle the error
                console.log("match save error");
                console.log('err : ' + err);
                console.log('data : ' + data);
            }
            console.log('New match inserted');
            console.log('data : ' + data);
        });

        res.redirect('/mainsearchresult');
    });

//경기 스케쥴
// ------------------------------- data 삽입위치 수정
    router.route('/teamschedule').get(function(req, res) {
        console.log('/teamschedule 패스 get 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            profile_photo = req.user.profile_img;
            if (profile_img == null)
                profile_img = req.user.profile_img;
            if (profile_img != req.user.profile_img)
                profile_photo = profile_img;

            var dbm = require('../database/database');
            console.log('database 모듈 가져옴');

            var eventData = new Array(); // 나한테 신청한
            // var eventData2 = new Array(); // 내가 신청한
            var j = 0;


            // 나한테 매칭 신청한 팀 찾기
            dbm.MatchModel.find({email : {"$ne" : req.user.email}} ,function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc.others.sEmail === req.user.email) {
                        var data = {
                            'teamname': result[i]._doc.teamname, //상대팀
                            // others내엔 경기정보
                            'event_date': result[i]._doc.others.sEvent_date,
                            'event_time': result[i]._doc.others.sEvent_time,
                            'event_place': result[i]._doc.others.sPlace,
                            'event_nofteam': result[i]._doc.nofteam, // 상대팀
                            'match_success': result[i]._doc.match_success,
                            'score': result[i]._doc.score, // 상대팀의 이 경기 score
                            'review': result[i]._doc.review, // 상대팀이 이 경기에서 받은 review
                            'sScore' : result[i]._doc.others.sScore, // 내 이 경기 스코어
                            'sReview': result[i]._doc.others.sReview // 내가 이 경기에서 받은 리뷰
                        };
                        eventData[j++] = data;
                    }
                }

                // j = 0;
                // 내가 매칭 신청한 팀 찾기
                dbm.MatchModel.find({email : req.user.email} ,function (err, result) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i]._doc.email === req.user.email) {
                            var data = {
                                'teamname': result[i]._doc.teamname, //나
                                'otherTeam' : result[i]._doc.others.sTeamname, // 상대팀
                                // others내엔 경기정보
                                'event_date': result[i]._doc.others.sEvent_date,
                                'event_time': result[i]._doc.others.sEvent_time,
                                'event_place': result[i]._doc.others.sPlace,
                                'other_nofteam': result[i]._doc.others.sNofteam, // 상대팀
                                'match_success': result[i]._doc.match_success,
                                'score': result[i]._doc.score, // 이 경기 내 score
                                'review': result[i]._doc.review, // 내가 이 경기에서 받은 리뷰
                                'sScore' : result[i]._doc.others.sScore, // 상대팀의 이 경기 score
                                'sReview': result[i]._doc.others.sReview // 상대팀의 이 경기에서 받은 평점
                            };
                            // eventData2[j++] = data;
                            eventData[j++] = data;
                        }
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
                        'event_data':eventData,
                        // 'event_data_toMe': eventData2
                    }; // user_context
                    console.dir(eventData);
                    res.render('team_schedule.ejs', user_context);

                }); // dbm event_data2 end
            }); // dbm event_data end
        } // 인증 else문 end
    });

    router.route('/teamschedule').post(function(req, res) {
        console.log('/teamschedule 패스 post 요청됨.');

        var scoreCallTeamName = req.body.callTeamName;
        var scoreReceiveTeamName = req.body.receiveTeamName;
        var scoreEventDate = req.body.event_date;
        var scoreEventTime = req.body.event_time;
        // 신청이 온 경우 firstScore : 내 점수 / 내가 신청한 경우 firstScore : 남 점수
        var firstScore = req.body.firstScore;
        var secondScore = req.body.secondScore;

        console.log('if문 전 ====================');
        console.log('scoreCallTeamName : ' + scoreCallTeamName);
        console.log('scoreReceiveTeamName : ' + scoreReceiveTeamName);
        console.log('scoreEventDate : ' + scoreEventDate);
        console.log('scoreEventTime : ' + scoreEventTime);
        console.log('firstScore : ' + firstScore);
        console.log('secondScore : ' + secondScore);

        // 내게 신청한 매칭일 경우 scoreReceiveTeamName 비어있음
        // 나로 변경
        if(!scoreReceiveTeamName){
            scoreReceiveTeamName = req.user.teamname;

            var k;
            k = firstScore;
            firstScore = secondScore;
            secondScore = k;
        }

        console.log('if문 후 ====================')
        console.log('scoreCallTeamName : ' + scoreCallTeamName);
        console.log('scoreReceiveTeamName : ' + scoreReceiveTeamName);
        console.log('scoreEventDate : ' + scoreEventDate);
        console.log('scoreEventTime : ' + scoreEventTime);
        console.log('firstScore : ' + firstScore);
        console.log('secondScore : ' + secondScore);


        var dbm = require('../database/database');
        console.log('database 모듈 가져옴');

        dbm.MatchModel.update(
            {teamname: scoreCallTeamName, "others.sEvent_date": scoreEventDate, "others.sEvent_time": scoreEventTime},
            {$set: {score: firstScore, "others.sScore": secondScore}}, function (err, result) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.dir(result);
                }
            });

        res.redirect('/teamschedule');
    });

// 상대팀 리뷰하기
    router.route('/teamreview').get(function(req, res){
        console.log('/teamreview 패스 get 요청됨.');

        if(!req.user){
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
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

            res.render('team_review.ejs', user_context);
        }
    });

    router.route('/teamreview').post(function(req, res){
        console.log('/teamreview 패스 post 요청됨');

        var dbm = require('../database/database');
        console.log('database 모듈 가져옴');

        var event = {
            'email': req.user.email,
            'event_date': req.body.event_date || req.query.event_date,
            'reviewer_teamname': req.user.teamname,
            //reviewed_teamname에 평가받는 상대팀 이름으로 바꿔야 함
            'reviewed_teamname': req.user.teamname,
            'rating': req.body.rating || req.query.rating,
            'review_comment': req.body.review_comment || req.query.review_comment,
        };

        console.dir(event);

        var event_review = new dbm.ReviewModel(event);

        event_review.save(function (err, data) {
            if (err) {// TODO handle the error
                console.log("application save error");
            }
            console.log('New application inserted');
        });

        res.redirect('/teamschedule');
    });

//팀에서 받은 리뷰
// ------------------------------- data 삽입위치 수정
    router.route('/teamreceivedreview').get(function(req, res) {
        console.log('/teamreceivedreview 패스 get 요청됨');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            profile_photo = req.user.profile_img;
            if (profile_img == null)
                profile_img = req.user.profile_img;
            if (profile_img != req.user.profile_img)
                profile_photo = profile_img;

            var dbm = require('../database/database');
            console.log('database 모듈 가져옴');

            var eventData = new Array();
            var j = 0;

            dbm.ReviewModel.find({email : req.user.email} ,function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc.email == req.user.email) {

                        var data = {
                            'reviewed_teamname': result[i]._doc.reviewed_teamname,
                            'reviewer_teamname': result[i]._doc.reviewer_teamname,
                            'event_date': result[i]._doc.event_date,
                            'rating': result[i]._doc.rating,
                            'review_comment': result[i]._doc.review_comment
                        };
                        eventData[j++] = data;
                    }
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
                    'event_data': eventData
                };

                console.dir(eventData);

                res.render('team_received_review.ejs', user_context);

            });
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
                'career_year':req.user.career_year,
                'career_count':req.user.career_count,
                'introteam':req.user.introteam,
                'profile_img':profile_photo,
                'nofteam': req.user.nofteam
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
            'region': req.body.region || req.query.region,
            'place' : req.body.place || req.query.place,
            'move' : req.body.move || req.query.move,
            'age': req.body.age || req.query.age,
            'gender': req.body.gender || req.query.gender,
            'event_date': req.body.event_date || req.query.event_date,
            'event_time': req.body.event_time || req.query.event_time,
            'event_day' : req.body.event_day,
            'mention': req.body.mention || req.query.mention,
            'geoLng': req.body.resultLng || req.query.resultLng,
            'geoLat': req.body.resultLat || req.query.resultLat,
            'nofteam' : req.user.nofteam || req.user.nofteam
        };
        var week = new Array('일', '월', '화', '수', '목', '금', '토');
        var whatDay = new Date(event.event_date);
        event.event_day = week[whatDay.getDay()];

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



// 내가 등록한 매칭
// ------------------------------- data 삽입위치 수정
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
            var j = 0;


            dbm.ApplicationModel.find({email:req.user.email}, function (err, result) {
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
                        eventData[j++] = data;
                    }
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

    router.route('/contact').get(function(req, res){
        console.log('/contact 패스 get 요청됨.');


        if(!req.user){
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
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
        req.logout();
        res.redirect('/');
    });




};