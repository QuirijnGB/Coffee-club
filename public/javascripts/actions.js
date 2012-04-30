/**
 *  Author: Quirijn Groot Bluemink
 */
$(function() {
	$('.relieve').click(function(e) {
		var btn = $(e.target)
		console.log(btn.attr('data-id'))
		console.log(btn.attr('data-times'))
		var data = {
			id : btn.attr('data-id'),
			timesBought : btn.attr('data-times')
		}
		console.log(data)
		var url = "/update"
		$.ajax({
			type : 'POST',
			url : url,
			data : data
		}).done(function() {
			location.reload();
		}).error(function(e) {
			console.log(e)
		});
	})
});
