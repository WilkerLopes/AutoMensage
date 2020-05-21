// valores da tabela
var tabledata = [];
var idTable = 0;
var numCll = mensage = validation = "";
var ligar = false;

$(document).ready(() => {
    $(".preloader").hide();
    $('.modal').modal();

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

            table.updateOrAddData([{ id: idTable, numero: "92 9 " + numberCalc[0] + "-" + numberCalc[1] }]);

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
    var hora = new Date();

    horaAtual = hora.toLocaleTimeString();
    hA = horaAtual.split(":");
    horaAtual = hA[0] + ":" + hA[1];

    $(".time").text(horaAtual);

    requestAnimationFrame(relogio);
}

function dataAtual() {
    var data = new Date();

    dataAtual = data.toLocaleDateString();
    dA = dataAtual.split("/");
    dataAtual = dA[2] + "/" + dA[1] + "/" + dA[0];
    dataPrint = dA[0] + "-" + dA[1] + "-" + dA[2];

    $("#currentDate").val(dataAtual);
}

dataAtual();
relogio();


// Tabela Create
var table = new Tabulator("#table-historico", {
    data: tabledata, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 5, //allow 7 rows per page of data
    rowFormatter: function(row) {
        if (row.getData().id == "3") {
            row.getElement().classList.add("warning"); //mark rows with age less than 18 with a warning state;
        }
    },
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
            width: 100
        }, {
            title: "Número",
            field: "numero",
            width: 200,
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
    let nameList = $("#numLista").val();
    if (nameList != null || nameList != "") {
        table.download("xlsx", nameList + "_" + dataPrint + ".xlsx", { sheetName: nameList });
    }
}

function baixarPDF() {
    table.download("pdf", nameList + "_" + dataPrint + ".pdf", {
        orientation: "portrait",
        autoTable: function(doc) {
            doc.text(nameList, 1, 1);
        },
    });
}

var toggleOpem = 0;

function historico() {
    $(".historico").toggleClass("opem");

    if (toggleOpem == 0) {
        $(".iconToggle").css({ "transform": "rotate(180deg)" });
        toggleOpem = 1;
    } else {
        $(".iconToggle").css({ "transform": "rotate(0deg)" });
        toggleOpem = 0;
    }
}