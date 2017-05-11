$(function() {
  $.mrgvalidator = function(options, form) {
    this.settings = $.extend(true, {}, $.mrgvalidator.defaults, options);
    this.currentForm = form;
    this.init();
  }

  $.extend($.mrgvalidator, {
    defaults: {
      success: {
        className: 'success'
      },
      error: {
        className: 'error'
      },
      validateOnetime: true,
      fields:[],
      container: 'div',
      showMsgIn: 'EveryInput', // or OnePlace
      msgContainer: '<span>validate error</span>' // if showMsgIn==='OnePlace', place a selector like .tip
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
        var _self = this;
        if(_form) {
          var result = true;
          this.clean(); //清除样式
          if(!this.settings.validateOnetime) {
            // var input = allInput
            this.settings.fields.every(function(item) {
              var _name = item.name;
              var _regex = item.regex;

              var _ele = _form.find('input[name="'+_name+'"]');
              if(_ele) {
                var container = item.container || _settings.container;
                if(_regex.test(_ele.val())) {
                  // console.log("success");
                  _ele.closest(container).addClass(_settings.success.className);
                  return true;
                }else{
                  // console.log("error");
                  result = false;
                  _ele.closest(container).addClass(_settings.error.className);
                  _self.showMsg(item);
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
                var container = item.container || _settings.container;
                if(_regex.test(_ele.val())) {
                  // console.log("success");
                  _ele.closest(container).addClass(_settings.success.className);
                }else{
                  // console.log("error");
                  result = false;
                  _ele.closest(container).addClass(_settings.error.className);
                  _self.showMsg(item);
                }
              }
            });

            this.on();
          }

          return result;
        }else{
          return false;
        }
      },
      clean: function(ele, field) {
        // $(this.currentForm)
          // .find('input')
        if(!!ele) {
          var container = field.container || this.settings.container;
          $(ele)
            .closest(container)
            .removeClass(this.settings.success.className)
            .removeClass(this.settings.error.className);
          this.hideMsg(field);
        }else{
          var _self = this;
          this.getAllFieldsEle().forEach(function(item){
            $(item.ele)
              .removeClass(_self.settings.success.className)
              .removeClass(_self.settings.error.className);
            _self.hideMsg(item.field);
          });
          this.off();
        }
      },
      click: function(item, e) {
        this.clean(item.ele, item.field);
      },
      on: function() {
        var click = this.click;
        var self = this;
        this.getAllFieldsEle().forEach(function(item) {
          item.ele.addEventListener('click', click.bind(self, item));
        });
      },
      off: function() {
        var click = this.click;
        var self = this;
        this.getAllFieldsEle().forEach(function(item) {
          item.ele.removeEventListener('click', click.bind(self, item));
        });
      },
      getAllFieldsEle: function() {
        var res = [];
        var form = $(this.currentForm);
        for (var i = 0; i < this.settings.fields.length; i++) {
          var field = this.settings.fields[i];
          res.push({
            field: field,
            ele:form.find('input[name="'+field.name+'"]')[0]
          });
        }
        return res;
      },
      showMsg: function(field) {
        if(!field) {
          return;
        }
        if(this.settings.showMsgIn === 'EveryInput') {
          var container = field.container || this.settings.container;
          var msgContainer = $(this.settings.msgContainer).text(field.msg || 'error').addClass('feedback');
          var _eleContainer = $(this.currentForm)
            .find('input[name="'+field.name+'"]')
            .closest(container);
          if(_eleContainer.find('.feedback').length === 0){
            _eleContainer.append(msgContainer);
          }
        }else if(this.settings.showMsgIn === 'OnePlace'){
          $(this.currentForm).find(this.settings.msgContainer).text(field.msg);
        }
      },
      hideMsg: function(field) {
        if(!field) {
          return;
        }

        if(this.settings.showMsgIn === 'EveryInput') {
          var container = field.container || this.settings.container;
          var msgContainer = $(this.settings.msgContainer).text(field.msg || 'error').addClass('feedback');
          var obj = $(this.currentForm)
            .find('input[name="'+field.name+'"]')
            .closest(container);
          obj.find('.feedback').remove();
        }else if(this.settings.showMsgIn === 'OnePlace') {
          $(this.currentForm).find(this.settings.msgContainer).text('');
        }
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
