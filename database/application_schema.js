

var Schema = {};

Schema.createSchema = function(mongoose) {
	

	var newDate = new Date();

	// Get the month, day, and year.
	var monthString = (newDate.getMonth() + 1);
	var dayString = newDate.getDate();
//	dateString += newDate.getFullYear();

	
	// 스키마 정의
	var ApplicationSchema = mongoose.Schema({
		email: {type: String, 'default':''},
	    teamname: {type: String, index: 'hashed', 'default':''},
		city: [{type: "String", 'default':''}],
		place : {type:String, 'default':''},
		move : {type:String, 'default':''},
		age: {type:Number, default:''},
		gender:{type:Number, default:2},
		event_date: {type: String, 'default': ''},
		event_time: {type: String, 'default': ''},
		event_day: {type: String, 'default': ''},
		mention:{type: String, default:''},
		created_month: {type: String, 'default': monthString},
		created_day: {type: String, 'default': dayString},
		geoLng:{type:Number, 'default':''},
		geoLat:{type:Number, 'default':''},
        nofteam : {type:String, 'default':''}
	});


	// 스키마에 static 메소드 추가
	// 모든 커피숍 조회
	// 모델 객체에서 사용할 수 있는 메소드 정의
	ApplicationSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});
/*	
	// 약속잡기
	GeoSchema.static('makeAppointment', function(teamname, event_date, event_place, event_nofteam, callback) {
		console.log('ChatSchema의 makeAppointment 호출됨.');

		this.find().where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude)/*float값으로 변경*/ /*,  parseFloat(latitude)]}, maxDistance:maxDistance}).limit(1).exec(callback);
		//limit(1) : 검색된 하나의 데이터만 보여준다.
	});
*/	
	
	console.log('ApplicationSchema 정의함.');

	return ApplicationSchema;
};

// module.exports에 Schema 객체 직접 할당
module.exports = Schema;

