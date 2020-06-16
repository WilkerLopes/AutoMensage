// valores da tabela
var tabledata = [];
var idTable = 0;
var numCll = mensage = validation = "";
var ligar = false;

$(document).ready(() => {
    $(".preloader").hide();
    $('.modal').modal();
    $('.datepicker').datepicker();
    dataAtual();
    relogio();

    $('.celular').mask('0 0000-0000', { placeholder: "9 1234-1234" });
    $('.data').mask('00/00/0000');

    $("#msgPreview").hide();
});


$("#telefone").change(() => {
    numCll = "" + $("#telefone").val();
    if (numCll.length != 11) {
        M.toast({ html: 'Numero incompleto!!' });
    } else {
        enviarMsg(1);
        ligar = true;
    };
});

$("#telefone").keyup(() => {
    numCll = "" + $("#telefone").val();
    $("#telefonePreview").text("+55 92 " + numCll);
    if (numCll.length == 11) {
        enviarMsg(1);
        ligar = true;
    } else {
        enviarMsg(0)
        ligar = false;
    }
});

$("#msg").change(() => {
    mensage = $("#msg").val();
    if (mensage == null || mensage == "" || mensage == " " || mensage == "  " || mensage == "   " || mensage == "    ") {
        M.toast({ html: 'Nenhuma mensagem definida!!' });
        $("#msgPreview").hide();
    };
    enviarMsg(1);
});

$("#msg").keyup(() => {
    mensage = "" + $("#msg").val();
    $("#msgPreview").show().text(mensage);
    enviarMsg(1);
});

$("#ligar").click(() => {
    if (ligar == false) {
        M.toast({ html: 'Digite um número para continuar' });
    }
});


function enviarMsg(cond) {
    if (cond == 1) {
        var link = "https://api.whatsapp.com/send?phone=5592" + numCll + "&text=" + mensage + " ";
        var call = "tel:+5592" + numCll;
        $("#enviarMsg").attr("href", link);
        $("#ligar").attr("href", call);
    } else {
        var link = "";
        var call = "";
        $("#enviarMsg").removeAttr("href");
        $("#ligar").removeAttr("href");
    }
}

function proximo(numN) {
    if (numCll.length == 11) {
        var numberCalc = numCll.substring(2, 11);
        var numberCalc = numberCalc.split("-");
        if (numN > 0) {
            idTable++;

            tableView.updateOrAddData([{ id: idTable, numero: "92 9 " + numberCalc[0] + "-" + numberCalc[1] }]);
            table.updateOrAddData([{ id: idTable, numero: "92 9 " + numberCalc[0] + "-" + numberCalc[1] }]);

            if (numberCalc[1] == 9999) {
                numberCalc[0]++;
                numberCalc[1] = 0000;
            } else {
                numberCalc[1]++;
            }

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
        enviarMsg(1);
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

    $("#dateVeiw").val(dataAtual).toggleClass("valid");
    $("#dateViewBox label").toggleClass("active");
}

// Tabela de Vizualização
var tableView = new Tabulator("#table-view", {
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 6,
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
            width: 50,
            responsive: 1
        }, {
            title: "Número",
            field: "numero",
            width: 120,
            editor: "input",
            responsive: 0
        }, {
            title: "Comentário",
            field: "cometario",
            editor: "select",
            editorParams: {
                values: ["Inexistente", "Indisponível", "Mandar Link", "Ligar depois", "Desligou", "Criança", "Revisita", "Não aceitou mensagem","Ocupado","Não aceitou link","O morador leu o texto","Não tem Whatsapp"]
            },
            responsive: 0
        },
    ],
});
// Tabela de Historico
var table = new Tabulator("#table-historico", {
    data: tabledata, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    pagination: "local", //paginate the data
    paginationSize: 6,
    initialSort: [ //set the initial sort order of the data
        {
            column: "numero",
            dir: "asc"
        },
    ],
    columns: [ //define the table columns
        {
            title: "ID",
            field: "id",
            width: 75
        }, {
            title: "Número",
            field: "numero",
            width: 200
        }, {
            title: "Comentário",
            field: "cometario"
        },
    ],
});

function baixarExcel() {
    let nameList = $("#numLista").val();
    if (nameList == null || nameList == ""|| nameList == " "|| nameList == "   ") {
        M.toast({ html: 'Defina a lista' });
    } else {
        table.download("xlsx", "Lista" + nameList + "_" + dataAtual + ".xlsx", { sheetName: "Lista" + nameList });
    }
}

function baixarPDF() {
    let nameList = $("#numLista").val();
    if (nameList == null || nameList == ""|| nameList == " "|| nameList == "   ") {
        M.toast({ html: 'Defina a lista' });
    } else {
        table.download("pdf", "Lista" + nameList + "_" + dataAtual + ".pdf", {
            orientation: "portrait",
        });
    }
    
}

function historico() {
    $(".historico").toggleClass("opem");
    $(".iconToggle").toggleClass("opem");
    console.log(idTable);
    for (let cont = 1; cont <= idTable; cont++) {
        let idRow = tableView.getRow(cont).getData().id;
        let numberRow = tableView.getRow(cont).getData().numero;
        let comentRow = tableView.getRow(cont).getData().cometario;
        table.updateOrAddData([{ id: idRow, cometario: comentRow }]);
    }
}

function selectMsg(numberMsg) {
    let msg = $("#mensage" + numberMsg).text();
    $("#msg").val(msg);
    $("#msgPreview").show().text(msg);
    mensage = "" + msg;
    enviarMsg(1);
}
