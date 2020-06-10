import React from 'react';
import { Form, Field } from 'react-final-form';
import { setIn } from 'final-form';

import { required } from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';
import { string, object } from 'yup';
// import * as yup from 'yup';

// import Dropzone from './dropzone';
import DropzoneHoc from './DropzoneHOC';
// import DropzoneRenderProps from './DropzoneRenderProps';

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
  const onSubmit = value => {
    console.log('value ::', value);
  };

  const validate = async values => {
    try {
      await handleRequire().validate(values, { abortEarly: false });
    } catch (err) {
      const errors = err.inner.reduce((formError, innerError) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };
  const handleRequire = () => {
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
    return schema;
    // .validate({ firstName: value.firstName, lastName: value.lastName })
    // .then(res => undefined)
    // .catch(error => error.errors);
  };

  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={onSubmit}
        validate={values => validate(values)}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              label="FirstName"
              // subscription={{ error: true, touched: true }}
              // component={AdaptField}
              // validate={required('First Name')}
            >
              {props => {
                const { input, meta, ...rest } = props;
                return (
                  <>
                    <AdaptField
                      {...props}
                      type="text"
                      placeholder="FirstName"
                    />
                    {/* {(meta.error || meta.submitError) && meta.touched && (
                      <span>{meta.error || meta.submitError}</span>
                    )} */}
                  </>
                );
              }}
            </Field>

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

            {/* <Field name="image" label="Image" component={AdaptField}>
              {props => (
                <>
                  <Dropzone {...props.input} acceptedFile={acceptedFile} />
                </>
              )}
            </Field> */}
            <Field name="image" label="Image" component={DropzoneHoc} />
            {/* <Field name="image" label="Image" component={DropzoneRenderProps} /> */}

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
