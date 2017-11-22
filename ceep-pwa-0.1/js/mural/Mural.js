const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = pegaCartoesUsuario();
    cartoes.forEach(cartao => { preparaCartao(cartao); });
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render();

    Filtro.on("filtrado", render)

    function preparaCartao(cartao){
        cartao.on("mudanca.**", salvaCartoes);
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            render()
            salvaCartoes();
        })
    }

    function pegaCartoesUsuario(){
        return (JSON.parse(localStorage.getItem(usuario)) || [])
        .map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo));
    }

    function salvaCartoes(){
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))
        ));
    } 

    login.on("login", () => {
        cartoes = pegaCartoesUsuario();
        render();
    });

    login.on("logout", () => {
        cartoes = [];
        render();
    });

    function adiciona(cartao){
        if(logado){
            cartoes.push(cartao);
            salvaCartoes();
            cartao.on("mudanca.**", render)
            preparaCartao(cartao);
            render()
            return true
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
