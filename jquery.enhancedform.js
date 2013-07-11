;(function($){
    $.fn.enhancedform = function(options) {
        return this.each(function(){
            var $this = $(this);

            var settings = $.extend({
                waiting:function(){},
                done:function(data) {},
                error:function() {},
                after:function(jqXhr, textStatus) {},
                accepts:'json',
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

                if ( typeof settings.done == 'string' ) {
                    settings.done = eval(settings.done);
                }

                if ( typeof settings.waiting == 'string' ) {
                    settings.waiting = eval(settings.waiting);
                }
                
                var formData = $this.serialize();

                $.ajax({
                    url:        $this.attr('action'),
                    type:       $this.attr('method'),
                    dataType:   settings.accepts,
                    data:       formData,
                    success:    settings.done,
                    beforeSend: settings.waiting,
                    complete:   settings.after,
                    statusCode: settings.status
                });

            });

            if ( $this.data('autosave') != undefined ) {
                $this.on('change keyup', function(e){
                    var id = $this.data('autosaveId');

                    if ( id != "" || id != undefined ) {
                        window.clearTimeout(id);
                    }

                    var timeout = parseInt( $this.data('autosaveTimer') );
                    if ( timeout == null || timeout == 0 ) {
                        timeout = 2000;
                    }

                    var newId = window.setTimeout(function(obj){
                        $(obj).submit();
                    }, timeout, $this);

                    $this.data('autosaveId', newId);
                });
            }
        });
    };
}(jQuery));