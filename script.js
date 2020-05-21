// valores da tabela
var tabledata = [];
var idTable = 0;
var numCll = mensage = validation = "";
var ligar = false;
var toggleFav = localStorage.getItem("tgFav");
if (toggleFav == null) {
    toggleFav = false;
} else {
    toggleFav = true;
}
console.log(toggleFav);
if (toggleFav == true) {
    $("#toggleFavorite").html("<i class='material-icons'>star</i>");
} else {
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

    $("#ligar").click(() => {
        if (ligar == false) {
            M.toast({ html: 'Digite um número para continuar' });
        }
    });

    $("#toggleFavorite").click(() => {
        if (toggleFav == true) {
            $("#toggleFavorite").html("<i class='material-icons'>star_border</i>");
            localStorage.setItem("tgFav", false);
        } else {
            $("#toggleFavorite").html("<i class='material-icons'>star</i>");
            localStorage.setItem("tgFav", true);
        }
        toggleFav = localStorage.getItem("tgFav");
    });

    $(".preloader").hide();
});

function enviarMsg() {
    var link = "https://api.whatsapp.com/send?phone=5592" + numCll + "&text=" + mensage + " ";
    var call = "tel:+5592" + numCll;
    $("#enviarMsg").attr("href", link);
    $("#ligar").attr("href", call);
}

function proximo(numN) {

    if (numCll.length == 11) {
        var numberCalc = numCll.substring(2, 11);
        var numberCalc = numberCalc.split("-");
        if (numN > 0) {
            idTable++;
            if (numberCalc[1] == 9999) {
                numberCalc[0]++;
                numberCalc[1] = 0000;
            } else {
                numberCalc[1]++;
            }

            /* 
            numero
            cometario
            */

            //table.updateOrAddData([{ numero: "92 9 " + numberCalc[0] + "-" + numberCalc[1], cometario: "" }]);

            table.updateOrAddData([{ id: idTable, numero: "92 9 " + numberCalc[0] + "-" + numberCalc[1], cometario: "" }]);

        } else {
            idTable--;
            if (numberCalc[1] == 9999) {
                numberCalc[0]--;
                numberCalc[1] = 0000;
            } else {
                numberCalc[1]--;
            }
        }
        numCll = "9 " + numberCalc[0] + "-" + numberCalc[1];
        $("#telefone").val(numCll);
        enviarMsg();
    } else {
        M.toast({ html: 'Digite um número para continuar' });
    }
};

function relogio() {
    hrAtual = new Date();
    hora = hrAtual.getHours();
    minuto = hrAtual.getMinutes();
    segundo = hrAtual.getSeconds();

    horaImprimivel = hora + " : " + minuto;

    $(".time").text(horaImprimivel);

    requestAnimationFrame(relogio);
}
relogio();

$("#toggleDark").click(() => {
    $("body").toggleClass("dark");
});


// Tabela Create
var table = new Tabulator("#example-table", {
    data: tabledata, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 7, //allow 7 rows per page of data
    initialSort: [ //set the initial sort order of the data
        {
            column: "numero",
            dir: "dsc"
        },
    ],
    columns: [ //define the table columns
        {
            title: "ID",
            field: "id",
            width: 15,
            editor: "input"
        }, {
            title: "Número",
            field: "numero",
            width: 150,
            editor: "input"
        }, {
            title: "Cometário",
            field: "cometario",
            editor: "select",
            editorParams: {
                values: ["Inexistente", "Indisponível", "Mandar Link", "Ligar mais tarde"]
            }
        },
    ],
});

function baixarExcel() {
    table.download("xlsx", "lista11_20-05.xlsx", { sheetName: "Lista 11" });
}

function baixarPDF() {
    table.download("pdf", "data.pdf", {
        orientation: "portrait", //set page orientation to portrait
        autoTable: function(doc) {
            //doc - the jsPDF document object

            //add some text to the top left corner of the PDF
            doc.text("SOME TEXT", 1, 1);

            //return the autoTable config options object
            return {
                styles: {
                    fillColor: [200, 00, 00]
                },
            };
        },
    });
}