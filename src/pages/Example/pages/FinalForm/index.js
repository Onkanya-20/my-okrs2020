import React from 'react';
import { Form, Field } from 'react-final-form';
// import { setIn } from 'final-form';

import { required, minLength, email } from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';
// import { string, object } from 'yup';
// import * as yup from 'yup';

// import Dropzone from './dropzone';
import DropzoneHoc from './DropzoneHOC';
// import DropzoneRenderProps from './DropzoneRenderProps';

import spected from 'spected';
import { compose, curry, head, isEmpty, length, not, prop } from 'ramda';
// import {
//   requireError,
//   minLengthError,
//   maxLengthError,
//   emailError
// } from 'utils/form/validators/errorMessage';

// import {
//   requiredValidate,
//   minLengthValidate,
//   maxLengthValidate,
//   emailValidate
// } from 'utils/form/validators/validate';

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

// predicates
const notEmpty = compose(not, isEmpty);
const hasCapitalLetter = a => /[A-Z]/.test(a);
const isGreaterThan = curry((len, a) => a > len);
const isLengthGreaterThan = len => compose(isGreaterThan(len), prop('length'));
const requiredValidate = value => value && !!value.trim();

// error message
const notEmptyMsg = field => <div>{`${field} should not be empty.`}</div>;
const minimumMsg = (field, len) => (
  <div>{`Minimum ${field} length of ${len} is required.`}</div>
);
const capitalLetterMsg = field => (
  <div>{`${field} should contain at least one uppercase letter.`}</div>
);
const requireError = fieldName => <div>{`${fieldName} is required.`}</div>;

const ExampleFinalForm = () => {
  const onSubmit = value => {
    console.log('value ::', value);
  };

  //rules
  const nameValidationRule = [
    [requiredValidate, requireError('firstName')],
    [hasCapitalLetter, capitalLetterMsg('firstName')],
    [isLengthGreaterThan(20), minimumMsg('firstName', 20)]
  ];

  // const validate = async values => {
  //   try {
  //     await handleRequire().validate(values, { abortEarly: false });
  //   } catch (err) {
  //     const errors = err.inner.reduce((formError, innerError) => {
  //       return setIn(formError, innerError.path, innerError.message);
  //     }, {});
  //     return errors;
  //   }
  // };
  // const handleRequire = () => {
  //   // const data = string().required();
  //   // return data.isValid(value).then(res => (res ? undefined : 'please'));
  //   const schema = object().shape({
  //     firstName: string()
  //       .required('Please enter your firstname.')
  //       .min(5)
  //       .max(10),
  //     lastName: string()
  //       .required('Please enter your lastName.')
  //       .email()
  //       .min(6)
  //   });
  //   return schema;
  //   // .validate({ firstName: value.firstName, lastName: value.lastName })
  //   // .then(res => undefined)
  //   // .catch(error => error.errors);
  // };
  const validationRules = {
    firstName: nameValidationRule
  };

  const validate = values => {
    return spected(validationRules, { firstName: values.firstName });
    // firstName: [
    //   [isLengthGreaterThan(2), minimumMsg('Random', 3)],
    //   [hasCapitalLetter, capitalLetterMsg('Random')]
    // ]
  };

  return (
    <Wrapper>
      <Headline>Simple Form Example</Headline>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" label="FirstName">
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
                    {console.log('meta ::', meta)}
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
            </Field>

            {/* <Field name="firstName" label="FirstName" component={AdaptField} /> */}

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
