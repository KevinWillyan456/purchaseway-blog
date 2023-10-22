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
                <article className="user-posted">
                    <div className="user-picture-posts">
                        <User />
                    </div>
                    <div className="wrapper">
                        <div className="name-wrapper">
                            <div className="name">Jane Dawn</div>
                            <div className="posted-in">agora mesmo</div>
                        </div>
                        <div className="title-post">
                            Mahou Shoujo Madoka Magica
                        </div>
                        <div className="content-post">
                            "Mahou Shoujo Madoka Magica" é um anime notável e
                            inovador no gênero de mahou shoujo (garotas
                            mágicas). Ele se destaca por sua abordagem sombria e
                            complexa, subvertendo as expectativas comuns
                            associadas ao gênero. Uma das características mais
                            marcantes do anime é a maneira como lida com os
                            desejos. Ao longo da história, os personagens são
                            confrontados com a oportunidade de realizar um
                            desejo, mas a realização desses desejos vem com um
                            preço significativo. Isso levanta questões profundas
                            sobre o custo dos nossos desejos e a natureza
                            complexa do que realmente queremos.
                            <img
                                style={{
                                    width: "100%",
                                    marginTop: "20px",
                                }}
                                src="https://i.pinimg.com/736x/56/56/76/56567651819d5511d03ea4c1c25a6a9d.jpg"
                            />
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
