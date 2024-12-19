import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {
  transform(value: unknown, type: string, defaultVal: string = '-'): unknown {
    if (!value) {
      return defaultVal;
    }
    if (type === 'fromNow') {
      return moment(value).fromNow();
    } else if (type) {
      return moment(value).format(type);
    }
    return value;
  }
}
