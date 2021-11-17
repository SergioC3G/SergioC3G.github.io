/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    
    $(document).on('click', '#datagrid-body tr', function () {

        var id = $(this).data("id");
        //alert("ID:"+id);
        if ($(this).hasClass("selecionado") == true) {
            $(this).removeClass("selecionado");
            $("#checkbox" + id).prop('checked', false);
        } else {
            $("tr").removeClass("selecionado");
            $("tr input:checked").prop('checked', false);
            $(this).addClass("selecionado");
            $("#checkbox" + id).prop('checked', true);
        }
        event.stopPropagation();
    });

    $(document).on('click', '.upcontrato', function () {
        
        if ($("tr").hasClass("selecionado") == false) {
            var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',tabela);
            $(popupTemplate).modal();
            return;
        }
        
        var existdoc = $("body").find('input:checkbox:checked').data("pdf");
        if(existdoc!=0){
            var popupTemplate = responsepop('','Já existe um documento arquivado para este contrato',tabela);
            $(popupTemplate).modal();
            return;
        }
        //alert(existdoc);
        
        var tabela = $(this).data("role");

        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var doc_id = $("body").find('input:checkbox:checked').data("doc");
        
        
        
        //console.log(cad_id + ' : ' + doc_id)
        $('<div></div>').appendTo('#dconteudo')
        .html('<div class="col-md-12"><div class="row"><div class="col-md-12"><input type="file" id="doc_upload" name="doc_upload" accept=".pdf"></div></div></div>')
        .dialog({
          modal: true, title: 'Fazer Upload do Contrato Assinado', zIndex: 10000, autoOpen: true,
          width: 'auto', resizable: false, draggable: false,
          buttons: {
              "Salvar": function () {
                  //doFunctionForYes();
                  var documento =$(this).dialog().find('#doc_upload').prop('files')[0];
                  //console.log(documento);
                  $(this).dialog("close");
                  var form_data = new FormData();                  
                  form_data.append('doc', documento);
                  form_data.append('protocolo', doc_id);
                  //alert(form_data);
                  $.ajax({
                    url: '../resources/extras.php?docupload', // point to server-side PHP script 
                    dataType: 'text',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    success: function(msg){
                        var popupTemplate = responsepop('',msg,tabela);
                        $(popupTemplate).modal();
                        return;
                    }
                });
              }
          },
          open: function (event, ui) {

          },
          close: function (event, ui) {
              $(this).remove();
          }
        });
    });
    
    $(document).on('click', '.upccpg, .upccrb', function () {
        
        if ($("tr").hasClass("selecionado") == false) {
            var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',tabela);
            $(popupTemplate).modal();
            return;
        }
        
        var existdoc = $("body").find('input:checkbox:checked').data("pdf");
        if(existdoc!=0){
            var popupTemplate = responsepop('','Já existe um documento arquivado para este contrato',tabela);
            $(popupTemplate).modal();
            return;
        }
        //alert(existdoc);
        
        var tabela = $(this).data("role");

        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var doc_id = $("body").find('input:checkbox:checked').data("doc");
        
        
        
        //console.log(cad_id + ' : ' + doc_id)
        $('<div></div>').appendTo('#dconteudo')
        .html('<div class="col-md-12"><div class="row"><div class="col-md-12"><input type="file" id="doc_upload" name="doc_upload" accept=".pdf"></div></div></div>')
        .dialog({
          modal: true, title: 'Fazer Upload do Comprovante', zIndex: 10000, autoOpen: true,
          width: 'auto', resizable: false, draggable: false,
          buttons: {
              "Salvar": function () {
                  //doFunctionForYes();
                  var documento =$(this).dialog().find('#doc_upload').prop('files')[0];
                  //console.log(documento);
                  $(this).dialog("close");
                  var form_data = new FormData();                  
                  form_data.append('doc', documento);
                  form_data.append('protocolo', doc_id);
                  //alert(form_data);
                  $.ajax({
                    url: '../resources/extras.php?cpupload', // point to server-side PHP script 
                    dataType: 'text',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    success: function(msg){
                        var popupTemplate = responsepop('',msg,tabela);
                        $(popupTemplate).modal();
                        return;
                    }
                });
              }
          },
          open: function (event, ui) {

          },
          close: function (event, ui) {
              $(this).remove();
          }
        });
    });
    
    $(document).on('click', '.newrecord, .viewrecord', function () {

        var tabela = $(this).data("role");

        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var dados = '';
        if ($(this).hasClass("newrecord")) {
            var action = 'novo';
            var url = tabela + '.php?forminsert';
            dados = {role: tabela};
        }
       if ($(this).hasClass("viewrecord")) {
           if ($("tr").hasClass("selecionado") == false) {
                var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',tabela);
                $(popupTemplate).modal();
                return;
            }
            var action = 'visualiza';
            var url = tabela + '.php?formupdate&id=' + cad_id + '&viewonly=sim';
        }
        
        $("#dashboard").hide();
        $("#dconteudo").load("resources/views/" + url,function(){
           $('.percent').mask('##0,00', {reverse: true});
        });


    });
    
    $(document).on('click', '.altrecord, .delrecord', function () {

        var tabela = $(this).data("role");

        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var dados = '';
        if ($(this).hasClass("altrecord")) {
            var action = 'altera';
            var url = tabela + '.php?formupdate&id=' + cad_id;
        }
        if ($(this).hasClass("delrecord")) {
            var action = 'deleta';
            var url = tabela + '.php?delete&id=' + cad_id;
            
        }

        if (action == 'altera' || action == 'deleta' || action == 'visualiza') {
            if ($("tr").hasClass("selecionado") == false) {
                var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',tabela);
                $(popupTemplate).modal();
                return;
            }else{
                $('<div></div>').appendTo('#dconteudo')
            .html('<div class="col-md-12"><div class="row"><div class="col-md-3"></div><div class="col-md-6"><input class="form-control" type="password" name="authpassword" id="authpassword" value=""></div><div class="col-md-3"><span class="mytooltip" data-toggle="tooltip" style="cursor:pointer;" title="Use o Google Authenticator para obter seu código">?</span></div></div></div>')
            .dialog({
              modal: true, title: 'Digite o código de autorização', zIndex: 10000, autoOpen: true,
              width: 'auto', resizable: false, draggable: false,
              buttons: {
                  "Ok": function () {
                      //doFunctionForYes();
                      var senha=$(this).dialog().find('input[name="authpassword"]').val();
                      $(this).dialog("close");
                      $.ajax({
                        type: "POST",
                        url: "../resources/extras.php",
                        data: {'senha': senha, 'authorizeaction': 'sim'},
                        beforeSend: function () {
                            //$("#resultado").html("processando...");
                        }
                      }).done(function (msg) {
                        console.log(msg);
                        if(msg.indexOf("Autorizado") > -1){
                            $("#dashboard").hide();
                            $("#dconteudo").load("resources/views/" + url,function(){
                               $('.percent').mask('##0,00', {reverse: true});
                            });
                        }else{
                            var popupTemplate = responsepop('Atenção',msg,url);
                            $(popupTemplate).modal();
                            return;
                        }
                      });
                  }
              },
              open: function (event, ui) {
                  
              },
              close: function (event, ui) {
                  $(this).remove();
              }
            });
            }
        }
    });
    
    $(document).on('click', '#cancelback', function (e) {
        e.preventDefault();
        var url = $(this).data("role");
        $('.menuoption[data-url="' + url + '"]').get(0).click();
    });

    $(document).on('click', '.menuoption', function () {

        if( $('.tmpmodal')[0]){
            $('.tmpmodal').remove();
            $('.modal-backdrop').remove();
        }
        
        var url = $(this).data("url");

        if (url == "dashboard" || typeof (url) == "undefined") {
            location.href = "/";
            return false;
        }

        $("#dashboard").hide();

        $("#dconteudo").load("resources/views/" + url + ".php");

    });

    $(document).on('click', '.pickpage', function () {
        var page = $(this).data("page");
        var url = $(this).data("role");
        var num_results_on_page = $("#num_results_on_page").val();

        $("#dconteudo").load("resources/views/" + url + ".php?pagenumber=" + page + "&num_results_on_page=" + num_results_on_page);

    });

    $(document).on('change', '#num_results_on_page', function () {
        var page = '1';
        var url = $(this).data("role");
        var num_results_on_page = $("#num_results_on_page").val();

        $("#dconteudo").load("resources/views/" + url + ".php?pagenumber=" + page + "&num_results_on_page=" + num_results_on_page);

    });

    $(document).on('click', '#pesquisar', function () {

        var url = $(this).data("role");
        var num_results_on_page = $("#num_results_on_page").val();
        var page = '1';
        $("#dconteudo").load("resources/views/" + url + ".php?pagenumber=" + page + "&num_results_on_page=" + num_results_on_page, $('#search-form').serializeArray());
    });

    $(document).on('click', '#saveforminsert', function (e) {
        e.preventDefault();
        var url = $(this).data("role");
        //alert(url);
        $("#dconteudo").load("resources/views/" + url + ".php?insert=sim", $('#forminsert').serializeArray());
    });

    $(document).on('click', '#saveformupdate', function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var url = $(this).data("role");
        //alert(url);
        $("#dconteudo").load("resources/views/" + url + ".php?update=sim&id=" + id, $('#formupdate').serializeArray());
    });

    $(document).on('click', '#cancelback', function (e) {
        e.preventDefault();
        var url = $(this).data("role");
        $('.menuoption[data-url="' + url + '"]').get(0).click();
    });

    $(document).on('click', '.printgrid', function () {
        var url = $(this).data("role");
        $('#search-form').attr('method', 'post');
        $('#search-form').attr('action', 'resources/print/' + url + '.php');
        $('#search-form').attr('target', '_blank');
        $('#search-form').submit();
        //window.open("resources/print/" + url + ".php", 'Impressão');
        //document.getElementById('search-form').submit();
    });

    $(document).on("focus keyup", "input.clinamesearch", function (event) {
        
        $(this).autocomplete({
            source: function (request, response) {
                var getUrl = window.location;
                var baseUrl = getUrl .protocol + "//" + getUrl.host;
                // Fetch data
                $.ajax({
                    url: baseUrl + "/resources/extras.php?clinamesearch",
                    type: 'post',
                    dataType: "json",
                    data: {
                        search: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },
            select: function (event, ui) {
                // Set selection
                $('#clinamesearch').val(ui.item.label); // display the selected text
                $('#selectuser_id').val(ui.item.value); // save selected id to input
                //console.log(ui.item.value);
                return false;
            },
            focus: function (event, ui) {
                $("#clinamesearch").val(ui.item.label);
                $("#selectuser_id").val(ui.item.value);
                if($("#geradorpromissoria").length){
                    $("#cpf_pagador").val(ui.item.cpf);
                    $("#rg_pagador").val(ui.item.rg);
                    $("#endereco_pagador").val(ui.item.ender);
                }
                
                return false;
            },
            open: function () {
                $(this).autocomplete('widget').css('z-index', 9000);
                return false;
            },
        });
    });

    $(document).on("change", "#parcelas", function () {
        //
        $("#resultado").css({"color": '#000'});

        var parcela = $("option:selected", this).val();
        var valorTotal = $("#valorTotal").val();
        if (parcela > 0 && valorTotal != "") {
            geraParcelas();
        } else if (parcela == 0) {
            $("#resultado").css({"color": '#ff0000'}).html("Selecione uma parcela para o cálculo");
        } else {
            $("#resultado").css({"color": '#ff0000'}).html("Informe um valor para o cálculo");
        }
    });
    
    $(document).on("click", ".checkrecord", function () {
        var url = $(this).data("role");
        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var valor  = $("#cval" + cad_id).html();
        var rowcontat = $("#rowcontat" + cad_id).val();
        if ($("tr").hasClass("selecionado") == false) {
            
            var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',url);
            $(popupTemplate).modal();
            return;
        }
        $('<div></div>').appendTo('#dconteudo')
            .html('<div class="col-md-12"><div class="row"><div class="col-md-6"><label>Data Baixa</label><input class="form-control" type="date" name="quita" id="quita" value="2021-08-04"></div><div class="col-md-6" id="dyncontat"></div></div></div>')
            .dialog({
              modal: true, title: 'Confirme a baixa', zIndex: 10000, autoOpen: true,
              width: 'auto', resizable: false, draggable: false,
              buttons: {
                  "Sim": function () {
                      //doFunctionForYes();
                      var quita=$(this).dialog().find('input[name="quita"]').val();
                      var conta=$(this).dialog().find('select[name="contat"]').val();
                      $(this).dialog("close");
                      $("#dconteudo").load("resources/views/" + url + ".php?quitar=sim&quita=" + quita + "&contat=" + conta + "&id=" + cad_id + "&valor=" + valor);
                  },
                  "Não": function () {
                      //doFunctionForNo();
                      $(this).dialog("close");
                  }
              },
              open: function (event, ui) {
                  $('#dyncontat').load("../resources/extras.php?getcontat&verify="+rowcontat);
              },
              close: function (event, ui) {
                  $(this).remove();
              }
        });
    });
    
    $(document).on("click", ".uncheckrecord", function () {
        var url = $(this).data("role");
        var cad_id = $("body").find('input:checkbox:checked').data("id");
        var valor  = $("#cval" + cad_id).html();
        var rowcontat = $("#rowcontat" + cad_id).val();
        if ($("tr").hasClass("selecionado") == false) {
            
            var popupTemplate = responsepop('Atenção','Você precisa selecionar um registro primeiro',url);
            $(popupTemplate).modal();
            return;
        }
        $('<div></div>').appendTo('#dconteudo')
            .html('<div class="col-md-12"><div class="row"><div class="col-md-12">Confirme o estorno</div></div></div>')
            .dialog({
              modal: true, title: 'Atenção', zIndex: 10000, autoOpen: true,
              width: 'auto', resizable: false, draggable: false,
              buttons: {
                  "Confirmar": function () {
                      //doFunctionForYes();
                      
                      var conta=$(this).dialog().find('select[name="contat"]').val();
                      $(this).dialog("close");
                      $("#dconteudo").load("resources/views/" + url + ".php?estornar=sim&contat=" + rowcontat + "&id=" + cad_id + "&valor=" + valor);
                  },
                  "Voltar": function () {
                      //doFunctionForNo();
                      $(this).dialog("close");
                  }
              },
              close: function (event, ui) {
                  $(this).remove();
              }
        });
    });
    
    $(document).on('change','#nfupload, #crtupload, #crlvupload', function() {
        var typeget = $(this).attr('id');
        console.log(typeget);
        if(!$("#placa").val()){
            var popupTemplate = responsepop('Atenção','Você precisa precisa preencher a placa do veículo','veiculos');
            $(popupTemplate).modal();
            $("#placa").focus();
            return;
        } else {
        var file_data = $('#'+typeget).prop('files')[0]; 
        var placa = $('#placa').val();
        var form_data = new FormData();                  
        form_data.append('file', file_data);
        form_data.append('placa', placa);
        alert(form_data);                             
        $.ajax({
            url: 'resources/extras.php?'+typeget, // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            success: function(php_script_response){
                alert(php_script_response); // display response from the PHP script, if any
            }
        });
    }
    });
    
});

