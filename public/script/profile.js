$(document).ready(function(){
    $('.add_task').click(function(){
        $(this).toggleClass('add_task_animation');
        $('.add_task_box').delay(1000).fadeToggle();
    });
});