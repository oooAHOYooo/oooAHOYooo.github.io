// Donate other amount
$('.js-donation-other a').on('click', function(e) {
  e.preventDefault();
  
  var acc       = $(e.target);
  var accReveal = acc.parent().siblings('.js-donation-other-reveal');

  if ( $(accReveal).height() === 0 ) {    
    acc.addClass('active');
    TweenLite.set(accReveal, {height:'auto'});
    TweenLite.from(accReveal, 0.5, {
      height: 0,
      ease:Power2.easeOut
    });
  } else {
    acc.removeClass('active');
    TweenLite.to(accReveal, 0.5, {
      height: 0,
      ease:Power2.easeOut
    });
  }
});


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DonationRangeSlider = function () {
	function DonationRangeSlider() {
		_classCallCheck(this, DonationRangeSlider);

		this.backgrounds = $('.js-background-wrapper')
		this.backgroundImages = {
			5: 'js-step-0',
			10: 'js-step-1',
			14: 'js-step-2',
			19: 'js-step-3',
			34: 'js-step-4',
			50: 'js-step-5',
			80: 'js-step-6'
		};
		this.donationButton = $('button.js-donate-button');
		this.donationsAmount = [5, 10, 14, 19, 34, 50, 80];
		this.donationSpans = $('.js-donation-amount');
		this.feedbackBox = $('.js-feedback-text');
    this.feedbackBoxCopy = $('.js-feedback-text--copy')
		this.feedbackText = {
			5: "you could be helping transport a family to somewhere safe to sleep tonight",
			10: "you could be ensuring we’re there to answer an urgent call to our helpline",
			14: "you could be helping us to settle a child into a new school following relocation",
			19: "you could be funding our DIY skills service to help a family make their house a home",
			34: "you could be helping someone with priority needs make a homelessness application",
			50: "you could be helping us to answer five urgent calls to our helpline",
			80: "you could be paying for six people to get the advice they need to keep their homes"
		};
		this.slider = document.querySelector(".js-slider");
		this.inputFormat = $('.js-donate');
    
		noUiSlider.create(this.slider, {
			start: [34],
      snap: true,
			connect: 'lower',
			range: {
				'min': [5],
				'15%': [14],
				'35%': [34],
				'60%': [50],
				'max': [80]
			},
			pips: {
				mode: 'range',
				values: this.donationsAmount,
				density: 0
			}
		});

		this.addEventListeners();
	}

	_createClass(DonationRangeSlider, [{
		key: 'addEventListeners',
		value: function addEventListeners() {
			var _this = this;

			this.slider.noUiSlider.on('update', function (values, handle) {
				return _this.doUpdates(values, handle);
			});
			$(this.donationButton).on('click', function () {
				return _this.getDonationAmount();
			});
		}
	}, {
		key: 'doUpdates',
		value: function doUpdates(values, handle) {
			this.setAmount(values, handle);
			this.setText(values, handle);
			this.resetSlider(values, handle);
			this.setImage(values, handle);
		}
	}, {
		key: 'setAmount',
		value: function setAmount(values, handle) {
			$(this.donationSpans).text(Math.round(values[handle]));
		}
	}, {
		key: 'setImage',
		value: function setImage(values, handle) {
			var _this2 = this;

			var donationAmount = Math.round(values[handle]);
			var backgroundArray = Array.from(this.backgrounds);
			backgroundArray.map(function (key, index, value) {
				if (key.classList.contains(_this2.backgroundImages[donationAmount])) {
					key.classList.add('active');
				} else {
					key.classList.remove('active');
				}
			});
		}
	}, {
		key: 'resetSlider',
		value: function resetSlider(values, handle) {
			if (values[handle] < 5) {
				this.slider.noUiSlider.set(5);
			} else if (values[handle] > 80) {
				this.slider.noUiSlider.set(80);
			}
		}
	}, {
		key: 'setText',
		value: function setText(values, handle) {
			if (this.inputFormat.value) {
			    var donationAmount = (this.inputFormat.value * 100);
			    $(this.feedbackBoxCopy).html(this.feedbackText[donationAmount]);
			} else {
				//var donationAmount = Math.round(values[handle]);
				var donationAmount = Math.round(values[handle]);
				// console.log('Amount: '+donationAmount);
				$(this.feedbackBoxCopy).html(this.feedbackText[donationAmount]);
				// console.log(this.feedbackText);
			}
		}
	}, {
		key: 'getDonationAmount',
		value: function getDonationAmount(values, handle) {
			if (this.inputFormat.value) {
				return this.inputFormat.value * 100;
			} else {
				var amount = Math.round(this.slider.noUiSlider.get()) * 100;
				return amount;
			}
		}
	}]);

	return DonationRangeSlider;
}();

exports.default = DonationRangeSlider;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _donationSlider = require('./donation-slider');

