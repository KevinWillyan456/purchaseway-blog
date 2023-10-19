import AddUser from "../../icons/AddUser";
import Publish from "../../icons/Publish";
import Share from "../../icons/Share";
import World from "../../icons/World";
import "./Main.css";

function Main() {
    return (
        <section className="main">
            <div className="container">
                <div className="content-banner">
                    <div className="conversion">
                        <div className="title">
                            Conheça uma comunidade baseada em publicações
                        </div>
                        <button className="btn-register">Cadastrar-se</button>
                    </div>
                    <div>
                        <World />
                    </div>
                </div>
                <div className="title-characteristics">
                    Principais características de nosso sistema
                </div>
                <div className="cards">
                    <div className="card-characteristics">
                        <Share />
                        <p className="feature">Compartilhe</p>
                    </div>
                    <div className="card-characteristics">
                        <AddUser />
                        <p className="feature">Interaja</p>
                    </div>
                    <div className="card-characteristics">
                        <Publish />
                        <p className="feature">Publique</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Main;
