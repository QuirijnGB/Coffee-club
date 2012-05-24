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
			timesBought : (parseInt(btn.attr('data-times')) + 1),
			date: Date.now()
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
	$('.handicap').keyup(function(e) {
		var btn = $(e.target)
		if(btn.attr('value') > 10) {
			console.log("the handicap is TOO DAMN HIGH!");
			btn.addClass('alert-error');
			return
		}else{
			btn.removeClass('alert-error');
		}
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {//Enter keycode
			console.log("Pressed enter")
			btn.attr('disabled', '');
			var data = {
				id : btn.attr('data-id'),
				handicap : btn.attr('value')
			}
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
		}
	})
	$('.zero').click(function(e) {
		var btn = $(e.target)
		console.log(btn.attr('data-id'))
		console.log(btn.attr('data-times'))
		var data = {
			id : btn.attr('data-id'),
			timesBought : 0,
			date: Date.now()
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
