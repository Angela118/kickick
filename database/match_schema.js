

var Schema = {};

Schema.createSchema = function(mongoose) {
	

	var newDate = new Date();

	// Get the month, day, and year.
	var monthString = (newDate.getMonth() + 1);
	var dayString = newDate.getDate();
	var secondString = newDate.getSeconds();
//	dateString += newDate.getFullYear();

	
	// 스키마 정의
	var MatchSchema = mongoose.Schema({		//20개
        email: {type: String, 'default':''},
        teamname: {type: String, index: 'hashed', 'default':''},
        add: [{type: String, 'default':''}],
        region : {type:String, 'default':''},
        move : {type:String, 'default':''},
		age: {type:Number, default:''},
		gender:{type:String, default:2},
		career_count: {type:Number, default:''},
		career_year: {type:Number, default:''},
        nofteam : {type:String, 'default':''},
        created_month: {type: String, 'default': monthString},
        created_day: {type: String, 'default': dayString},
        created_time: {type: String, 'default': secondString},
        others : {type:Object, 'default':''},
		match_success: {type:Number, default:0},
		score: {type:Number, default:0},
		received_review: {type:Number, default:0},
        received_review_comment: {type:String, default:''},
		review_date: {type:String, default:''},
		application_number: {type:Number, /*'default':an+1*/}
		// 신청한 사람의 경도 위도 안 넣음
	});

	MatchSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});

	console.log('MatchSchema 정의함.');

	return MatchSchema;
};

// module.exports에 Schema 객체 직접 할당
module.exports = Schema;

