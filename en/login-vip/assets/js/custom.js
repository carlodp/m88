var activeoverlay = 0;
var overlayHTML = '<div class="overlay"></div>';
var msgBoxHTML = '<div class="alert-box">\
	<div class="alert-title">Redemption Status</div>\
	<div class="alert-content"></div>\
	<div class="button-wrap"></div>\
</div>';
var alertBtnHTML = '<button onclick="alertBoxClose();return 1;">OK</button>';
var confirmBtnHTML = '<button id="confirm-btn">OK</button><button onclick="alertBoxClose();" class="cancel-btn">CANDEL</button>';
var executed = false;
function alertBoxClose() {
	if (executed == false) {
		console.log(executed,'triggered');
		$('body').removeClass('active-alert');
		activeoverlay--;
		if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
		
		executed = true;
	}
}
function alertBox(msgHTML) {
	if($('.alert-box').length <= 0) {
		$('body').append(msgBoxHTML);
	}
	$('.alert-content').html(msgHTML);
	$('.alert-box .button-wrap').html(alertBtnHTML);
	$('body').addClass('active-alert');
	if($('body').hasClass('active-alert')) {
		$('body').addClass('active-overlay');
		activeoverlay++;
	}
	else {
		activeoverlay--;
	}
	if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
}	
function confirmBox(msgHTML, thisForm) {
	executed = false;
	if($('.alert-box').length <= 0) {
		$('body').append(msgBoxHTML);
	}
	$('.alert-content').html(msgHTML);
	$('.alert-box .button-wrap').html(confirmBtnHTML);
	$(thisForm).submit(function(e){
		e.preventDefault();
		$(document).on('click', '#confirm-btn', function(e){
			e.preventDefault();
			$('.checkout-info .row.last span p').remove();
			$('.checkout-info .row.last textarea').attr('style','');
			var isEmpty = 0;
			$('.checkout-info .row.last .required textarea').each(function(){
				if($(this).val().trim().length < 1 ){
					var txtAreaPlaceHolder = $(this).attr('placeholder');
					$(this).css({'border-color':'red'});
					$('.checkout-info .row.last span').prepend('<p class="checkout-info-error">Please Enter '+txtAreaPlaceHolder+'</p>');
					isEmpty++;
				} else { isEmpty-- };	
			});

			if(isEmpty < 0) {
				$(thisForm).unbind('submit').submit();
			}
			else {
				alertBoxClose();
			};		
		});
	});
	$('body').addClass('active-alert');
	if($('body').hasClass('active-alert')) {
		$('body').addClass('active-overlay');
		activeoverlay++;
	}
	else {
		activeoverlay--;
	}
	if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
}
function openLoginForm() {
	$('.loginform-wrap').toggleClass('active');
	$('body').addClass('active-alert');
	if($('.loginform-wrap').hasClass('active')) {
		$('body').addClass('active-overlay');
		activeoverlay++;
	}
	else {
		activeoverlay--;
	}
	if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
}
$('body').append(overlayHTML);
$('.mobile-menu-trigger').on("click",function(e){
	e.preventDefault();
	$(this).toggleClass('mobile-trigger-active');
	$('.mobile-nav-menu').toggleClass('nav-menu-open');
	if($('.mobile-nav-menu').hasClass('nav-menu-open')) {
		$('body').addClass('active-overlay');
		activeoverlay++;
	}
	else {
		activeoverlay--;
	}
	if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
});
$('.ledger-section .view-more').click(function(){
	var checkExist = $('.ledger-section .mobile-table-popup').length;
	if(checkExist == 0) {
		var mobTablePopupHTML = '<div class="mobile-table-popup">\
			<div class="back-header"></div>\
			<div class="table-holder">\
				<table>\
					<tr>\
						<td>Date</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Product</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Stake</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Adjustment</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Balance</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Expiration Date	</td>\
						<td></td>\
					</tr>\
					<tr>\
						<td>Remark</td>\
						<td></td>\
					</tr>\
				</table>\
			</div>\
		</div>';
		$('.ledger-section').append(mobTablePopupHTML);
	}
	$(this).closest('tr').find('td:not(:last-child)').each(function(i){
		var getHTML = $(this).html();
		$('.mobile-table-popup table tr:nth-child('+(i+1)+') td:last-child').html(getHTML);
	});
	$('.mobile-table-popup').addClass('active');
});
$(document).on('click', '.ledger-section .back-header', function(){
	$('.mobile-table-popup').removeClass('active');
});
$(window).resize(function(){
	if($(window).width() > 750) {
		if($('.mobile-nav-menu').hasClass('nav-menu-open')) {
			$('.mobile-menu-trigger').click();
		}
	}
});