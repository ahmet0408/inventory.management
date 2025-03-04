import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await register({
        firstName,
        lastName,
        username,
        password,
      });
      if (result.success) {
        navigate("/login");
      } else {
        setError(result.message || "Hasaba alyşda näsazlyk ýüze çykdy!");
      }
    } catch (err) {
      setError("Serwer bilen baglanyşykda ýalňyşlyk ýüze çykdy");
    }
  };

  return (
    <div className="mx-3 mx-lg-0 min-vh-100 d-flex align-items-center">
      <div className="card my-5 col-xl-9 col-xxl-8 mx-auto rounded-4 overflow-hidden">
        <div className="row g-4">
          <div className="col-lg-6 d-flex p-4 d-flex align-items-center">
            <div className="align-items-center card-body">
              <div className="d-flex justify-content-center">
                <img src="assets/images/inventar-hor.png" width="150" alt="" />
              </div>
              <div className="form-body mt-4">
                <form className="row g-3" onSubmit={handleSubmit}>
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
                  <div className="col-6">
                    <label className="form-label">Adyňyz</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Familiýaňyz</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Ulanyjy adyňyz</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Açar sözüňiz</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ background: "#023047" }}
                      >
                        Hasaba al
                      </button>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <p className="mb-0">
                      Hasapda barmy? <a href="/login">Ulgama gir</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex d-none">
            <div className="p-4 rounded-4 w-100 d-flex align-items-center justify-content-center">
              <img
                src="assets/images/auth/login1.png"
                className="img-fluid"
                alt="Hasaba alyş"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
