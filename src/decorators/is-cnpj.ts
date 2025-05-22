import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return cnpj.isValid(value);
        },
        defaultMessage() {
          return 'The value must be a valid CNPJ.';
        },
      },
    });
  };
}
