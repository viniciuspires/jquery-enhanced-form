(function($){
    $.fn.enhancedform = function(options) {

        return this.each(function(){
            var $this = $(this);

            var settings = $.extend({
                waiting:function() {
                    $this.find('button[type=submit]')
                        .html('Salvando...').addClass('disabled');
                },
                done:function(data) {
                    console.log(data);

                    var alertClassMap = {
                        ok:'success',
                        error:'alert',
                        'undefined':''
                    };

                    MessageBroker.sendMessage(alertClassMap[data.tipo], data.mensagem);
                },
                error:function() {

                },
                after:function(jqXhr, textStatus){
                    $this.find('button[type=submit]')
                        .removeClass('disabled')
                        .html('Salvar');
                    console.log(jqXhr, textStatus);
                },
                statusMap:{
                    404:function(){
                        MessageBroker.sendMessage( 'alert', 'Página do servidor não encontrada.' );
                    },
                    500:function(){
                        MessageBroker.sendMessage( 'alert', 'Ocorreu um erro interno no servidor. Entre em contato com o administrador.');
                    }
                }
            }, options);

            $this.submit(function(e){
                e.preventDefault();

                var action  = $(this).attr('action');
                var method  = $(this).attr('method');
                var accepts = $(this).data('accepts');

                var waitingFunction = settings.waiting;
                if ( $this.data('waiting') != undefined ) {
                    var waitingFunction = eval($(this).data('waiting'));
                }

                var callback = settings.done;
                if ( $this.data('done') != undefined ) {
                    var callback = eval( $(this).data('done') );
                }
                
                var dataHashMap = $this.serialize();

                console.log("Sending to '"+action+"' via "+method.toUpperCase()+":", dataHashMap);

                $.ajax({
                    url:action,
                    type:method,
                    dataType:accepts,
                    data:dataHashMap,
                    success:callback,
                    beforeSend:waitingFunction,
                    complete:settings.after,
                    statusCode:settings.statusMap
                });

            });

            if ( $this.data('autosave') != undefined ) {
                var callback = function(e){
                    var id = $this.data('autosaveId');

                    if ( id != "" || id != undefined ) {
                        window.clearTimeout(id);
                    }

                    var timeout = $this.data('autosaveTimer');
                    if ( timeout == null || timeout == "" ) {
                        timeout = 2000;
                    }

                    var newId = window.setTimeout(function(obj){
                        $(obj).submit();
                    }, timeout, $this);

                    $this.data('autosaveId', newId);
                };

                $this.change(callback).keyup(callback);
            }            
        });
    };
}(jQuery));