import Like from "../../icons/Like";
import User from "../../icons/User";
import "./ContainerPosts.css";

function ContainerPosts() {
    return (
        <section className="container-posts">
            <div className="content-posts">
                <p className="recommendations">Recomendações para você</p>

                <article className="user-posted">
                    <div className="user-picture-posts">
                        <User />
                    </div>
                    <div className="wrapper">
                        <div className="name-wrapper">
                            <div className="name">Joe Dawn</div>
                            <div className="posted-in">há 2 horas</div>
                        </div>
                        <div className="title-post">
                            Desenvolvedores Front-end em React
                        </div>
                        <div className="content-post">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Optio tenetur dolorum natus voluptates magnam
                            ipsa delectus qui voluptate, sint ratione reiciendis
                            adipisci minus magni ducimus
                        </div>
                        <div className="actions-post">
                            <div className="actions-wrapper">
                                <button className="like-btn">
                                    <Like />
                                </button>
                                <button className="btn-respond">
                                    Responder
                                </button>
                            </div>
                            <button className="answers">
                                Respostas
                                <div className="answers-count">21</div>
                            </button>
                        </div>
                    </div>
                </article>
                <article className="user-posted">
                    <div className="user-picture-posts">
                        <User />
                    </div>
                    <div className="wrapper">
                        <div className="name-wrapper">
                            <div className="name">Joe Doe</div>
                            <div className="posted-in">há 2 dias</div>
                        </div>
                        <div className="title-post">
                            Desenvolvedores Back-end em Node
                        </div>
                        <div className="content-post">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Optio tenetur dolorum natus voluptates magnam
                            ipsa delectus qui voluptate, sint ratione reiciendis
                            adipisci minus magni ducimus fuga temporibus illo
                            quam distinctio?
                        </div>
                        <div className="actions-post">
                            <div className="actions-wrapper">
                                <button className="like-btn active">
                                    <Like />
                                </button>
                                <button className="btn-respond">
                                    Responder
                                </button>
                            </div>
                            <button className="answers">
                                Respostas
                                <div className="answers-count">5</div>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default ContainerPosts;
