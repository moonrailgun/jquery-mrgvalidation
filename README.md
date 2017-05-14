# jquery-mrgvalidation

轻量级表单验证插件

## 配置说明
默认配置
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
}
```

替换默认配置:
```javascript
$.mrgvalidator.prototype.setDefaults({...});
```
