import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  image,
  url,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('image', image);
    defineRule('url', url);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field is required`,
          min: `The field is too short`,
          max: `The field is too long`,
          alphaSpaces: `The field may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          url: `The field must be a valid url`,
          image: `The field ${ctx.field} must be a valid image`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          passwords_mismatch: `The passwords do not match`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
    });
  },
};
