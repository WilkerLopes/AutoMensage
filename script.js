var numCll = mensage = validation = "";
var ligar = false;
var toggleFav = localStorage.getItem("tgFav");
if(toggleFav == null){
    toggleFav = false;
  }else{
    toggleFav = true;
  }
  console.log(toggleFav);
 if(toggleFav == true){
    $("#toggleFavorite").html("<i class='material-icons'>star</i>");
  }else{
     $("#toggleFavorite").html("<i class='material-icons'>star_border</i>");
  }

$(document).ready(() => {
  

 

  $("#msgPreview").hide();
  $('.celular').mask('0 0000-0000', { placeholder: "9 1234-1234" });

  $("#telefone").change(() => {
    numCll = "" + $("#telefone").val();
    if (numCll.length != 11) {
      M.toast({ html: 'Numero incompleto!!' });
    } else {
      enviarMsg();
      ligar = true;
    };
  });

  $("#telefone").keyup(() => {
    numCll = "" + $("#telefone").val();
    $("#telefonePreview").text("+55 92 " + numCll);
  });

  $("#msg").change(() => {
    mensage = $("#msg").val();
    if (mensage == null || mensage == "" || mensage == " " || mensage == "  " || mensage == "   " || mensage == "    ") {
      M.toast({ html: 'Nenhuma mensagem definida!!' });
      $("#msgPreview").hide();
    };
    enviarMsg();
  });

  $("#msg").keyup(() => {
    mensage = "" + $("#msg").val();
    $("#msgPreview").show().text(mensage);
    enviarMsg();
  });

  $("#ligar").click(()=>{
  if(ligar==false){
     M.toast({ html: 'Digite um número para continuar'});
  }
});

$("#toggleFavorite").click(()=>{
  if(toggleFav == true){
    $("#toggleFavorite").html("<i class='material-icons'>star_border</i>");
    localStorage.setItem("tgFav", false);
  }else{
     $("#toggleFavorite").html("<i class='material-icons'>star</i>");
     localStorage.setItem("tgFav", true);
  }
  toggleFav = localStorage.getItem("tgFav");
});

$(".preloader").hide();
});

function enviarMsg() {
  var link = "https://api.whatsapp.com/send?phone=5592" + numCll + "&text=" + mensage + " ";
  var call = "tel:5592" + numCll;
  $("#enviarMsg").attr("href", link);
  $("#ligar").attr("href", call);
}

function proximo(numN) {
  if(numCll.length == 11){
    var numberCalc = numCll.substring(2,11);
    var numberCalc = numberCalc.split("-");
    if(numN > 0){
      if(numberCalc[1]==9999){
        numberCalc[0]++;
        numberCalc[1]=0000;
      }else{
        numberCalc[1]++;
      }
    }else{
      if(numberCalc[1]==9999){
        numberCalc[0]--;
        numberCalc[1]=0000;
      }else{
        numberCalc[1]--;
      }
    }
    numCll = "9 "+numberCalc[0]+"-"+numberCalc[1];
    $("#telefone").val(numCll);
    enviarMsg();
  }else{
     M.toast({ html: 'Digite um número para continuar'});
  }
}


function relogio(){
    hrAtual = new Date();
    hora = hrAtual.getHours();
    minuto = hrAtual.getMinutes();
    segundo = hrAtual.getSeconds();

    horaImprimivel = hora + " : " + minuto;

    $(".hrPreview").text(horaImprimivel);

    requestAnimationFrame(relogio);
}
relogio();
