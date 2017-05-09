$(function() {
  $.mrgvalidator = function(options, form) {
    this.settings = $.extend(true, {}, $.mrgvalidator.defaults, options);
    this.currentForm = form;
    this.init();
  }

  $.extend($.mrgvalidator, {
    defaults: {
      success: {
        className: "success"
      },
      error: {
        className: "error"
      },
      validateOnetime: false,
      fields:[]
    },
    prototype: {
      init: function() {},
      setDefaults: function(settings) {
        $.extend($.mrgvalidator.defaults, settings);
      },
      validate: function() {
        // var allInput = $(this.currentForm).find('input');
        var _form = $(this.currentForm);
        var _settings = this.settings;
        if(_form) {
          this.clean(); //清除样式
          if(!this.settings.validateOnetime) {
            // var input = allInput
            this.settings.fields.every(function(item) {
              var _name = item.name;
              var _regex = item.regex;

              var _ele = _form.find('input[name="'+_name+'"]');
              if(_ele) {
                if(_regex.test(_ele.val())) {
                  console.log("success");
                  _ele.addClass(_settings.success.className);
                  return true;
                }else{
                  console.log("error");
                  _ele.addClass(_settings.error.className);
                  return false;
                }
              }
            });

            this.on();
          }else{
            this.settings.fields.forEach(function(item) {
              var _name = item.name;
              var _regex = item.regex;

              var _ele = _form.find('input[name="'+_name+'"]');
              if(_ele) {
                if(_regex.test(_ele.val())) {
                  console.log("success");
                  _ele.addClass(_settings.success.className);
                }else{
                  console.log("error");
                  _ele.addClass(_settings.error.className);
                }
              }
            });

            this.on();
          }
        }
      },
      clean: function() {
        // $(this.currentForm)
          // .find('input')
        $(this.getAllFieldsEle())
          .removeClass(this.settings.success.className)
          .removeClass(this.settings.error.className);
        this.off();
      },
      click: function(e) {
        $(e.target)
          .removeClass(this.settings.success.className)
          .removeClass(this.settings.error.className);
      },
      on: function() {
        var keyup = this.keyup;
        var blur = this.blur;
        var click = this.click;
        var self = this;
        this.getAllFieldsEle().forEach(function(ele) {
          ele.addEventListener('click', click.bind(self));
        });
      },
      off: function() {
        var keyup = this.keyup;
        var blur = this.blur;
        var click = this.click;
        var self = this;
        this.getAllFieldsEle().forEach(function(ele) {
          ele.removeEventListener('click', click.bind(self));
        });
      },
      getAllFieldsEle: function() {
        var res = [];
        var form = $(this.currentForm);
        for (var i = 0; i < this.settings.fields.length; i++) {
          var field = this.settings.fields[i];
          res.push(form.find('input[name="'+field.name+'"]')[0]);
        }
        return res;
      }
    }
  });

  // 对外接口
  $.fn.extend({
    validate: function(options) {
      var validator = new $.mrgvalidator(options, this[0]);
      return validator.validate();
    }
  });
});
