let mensagensServidor = [];
let resposta = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
const campoMensagens = document.querySelector('.caixa-de-mensagens');
resposta.then(pegarDadosServidor);
const parada = setInterval(atualiza, 3000);

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
        if(mensagensServidor[i].type === "private_message"){
            //CRIA MSG PRIVADA
             
            novaMensagem = `<div class="item reservadas"><span class="horario">(${mensagensServidor[i].time})</span><span class="usuario">  ${mensagensServidor[i].from}</span> reservadamente para ${mensagensServidor[i].to}: ${mensagensServidor[i].text}</div>`
            campoMensagens.innerHTML += novaMensagem
        }
        

    }novaMensagem.scrollIntoView(true);
}
