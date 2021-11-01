let prato_selecionado, bebida_selecionado,sobremesa_selecionado;
let prato_preco_txt, bebida_preco_txt, sobremesa_preco_txt, total_pedido_txt = "";
let prato_valor_num, bebida_valor_num, sobremesa_valor_num, total= 0;
let nomeprato, nomebebida, nomesobremesa = "";
let a = 0; // Conta quantos itens foram selecionados
const b = document.querySelectorAll("section").length; // Conta quantos menus de opções tem, um "futureproofing" bem basico
ativarbtn();  // começa com botão desativado
let telefonerestaurante = "" // colocar numero do restaurante entre os parentesesformato 55dddxxxxxxxxxxx ex 552199999999999


function escolheritem(item){

let menuanterior = item.closest("section");
let itemanterior = menuanterior.querySelector(".clicado");

    if(itemanterior === null){

        item.classList.add("clicado");
        check(item);
        a = a+1;
        ativarbtn();
    }
      
    else if(item === itemanterior){

        item.classList.remove("clicado");
        check(item);
        a = a-1;
        ativarbtn();
    }
    
    else{
    
        itemanterior.classList.remove("clicado");
        check(itemanterior)
        item.classList.add("clicado");
        check(item);
        ativarbtn();
    }
}

function check(element){
    let checkativo;
    checkativo = element.querySelector(".check");
    checkativo.classList.toggle("hidden");

}

function ativarbtn(){

    if(a == b){
        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").innerText = 'Finalizar pedido';
    }

    else{
        document.getElementById("btn1").innerText = 'Selecione os ' + b + ' itens para fechar o pedido';
        document.getElementById("btn1").disabled = true;
    }
}

function finalizarpedido(){
    document.querySelector(".confirmar").classList.remove("hidden");
    
    //Pedido na tela de confimação

    prato_selecionado = document.querySelector("[title~=pratos] article.clicado");
    bebida_selecionado = document.querySelector("[title~=bebidas] article.clicado");
    sobremesa_selecionado = document.querySelector("[title~=sobremesas] article.clicado");
 
    Calculos();

    nomeprato = prato_selecionado.querySelector("h1").innerText;
    document.getElementById("PFN").innerText = nomeprato;
    document.getElementById("PFP").innerText = prato_preco_txt.replace("R$ ","");
  
 
    nomebebida = bebida_selecionado.querySelector("h1").innerText;
    document.getElementById("BFN").innerText = nomebebida;
    document.getElementById("BFP").innerText = bebida_preco_txt.replace("R$ ","");

    nomesobremesa = sobremesa_selecionado.querySelector("h1").innerText;
    document.getElementById("SFN").innerText = nomesobremesa;
    document.getElementById("SFP").innerText = sobremesa_preco_txt.replace("R$ ","");

    total_pedido_txt = "R$ "+ total.toFixed(2).replace(".",",");
    document.getElementById("TFP").innerText = total_pedido_txt;  

}

function confirmar(){

    let cliente = prompt("Obrigado pelo pedido! Poderia primeiro informar qual seu nome?");

    if (cliente === null){
        cancelar();
        return;

    }
    
    else{

        let endereco = prompt("Prazer em te atender, " + cliente +"!\n Poderia informar o endereço de entrega?");

        if (endereco === null){

            cancelar();
            return;
        }

        else{
            alert("Tudo pronto! Seu pedido chegará em breve!\nPeço para desbloquear os pop-ups rapidamente para o pedido ser enviar, não utilizamos publicidade dentro do app");

            let txtpedido = "Olá, gostaria de fazer o pedido:\n- Prato: " + nomeprato +"\n- Bebida: " + nomebebida +"\n- Sobremesa: " + nomesobremesa +"\nTotal: "+ total_pedido_txt +"\nNome: " + cliente +"\nEndereço: " + endereco

            let urlzap = "https://wa.me/"+ telefonerestaurante +"?text="+encodeURIComponent(txtpedido) // Para devinir o numero do ZAP, colocar no formato 

            window.open(urlzap);
        }
    }
}

function cancelar(){

    document.getElementById("Menu_Confirmar").classList.add("hidden");

}

function corrigirvalor(string){
    const txtparanum = parseFloat(string.replace("R$ ","").replace(",","."))
    return txtparanum;

}

// Calculos
function Calculos(){

    prato_preco_txt = prato_selecionado.querySelector(".valor, h3").innerText;
    bebida_preco_txt = bebida_selecionado.querySelector(".valor, h3").innerText;
    sobremesa_preco_txt = sobremesa_selecionado.querySelector(".valor, h3").innerText;

    prato_valor_num = corrigirvalor(prato_preco_txt);
    bebida_valor_num = corrigirvalor(bebida_preco_txt);
    sobremesa_valor_num = corrigirvalor(sobremesa_preco_txt);

    total = prato_valor_num+bebida_valor_num+sobremesa_valor_num;

}

// Melhorar identação (TABS NAS FUNÇÔES, FAZER DOMINGO!!!!)