var _donationSlider2 = _interopRequireDefault(_donationSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StripeModal = function () {
  function StripeModal() {
    _classCallCheck(this, StripeModal);

    this.slider = this.initSlider();
    this.donationButton = $('.js-donate-button');
    this.donationFeedback = $('.js-donation-amount');
    this.donationField = $('.js-donate');
    this.donationFrequencyRadios = $('.js-donate-radio');
    this.modalDonationFrequencyRadios = document.getElementsByName('donationType');
    this.singleForm = $('.js-single-donation');
    this.monthlyForm = $('.js-monthly-donation');
    this.donationToggle = $('.js-donation-toggle');
    this.giftAid = $('.js-gift-aid');
    this.giftAidCheckboxes = $('.js-giftaid-checkbox');
    this.paymentForm = $('.js-payment-form');
    this.addEventListeners();
  }

  _createClass(StripeModal, [{
    key: 'initSlider',
    value: function initSlider() {
      return new _donationSlider2.default();
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      $(this.donationButton).on('click', function () {
        return _this.openModal();
      });
      $(this.paymentForm).on('submit', function (event) {
        return _this.getToken(event);
      });
      for (var i = 0; i < this.donationToggle.length; i++) {
        $(this.donationToggle[i]).on('click', function (event) {
          return _this.toggleDonationFrequency(event);
        });
      }
      for (var i = 0; i < this.giftAidCheckboxes.length; i++) {
        $(this.giftAidCheckboxes[i]).on('change', function () {
          return _this.enableGiftAid();
        });
      }
    }
  }, {
    key: 'openModal',
    value: function openModal() {
      this.modal = $('[data--id=modal]').remodal();
      this.modal.open();remodal
      this.populateDonationAmounts();
      this.setDonationFrequency();
      this.setGiftAidAmount();
      this.disableGiftAidButton();
    }
  }, {
    key: 'populateDonationAmounts',
    value: function populateDonationAmounts() {
      var sliderDonationAmount = this.slider.getDonationAmount() / 100;
      for (var i = 0; i < this.donationFeedback.length; i++) {
        this.donationFeedback[i].value = sliderDonationAmount;
      }
    }
  }, {
    key: 'getDonationFrequency',
    value: function getDonationFrequency() {
      for (var i = 0; i < this.donationFrequencyRadios.length; i++) {
        var thisSelection = this.donationFrequencyRadios[i];
        if (this.donationFrequencyRadios[i].checked) {
          return thisSelection.value;
        }
      }
    }
  }, {
    key: 'disableGiftAidButton',
    value: function disableGiftAidButton() {
      this.giftAidStep = document.getElementById('js-form-step-3');
      this.giftAidStep.setAttribute('disabled', 'disabled');
      this.giftAidStep.innerHTML = 'Add Gift Aid';
    }
  }, {
    key: 'enableGiftAid',
    value: function enableGiftAid() {
      this.giftAidStep.removeAttribute('disabled');
    }
  }, {
    key: 'setGiftAidAmount',
    value: function setGiftAidAmount() {
      var amount = this.slider.getDonationAmount() / 100 / 4;
      this.giftAid.innerHTML = '£' + amount;
    }
  }, {
    key: 'setDonationFrequency',
    value: function setDonationFrequency() {
      var frequency = this.getDonationFrequency();
      for (var i = 0; i < this.modalDonationFrequencyRadios.length; i++) {
        var thisRadio = this.modalDonationFrequencyRadios[i];
        if (thisRadio.value === frequency) {
          thisRadio.setAttribute('checked', 'checked');
        }
      }
      if (frequency == 'once') {
        this.monthlyForm.classList.add('hide');
      } else {
        this.singleForm.classList.add('hide');
      }
    }
  }, {
    key: 'toggleDonationFrequency',
    value: function toggleDonationFrequency(event) {
      event.preventDefault();
      this.monthlyForm.classList.toggle('hide');
      this.singleForm.classList.toggle('hide');
    }
  }, {
    key: 'getToken',
    value: function getToken(event) {
      event.preventDefault();
      this.callBack = function (status, response) {
        this.stripeResponseHandler(status, response);
      }.bind(this);
      this.donationButton.setAttribute('disabled', 'disabled');
      Stripe.card.createToken(this.paymentForm, this.callBack);
      return false;
    }
  }, {
    key: 'stripeResponseHandler',
    value: function stripeResponseHandler(status, response) {
      var _this2 = this;

      if (response.error) {
        // Problem!
        // Show the errors on the form:
        //$(paymentForm).find('.payment-errors').text(response.error.message);
        this.donationButton.removeAttribute('disabled'); // Re-enable submission
        this.modal.close();
        this.failedModal = $('[data-remodal-id=modal-failed]').remodal();
        this.failedModal.open();
        this.failedModalClose = $('.js-failed-close');
        $(this.failedModalClose).on('click', function () {
          _this2.failedModal.close();
          _this2.modal.open();
        });
      } else {
        // Token was created!
        // Get the token ID:
        var token = response.id;
        // Insert the token ID into the form so it gets submitted to the server:
        $(this.paymentForm).append($('<input type="hidden" name="stripeToken">').val(token));
        this.sendPayment(this.paymentForm);
      }
    }
  }, {
    key: 'sendPayment',
    value: function sendPayment(paymentForm) {
      var inputs = $(paymentForm).find('input, select, textarea').not('input[type="submit"], input[type="radio"], input[type="checkbox"], input.js-stripe-ignore'),
          inputsChecked = $('input[type="submit"]:checked, input[type="radio"]:checked, input[type="checkbox"]:checked'),
          inputs = inputs.add(inputsChecked),
          postData = {};

      for (var i = 0, l = inputs.length; i < l; i++) {
        var elem = $(inputs[i]);
        postData[elem.attr('name')] = elem.val();
      }

      $.ajax({
        url: '/content/stripe_charge_platform/',
        type: 'POST',
        data: postData
      }).done(function (data) {}).success(function (data) {
        //this.modal.close()
        //this.thanksModal = $('[data-remodal-id=modal-thanks]').remodal();
        //this.thanksModal.open()
        console.log(data);
      }).fail(function (data) {
        this.modal.close();
        this.failedModal = $('[data-remodal-id=modal]').remodal();
        this.failedModal.open();
        console.log('error');
      });
    }
  }]);

  return StripeModal;
}();

exports.default = StripeModal;

},{"./donation-slider":1}],3:[function(require,module,exports){
'use strict';

var _stripe = require('./modules/stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _stripe2.default();

},{"./modules/stripe":2}]},{},[3]);

