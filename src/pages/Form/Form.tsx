import { useState } from 'react';
import Spinner from './components/Spinner';

function Form() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  if (success) {
    return (
      <>
        <h1>Success!</h1>
        <span>
          Thank <b>you</b> for registering
        </span>
        <button type="button" onClick={() => setSuccess(false)}>
          Go back
        </button>
      </>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.persist();

    setLoading(true);

    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const form = {
        email: formData.get('email') ?? '',
        password: formData.get('password') ?? '',
      };

      if (form.email && form.password) {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 1000);
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="email" className="items-start">
        Email address
        <input
          type="email"
          id="email"
          name="email"
          aria-describedby="email-help"
          placeholder="Enter email"
          required
        />
      </label>

      <label htmlFor="password" className="items-start">
        Password
        <input type="password" id="password" name="password" placeholder="Password" required />
      </label>

      <div className="flex gap-2">
        <input type="checkbox" id="terms" required />

        <label htmlFor="terms" className="mb-0">
          <span>
            I accept the <a href="https://www.example.com">terms and conditions</a>
          </span>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
