
// Express 기본 모듈 불러오기

var express = require('express')

  , http = require('http')

  , path = require('path');

 

// Express의 미들웨어 불러오기

var bodyParser = require('body-parser')

  , cookieParser = require('cookie-parser')

  , static = require('serve-static')

  , errorHandler = require('errorhandler');

 

// 에러 핸들러 모듈 사용

var expressErrorHandler = require('express-error-handler');

 

// Session 미들웨어 불러오기

var expressSession = require('express-session');



 

// 모듈로 분리한 설정 파일 불러오기

var config = require('./config/config');

 

// 모듈로 분리한 데이터베이스 파일 불러오기

var database = require('./database/database');

 

// 모듈로 분리한 라우팅 파일 불러오기

var route_loader = require('./routes/route_loader');

 


// 프로필 사진

var multer = require('multer');
var fs = require('fs');


var storage = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, './profile_img');	//uploads폴더를 목적지로 정한다. ->uploads 폴더에 올린 파일이 저장됨
	},
	filename: function(req, file, callback){
		//callback(null, file.originalname + Date.now());	->원래 파일 이름+날짜
		/*file이 동일한 이름으로 저장할 수도 있음. 그래서 업로드될 파일을 고유한 정보(시간정보 등)를 이용하여 별도의 이름으로 저장.
		*/
		
		var extension = path.extname(file.originalname);
		var basename = path.basename(file.originalname, extension);
		callback(null, basename + Date.now() + extension);	//원래 파일 이름+날짜+파일 확장자
	}
});

var upload = multer({
	//속성:할당
	storage:storage,
	limits:{	//최대 1024^3사이즈 파일을 10개까지 업로드 가능
		files:10,
		fileSize:1024*1024*1024
	}
});






//===== Passport 사용 =====//

var passport = require('passport');

var flash = require('connect-flash');

 

 

 

//===== socket.io 사용 =====//

 

var socketio = require('socket.io');

var cors = require('cors');


 

 

// 익스프레스 객체 생성

var app = express();

 

 

//===== 뷰 엔진 설정 =====//

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

console.log('뷰 엔진이 ejs로 설정되었습니다.');

 

 

//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//

console.log('config.server_port : %d', config.server_port);

app.set('port', process.env.PORT || 3000);

 

 

// body-parser를 이용해 application/x-www-form-urlencoded 파싱

app.use(bodyParser.urlencoded({ extended: false }))

 

// body-parser를 이용해 application/json 파싱

app.use(bodyParser.json())

 

// public 폴더를 static으로 오픈

app.use(express.static(__dirname));
app.use('/js', express.static(__dirname + '/views/js')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/views/css')); // redirect CSS bootstrap
app.use('/img', express.static(__dirname + '/views/css/img'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));



// cookie-parser 설정

app.use(cookieParser());

 

// 세션 설정

app.use(expressSession({

	secret:'my key',

	resave:true,

	saveUninitialized:true

}));

 

 

 

 

//===== cors 초기화 =====//

app.use(cors());

 

 

 

 

 

//===== Passport 초기화 =====//

// Passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

 

 

 

//라우팅 정보를 읽어들여 라우팅 설정

var router = express.Router();

route_loader.init(app, router);




// 패스포트 설정

var configPassport = require('./config/passport');

configPassport(app, passport);

 

// 패스포트 라우팅 설정

var userPassport = require('./routes/user_passport');

userPassport(router, passport, upload);

 

 

 

//===== 404 에러 페이지 처리 =====//

var errorHandler = expressErrorHandler({

 static: {

   '404': './public/404.html'

 }

});

 

app.use( expressErrorHandler.httpError(404) );

app.use( errorHandler );

 

 

//===== 서버 시작 =====//

 

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함

process.on('uncaughtException', function (err) {

	console.log('uncaughtException 발생함 : ' + err);

	console.log('서버 프로세스 종료하지 않고 유지함.');

	

	console.log(err.stack);

});

 

// 프로세스 종료 시에 데이터베이스 연결 해제

process.on('SIGTERM', function () {

    console.log("프로세스가 종료됩니다.");

    app.close();

});

 

app.on('close', function () {

	console.log("Express 서버 객체가 종료됩니다.");

	if (database.db) {

		database.db.close();

	}

});

 

// 시작된 서버 객체를 리턴받도록 합니다. 

var server = http.createServer(app).listen(app.get('port'), function(){

	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

 

	// 데이터베이스 초기화

	database.init(app, config);

   

});

 












 

//===== socket.io 서버 시작 =====//

//socket.io는 이벤트 기반 

var io = socketio.listen(server);

console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

 

var login_ids = {};	//socket id와 login id를 매칭

 


io.sockets.on('connection', function(socket){

	//연결 되었을때 호출 되는 콜백함수

	console.log('connection info -> ' + JSON.stringify(socket.request.connection._peername));


	//client의 접속 정보

	socket.remoteAddress = socket.request.connection._peername.address;

	socket.remotePort = socket.request.connection._peername.port;
	


	socket.on('login', function(input){

		console.log('login 받음 -> ' + JSON.stringify(input));

		

		//socket의 id를 가지고 login id를 찾아낼 수 있다. (반대로도 가능)		

		login_ids[input.id] = socket.id;

		socket.login_id = input.id;
		
			

/*
		// receives message from DB
	database.ChatModel.findByEmail({email:input.id}, function (err, result) {
        for(var i = 0 ; i < result.length ; i++) {
            var dbData = {teamname : result[i].teamname, message : result[i].message};
            io.sockets.sockets[socket.id].emit('preload', dbData);
        }
	});
*/		
		// receives message from DB
    	database.ChatModel.find(function (err, result) {
			for(var i = 0 ; i < result.length ; i++) {
				if(result[i]._doc.email === input.id){
            		var dbData = {email : result[i].email, teamname : result[i].teamname, message : result[i].message };
           			io.sockets.sockets[socket.id].emit('preload', dbData);
				}
        	}
		});

		

		sendResponse(socket, 'login', 200, 'OK');	//로그인이 정상적으로 되었다는 뜻


	});


	
	 
	

	socket.on('message', function(message){

		console.log('message 받음 -> ' + JSON.stringify(message.data));

		

		if(message.recepient == 'ALL'){

			console.log('모든 client에게 메세지 전송함.');

			

			//echo기능 : client가 보낸 메세지를 받아서 그대로 다시 보낸다

			io.sockets.emit('message', message.data);	//io.sockets : 연결된 모든 client, emit : 그 쪽으로 전송하겠다.

			

		} else{		//특정 client에게 메세지 보내기

			

			if(login_ids[message.recepient]){	

				io.sockets.connected[login_ids[message.recepient]].emit('message', message.data);

				sendResponse(socket, 'message', 200, 'OK');	

			} else{
				sendResponse(socket, 'message', 400, '수신자 ID를 찾을 수 없습니다.');

			}

		}
		
		
		// add chat into the model
        var chat = new database.ChatModel({ email:message.email, teamname: message.sender, message: message.data });
 
        chat.save(function (err, data) {
          if (err) {// TODO handle the error
              console.log("chat save error");
          }
          console.log('New message is inserted');
        });

	});

});

 

 

function sendResponse(socket, command, code, message){

	var output = {

		command:command,

		code:code,

		message:message

	};

	


}

