;(function($){
    $.fn.enhancedform = function(options) {
        return this.each(function(){
            var $this = $(this);

            var settings = $.extend({
                waiting:function() {},
                done:function(data) {},
                error:function() {},
                after:function(jqXhr, textStatus) {},
                status: {
                    // Examples
                    403:function(){},
                    404:function(){},
                    500:function(){}
                }
            }, $.extend( $this.data(), options) );

            $this.submit(function(e){
                e.preventDefault();

                var $this = $(this);

                var action  = $this.attr('action');
                var method  = $this.attr('method');
                var accepts = $this.data('accepts');

                var waiting = settings.waiting;
                if ( $this.data('waiting') != undefined ) {
                    waiting = eval($this.data('waiting'));
                }

                var callback = settings.done;
                if ( $this.data('done') != undefined ) {
                    callback = eval( $this.data('done') );
                }
                
                var formData = $this.serialize();

                $.ajax({
                    url:action,
                    type:method,
                    dataType:accepts,
                    data:formData,
                    success:callback,
                    beforeSend:waiting,
                    complete:settings.after,
                    statusCode:settings.status
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

                $this.on('change keyup', callback);
            }            
        });
    };
}(jQuery));