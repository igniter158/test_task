$(document).ready(function () {
    var blocks_quan = 1,
    blocks = new Array,
    default_link = "https://icon-library.com/images/upload-icon/upload-icon-10.jpg", 
    limit = 10,
    cyrilic = new RegExp(/^[\u0400-\u04ff -]+$/);

    $('#img').attr('src', default_link);
 
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

    function addBlock(){
        var img = $('#img').attr('src'),
                title = $('#title').val(),
                link = $('#link').val(),
                text = $('#text').val();
            if($('.blocks__block').length != 0){
                blocks_quan = $('.blocks__block').length;
            }
            $('#error_img').remove();
                
            blocks.push(
                {
                    "img": img,
                    "title": title,
                    "link": link,
                    "text": text 
                }
            );
                
            if(blocks_quan%limit != 0){
                appendBlock();
            } else {
                $('.show_more').addClass('show');
            }

            $('#create_block').trigger("reset");
            $('#img').attr('src', default_link);
    }

    function appendBlock(block_data) {
        if(!block_data){
            var block_data = blocks[blocks.length - 1];
        }
        
        var img = block_data.img,
            title = block_data.title,
            link = block_data.link,
            text = block_data.text;

        var new_block = $('<div class="blocks__block">' +
        '<a href="'+ link +'" class="blocks__block__link"">' +
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
        
        $('.preloader').addClass('preloader_active');
        $('.blocks').append(new_block);
        $('.preloader').removeClass('preloader_active');
    }

    function imageIsLoaded(e) {
        $('#img').attr("src", e.target.result);
    }

    $("#load_img").change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

    $('#title, #text').keyup(function () {
        if (!cyrilic.test($(this).val())) {
            $(this).val($(this).val().replace(/[^\u0400-\u04ff -]+$/, ''));
        }         

    });

    $('#create').on('click', function () {
        if ($('#img').attr('src') == default_link && !$('#error_img').length) {
            $('#img').addClass('error');
            $('.main__form__errors').append('<label id="error_img" class="error_img" >Загрузите файл. </label>');
        }
        if ($("#create_block").valid() && $('#img').attr('src') != default_link) {
             addBlock();
        } 
        
    });

    $('.loadMore').on('click', function(e){
        e.preventDefault();
        $('.preloader').addClass('preloader_active');
        var blocks_length = $('.blocks__block').length,
        x;
        for(x = blocks_length; x < blocks_length + limit; x++){
            if(blocks[x]){
            appendBlock(blocks[x]);
            } else {
                $('.preloader').removeClass('preloader_active');
                $('.show_more').removeClass('show');
                return
            }
        }

        $('.preloader').removeClass('preloader_active');
        if(!blocks[x])
            $('.show_more').removeClass('show');        
    });

});