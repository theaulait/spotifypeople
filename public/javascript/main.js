$(document).ready(function(){

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

$('.edit-person').on('click', function(){
      $('#edit-form-name').val($(this).data.('name'));
      $('#edit-form-favoritecity').val($(this).data.('favoritecity'));
  })

});
