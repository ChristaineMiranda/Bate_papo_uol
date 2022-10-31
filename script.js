let nomeUsuario = prompt("Digite seu nome");
let mensagensServidor = [];
const campoMensagens = document.querySelector('.caixa-de-mensagens');
entrarNoChat();



function entrarNaSala(){
    let resposta = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    resposta.then(pegarDadosServidor);    
}
function nomeEmUso(){
    const tipoDeErro = erro.response.status;
    if(tipoDeErro == 400){
        nomeUsuario = prompt("Nome escolhido já está em uso. Digite outro nome");
        entrarNoChat();
    }
    
}

function entrarNoChat(){
    const nome = {name: nomeUsuario};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
    promise.then(entrarNaSala);
    promise.catch(nomeEmUso);
}

function atualiza(){
    let resposta = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    resposta.then(pegarDadosServidor);
}
function pegarDadosServidor(respostaServidor){
    let novaMensagem;
    mensagensServidor = respostaServidor.data;
    console.log(mensagensServidor);
    campoMensagens.innerHTML = '';
    for(let i=0; i<mensagensServidor.length; i++){
        //Se mensagem de status, cria elemento no dom com classe de status
        if(mensagensServidor[i].type === "status"){
            //CRIA MSG DE STATUS
            novaMensagem = `<div class="item status"><span class="horario">(${mensagensServidor[i].time})</span><span class="usuario">  ${mensagensServidor[i].from}</span> ${mensagensServidor[i].text}</div>`
            campoMensagens.innerHTML += novaMensagem;
        }
        if(mensagensServidor[i].type === "message"){
            //CRIA MSG COMUM
             
            novaMensagem+= `<div class="item normal"><span class="horario">(${mensagensServidor[i].time})</span><span class="usuario">  ${mensagensServidor[i].from}</span> para ${mensagensServidor[i].to}: ${mensagensServidor[i].text}</div>`
            campoMensagens.innerHTML +=novaMensagem;
            
        }
        if((mensagensServidor[i].type === "private_message")&&(mensagensServidor[i].to === nomeUsuario)){
            //CRIA MSG PRIVADA
             //pegar nome do usuario que esta usando com prompt. comparar destino de mensagem privada com nome de usuario, só mostrar se for igual
            novaMensagem = `<div class="item reservadas"><span class="horario">(${mensagensServidor[i].time})</span><span class="usuario">  ${mensagensServidor[i].from}</span> reservadamente para ${mensagensServidor[i].to}: ${mensagensServidor[i].text}</div>`
            campoMensagens.innerHTML += novaMensagem
        }
        

    }
    const parada = setInterval(atualiza, 3000);
    const paradaB = setInterval(mantemConexao, 5000);
}
function mantemConexao(){
    const conectado = {name: nomeUsuario};
    const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', conectado);
}
 function enviar (){
    let texto = document.querySelector('.escrever').value; //pega a mensagem digitada pelo usuário
    let dados = {
        from: nomeUsuario,
        to: "Todos",
        text: texto,
        type: "message"
    }
    console.log(dados);
    const envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', dados);
    envio.then(atualiza);
    envio.catch(recarrega);
 }
 function recarrega (){
    window.location.reload();
 }
