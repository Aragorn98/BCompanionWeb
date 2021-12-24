$(function(){
	var $userInfo = $('#account-details');
	$.ajax({
		type: 'GET',
		url: 'https://stormy-escarpment-89406.herokuapp.com/users/getUser?phone_number=%2B'
	})
});