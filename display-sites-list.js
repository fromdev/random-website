var randomSupportedSites = new Array();
var addToRandomSupportedSites = function(arr) {
	for(var i in arr) {
		randomSupportedSites.push(arr[i]);
	}
};
$(window).load(function(){
	var cList = $('ul.supporteSites')
	$.each(randomSupportedSites, function(i)
{
    var li = $('<li/>')
        .addClass('ui-menu-item')
        .attr('role', 'menuitem')
        .appendTo(cList);
    var aaa = $('<a/>')
        .addClass('ui-all')
        .text(randomSupportedSites[i])
        .appendTo(li);
});
	
});
