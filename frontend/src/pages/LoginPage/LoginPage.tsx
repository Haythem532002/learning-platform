import { useEffect, useState, useRef } from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assets/logo.png";
import { post } from "../../services/api";
import { useAuth } from "../../services/auth/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const deadItem = useRef<HTMLParagraphElement | null>(null);
  const deadItem2 = useRef<HTMLParagraphElement | null>(null);
  const { setToken, setUserData } = useAuth();

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
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

  async function login() {
    let res = await post("http://localhost:8060/auth/login", {
      email: email,
      password: password,
    });
    if (res.status == 200) {
      console.log("Logged In");
      setToken(res.data.token);
      setUserData(res.data.response);
      window.location.href = "/dashboard";

      console.log(res.data.response);
    } else {
      console.log("can't login");
    }
  }
  return (
    <div id={styles.container}>
      <div id={styles.loginContainer}>
        <nav id={styles.mainNav}>
          <img id={styles.logo} src={logo} />
          <Link to="/register" id={styles.register} className={styles.authBtn}>
            Register
          </Link>
        </nav>
        <main id={styles.loginMain}>
          <section id={styles.loginSection}>
            <div id={styles.loginLinks}>
              <h5>Login to your account</h5>
              <div id={styles.links}>
                <p>Login with </p>
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
                  Your Passwrod
                </p>
              </div>
              <div id={styles.loginControls}>
                <a href="#">Forgot Password ?</a>
                <button
                  className={styles.authBtn}
                  type="button"
                  id={styles.loginBtn}
                  onClick={login}
                >
                  Login
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

export default LoginPage;
