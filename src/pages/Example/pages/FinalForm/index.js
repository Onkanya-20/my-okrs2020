import React from 'react';
import { Form, Field } from 'react-final-form';

import {
  required,
  minLength,
  email,
  passwordValid,
  composeValidators
} from 'utils/form/validators';

import { Wrapper, Headline } from './index.view';
import { AdaptField, AdaptSelect, AdaptTextarea } from 'components/Field';
import Button from 'components/Button';
import styled from 'styled-components';
import DropzoneHoc from './DropzoneHOC';

const CustomField = styled.input`
  background-color: ${({ theme }) => theme.color.white};
  background-clip: padding-box;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.black};
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  width: 100%;
  border-color: ${({ isError, theme }) =>
    isError ? theme.color.error : theme.color.black};
`;
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

  const composeValidators1 = (...validators) => value => {
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
            <span style={{ color: 'red' }}>First Name</span>
            <Field
              name="firstName "
              validate={composeValidators(required('Last Name'), minLength(5))}
              label="FirstName"
            >
              {({ input, meta }) => (
                <>
                  <CustomField
                    {...input}
                    isError={meta.touched}
                    label="FirstName"
                    component={AdaptField}
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            {/* <span style={{ color: 'red' }}>First Name</span>
            <Field
              name="firstName "
              validate={composeValidators(required('Last Name'), minLength(5))}
              label="FirstName"
            >
              {({ input, meta }) => (
                <>
                  <CustomField
                    {...input}
                    isError={meta.touched}
                    label="FirstName"
                    component={AdaptField}
                  />
                  {meta.touched &&
                    meta.error.map(err => (
                      <div style={{ color: 'red' }}>{err}</div>
                    ))}
                </>
              )}
            </Field> */}
            <Field
              name="firstName"
              label="FirstName"
              component={AdaptField}
              validate={required('FirstName Name')}
            />
            <Field
              name="passWord"
              label="PassWord"
              component={AdaptField}
              validate={composeValidators1(required('Pass Word'))}
            />
            <Field
              name="lastName"
              label="LastName"
              component={AdaptField}
              validate={composeValidators1(
                required('Last Name'),
                minLength(20)
              )}
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
