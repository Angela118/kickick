
var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var ChatSchema = mongoose.Schema({
		email: {type: String, 'default':''},
	    teamname: {type: String, index: 'hashed', 'default':''},
		message: {type: String},
	   	created_at: {type: Date, index: {unique: false}, 'default': Date.now}		
	});
	

	// 스키마에 static 메소드 추가
	// 모든 커피숍 조회
	// 모델 객체에서 사용할 수 있는 메소드 정의
	ChatSchema.static('findByEmail', function(email, callback) {
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
	
	console.log('ChatSchema 정의함.');

	return ChatSchema;
};

// module.exports에 Schema 객체 직접 할당
module.exports = Schema;

