
module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
		{file:'./geo_schema', collection:'geoloc', schemaName:'GeoSchema', modelName:'GeoModel'},
		{file:'./chat_schema', collection:'chatting', schemaName:'ChatSchema',
		modelName:'ChatModel'},
		{file:'./appointment_schema', collection:'appointment', schemaName:'AppointmentSchema', modelName:'AppointmentModel'},
		{file:'./application_schema', collection:'application', schemaName:'ApplicationSchema', modelName:'ApplicationModel'}
	],
	route_info: [
		//===== GeoSchema =====//
	    {file:'./geo_loc', path:'/addlocation', method:'add', type:'post'}	 
	    ,{file:'./geo_loc', path:'/process/listlocation', method:'list', type:'post'}
	    ,{file:'./geo_loc', path:'/process/nearlocation', method:'findNear', type:'post'}
	    ,{file:'./geo_loc', path:'/process/withinlocation', method:'findWithin', type:'post'}
	    ,{file:'./geo_loc', path:'/process/circlelocation', method:'findCircle', type:'post'}
	    ,{file:'./geo_loc', path:'/process/nearlocation2', method:'findNear2', type:'post'}
	    ,{file:'./geo_loc', path:'/process/withinlocation2', method:'findWithin2', type:'post'}
	]
}