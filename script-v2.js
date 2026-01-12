var numCll = "";
var mensage = "";
var ligar = false;

// Check localStorage properly.
var toggleFav = localStorage.getItem("tgFav") === "true";

// Helper to update UI based on state
function updateFavoriteUI() {
  if (toggleFav) {
    $("#toggleFavorite").html("<i class='material-icons'>star</i>");
  } else {
    $("#toggleFavorite").html("<i class='material-icons'>star_border</i>");
  }
}

function updatePreview() {
  var val = $("#telefone").val();
  // Update Phone preview text
  if (val) {
      $("#telefonePreview").text("+55 92 " + val);
  } else {
      $("#telefonePreview").text("+55 92 ");
  }

  // Update Message preview
  var msg = $("#msg").val();
  if (msg && msg.trim().length > 0) {
    $("#msgPreview").show().text(msg);
  } else {
    $("#msgPreview").hide();
  }
}

function enviarMsg() {
  numCll = "" + $("#telefone").val();
  mensage = $("#msg").val() || "";

  // WhatsApp Link
  // Using encodeURIComponent for message safety and stripping non-digits from phone
  var cleanNum = numCll.replace(/\D/g, '');
  var link = "https://api.whatsapp.com/send?phone=5592" + cleanNum + "&text=" + encodeURIComponent(mensage);
  var call = "tel:5592" + cleanNum;

  $("#enviarMsg").attr("href", link);
  $("#ligar").attr("href", call);
}

$(document).ready(() => {
  // Init UI
  updateFavoriteUI();
  $(".preloader").fadeOut();

  // Init Mask
  $('.celular').mask('0 0000-0000', { placeholder: "9 1234-1234" });

  // Bind Events
  $("#telefone").on('input change keyup paste', () => {
    numCll = "" + $("#telefone").val();
    updatePreview();
    enviarMsg();

    if (numCll.length === 11) {
      ligar = true;
    } else {
      ligar = false;
    }
  });

  // Keep separate change event for toast feedback
  $("#telefone").on('change', () => {
      if ($("#telefone").val().length != 11) {
          M.toast({ html: 'Numero incompleto!!' });
      }
  });

  $("#msg").on('input change keyup paste', () => {
    mensage = $("#msg").val();
    updatePreview();
    enviarMsg();
  });

  $("#msg").on('change', () => {
      if (!mensage || mensage.trim() === "") {
           M.toast({ html: 'Nenhuma mensagem definida!!' });
      }
  });

  $("#ligar").click((e)=>{
    var val = $("#telefone").val();
    if(val.length !== 11){
       M.toast({ html: 'Digite um número para continuar'});
    }
  });

  $("#toggleFavorite").click(()=>{
    toggleFav = !toggleFav;
    localStorage.setItem("tgFav", toggleFav);
    updateFavoriteUI();
  });

  // Initialize preview
  updatePreview();
  enviarMsg();
  relogio();
});

function proximo(numN) {
  numCll = $("#telefone").val();

  if(numCll.length == 11){
    // format "9 1234-1234"
    var numberStr = numCll.substring(2,11);
    var parts = numberStr.split("-"); // ["1234", "1234"]

    var prefix = parseInt(parts[0]);
    var suffix = parseInt(parts[1]);

    // Combine to handle math
    var fullNumber = prefix * 10000 + suffix;

    fullNumber += numN;

    if (fullNumber < 0) fullNumber = 0;
    if (fullNumber > 99999999) fullNumber = 99999999;

    var newPrefix = Math.floor(fullNumber / 10000);
    var newSuffix = fullNumber % 10000;

    var p1 = newPrefix.toString().padStart(4, '0');
    var p2 = newSuffix.toString().padStart(4, '0');

    numCll = "9 " + p1 + "-" + p2;

    $("#telefone").val(numCll).trigger('input');

  } else {
     M.toast({ html: 'Digite um número para continuar'});
  }
}

function relogio(){
    var hrAtual = new Date();
    var hora = hrAtual.getHours();
    var minuto = hrAtual.getMinutes();

    var horaImprimivel = hora.toString().padStart(2, '0') + ":" + minuto.toString().padStart(2, '0');

    $(".hrPreview").text(horaImprimivel);

    requestAnimationFrame(relogio);
}
