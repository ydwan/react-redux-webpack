Array.prototype.findIndex = function (obj) {
  for (var i = 0, imax = this.length; i < imax; i++) {
    var ectypeObj = this[i];
    var ectypeObjLength = 0, successLength = 0;
    for (var k in ectypeObj) {
      ectypeObjLength += 1;
      if (ectypeObj[k] === obj[k]) {
        successLength += 1;
      }
    }
    if (ectypeObjLength === successLength) {
      return i;
    }
  }
  return -1;
}