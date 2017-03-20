$(document).ready(function(){

  // $('.edit-person').click(function(){
  //     $('#edit-form-name').val($(this).data.('name'));
  //     $('#edit-form-favoritecity').val($(this).data.('favoritecity'));
  //     $('#edit-form-id').val($(this).data('id'));
  // });

  $('.delete-person').on('click', function(){
    var id = $(this).data('id');
    var url = '/delete/'+id;
    if(confirm('Delete Person?')){
      $.ajax({
        url: url,
        type:'DELETE',
        success: function(result){
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
          }
      });
    }
  });

});
