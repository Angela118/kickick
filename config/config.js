
module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
		{file:'./chat_schema', collection:'chatting', schemaName:'ChatSchema',
		modelName:'ChatModel'},
		{file:'./application_schema', collection:'application', schemaName:'ApplicationSchema', modelName:'ApplicationModel'},
        {file:'./match_schema', collection:'match', schemaName:'MatchSchema', modelName:'MatchModel'}
	],
	route_info: [
		
	]
}