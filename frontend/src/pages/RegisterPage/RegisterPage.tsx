import { useEffect, useState, useRef } from "react";
import styles from "./RegisterPage.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { post } from "../../services/api";
import SelectRole from "../../components/specific/SelectRole/SelectRole";

function RegisterPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("INSTRUCTOR");
  const deadItem = useRef<HTMLParagraphElement | null>(null);
  const deadItem2 = useRef<HTMLParagraphElement | null>(null);
  const deadItem3 = useRef<HTMLParagraphElement | null>(null);
  const deadItem4 = useRef<HTMLParagraphElement | null>(null);
  const deadItem5 = useRef<HTMLParagraphElement | null>(null);

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e: any) {
    setConfirmPassword(e.target.value);
  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }

  function handleFirstName(e: any) {
    setFirstName(e.target.value);
  }

  function handleLastName(e: any) {
    setLastName(e.target.value);
  }

  useEffect(() => {
    if (!password.length) {
      if (deadItem.current) {
        deadItem.current.style.removeProperty("transform");
      }
    } else {
      if (deadItem.current) {
        deadItem.current.style.setProperty(
          "transform",
          "translate(-100%, -379%)",
          "important"
        );
      }
    }
  }, [password]);

  useEffect(() => {
    if (!email.length) {
      if (deadItem2.current) {
        deadItem2.current.style.removeProperty("transform");
      }
    } else {
      if (deadItem2.current) {
        deadItem2.current.style.setProperty(
          "transform",
          "translate(-150%, -379%)",
          "important"
        );
      }
    }
  }, [email]);

  useEffect(() => {
    if (!confirmPassword.length) {
      if (deadItem3.current) {
        deadItem3.current.style.removeProperty("transform");
      }
    } else {
      if (deadItem3.current) {
        deadItem3.current.style.setProperty(
          "transform",
          "translate(-40%, -379%)",
          "important"
        );
      }
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (!firstName.length) {
      if (deadItem4.current) {
        deadItem4.current.style.removeProperty("transform");
      }
    } else {
      if (deadItem4.current) {
        deadItem4.current.style.setProperty(
          "transform",
          "translate(-0%, -379%)",
          "important"
        );
      }
    }
  }, [firstName]);

  useEffect(() => {
    if (!lastName.length) {
      if (deadItem5.current) {
        deadItem5.current.style.removeProperty("transform");
      }
    } else {
      if (deadItem5.current) {
        deadItem5.current.style.setProperty(
          "transform",
          "translate(-0%, -379%)",
          "important"
        );
      }
    }
  }, [lastName]);

  async function register() {
    console.log("Role", role);
    let res = await post("http://localhost:8060/auth/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      roleUser: role,
    });
    if (res.status == 200) {
      console.log("registered");
    } else {
      console.log("error registering");
    }
  }
  return (
    <div id={styles.container}>
      <div id={styles.loginContainer}>
        <nav id={styles.mainNav}>
          <img id={styles.logo} src={logo} />
        </nav>
        <main id={styles.loginMain}>
          <section id={styles.loginSection}>
            <div id={styles.loginLinks}>
              <h5>Register to your account</h5>
              <div id={styles.links}>
                <p>Register with </p>
                <ul>
                  <li id={styles.google}>
                    <a></a>
                  </li>
                  <li id={styles.facebook}>
                    <a></a>
                  </li>
                  <li id={styles.linkedin}>
                    <a></a>
                  </li>
                </ul>
              </div>
            </div>
            <form id={styles.loginForm}>
              <div id={styles.loginLinks}></div>
              <SelectRole value={role} onChange={setRole} />
              <div className="spanner" style={{ flexWrap: "nowrap" }}>
                <div className={styles.inputSpan}>
                  <input
                    onChange={handleFirstName}
                    value={firstName}
                    id={styles.namesInput}
                    type="text"
                  />
                  <p ref={deadItem4} id={styles.deadItem4}>
                    Your Firstname
                  </p>
                </div>
                <div className={styles.inputSpan}>
                  <input
                    onChange={handleLastName}
                    value={lastName}
                    id={styles.namesInput}
                    type="text"
                  />
                  <p ref={deadItem5} id={styles.deadItem5}>
                    Your Lastname
                  </p>
                </div>
              </div>
              <div className={styles.inputSpan}>
                <input
                  onChange={handleEmail}
                  value={email}
                  id={styles.emailInput}
                  type="email"
                />
                <p ref={deadItem2} id={styles.deadItem}>
                  Your Email
                </p>
              </div>
              <div className={styles.inputSpan}>
                <input
                  onChange={handlePassword}
                  value={password}
                  id={styles.passwordInput}
                  type="password"
                />
                <p ref={deadItem} id={styles.deadItem2}>
                  Your Password
                </p>
              </div>

              <div className={styles.inputSpan}>
                <input
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  id={styles.confirmPasswordInput}
                  type="password"
                />
                <p ref={deadItem3} id={styles.deadItem3}>
                  Confirm Your Password
                </p>
              </div>
              <div id={styles.loginControls}>
                <Link to="/login">Already Have An Account ?</Link>
                <button
                  type="button"
                  onClick={register}
                  className={styles.authBtn}
                  id={styles.loginBtn}
                >
                  Register
                </button>
              </div>
            </form>
          </section>
          <section id={styles.imageSection}></section>
        </main>
        <nav id={styles.lastNav}>
          <ul>
            <li>
              <p>@Copyright ElearningIndustries</p>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default RegisterPage;
