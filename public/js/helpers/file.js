var WARSHARK = typeof WARSHARK !== 'undefined' ? WARSHARK : {};

$(function() {

    WARSHARK.file = function() {

        function bindFileInputs(){
            $('input[type=file]').each(function(){
                var $this = $(this);
                    
                $this.parent().prepend($('<div class="control-group fake-map" />').append($('<input type="text" value="Select a Map" />').attr('id',$(this).attr('id')+'-fake')));
                $this.addClass('file').wrap('<span>').parent().addClass('hidden');
                
                var $fakeFileInput = $('#' + $this.attr('id') + '-fake');

                $fakeFileInput.bind('click change', function() {
                    var $this = $(this);
                    var fileID = $(this).attr('id').replace('-fake',''),
                        $fileInput = $('#' + fileID);

                    $fileInput.unbind('change').trigger('click');

                    $fileInput.change(function(){
                        $fakeFileInput.val($fileInput.val());
                    });
                });
            });
        }

        return {
            bindInputs : bindFileInputs
        }

    } 

});