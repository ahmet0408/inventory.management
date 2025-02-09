import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(username, password);
      if (result.isAuthenticated) {
        navigate("/");
      } else {
        setError(result.message || "Ulanyjy ady ýa-da açar sözüňiz ýalňyş!");
      }
    } catch (err) {
      setError("Serwer bilen baglanyşykda ýalňyşlyk ýüze çykdy");
    }
  };

  return (
    <div className="mx-3 mx-lg-0 min-vh-100 d-flex align-items-center">
      <div className="card my-5 col-xl-9 col-xxl-8 mx-auto rounded-4 overflow-hidden">
        <div className="row g-4">
          <div className="col-lg-6 d-flex p-4">
            <div className="card-body">
              <img
                src="assets/images/logo1.png"
                className="mb-4"
                width="145"
                alt=""
              />
              <h4 className="fw-bold">Ulgama Giriş</h4>
              <p className="mb-0">
                Hasabyňyza girmek üçin şahsy maglumatlaryňyzy giriziň
              </p>

              <div className="form-body mt-4">
                <form className="row g-3" onSubmit={handleSubmit}>
                  {error && ( // error bar bolsa görkezýäris
                    <div className="col-12">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <label htmlFor="inputEmailAddress" className="form-label">
                      Ulanyjy adyňyz
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsername"
                      placeholder="Ulanyjy adyňyz"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputChoosePassword" className="form-label">
                      Açar sözüňiz
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-end-0"
                        id="inputChoosePassword"
                        placeholder="Açar sözüňiz"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="input-group-text bg-transparent"
                        onClick={togglePassword}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Paroly ýatda sakla
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 text-end">
                    <a href="auth-boxed-forgot-password.html">
                      Paroly unutdyňyzmy?
                    </a>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Ulgama gir
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-start">
                      <p className="mb-0">
                        Sizde ulanyjy ýokmy?
                        <a href="auth-boxed-register.html">Ulgama ýazyl</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex d-none">
            <div className="p-4 rounded-4 w-100 d-flex align-items-center justify-content-center">
              <img
                src="assets/images/auth/login1.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
