import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RemoveUndefinedValuesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata.metatype["name"]);
    if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => {
          console.log('key', key);
          console.log('metatype[key]', metadata.metatype[key]);
        if (value[key] === undefined) {
          delete value[key];
        }
      });
    }
    return value;
  }
}