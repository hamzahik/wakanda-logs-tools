var path		= 'C:/Users/Hamza/Documents/Wakanda/logsStats/logsStats/Logs/HTTPServer.waLog';

var parser		= require('ELFParser');

var logs		= parser.parse( path );

var logUtils	= require('logUtils');

//returns an array of lines with the field "SC-STATUS" equal to "404"
var err404		= logUtils.getLinesByFieldValue( logs.lines , 'SC-STATUS' , '404' );

/*
 * returns the line numbers for requests made using the GET Method
 *
 * {
 *    count : 3,
 *    lines : [1,23,26]
 * }
 */
var methodGET	= logUtils.countLinesByFieldValue( logs.lines , 'METHOD' , 'GET' );


/*
 * Converts the "TIME-TAKEN" field to integer
 */
logUtils.postProcess( logs.lines , function( line ){

	line[ 'TIME-TAKEN' ]	= parseInt( line[ 'TIME-TAKEN' ] );

});

/*
 * Log entries for a specific URI
 */
var testURILogs	= logUtils.getLinesByFieldValue( logs.lines , 'CS-URI' , '/thisisatest' );

/*
 * "TIME-TAKEN" stats for the specified field for the test URI
 * OUTPUT example : 
 *{
 *    "count" : 6,
 *    "average" : 145,
 *    "min" : 0,
 *    "max" : 286
 *}
 *
 */
var stats		= logUtils.average( testURI , 'TIME-TAKEN' );

