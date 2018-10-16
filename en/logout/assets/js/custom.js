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
		$('body').removeClass('active-alert');
		activeoverlay--;
		if(activeoverlay <= 0) { $('body').removeClass('active-overlay') }
		
		executed = true;
	}
}
function alertBox(msgHTML, success) {
	if($('.alert-box').length <= 0) {
		$('body').append(msgBoxHTML);
	}
	$('.alert-content').html(msgHTML);
	$('.alert-content').prepend('<img src="assets/images/valid-icon.png" class="valid-icon" />');
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
function alertBoxRedemptionSettled() {
	if($('.alert-box').length <= 0) {
		$('body').append(msgBoxHTML);
	}
	$('.alert-content').html('<img src="assets/images/valid-icon.png" class="valid-icon" />You redemption request is already settled<br/>Please check your balance on Main Wallet');
	$('.alert-box .button-wrap').html(alertBtnHTML);
	$('.alert-box').append('<div class="alert-checkbal"><a href="#">Click here</a> to check balance</div>');
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
function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
function confirmBox(msgHTML, thisForm, callback) {
	executed = false;
	if($('.alert-box').length <= 0) {
		$('body').append(msgBoxHTML);
	}
	$('.alert-content').html(msgHTML);
	$('.alert-box .button-wrap').html(confirmBtnHTML);
	$(document).on('click', '#confirm-btn', function(e){
		if(callback) {
			callback();
		}
		else {
			$(thisForm).unbind('submit').submit();
		}
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
function redeemItem(itemSel) {
	if($('body').hasClass('logout')) {
		alert('Please login first.');
	}
	else {
		executed = false;
		if($('.alert-box').length <= 0) {
			$('body').append(msgBoxHTML);
		}
		$('.alert-content').html('You requested '+itemSel+' for your Birthday Gift');
		$('.alert-box .button-wrap').html(confirmBtnHTML);
		$(document).on('click', '#confirm-btn', function(e){
			activeoverlay--;
			alertBox('<img src="assets/images/valid-icon.png" class="valid-icon" />You request has been received. Our customer<br/>service will contact you for verification within 24 hours.');
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
function mobileTrigger() {
	if($(window).width() > 750) {
		if($('.mobile-nav-menu').hasClass('nav-menu-open')) {
			$('.mobile-menu-trigger').click();
		}
		$('.redeem-section').css('height','');
	}
	else {
		if($('.redeem-section .free-bet-points').length > 0) {
			if($(window).width() <= 750) {
				$('.redeem-section').css('height',($(window).height() - ($('#header').outerHeight() + $('.header-section').outerHeight() + $('.meta-control').outerHeight() + $('.cat-nav').outerHeight() + $('.mobile-nav').outerHeight() + 110))+'px');
			}
			else {
				$('.redeem-section').css('height',($(window).height() - ($('#header').outerHeight() + $('.header-section').outerHeight() + $('.meta-control').outerHeight() + $('.cat-nav').outerHeight() + $('.mobile-nav').outerHeight() + 80))+'px');
			}
		}
	}
}
$("#redeem-item-form").submit(function(e){
	var thisForm = this;
	e.preventDefault();
	confirmBox('Points will be deducted from your account<br/>Do you wish to continue with this transaction?', this, function(){
		$('.checkout-info .row.last span p').remove();
		$('.checkout-info .row.last textarea').attr('style','');
		var isEmpty = 0;
		$('.checkout-info .row.last .required textarea').each(function(){
			if($(this).val().trim().length < 1 ){
				var txtAreaPlaceHolder = $(this).attr('placeholder');
				$(this).css({'border-color':'red'});
				$('.checkout-info .row.last span').prepend('<p class="checkout-info-error">Please Enter '+txtAreaPlaceHolder+'</p>');
				isEmpty++;
			}
			else { isEmpty-- };
		});
		if(isEmpty < 0) {
			$(thisForm).unbind('submit').submit();
		}
		else {
			alertBoxClose();
		}
	});
});
$("#freebet-redeem-form").submit(function(e){
	e.preventDefault();
	if($('#redeem-field').val() != "" && !(isNaN($('#redeem-field').val()))) {
		if(parseInt($('#redeem-field').val()) < parseInt($('#current-pts').val())) {
			$("#freebet-redeem-form").addClass('invalid');
			$('.small-note').text('*you do not have enough point to redeem this amount');
		}
		else {
			confirmBox('Points will be deducted from your account<br/>Do you wish to continue with this transaction?', this);
		}
	}
});
$("#birthday-gift-freebet-form").submit(function(e){
	e.preventDefault();
	confirmBox('You requested MYR 100 for your Birthday Gift<br/>Do you wish to continue with this transaction?', this);
});
$(window).resize(function(){
	mobileTrigger();
});
$(document).ready(function(){
	mobileTrigger();
});