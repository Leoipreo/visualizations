<?php 

$municipality = $_POST['c']; 
$flow = $_POST['total_flow']; 
$sectors =  $_POST['sectors']; 
$src = $_POST['src'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$disp_sectors;

for ($i=sizeof($sectors); $i>sizeof($sectors) - 5 ; $i--)
{
    $disp_sectors[] = $sectors[$i-1];
}


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <meta http-equiv="content-type" content="text/html; charset=windows-1250">
  <meta name="generator" content="PSPad editor, www.pspad.com">
  
  <title>Kosovo's Post 2015</title>
  <link type="text/css" href="css/style.css" rel="stylesheet">
  <script>
                $('.postDispBox h4 a').text(countries["<?php echo $municipality; ?>"]);
                 $('.postDispBox h4 a').attr("title", (countries["<?php echo $municipality; ?>"]));
                 $('.sectorName').each(function(){
                        $(this).text(countries[$(this).attr("id")]);

                 });


  </script>
  </head>
  <body>

<!--   <div id="postDispBoxBG"> -->
   <div class="postDispBox">
      <div class="PDSborder">
         <h4>  <a href="#f_<?php echo $municipality; ?>" id="from_<?php echo $municipality; ?>" title=""></a></h4>
          <h5><?php echo $flow; ?></h5>
      </div>
          <?php if ($src == 1) { ?>
        <div class="buttonM">        
          <p id = "links">
            <a href="javascript:void(0);" id="Male" class="gender" <?php if ($gender == "Male") echo 'style="color:#4D96D1"';  else 'style="color:#606060"'; ?> >Male</a>
            <a href="javascript:void(0);" id="Female" class="gender" <?php if ($gender == "Female")  echo 'style="color:#4D96D1"'; else 'style="color:#606060"'; ?> >Female</a>
          </p>

         
          <img src="img/button.png" alt="button" height="24" width="79" /> 
          <img src="img/button.png" alt="button" height="24" width="79" />      
          <?php
            
           if ($age != "") {
            echo '<span style="color:#4D96D1;text-align:left;padding:10px 0 0 7px;">Age Group : '.$age.' </span>';      
           }?>

           <ul class ="agegroup" id="age_Male" style=" background-color:#EBEBEB; display:none;">
            <li><a href="javascript:void(0);" class="age" id = "16-17">16-17</a></li>
           <li> <a href="javascript:void(0);" class="age" id = "18-19">18-19</a></li>
           <li> <a href="javascript:void(0);" class="age" id = "20-21">20-21</a></li>
            <li><a href="javascript:void(0);" class="age" id = "22-23">22-23</a></li>
           <li> <a href="javascript:void(0);" class="age" id = ">24"> >24</a></li>
          </ul>
 
          <ul class ="agegroup2" id="age_Female" style=" background-color:#EBEBEB; display:none; ">
            <li><a href="javascript:void(0);" class="age" id = "16-17">16-17</a></li>
           <li> <a href="javascript:void(0);" class="age" id = "18-19">18-19</a></li>
           <li> <a href="javascript:void(0);" class="age" id = "20-21">20-21</a></li>
            <li><a href="javascript:void(0);" class="age" id = "22-23">22-23</a></li>
           <li> <a href="javascript:void(0);" class="age" id = ">24"> >24</a></li>
          </ul>
          </div>
         <?php } ?>
        <div class="ulsector" >
              <ul class="sec"><?php
              foreach ($disp_sectors as $item){
                            // /  print_r($item);
                  // foreach ($item as $key => $value) {
                                          
                                        echo '<li><a href="javascript:void(0);" id="'.$item['key'].'" class="sectorName"></a> <span style="float:right; color:#4d96d1;">'.$item['val'].'</span></li>  
                                            ';
                    # code...
                                    //}
  # code...
                  }
                  ?>
              
              </ul>
             
        </div>

     </div>
         <div class="PDSborder" style="margin-left:10px;"><a href="#"  class="close">hide</a></div>
         <div > </div>

<!--    </div> -->
   
  </body>

  <script>

 $('.gender#Male').mouseover(function() {
    var gender_id = $(this).attr("id");
    //$('ul.agegroup').attr("id",gender_id);
    $('ul.agegroup').show();
    $('ul.agegroup2').hide();
  });
 
  $('.gender#Female').mouseover(function() {
    var gender_id = $(this).attr("id");
    //$('ul.agegroup2').attr("id",gender_id);
    $('ul.agegroup2').show();
    $('ul.agegroup').hide();
  });
 
  $('ul.agegroup').on('mouseleave',function() {
        $('ul.agegroup').hide();
  });
 
  $('ul.agegroup2').on('mouseleave',function() {
    $('ul.agegroup2 ').hide();
  });



  // $('.gender').mouseover(function() {
  //   var gender_id = $(this).attr("id");
  //   $('ul.agegroup').attr("id",gender_id);
  //   $('ul.agegroup').show();
  // });

  // $('ul.agegroup').on('mouseleave',function() {
  // 	$('ul.agegroup').hide();
  // });

//   $('.age').live("click",function() {
//          $('ul.buttonM p span#selected').text($(this).attr("id"));
// });
    
  </script>
</html>
