import { ValidationArguments } from 'class-validator';

export const lengthValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) ${args.constraints[0]} ~ ${args.constraints[1]}글자를 입력 해주세요.`;
};

export const minLengthValidationMessage = (args: ValidationArguments) => {
  console.log(args.constraints);
  return `${args.property}은(는) 최소 ${args.constraints[0]}글자를 입력 해주세요.`;
};

export const maxLengthValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) 최대 ${args.constraints[0]}글자를 입력 해주세요.`;
};
