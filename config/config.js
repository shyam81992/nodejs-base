/*
 *  Common file to handle all the server side configurations
 *  
 *  
*/

//  Hardcoded stuff will go here
module.exports.getConfig = function(){ 
	/*Common configurations*/
	switch(process.env.NODE_ENV){
		case 'local_machine': /* Local Machine */
					return {
				/*All Route protected*/
				"all_route_protected":false,
				"all_route_username":'admin',
				"all_route_password":'Fortune14256!',
				/* MySQL Credentials */
				"host":"localhost",
				"user":"root",
				"password":"",
				"database" : "test_db",
				/*MongoDB Credentials*/
				"mongoDB_path":"mongodb://localhost/test_db",
				/*Server Running port*/
				"port":3000,
				/* other configurations*/
				
			};
		case 'development': /* Developmet server */	
		
			    return {
		    	/*All Route protected*/
				"all_route_protected":false,
				"all_route_username":'admin',
				"all_route_password":'Fortune14256!',
				/* MySQL Credentials */
				"host":"localhost",
				"user":"root",
				"password":"",
				"database" : "test_db",
				/*MongoDB Credentials*/
				"mongoDB_path":"mongodb://localhost/test_db",
				/*Server Running port*/
				"port":8080,
				/* other configurations*/
			};
		case 'staging': /* Staging server*/
		       return {
		    	/*All Route protected*/
				"all_route_protected":false,
				"all_route_username":'admin',
				"all_route_password":'Fortune14256!',
				/* MySQL Credentials */
				"host":"localhost",
				"user":"root",
				"password":"",
				"database" : "test_db",
				/*MongoDB Credentials*/
				"mongoDB_path":"mongodb://localhost/test_db",
				/*Server Running port*/
				"port":8080,
				/* other configurations*/
			};
		default: /* live server*/
			return {
				/*All Route protected*/
				"all_route_protected":false,
				"all_route_username":'admin',
				"all_route_password":'Fortune14256!',
				/* MySQL Credentials */
				"host":"localhost",
				"user":"root",
				"password":"",
				"database" : "test_db",
				/*MongoDB Credentials*/
				"mongoDB_path":"mongodb://localhost/test_db",
				/*Server Running port*/
				"port":8080,
				/* other configurations*/
			};
	}
}
