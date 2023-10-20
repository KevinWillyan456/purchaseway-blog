import "./MainSingIn.css";

function MainSingIn() {
    return (
        <main className="d-flex align-items-center bg-body-tertiary main-singin">
            <section className="form-signin w-100 m-auto">
                <form>
                    <div className="main-singin-logo">
                        <img
                            src="/purchaseway-blog-favicon-medium.png"
                            alt="logo"
                        />
                    </div>
                    <h1 className="h3 mb-3 fw-normal main-singin-create-account">
                        Crie sua conta
                    </h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingName">Nome</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control email-input"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">E-mail</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                        >
                            Lembre de mim
                        </label>
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                    >
                        Criar
                    </button>
                </form>
            </section>
        </main>
    );
}

export default MainSingIn;
