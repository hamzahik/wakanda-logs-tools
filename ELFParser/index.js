var journal			= null;
var journalStr		= null;
var journalLines	= null;
var journalLinesNbr	= null;
var output			= {meta:{},lines:[]};
var fields			= null;
var fieldsLength	= null;
var extractors		= require('ELFParser/extractors');

exports.parse = function( path ){
	
	journal			= File( path );
	//TODO: optimize by using textstream
	journalStr		= journal.toString();
	journalLines	= journalStr.split('\n');
	journalLinesNbr	= journalLines.length;

	for ( var  i = 0 ; i < journalLinesNbr ; ++i ) {
	
		var line		= journalLines[ i ];
		
		var firstChar	= line.charAt( 0 );
		
		if ( firstChar == '#' ) {
		
			readMeta( output , journalLines[ i ] );
			
			continue;
			
		}
		
		if ( line.match(/^[ \t]*$/) ) {
		
			continue;
			
		}
		
		output.lines[ i ] = readLine( journalLines[ i ] );


	};
	
	return output;

}

function readMeta( output , line ){

		
	var parsedLine	= line.match(/^#([^:]+):[\t ]*(.*)/);
	
	output.meta[ parsedLine[ 1 ] ]	= parsedLine[ 2 ];
	
	if ( parsedLine[ 1 ] == "Fields" ) {
	
		fields 			= parsedLine[ 2 ].split(' ');
		fieldsLength	= fields.length;
	
	}
	
	return true;

}

function readLine( line ){

	var parsedLine	= {};
	
	for ( var i = 0 ; i < fieldsLength ; ++i ) {
		
		var field	= fields[ i ];
		
		var match	= line.match( extractors[ field ] );
		
		parsedLine[ field ]	= match[ 1 ];
		
		line	= line.trim().substring( match[ 0 ].length );
		
	}
	
	return parsedLine;

}