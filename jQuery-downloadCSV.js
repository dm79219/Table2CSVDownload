/**
 * usage: $("#ele").table2CSVdownload({
			fileName : 'test.csv',
			style : {
				'background' : 'green'
			},
			creatorElement : '#id' // where to create the download button
		 })
 */

(function ( $ ) {
 
    $.fn.table2CSVdownload = function( options ) {
 
        // Default options
        var settings = $.extend({
            fileName : 'file.csv',
            style : {},
            creatorElement : 'body',
            buttonHtml : 'Download'
        }, options );
 		var data = table2CSV($(this));
 		var link=document.createElement('a');
 		$(link).html(settings.buttonHtml);
 		$(link).css(settings.style);
 		$(settings.creatorElement).append(link);
        download($(link),data, settings);
        // Apply options
 
    };

    function download(element, data, settings) {
	    csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
	    element.attr({
	          'download': settings.fileName,
	          'href': csvData,
	          'target': '_blank'
	          
	        });
	}

    function table2CSV(table) {
	    var rows = table.find('tr');
	    var csvData = "";
	    for(var i=0;i<rows.length;i++){
	    	if($(rows[i]).hasClass('not-download')) {
	    		continue;
	    	}
	        var cells = $(rows[i]).children('th,td'); //header or content cells

	        for(var y=0;y<cells.length;y++){
	            if(y>0){
	              csvData += ",";
	            }
	            var child = $(cells[y]).children('.not-download').detach();
	            var txt = ($(cells[y]).text()).toString().trim();
	            if(child){
	                child.appendTo($(cells[y]));
	            }
	            if(txt.indexOf(',')>=0 || txt.indexOf('\"')>=0 || txt.indexOf('\n')>=0){
	                txt = "\"" + txt.replace(/\"/g, "\"\"") + "\"";
	            }
	            csvData += txt;
	        }
	        csvData += '\n';
	    }
	    return csvData;
	}
 
}( jQuery ));