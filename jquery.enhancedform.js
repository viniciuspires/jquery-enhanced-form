;(function($){
    $.fn.enhancedform = function(options) {
        return this.each(function(){
            var $this = $(this);

            // Javascript arguments override data attributes that overrides default settings
            var settings = $.extend({
                // A function that executes while the form is submitting (expecting a function name)
                waiting:function(){},
                // Executes when obtained success in the request
                done:function(data) {},
                // Function for error handling
                error:function() {},
                // Function to execute everytime a request is finished
                after:function(jqXhr, textStatus) {},
                // The HTTP header "Accepts", defaults to json
                accepts:'json',
                // A JS Object mapping status codes
                status: {
                    // Status code examples
                    403:function(){},
                    404:function(){},
                    500:function(){}
                }
            }, $.extend( $this.data(), options) );

            // Binds an ajax submit handler
            $this.submit(function(e){
                e.preventDefault();
                var $this = $(this);

                if ( typeof settings.done == 'string' ) {
                    // Eval is evil, I know.
                    settings.done = eval(settings.done);
                }

                if ( typeof settings.waiting == 'string' ) {
                    settings.waiting = eval(settings.waiting);
                }
                
                // @todo Should be an object instead of a query string
                var formData = $this.serialize();

                $.ajax({
                    // Gets the standard "action" attribute to submit
                    url:        $this.attr('action'),
                    // Same thing with the "method" attribute, could be any HTTP method
                    type:       $this.attr('method'),
                    // HTTP "Accepts" header
                    dataType:   settings.accepts,
                    data:       formData,
                    success:    settings.done,
                    beforeSend: settings.waiting,
                    complete:   settings.after,
                    statusCode: settings.status
                });
            });

            // Checks if it is an Autosaved form
            if ( $this.attr('data-autosave') != undefined ) {
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