import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiterCodeLengthPipe'
})
export class FiterCodeLengthPipePipe implements PipeTransform {

  transform(value: any, wordwise?: any, max?: any, tail?: any): any {
 
    if (!value) return '';
    max = max == undefined ? 20 : parseInt(max, 10);
    var length = this.getChars(value);
    if (length <= max) return value;

    let i = 0; let c = 0; let rstr = '';

    // 开始取
    for (i = i; c < max; i++) {
        let unicode = value.charCodeAt(i);
        if (unicode < 127) {
            c += 1;
        } else {
            c += 2;
        }
        rstr += value.charAt(i);
    }
    return rstr + (tail || ' …');
}

getChars(str) {
    
    var length = 0.0;
    var unicode = 0;
    if (str == null || str == "") {
        return 0;
    }
    var len = str.length;
    for (var i = 0; i < len; i++) {
        unicode = str.charCodeAt(i);
        if (unicode < 127) { //判断是单字符还是双字符
            length += 1;
        } else {  //chinese
            length += 2;
        }
    }
    return length;
}
}
