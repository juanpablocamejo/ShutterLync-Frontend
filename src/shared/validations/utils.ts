import { FormGroup } from '@angular/forms';

const validationMessages: { [key: string]: string } = {
    email: 'ingrese un email válido',
    required: 'el campo es obligatorio',
    minlength: 'el texto es demasiado corto',
    maxlength: 'el texto es demasiado largo',
};

export const getErrorMessage = (form: FormGroup, controlName: string) => {
    const errMap = form.controls[controlName].errors || {};
    const errors = Object.keys(errMap);
    const msg = errors.length ? validationMessages[errors[0]] : '';
    return msg;
};
