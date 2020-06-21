import React from 'react';
import { Form, Field } from 'react-final-form';

import {
  required,
  minLength,
  email,
  passwordValid
} from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';

import DropzoneHoc from './DropzoneHOC';

const animalOptions = [
  {
    value: 'dog',
    text: 'Dog'
  },
  {
    value: 'cat',
    text: 'Cat'
  },
  {
    value: 'hamster',
    text: 'Hamster'
  },
  {
    value: 'parrot',
    text: 'Parrot'
  },
  {
    value: 'spider',
    text: 'Spider'
  },
  {
    value: 'goldfish',
    text: 'Goldfish'
  }
];

const ExampleFinalForm = () => {
  const onSubmit = () => {};

  const composeValidators = (...validators) => value => {
    const errors = [];
    validators.reduce((error, validator) => errors.push(validator(value)), []);
    return errors;
  };

  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {/* <Field name="firstName" label="FirstName">
              {props => {
                const { input, meta, ...rest } = props;
                return (
                  <>
                    <AdaptField
                      {...props}
                      type="text"
                      placeholder="FirstName"
                      name="firstName"
                    />
                    {meta.errors && meta.touched && (
                      <span>
                        {meta.errors.map(errMsg => (
                          <></>
                        ))}
                      </span>
                    )}
                  </>
                );
              }}
            </Field> */}

            {/* <Field
              name="firstName"
              label="FirstName"
              component={AdaptField}
              validate={composeValidators(
                required('firstName'),
                minLength(20),
                email
              )}
            /> */}
            {/* <Field
              name="firstName"
              label="FirstName"
              component={AdaptField}
              validate={composeValidators(
                required('firstName'),
                minLength(20),
                email
              )}
            >
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" />
                  {meta.error &&
                    meta.touched &&
                    meta.error.map(error => <span>{error}</span>)}
                </div>
              )}
            </Field> */}

            <Field
              name="firstName "
              validate={composeValidators(required('Last Name'), minLength(20))}
            >
              {({ input, meta }) => (
                <>
                  <input {...input} component={AdaptField} label="FirstName" />
                  {meta.touched && meta.error.map(err => <div>{err}</div>)}
                </>
              )}
            </Field>
            <Field
              name="passWord"
              label="PassWord"
              component={AdaptField}
              validate={passwordValid}
            />
            <Field
              name="lastName"
              label="LastName"
              component={AdaptField}
              validate={composeValidators(required('Last Name'), minLength(20))}
            />

            <Field
              name="favoriteAnimal"
              label="Animal"
              component={AdaptSelect}
              validate={required('Favorite Animal')}
              options={animalOptions}
              helpMessage="You favorite animal"
            />

            <Field
              name="notes"
              component={AdaptTextarea}
              label="Note"
              optional
            />

            <Field name="image" label="Image" component={DropzoneHoc} />

            <div className="buttons">
              <Button type="submit" solid disabled={submitting}>
                Submit
              </Button>
              <Button
                type="button"
                solid
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Wrapper>
  );
};
export default ExampleFinalForm;
