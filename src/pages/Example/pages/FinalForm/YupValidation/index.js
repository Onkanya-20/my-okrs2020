import React from 'react';
import { Form, Field } from 'react-final-form';

import { required } from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';

import { string, object } from 'yup';
// import * as yup from 'yup';

// import Dropzone from './dropzone';
// import DropzoneHoc from './DropzoneHOC';
import DropzoneRenderProps from '../DropzoneRenderProps';

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
const handleRequire = value => {
  return schema
    .validate({ firstName: value.firstName, lastName: value.lastName })
    .catch(({ errors }) => errors);
};

const YupFinalform = () => {
  const onSubmit = value => {
    console.log('value ::', value);
  };
  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={onSubmit}
        validate={handleRequire}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              label="FirstName"
              component={AdaptField}
              validate={required('First Name')}
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
              {props => (
                <>
                  <DropzoneRenderProps {...props.input} />
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
export default YupFinalform;
