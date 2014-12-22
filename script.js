//javascript
//jQuery necessário
//daniel.uramg@gmail.com
//script para criar um contador individual em cima do contador total da HP Laserjet M1212nf MFP
//versao: 0.11

$(document).ready(function(){

    $.get("?ver_contador=1",function(valor,retorno){ //usa o get para capturar contador anterior armazenado no servidor
        contador_anterior = valor; //armazena o contador na variavel
        status = retorno; //armazera status do retorno (error ou sucess)
        //console.log(contador_anterior);
    });
	
    setTimeout(function(){ //da um delay de 500ms pra dar tempo de carregar

        $('.navigationControlOff').remove(); //remove opções do menu lateral
        $('.navigationControlOn').remove(); //remove opções do menu lateral
        $('.tabOff').remove(); //remove opções do menu superior
        $('.butSet').remove(); //remove opções do menu superior

        a = "zerar"; //senha para zerar contador
        contador_element = $("td:contains('Total páginas impressas:') + td"); //captura o elemento com numero do contador atual da impressora (o td abaixo do td com valor 'total de pagnas impressas')
        contador_num = contador_element.html(); //extrai somente o numero do contador
        impressas = contador_num - contador_anterior; //numero de paginas impressas gravado no cookie desde o ultimo zeramento
        button_position = $("h3:contains('Contagens de página')"); //opções onde o contador diario sera injetado
        //html da linha com contador diario e botão de reset
        button_reset = '<table><tr><td = class="labelFont">Desde o último zeramento foram impressas: </td><td class="itemFont"> <span style="color: red; font-size: 18px;">' + impressas + '</span> páginas - <button type="button" id="zerar">Zerar</button></td></table>';

        $(button_position).after(button_reset); //injeta html do contador diario

        //contador_element.css({"font-size": "18px", "color": "red"}); //aumenta a fonte e troca cor do contador

        //função do botão de zeramento do contador
        $(document).on('click', '#zerar', function(){
            p = prompt(["Digite a senha:"], []); 
            if (p == a){ 
                $.ajax({
                    type: "get",
                    url: "?definir_contador=1",
                    data: {CONT: contador_num},
                    success: function (sucess) {
					alert("Contador zerado, a página será recarregada.");
					location.reload();
					},
                    error: function(error){
					alert("Erro! " + error);
					}
                })
            }
            else { 
                alert("Senha inválida.");
            }
        });

    },500)

});