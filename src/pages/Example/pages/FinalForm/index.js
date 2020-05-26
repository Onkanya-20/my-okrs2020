import React, { useState } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';

import { required, minLength, email, maxLength } from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';

import { string, number } from 'yup';

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
  const schema = number()
    .required('Please enter your firstname.')
    .min(5)
    .max(10);
  return schema
    .validate(value)
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
  const { imageUpload, setImageUpload } = useState({});
  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={() => ({})}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              label="FirstName"
              component={AdaptField}
              validate={required('firstName') && minLength(20) && email}
            />

            <Field
              name="lastName"
              label="LastName"
              component={AdaptField}
              validate={required('Last Name')}
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
              {props => <Dropzone {...props.input} />}
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
