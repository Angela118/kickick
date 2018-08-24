

var Schema = {};

Schema.createSchema = function(mongoose) {
	

	var newDate = new Date();

	// Get the month, day, and year.
	var monthString = (newDate.getMonth() + 1);
	var dayString = newDate.getDate();
//	dateString += newDate.getFullYear();

	
	// 스키마 정의
	var MatchSchema = mongoose.Schema({
		email: {type: String, 'default':''},
	    teamname: {type: String, index: 'hashed', 'default':''},
		city: [{type: "String", 'default':''}],
		place : {type:String, 'default':''},
		move : {type:String, 'default':''},
		age: {type:Number, default:''},
		gender:{type:String, default:2},
		career_count: {type:Number, default:''},
		career_year: {type:Number, default:''},
		created_month: {type: String, 'default': monthString},
		created_day: {type: String, 'default': dayString},
        nofteam : {type:String, 'default':''},
        others : {type:Object, 'default':''}
	});


	// 스키마에 static 메소드 추가
	// 모든 커피숍 조회
	// 모델 객체에서 사용할 수 있는 메소드 정의
	MatchSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});

	console.log('MatchSchema 정의함.');

	return MatchSchema;
};

// module.exports에 Schema 객체 직접 할당
module.exports = Schema;

