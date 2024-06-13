import { ValidationArguments } from 'class-validator';

export const lengthValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) ${args.constraints[0]} ~ ${args.constraints[1]}글자를 입력 해주세요.`;
};

export const lengthValidationDescription = (min: number, max: number) => {
  return `${min} ~ ${max}글자를 입력 해주세요.`;
};

export const minLengthValidationMessage = (args: ValidationArguments) => {
  console.log(args.constraints);
  return `${args.property}은(는) 최소 ${args.constraints[0]}글자를 입력 해주세요.`;
};

export const minLengthValidationDescription = (min: number) => {
  return `최소 ${min}글자를 입력 해주세요.`;
};

export const maxLengthValidationMessage = (args: ValidationArguments) => {
  return `${args.property}은(는) 최대 ${args.constraints[0]}글자를 입력 해주세요.`;
};

export const maxLengthValidationDescription = (max: number) => {
  return `최대 ${max}글자까지 입력 해주세요.`;
};
