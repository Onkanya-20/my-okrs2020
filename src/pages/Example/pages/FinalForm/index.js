import React, { useState } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';

import { required, minLength, email, maxLength } from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';

import { string, number, object } from 'yup';
// import * as yup from 'yup';

import Dropzone from './dropzone';

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

const handleRequire = value => {
  // const data = string().required();
  // return data.isValid(value).then(res => (res ? undefined : 'please'));
  const schema = object().shape({
    firstName: string()
      .required('Please enter your firstname.')
      .min(5)
      .max(10),
    lastName: string()
      .required('Please enter your lastName.')
      .email()
      .min(6)
  });
  return schema
    .validate({ firstName: value.firstName, lastName: value.lastName })
    .then(res => undefined)
    .catch(error => error.errors);
};

// const handleMin = value => {
//   const schema = string().min(10);
//   return schema
//     .validate(value)
//     .then(res => undefined)
//     .catch(error => error.errors);
// };

const ExampleFinalForm = () => {
  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={() => ({})}
        validate={values => handleRequire(values)}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" label="FirstName" component={AdaptField} />

            <Field
              name="lastName"
              label="LastName"
              component={AdaptField}
              // validate={required('Last Name')}
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

            <Field name="image" label="Image" component={AdaptField}>
              {props => (
                <>
                  <Dropzone {...props.input} />
                </>
              )}
            </Field>

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
