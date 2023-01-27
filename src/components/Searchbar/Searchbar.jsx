import PropTypes from 'prop-types';
import { Form, Header, Field, Btn, Label } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const query = form.elements.query.value.toLowerCase();
    onSubmit(query);
    form.reset();
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Btn type="submit" className="button">
          <Label className="button-label">Search</Label>
        </Btn>

        <Field
          className="input"
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
