
$(document).ready(function(){
    $(document).on('click', '.add_button', function () { 
        current_div = $(this).closest('.form-group');
        var new_field = $('#phone_extra_field').children();
        $(new_field).clone().insertAfter(current_div);

    });

    $(document).on('click', '.remove_button', function () { 
        if($('.profile-head .phone_class').length > 1){
            current_div = $(this).closest('.form-group');
            current_div.remove();
        }
    });
});