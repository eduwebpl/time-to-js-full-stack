import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Notification } from "./Notification";

export function SignInPage() {
  const { signIn, isSigningIn, signInError } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = Boolean(email && password);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!isValid) {
      return;
    }
    signIn(
      { email, password },
      {
        onSuccess: () => navigate("/"),
        onSettled: () => queryClient.invalidateQueries(["orders"]),
      }
    );
  };

  return (
    <section>
      <h3 className="is-size-3 my-3">Sign to place the Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">E-mail</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Your e-mail"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="Your password"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              disabled={isSigningIn}
            >
              Sign in
            </button>
          </div>
        </div>
        {signInError && (
          <Notification message={signInError.message} type="danger" />
        )}
      </form>
    </section>
  );
}
