# jquery-mrgvalidation

轻量级表单验证插件

## Usage
$(**表单DOM**).validate(options);
```javascript
$('form#a').validate({
  fields: [
    {
      name: "mp",
      regex: /^\d{11}$/,
      msg: "数字必须为11位"
    },
    {
      name: "email",
      regex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      msg: "必须是合法的邮箱地址"
    }
  ]
});
```

## Fields
```javascript
{
  name: "phone", // 表单表名
  regex: /^\d{11}$/, // 匹配正则表达式
  msg: "手机号必须为11位", // 错误提示
  container: 'span' // 可以替换默认的container
}
```

## 默认配置
```javascript
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
  // if your want more complex struct like <p><span></span></p>. just set it like <p><span>{0}</span></p>
}
```

## 配置说明
```javascript
success: {
  className: 'success' // 成功后容器类名
},
error: {
  className: 'error' // 失败后容器类名
},
validateOnetime: true, // 是否一次验证所有表单
fields:[], // 表单判定域
container: 'div', // 默认容器选择器，从input往上取最近
showMsgIn: 'EveryInput', // or OnePlace,在每个容器最下面添加还是在统一位置添加
msgContainer: '<span>validate error</span>' // if showMsgIn==='OnePlace', place a selector like .tip
// 如果是EveryInput, 则为一个标签，标签内容会替换为fields中相应的msg
// 如果是OnePlace, 则为一个容器选择器，该dom必须在form表单中
```

替换默认配置:
```javascript
$.mrgvalidator.prototype.setDefaults({...});
```

单独配置:
$(**表单DOM**).validate(options);
