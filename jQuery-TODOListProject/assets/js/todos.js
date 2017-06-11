// Check specific TODOS by clicking

$("ul").on("click","li" ,function(){
	$(this).toggleClass("completed");
});

// CLick on X to delete TODO

$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();

});

$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		var newTodo = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> "+newTodo+"</li>")
	}
});

$(".fa-calendar-plus-o").click(function(){
	$("input[type='text'").fadeToggle();
});