function geraParcelas() {
    var parcela = $("#parcelas").val();
    var valorTotal = $("#valorTotal").val();
    var data = $("#data").val();
    $.ajax({
        type: "POST",
        url: "../resources/datagridget.php?calcularparcelas",
        data: {'parcela': parcela, 'valorTotal': valorTotal, 'data': data},
        beforeSend: function () {
            $("#resultado").html("processando...");
        }
    }).done(function (msg) {
        $("#resultado").html(msg);
        $('.money').mask('000000000,00', {reverse: true});
        // aplica máscara
        //$('.vlrParcela').mask('000.000.000,00', {reverse: true});

        // blur - recalcula
        //$("table").on("blur", "input", function () {
        //recalculaParcelas();
        //});

    });
}

function getBaseUrl() {
    var re = new RegExp(/^.*\//);
    return re.exec(window.location.href);
}

function responsepop(title,message,role){
    var alert ='';
    alert += '<div class="modal fade tmpmodal" style="color:darkslategray;">';
    alert += '   <div class="modal-dialog">';
    alert += '    <div class="modal-content" style="border: 1px solid #c5c5c5;">';
    alert += '      <div class="modal-body"/>';
    alert += '        <h4 class="text-center">' + title + '</h4>';
    alert += '         <div style="width:100%;margin-top:20px;margin-bottom:20px;" class="text-center">' + message + '</div>';
    alert += '      <div class="text-center">';
    alert += '        <button type="button" class="btn btn-sm btn-primary tmpbutton" data-dismiss="modal" data-url="' + role +'">OK</button>';
    alert += '      </div>';
    alert += '    </div>';
    alert += '  </div>';
    alert += '</div>';
    
    return alert;
}