$(document).ready(function () {
    var new_block=new Array,
    limit = 10;


    $('#load_img').on('change', function () {
        if (this.files[0]) {
            var fr = new FileReader();
            fr.addEventListener("load", function () {
                $('#img').attr("src", fr.result);
                $('#img').removeClass('error');
            }, false);
            fr.readAsDataURL(this.files[0]);
        }
    });


    $('#title, #text').keyup(function () {
        if (!this.value.match(/^[\u0400-\u04ff]+$/)) {
            this.value = this.value.replace(/[^\u0400-\u04ff]/g, '')
                }         

    });


    $("#create_block").validate({
        rules: {
            title: {
                required: true,
                maxlength: 20,
            },
            text: {
                required: true,
                maxlength: 250,
            },
        },
        messages: {
            title: {
                required: "Поле 'Заголовок' обезательное",
                maxlength: "Максимальное число символов - 20",
            },
            text: {
                required: "Поле 'Сообщение' обезательное",
                maxlength: "Максимальное число символов - 250",
            }
        },
        errorPlacement: function (error) {
            $('.main__form__errors').append(error);
        },

    });



    $('#create').on('click', function () {
        if ($('#img').attr('src') == 'https://icon-library.com/images/upload-icon/upload-icon-10.jpg') {
            $('#img').addClass('error');
        } else {
            if ($("#create_block").valid()) {
                var img = $('#img').attr('src'),
                    title = $('#title').val(),
                    link = $('#link').val(),
                    text = $('#text').val();

                new_block.push('<div class="blocks__block">' +
                    '<a href="" class="blocks__block__link"' + link + '">' +
                    '<div class="blocks__block__wrap">' +
                    '<div class="blocks__block__img">' +
                    '<img src="' + img + '">' +
                    '</div>' +
                    '<div class="blocks__block__title">' +
                    '<p>' + title + '</p>' +
                    '</div>' +
                    '<div class="blocks__block__text">' +
                    '<p>' + text + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>');


                
                addBlock();
                
            } 
        }  
        
    });

    function addBlock() {
        if (new_block.length < limit){
            $('.blocks__block').each(function(){
                $(this).remove();
            });
            $.each( new_block, function( key, value ) {
                $('.blocks').append(new_block[key]);
            });
        } else {
            $('.show_more').addClass('show');
        }
    }

    $('.loadMore').on('click', function(e){
        e.preventDefault();
        limit += limit-1;
        addBlock();
        $('.show_more').removeClass('show');

    });

});