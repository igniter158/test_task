$(document).ready(function () {
    var new_block,
    quan=0,

    hidden_blocks = new Array,
    default_link = "https://icon-library.com/images/upload-icon/upload-icon-10.jpg", 
    limit = 9;
 
    $('#img').attr('src', default_link);

    $('#load_img').on('change', function () {
        if (this.files[0]) {
            var fr = new FileReader();
            fr.addEventListener("load", function () {
                $('#img').attr("src", fr.result);
                $('#img').removeClass('error');
                $('#error_img').remove();
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
        if ($('#img').attr('src') == default_link && !$('#error_img').length) {
            $('#img').addClass('error');
            $('.main__form__errors').append('<label id="error_img" class="error_img" >Загрузите файл. </label>');
        }
        if ($("#create_block").valid() && $('#img').attr('src') != default_link) {
            var img = $('#img').attr('src'),
                title = $('#title').val(),
                link = $('#link').val(),
                text = $('#text').val();
                
            $('#error_img').remove();
                

            new_block = $('<div class="blocks__block">' +
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

            quan++;
            addBlock();
            $('#create_block').trigger("reset");
            $('#img').attr('src', default_link);
        } 
        
    });

    function addBlock() {
        if (quan <= limit){
            $('.preloader').addClass('preloader_active');
            $('.blocks').append(new_block);
            $('.preloader').removeClass('preloader_active');
        } else {
            hidden_blocks.push(new_block);
            $('.show_more').addClass('show');
        }
    }

    $('.loadMore').on('click', function(e){
        e.preventDefault();
        var x;
        $('.preloader').addClass('preloader_active');
        for(x = 0;hidden_blocks.length;x++){
            if(x<limit){
            $('.blocks').append(hidden_blocks[0]);
            hidden_blocks.splice(0, 1);
            } else {
                $('.preloader').removeClass('preloader_active');
                return
            }
        }
        $('.preloader').removeClass('preloader_active');
        quan = x;
        $('.show_more').removeClass('show');
        
    });

});