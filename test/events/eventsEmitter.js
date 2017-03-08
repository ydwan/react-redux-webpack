/**
 * Created by zhongzhengkai on 2016/12/19.
 */


var events = require('events');
var util = require('util');

function Person() {
  //this.emitter=new events.EventEmitter(this);
}
util.inherits(Person,events.EventEmitter);

var p = new Person();


p.on('shit', (name)=> {
  console.log('bull shit:'+name);
});

p.emit('shit', 'nick');