 function getFlow($file, dm_val) {

  //  $('.options input[type="radio"]').change(function() {
    //console.log($("#question-buttons ul li a#getflows2js").attr("id"));
       //$("#hidden").val(0);
    if ($("#question-buttons ul li a#"+$file+" em").hasClass('emsel'))
            return 0;

     
     $("#hiddenClick").val($("#hiddenClick").val()+1);
     $("#nextQ").val("1");
     $("#question-buttons ul li a em").removeClass("emsel");
     $("#question-buttons ul li a#"+$file+" em").addClass("emsel");
     switch($file){
        case "getflows2": $(".par .sector_par h4 ").html('Top Dreams <a class="more" href="index.html#src">see more</a>') ; break;
        case "getflows3": $(".par .sector_par h4 ").html('Most Wrong Things<a class="more" href="index.html#src">see more</a>') ; break;
        case "getflows4": $(".par .sector_par h4 ").html('Top Things to Change <a class="more" href="index.html#src">see more</a>') ; break;
     }
     
       //console.log(getFlow.obj);
  //     getFlow.obj.removeEventListener('click',canvasMouseClickHandlerVertical,false);
        var dm_interactions_old = new DataMovinInteractions();
        //dm_interactions_old.init(null,getFlow.obj);

        window.location.hash = "";
         $(".info").hide();
         $(".canvas_container").css({opacity:0.3});
         $("#contents").css({opacity:0.3});
         
         $(".bubblingG").show();
         // alert("qq");
        var test = 0;
        $file += ".js";
        var $host = $file;
        var dst_data = {};
        var $info_host = "support/getcountry.php";
        var Flows = new function () {

            var contents = $("#contents");


            var margins = {
                left: 170,
                top: 10,
                right: 170,
                bottom: 0,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            box_w = 10,
                step = 10;

            var canvas = {},
            ctx = {};

            var processing = false;
            var src={},dest={};
            var datamovin = {};
            var vertical = true;
            var colors = new Colors();

            var last = null,
                previous = null;

            this.init = function (munic,gender,age,host) {
                initDOM();
                $host = "support/"+host;
                var munic = munic;
                var gender = gender;
                var age = age;
                var counter;
                var selectCase;            
                if (support_canvas()) {
                    var ua = navigator.userAgent;
                    var isiOS = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
                  //  alert($host);
                    step = ($.browser.msie || isiOS) ? 8 : 4;

                    (function getMigration() {
                        $.ajax({
                            url: $host,
                            data: {
                                i: isiOS ? 1 : 0,
                                ie: $.browser.msie && (typeof WebSocket == "undefined") ? 1 : 0
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function (json) {
                               console.log(getFlow.obj);
                                datamovin = new DataMovin();

                                if (munic == null)
                                {
                                    selectCase = "json";                                                               
                                }                                    
                                else if (gender == null)
                                {
                                     selectCase =  munic;                                    
                                }  
                                else if (age == null)
                                {
                                    selectCase = gender;                                    
                                }        
                                else
                                {
                                    selectCase =  age;                                   
                                }                                    

                                if (datamovin.init("flows", {
                                    flows: json,
                                    margins: margins,
                                    orientation: 'vertical',
                                    labels: countries,
                                    municipality:munic,
                                    gender:gender,
                                    age_group:age,
                                    selectCase: selectCase,
                                    file:$host
                                })) {
                                   
                                 
                                    this.src = datamovin.getSrc();
                                    dst_data = datamovin.getDst();                                 
                                    contents.height(datamovin.getCanvas().height);
                                    var noteTop = $("#contents").height();
                                    $(".note").show();
                                    $(".note").css("top",noteTop+310);
                                    datamovin.drawSources();
                                    datamovin.drawDestinations();
                                    
      

                                    vertical = datamovin.getOrientation() == 'vertical';

                                    
                                    if (dm_val == 1)
                                    {       
                                      //  $("#flows").off("click");
                                       //    console.log(getFlow.obj);
                                            getContent(dst_data,this.src);
                                            var dm_interactions = new DataMovinInteractions();
                                            //dm_interactions.removeMouseEvents();
                                            dm_interactions.init(datamovin,null);                                                
                                            dm_interactions.registerMouseEvents({
                                    
                                                                            'click': showCountryInfo,
                                                                            'mouseover': showCountryName,
                                                                            'mouseout': hideCountryName,
                                                                            //'document_scrollwheel':hideCountryName,
                                                                            'processing': handleProcessing,
                                    
                                                                        });
                                        //    dm_interactions.checkListener();
                                                 
                                       }
                                       dm_val = 0;
                                   $(".bubblingG").hide();
                                    $(".canvas_container").css({opacity:1});
                                    $("#contents").css({opacity:1});
                                    showContents();
                                    if (window.location.hash) {
                                        var connection = window.location.hash.split("_");
                                        switch (connection[0]) {
                                            case '#f':                                           
                                                datamovin.drawOutFlow(connection[1], true);
                                                var goToCountry = datamovin.getPointInfo(connection[1], 'src');
                                                console.log(goToCountry);
                                                showCountryInfo(goToCountry, null, true);
                                                Finger.init(false);
                                                break;
                                            case '#t':
                                                datamovin.drawInFlow(connection[1], true);
                                                var goToCountry = datamovin.getPointInfo(connection[1], 'dst');
                                                showCountryInfo(goToCountry, null, true);
                                                Finger.init(false);
                                                console.log($(connection[1]));
                                                break;
                                            case '#c':
                                                datamovin.drawFlowFromTo(connection[1], connection[2], true);
                                                var goToCountry = datamovin.getPointInfo(connection[1], 'src');
                                                showCountryInfo(goToCountry, connection[2], true);
                                                Finger.init(false);
                                                break;
                                            default:
                                                Finger.init(true);
                                        }
                                    } else {
                                        Finger.init(true);
                                    }


                                }


                                /*
							var country_index=0;
							(function drawConnections(){
								if(country_index<countries.length) {
									drawFromConnections(countries[country_index]);
									country_index++;
									setTimeout(drawConnections,1000);
								}
							}());
							*/ //alert("q");
                               
                            }
                        });
                    })();
                } else {
                    $("<div/>").attr("class", "alert").html("Unfortunately your browser does not support <span>HTML5</span>.<br/>Please upgrade to a modern browser to fully enjoy <span>people<strong>movin</strong></span>").prependTo("#contents").fadeIn(1000);
                }
            }

            function showCountryName(country_info) {
               
                if (country_info && country_info.type) {
                    if (country_info.type == 'src') {

                        $("#src_title").html(window.countries[country_info.name]).show();
                        $("#dst_title").hide();
                        if (contents.hasClass("ontop")) {
                            //console.log($("#src_title"),$("#src_title").outerWidth())
                            left = 170 - $("#src_title").outerWidth();
                        } else {
                            left = 140 + 50;
                        }



                        position = {
                            top: (country_info.y + country_info.h / 2 - $("#src_title").height() / 2) + 30  + "px",
                            left: left
                        };
                   //     alert(country_info.y);
                        last = {
                            country: country_info.name,
                            el: "#src_title",
                            direction: 'src',
                            pos: position
                        };

                    } else {

                        $("#dst_title").html(window.countries[country_info.name]).show();
                        $("#src_title").hide();
                        position = {
                            top: (country_info.y + country_info.h / 2 - $("#dst_title").height() / 2) + 30 + "px"
                        };
                        if (contents.hasClass("ontop")) {
                            position.left = 170 + 600;
                            position.right = 'auto';
                        } else {
                            position.right = 140 + 50;
                            position.left = "auto";
                        }

                        last = {
                            country: country_info.name,
                            el: "#dst_title",
                            direction: 'dst',
                            pos: position
                        };

                    }

                    $(last.el).attr("rel", ((last.direction == 'src') ? 'from_' : 'to_') + last.country).show().css(last.pos).show();
                } else {
                    last = null;
                    hideCountryName(this);

                }
            }

            function hideCountryName(e) {
                var relTarget = e.relatedTarget || e.toElement;
                if (!relTarget || (relTarget && relTarget.className && relTarget.className != 'ititle')) $(".ititle").hide();
            }

            function handleMouseMove(e) {
                var relTarget = e.relatedTarget || e.toElement;
            }

            function showCountryInfo(country_info, other, animate) {
                
                // if (other == undefined && animate == undefined)
                // {
                //     var host = $('input[name=group1]:checked').val()
                //     if (country_info != null)
                //     Flows.init(country_info.name,null,null, $file);
                //    // return 0;
                // }
                 Finger.remove();

                $(".info").hide();
                if (country_info == -1) {
                    window.location.hash = "!";
                    //contents.show();
                    showContents();
                    return 0;
                }
                if (country_info) {
                    //contents.hide();
                    hideContents();
                    $(".ititle").hide();
                    src = datamovin.getSrc();
                    dst = datamovin.getDst();
                    getCountryInfo(country_info.name, country_info.type, country_info.x, country_info.y + country_info.h / 2 + 10, other, animate,src,dst);
                    if (!other) {
                       
                        if (country_info.type == 'src') {
                            window.location.hash = "f_" + country_info.name;
                        } else {
                            window.location.hash = "t_" + country_info.name;
                        }
                    } else {
                        
                        var goToCountry = datamovin.getPointInfo(other, 'dst');
                     
                        getCountryInfo(goToCountry.name, goToCountry.type, goToCountry.x, goToCountry.y + goToCountry.h / 2 + 10, country_info.namesrc,dst);
                        window.location.hash = "c_" + country_info.name + "_" + other;
                    }
                } else {
                    window.location.hash = "!";
                    showContents();

                }
            }

            function getCountryInfo(country, direction, x, y, other, animate, source, dest) {
            
               var total_flow= 0;
               var sectors =  [];
               console.log(dest);
               if(direction == "src"){
                   for (s in source[country].flows){
             
                        total_flow+=source[country].flows[s].flow;                    
                        sectors.push({key:s , val: source[country].flows[s].flow})

                   }
               }else{
                    for (s in dest[country].flows){
                        
                        total_flow+=dest[country].flows[s].flow;                    
                        sectors.push({key:s , val: dest[country].flows[s].flow})
                    }

               }
                var sorted_sectors = sectors.sort(function(a, b) {
                  return a.val - b.val;
                });
               // alert(x+"-"+y);
             console.log(sorted_sectors);
                $.ajax({
                    url: $info_host,
                    data: {
                        c:country,
                        total_flow:total_flow,
                        sectors:sorted_sectors,
                        gender:$("#hiddenGender").val(),
                        age:$("#hiddenAge").val(),
                        src: (direction == 'src' ? 1 : 0),
                        o: (other ? other : '')
                    },
                    type: 'POST',
                    dataType: 'html',
                    success: function (html) {
                        var position = {}
                         
                        if (vertical) {
                            if (direction == 'src') {
                                left = $("#flows").position().left + margins.left - $("#" + direction + "_info").outerWidth() ;
                            } else {
                                left = $("#flows").position().left + x + 20; //+margins.right;//x-$("#"+direction+"_info").outerWidth();
                            }
                            position = {
                                top: (y + 293) + "px",
                                left: left
                            };
                        } else {
                            position = {
                                left: (x - 205) + "px",
                                top: (y + 80 + ((direction == 'src') ? 15 : -340)) + "px"
                            };
                        }
                        //$(".info").hide();
                     
                        $("#" + direction + "_info").show().html(html).css(position);
                        $("#hiddenAge").val("");
                        $("#hiddenGender").val("");
                        if (animate) {
                            var scrolling = {
                                scrollTop: y + "px"
                            };
                            if (!datamovin.getOrientation() == 'horizontal') {
                                scrolling = {
                                    scrollLeft: x + "px"
                                };
                            }
                            $('html,body').animate(scrolling, 1000);
                        }
                    }
                });
                return false;
            }
          
            function initDOM() {

                contents = $("#contents");

                $("#dst_info").css("left", "745px"); //.offset({top:$("#dst_info").offset().top,left:$("#flows").offset().left+canvas.width})
          
                $(".more").click(function (e) {
                    e.preventDefault();
                    
                    var ul = $(this).parent().parent().find(".hidden");                   
                    if (ul.is(":visible")) {
                        ul.fadeOut(1000);
                        $(this).html("see more");
                    } else {
                        $("ul.hidden:visible").hide();
                        ul.fadeIn(1000);
                        $(this).html("see less");
                        $('html,body').animate({
                            scrollTop: $(this).offset().top - 20
                        }, 1000);
                    }
                    return false;
                });
                
                function manageLIClik(li, country, direction) {
                    
                    var dir = (direction == 'to') ? 'dst' : 'src',
                        data = datamovin.getCurrent()[(direction == 'to') ? 'src' : 'dst'];

                    if (!li.hasClass('sel')) {
                        $(".info ul li a.sel").removeClass("sel");
                        li.addClass("sel");
                        if (direction == 'to') {
                            datamovin.clean();
                            datamovin.drawFlowFromTo(data[0], country, true);
                            window.location.hash = "c_" + data[0] + "_" + country;
                        } else {
                            datamovin.drawFlowFromTo(country, data[0], true);
                            window.location.hash = "c_" + country + "_" + data[0];
                        }
                        var info = datamovin.getPointInfo(country, dir);
                        src = datamovin.getSrc();
                        dst = datamovin.getDst();

                        getCountryInfo(country, dir, info.x, info.y + info.h / 2 + 10, data[0],src,dst);
                    } else {

                        var goToCountry = datamovin.getPointInfo(country, dir);
                        var scrolling = {
                            scrollTop: goToCountry.y + "px"
                        };
                        if (!vertical) {
                            scrolling = {
                                scrollLeft: goToCountry.x + "px"
                            };
                        }
                        $('html,body').animate(scrolling, 1000);
                    }

                }

                $(".info  div .buttonM ul.ulsector li a.sectorName").live("click", function (e) {
                    e.preventDefault();
                    Finger.remove();
                  
                    var $this = $(this);

                    var country = this.id.split("_")
                    if (country[0] == 'to') {
                        manageLIClik($this, country[1], country[0]);
                    } else {
                        manageLIClik($this, country[1], country[0]);
                    }

                    return false;
                });
               
                $(".info a.close").live("click", function (e) {
                    e.preventDefault();
                    $(".info").hide();
                });
              

                $(".par .sector_par ul li a").click(function (e) {
                    
                    e.preventDefault();
                    Finger.remove();
                 
                    if ($("#contents").css("opacity") == 1) {
                        var country = this.id.split("_");

                        
                        if (country[0] == 'from') {
                            datamovin.drawOutFlow(country[1], true);
                            showCountryInfo(datamovin.getPointInfo(country[1], 'src'), null, true);
                        } else if (country[0] == 'to') {
                            datamovin.drawInFlow(country[1], true);
                            showCountryInfo(datamovin.getPointInfo(country[1], 'dst'), null, true);
                        } else {
                            datamovin.drawFlowFromTo(country[1], country[2], true);
                            showCountryInfo(datamovin.getPointInfo(country[1], 'src'), country[2], true);
                        }

                        window.location.hash = this.href.split("#")[1];

                    } else {
                        $("#contents").click();
                    }
                    return false;
                });
            }

            function showContents() {
                contents.css({
                    "z-index": 1010,
                    "opacity":1
                }).addClass("ontop");
                $("#wrapper").addClass("ontop");

            }

            function hideContents() {
                contents.css({
                    "z-index":940,
                    "opacity":0.5
                }).removeClass("ontop");
                $("#wrapper").removeClass("ontop");
            }

            function handleProcessing(status, direction) {
                if (status == 'start') {
                    var title = $("#" + direction + "_title");
                    title.html(title.html() + " <img src=\"img/loading.gif\"/>");
                }
                if (status == 'end') {}
            }

               // $(".info div div .buttonM ul li a.age").live("click", function (e) {
               //   //   alert($host);
               //    e.preventDefault();
               //    Finger.remove();
               //     var host = $('input[name=group1]:checked').val()
               //      var ageObj = $(this);
               //      var age_group =  ageObj.attr("id");
               //      var gender = ageObj.parent().parent().attr("id").split("_");
               //      var munic = $(window.location).attr('href').split("_");
               //      $('.info div div .buttonM ul.agegroup').fadeOut(100);
                     
               //      Flows.init(munic[1],gender[1],age_group, host);                  
                    

               //      $('.info div div .buttonM p span#selected').text(age_group) ;
                  
               //  });

               function ageListener(event)
                {
                  if(event.handled !== true)
                  {
                    // put your payload here.
                    // this next line *must* be within this if statement
                    var ageObj = $(this);
                    var age_group =  ageObj.attr("id");
                    var gender = ageObj.parent().parent().attr("id").split("_");
                    var munic = $(window.location).attr('href').split("_");
                    $('.info  div .buttonM ul.agegroup').fadeOut(100);
                    $("#hiddenGender").val(gender[1]);
                    $("#hiddenAge").val(age_group);
                    $file = $("#question-buttons ul li a em.emsel").parent().attr("id")+".js";
                    Flows.init(munic[1],gender[1],age_group, $file);                  
                    event.handled = true;
                  }
                  return false;
                }

            $('.info div .buttonM ul li a.age').live('click', ageListener);

                function genderListener(event)
                {
                  if(event.handled !== true)
                  {
                    // put your payload here.
                    // this next line *must* be within this if statement
                  
                   Finger.remove();
                    var gender = $(this).attr("id");
                    var munic = $(window.location).attr('href').split("_");  
                    $("#hiddenGender").val(gender);
                    $file = $("#question-buttons ul li a em.emsel").parent().attr("id")+".js";                  
                    Flows.init(munic[1],gender,null, $file);
                    event.handled = true;
                  }
                  return false;
                }

            $('.info div .buttonM p a').live('click', genderListener);




                function countryListener(event)
                {
                  if(event.handled !== true)
                  {
                    // put your payload here.
                    // this next line *must* be within this if statement
                    var $this = $(this);
                    country = this.id.split("_");
                    $file = $("#question-buttons ul li a em.emsel").parent().attr("id")+".js";
                    Flows.init(country[1],null,null,$file);
                    event.handled = true;
                  }
                  return false;
                }

            $('.info h4 a').live('click', countryListener);

            function titleListener(event)
            {

                 if (event.handled !== true)           
                  {                  
                      var $this = $(this);
                      var country = $this.attr("rel").split("_");
                    if(!$("#"+$this.attr("rel")).is(":visible")){
                    if(country[0]=='to'){
                        handleProcessing('start','dst');
                        setTimeout(function tm(){
                            datamovin.drawInFlow(country[1],true);
                            showCountryInfo(datamovin.getPointInfo(country[1],'dst'));
                            setTimeout(function ttm(){handleProcessing('end','dst');},250);
                        },100);
                    } else {
                        handleProcessing('start','src');
                        setTimeout(function tm(){
                            datamovin.drawOutFlow(country[1],true);
                            showCountryInfo(datamovin.getPointInfo(country[1],'src'));
                            setTimeout(function ttm(){handleProcessing('end','src');},250);
                        },100);
                    }
                }             
                        // alert(country[1]);
                        // var host = $('input[name=group1]:checked').val();

                        // Flows.init(country[1],null,null,host);

                        event.handled = true;
                  }

                    return false;

            }

              $(".ititle").live("click", titleListener);

     // $(".info h4 a").live("click", function (e) {
                  
     //                return false;

     //            });
     // $("#flows").live("click",function ()  {

                    
     //                var $this = $(this);
     //                country = this.id.split("_");
     //                showCountryInfo(null,null,null);
     //               // Flows.init(country[1],null,null);
     //                return false;

     //            });


        };
    Flows.init(null,null,null, $host);

    function getContent(dst,src){
        $('.par .sector_par ul.visible').empty();
        $('.par .sector_par ul.hidden').empty();
        $('.par .munic_par').empty();
     
        var i=0;
        var p=0
        var sorted_sectors = setContentSectors(dst);
        $.each(sorted_sectors, function(key, v){
          
             if (i<10){
                $('.par .sector_par ul.visible').append('<li class="p'+p+'"><a href="#t_'+v.key+'"" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                }            
            else{
                $('.par .sector_par ul.hidden').append('<li class="p'+p+'"><a href="#t_'+v.key+'" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                 
            }
            i++;
            p = (p==0) ? p=1 : p =0;
          });    

        i=0;        
        p=0;
        for (s in src){
          
            var sorted_munic_sectors =  setContentSectors(src[s].flows);
            

              if (i==0){
                    $('.par .munic_par').append('<div id="'+i+'" class="mvisible">');
                    var this_m = $('.par .munic_par #'+i);
                    this_m.append('<h4>'+countries[s]+'<a class="random" style= "float:right;" href="javascript:void(0)">next municipality</a></h4><br />') ;      
                    this_m.append('<br /><ul class="visible"></ul><br />');
                    this_m.append('<br /><ul class="hidden"></ul><br />');
                    // this_m.append('<h4><a class="more" href="index.html#src">see more</a></h4>') ;  
                 
                      j=0;

                 $.each(sorted_munic_sectors, function(key, v){
                    
                     if (j<10){
                        $('.par .munic_par #'+i+' ul.visible').append('<li class="p'+p+'"><a href="#t_'+v.key+'"" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                        }            
                    else{
                        $('.par .munic_par #'+i+' ul.hidden').append('<li class="p'+p+'"><a href="#t_'+v.key+'" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                     }  
                      j++;                      
                });  

           }else{
                    $('.par .munic_par').append('<div id="'+i+'" class="mhidden">');
                    var this_m = $('.par .munic_par #'+i);
                    this_m.append('<h4>'+countries[s]+'<a class="random" style= "float:right; href="javascript:void(0)">next municipality</a></h4>') ;         
                    this_m.append('<br /><ul class="visible"></ul><br />');
                    this_m.append('<br /><ul class="hidden"></ul><br />');
                    // this_m.append('<h4><a class="more" href="index.html#src">see more</a></h4>') ;  
                    
                    j=0;
                     $.each(sorted_munic_sectors, function(key, v){
                    
                    if (j<10){
                        $('.par .munic_par #'+i+' ul.visible').append('<li class="p'+p+'"><a href="#t_'+v.key+'"" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                        }            
                   else{
                        $('.par .munic_par #'+i+' ul.hidden').append('<li class="p'+p+'"><a href="#t_'+v.key+'" id="to_'+v.key+'"><span class="name">'+countries[v.key]+'</span><span class="val">'+v.val+'</span></a></li>');
                         }
                      j++;
                        
                  }); 

                }

              i++;
            
        }
            //     <li class="p1"><a href="index.html#t_RU" id="to_RU"><span class="name">RUSSIAN FED.</span><span class="val">12,270,388</span></a></li>


            //     <li class="p0"><a href="index.html#t_UA" id="to_UA"><span class="name">UKRAINE</span><span class="val">5,257,527</span></a></li>
            // <li class="p1"><a href="index.html#t_IT" id="to_IT"><span class="name">ITALY</span><span class="val">4,463,413</span></a></li>


    }


     $(".par .munic_par .mvisible h4 a.random").live('click',function (e) {
                    e.preventDefault();
                   var rand = Math.floor((Math.random()*36)+0);
                   $item = $(".par .munic_par .mvisible");
                    $item.attr('class','mhidden');
                   $item.fadeOut(1000);
                    $(".par .munic_par #"+rand).attr('class','mvisible');
                   $(".par .munic_par #"+rand).fadeIn(1000);
                  
                  

              1
                   //  }
                    return false;
                });


    function setContentSectors(sectors){
           var sector_data= [];
           for (d in sectors)               
                    sector_data.push({key:d , val: sectors[d].flow});
               
           var sorted_sectors = sector_data.sort(function(a, b) {
                  return b.val - a.val;
                });
           return sorted_sectors;
    }



 }

