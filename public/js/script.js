$(document).ready(function () {

    //scroll bar
    //$("html").niceScroll();
    //$("body").niceScroll({scrollspeed: 60, mousescrollstep: 60});
    $(".allImages").niceScroll({railalign: 'left', railpadding: {top: 10, right: 3, left: 0, bottom: 0}});
    $(".productSliderItemContainer").niceScroll({
        railpadding: {top: 0, right: 0, left: 0, bottom: -5},
        rtlmode: "ltr",
        scrollspeed: 50,
        mousescrollstep: 70
    });


    $('.thumbnail').click(function () {
        $('.imageViewer').empty();
        // var title = $(this).parent('a').attr("title");
        var title = $(this).attr("data-title");
        $('.modal-title').html(title).slide;
        $($(this).parents('div').html()).appendTo('.imageViewer');
        $('.modal-body .imageViewer .thumbnail').removeClass("myThumbnailActive");
        $('.modal-body .imageViewer .thumbnail').removeClass("myThumbnail");
        var src = $(this).attr("src");
        $(".allImages .myThumbnail").removeClass("myThumbnailActive");
        $(".allImages .myThumbnail[src='" + src + "']").addClass("myThumbnailActive");
        $('.modal-body .imageViewer .thumbnail').removeClass("blur");
        $('#myModal').modal({show: true});
        $("#myModal").off("click");
    });
    $(".myBtnClose").click(function () {
        $('#myModal').modal('hide');
    });


    //products Descriptor
    // $('.productImg').click(function () {
    //     var p = $(this);
    //     var offset = p.offset().top;
    //     var top = offset;//.top;
    //     var elements = $(".productImg");
    //     var doneFlag = false;
    //     $.each(elements, function (i, element) {
    //         if ($(element).offset().top > top) {
    //             var pre = $($(element).prev()[0]);
    //             $($(".productDescriptor")[0]).slideUp(500, function () {
    //                 $($(".productDescriptor")[0]).stop();
    //                 $('.productDescriptorImage').empty();
    //                 $('.productDescriptorText').empty();
    //                 $($(".productDescriptor")[0]).insertAfter(pre);
    //                 $(p.html()).appendTo('.productDescriptorImage');
    //                 var linkAddress = $(".productDescriptorImage").find('a').attr("data-title");
    //                 $(".productDescriptorImage").find('a').attr("href",linkAddress);
    //                 $("<p>" + $(p.find("img")[0]).attr("data-title") + "</p>").appendTo('.productDescriptorText')
    //                 $('.productDescriptorImage').hide();
    //                 $('.productDescriptorImage').fadeIn(1000);
    //                 $($(".productDescriptor")[0]).slideDown(1000);
    //                 // $(p.html()).appendTo('.productDescriptorImage');
    //                 //$(".productDescriptorImage")
    //             });
    //             doneFlag = true;
    //             return false;
    //         }
    //     });
    //     if (!doneFlag) {
    //         var last = $(".productImg:last");
    //         $($(".productDescriptor")[0]).slideUp(500, function () {
    //             $($(".productDescriptor")[0]).stop();
    //             $('.productDescriptorImage').empty();
    //             $('.productDescriptorText').empty();
    //             $($(".productDescriptor")[0]).insertAfter(last);
    //             $(p.html()).appendTo('.productDescriptorImage');
    //             var linkAddress = $(".productDescriptorImage").find('a').attr("data-title");
    //             $(".productDescriptorImage").find('a').attr("href",linkAddress);
    //             $("<p>" + $(p.find("img")[0]).attr("data-title") + "</p>").appendTo('.productDescriptorText')
    //             $('.productDescriptorImage').hide();
    //             $('.productDescriptorImage').fadeIn(1000);
    //             $($(".productDescriptor")[0]).slideDown(1000);
    //         });
    //
    //         doneFlag = true;
    //         return false;
    //     }
    //
    // });


    //formSubmit
    $("#formSubmit").click(function () {
        //$(this).parents('form').checkValidity();
        $(this).parents('form').submit();
        //$(".callusForm").disable()
        //$(this).attr('disabled','disabled');

        $(this).parents('form').find("input[type!=hidden],textarea,select").attr('disabled', 'disabled');
        $(this).attr('disabled', 'disabled');
        //$(".callusForm input[type!=hidden]").attr('disabled', 'disabled');
        //$(".callusForm textarea").attr('disabled', 'disabled');
        $(".formLoading").show(500);
    });

    //fileAttachmet
    if (document.getElementById('fileAttachmet') != null) {
        document.getElementById('fileAttachmet').onchange = function () {
            var files = $("#fileAttachmet")[0].files;
            if (files.length != 0) {
                $('.chooseFileIcon').show();
            }
        };
    }

    //captcha
    $('#captcha_holder a:first').remove();


    //productSlider
    function changeProductSliderItem(productItem) {
        //productSliderImgContainer
        // var pimg=$(this).find("img").attr("src");
        var pimg = $(productItem).find("img").attr("src");
        //var thisItem=$(this);
        var thisItem = $(productItem);
        $(".productSliderImgContainer").find("img").fadeOut(500, function () {
            $(".productSliderImgContainer").find("img").attr("src", pimg);
            $(".productSliderImgContainer").find("img").fadeIn(500);
            //var pScrollBar = $(".productSliderItemContainer");
            //console.log($(thisItem).scrollLeft);
            $(".productSliderItem").removeClass('prductItemactive');
            thisItem.addClass('prductItemactive');
            //pScrollBar.scrollLeft(thisItem.scrollLeft());
        });
    }

    ///
    $(".productSliderItem").click(function () {
        changeProductSliderItem(this);
    });


    $('.productSliderAllProductsInner .left').click(function () {
        if ($(".prductItemactive").next().length > 0)
            var n = $(".prductItemactive").next();
        else
            var n = $(".prductItemactive").parent().children().filter(':first');
        changeProductSliderItem(n);
        $(".productSliderItemContainer").scrollLeft($(".prductItemactive").position().left);
        //var pScrollBar = $(".productSliderItemContainer");
        //pScrollBar.scrollLeft(pScrollBar.scrollLeft() - 100);
    });
    $('.productSliderAllProductsInner .right').click(function () {
        if ($(".prductItemactive").prev().length > 0)
            var n = $(".prductItemactive").prev();
        else
            var n = $(".prductItemactive").parent().children().filter(':last');
        changeProductSliderItem(n);
         var pScrollBar = $(".productSliderItemContainer");
         // var scw = $(".productSliderItemContainer").prop('scrollWidth');
        $(".productSliderItemContainer").scrollLeft($(".prductItemactive").position().left);

    });
    setInterval(function () {
        if($(".prductItemactive").length>0) {
            if ($(".prductItemactive").next().length > 0)
                var n = $(".prductItemactive").next();
            else
                var n = $(".prductItemactive").parent().children().filter(':first');
            changeProductSliderItem(n)
            $(".productSliderItemContainer").scrollLeft($(".prductItemactive").position().left);
        }
    },5000);

    // $("#content-slider").lightSlider({
    //     loop:true,
    //     keyPress:true
    // });


    // $('#myCarousel4').carousel({
    //     interval: 40000
    // });
    // $('.productSliderAllProducts .carousel .item').each(function(){
    //     var next = $(this).next();
    //     if (!next.length) {
    //         next = $(this).siblings(':first');
    //     }
    //     next.children(':first-child').clone().appendTo($(this));
    //     if (next.next().length>0) {
    //
    //         next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
    //     }
    //     else {
    //         $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    //     }
    // });

});

