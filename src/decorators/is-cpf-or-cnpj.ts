import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return cpf.isValid(value) || cnpj.isValid(value);
        },
        defaultMessage() {
          return 'The value must be a valid CPF or CNPJ.';
        },
      },
    });
  };
}
