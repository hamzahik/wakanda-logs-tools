exports.getLinesByFieldValue	= function( lines , field , value ){
	
	var linesNbre	= lines.length;
	var subLines	= [];
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		if ( lines[ i ] && lines[ i ][ field ] == value ) {
		
			subLines.push( lines[ i ] );
		
		}
	
	}
	
	return subLines;

};

exports.getLinesByMatcher	= function( lines , matcher ){
	
	var linesNbre	= lines.length;
	var subLines	= [];
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		if ( lines[ i ] && matcher( lines[ i ] ) ) {
		
			subLines.push( lines[ i ] );
		
		}
	
	}
	
	return subLines;

};

exports.countLinesByMatcher	= function( lines , matcher ){
	
	var linesNbre	= lines.length;
	var subLines	= [];
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		if ( lines[ i ] && matcher( lines[ i ] ) ) {
		
			subLines.push( i );
		
		}
	
	}
	
	return {
		
		count : subLines.length,
	
		lines : subLines
		
	};

};

exports.countLinesByFieldValue	= function( lines , field , value ){
	
	var linesNbre	= lines.length;
	var subLines	= [];
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		if ( lines[ i ] && lines[ i ][ field ] == value ) {
		
			subLines.push( i );
		
		}
	
	}
	
	return {
		
		count : subLines.length,
	
		lines : subLines
		
	};

};

exports.postProcess	= function( lines , processor ){
	
	var linesNbre	= lines.length;
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		if ( lines[ i ] ) {
		
			processor( lines[ i ] );
		
		}
	
	}

};

exports.average	= function( lines , field ){
	
	var linesNbre	= lines.length;
	var min			= Infinity;
	var max			= 0;
	var sum			= 0;
	var count		= 0;
	var average		= 0;
	
	for ( var i = 0 ; i < linesNbre ; ++i ) {
	
		var line	= lines[ i ];
		
		if ( line ) {
			
			var value	= line[ field ];
		
			if ( value < min ) {
			
				min	= value;
			
			}
			
			if ( value > max ) {
			
				max	= value;
			
			}
			
			sum += value;
			count++;
		
		}
	
	}
	
	average	= ( count )? sum/count : 0 ;
	
	return {
	
		count	: count,
		
		average	: average,
		
		min		: min,
		
		max		: max
	
	};

};
