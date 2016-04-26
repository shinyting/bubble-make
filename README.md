# bubble-make

实现一个泡泡发生器的效果，点击鼠标，产生泡泡，泡泡在画面中随意漂浮，达到生命极限即可自动消失

构造函数方式定义bubble对象，其中包括bubble的属性和绘制方法  

requsetAnimationFrame实现动画效果  
同时，cancelAnimationFrame停止执行的动画

###聊天室功能集中到该动画项目中

###mongoose集中到该动画项目中

###mongodb
document struture: field-and-value paris 键值对的形式存储数据
{
	field1: value1,
	field2: value2,
	...
	filedN: valueN
}  
BSON data types  


###mongodb CURD操作
db.collection.find()  
eg: db.users.find({age: {$gt:18}}, {name: 1, address: 1}).limit(5)  
在users中查找age大于18的数据，并且返回的数据为小于等于5条的{_id: 'x', name: 'x', address: 'x'};  

