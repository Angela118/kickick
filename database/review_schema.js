var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var ReviewSchema = mongoose.Schema({
        email: {type: String, 'default':''},
        event_date: {type: String, 'default': ''},
        reviewed_teamname: {type: String, index: 'hashed', 'default':''},
        reviewer_teamname: {type: String, index: 'hashed', 'default':''},
        rating: {type: Number, 'default': ''},
        review_comment: {type: String, index: 'hashed', 'default':''}
    });

    // 스키마에 static 메소드 추가
    // 모든 커피숍 조회
    // 모델 객체에서 사용할 수 있는 메소드 정의
    ReviewSchema.static('findByEmail', function(email, callback) {
        return this.find({email:email}, callback);
    });

    console.log('ReviewSchema 정의함.');
    return ReviewSchema;
};

// module.exports에 Schema 객체 직접 할당
module.exports = Schema;