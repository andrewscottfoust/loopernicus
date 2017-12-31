<?php
header('Content-Type: application/json');

$dir          = "./audio/"; //path

$list = array(); //main array

if(is_dir($dir)){
    if($dh = opendir($dir)){
        while(($file = readdir($dh)) != false){

            if($file == "." or $file == ".." or $file == ".DS_Store"){
                //...
            } else { //create object with two fields

                $arry = explode("_",$file);

                for($i = 0; $i < 4; $i++) {
                    $arry[$i] = strtotitle(str_replace("-"," ",$arry[$i]));
                }

                $list3 = array(
                'file' => $file, 
                'category' => $arry[0],
                'subcategory' => $arry[1],
                'patch' => $arry[2],
                'sample' => strstr($arry[3], '.', true)
            );
                array_push($list, $list3);
            }
        }
    }

    $return_array = array('files'=> $list);

    echo json_encode($return_array);

    if (file_put_contents("./data/sample-library.json", json_encode($return_array))) {
        echo "JSON file created successfully...";
    } else {
        echo "Oops! Error creating json file...";
    }
    
}

 function strtotitle($title) {

    $smallwordsarray = array( 'of','a','the','and','an','or','nor','but','is','if','then','else','when', 'at','from','by','on','off','for','in','out','over','to','into','with' );

    // Split the string into separate words
    $words = explode(' ', $title);

    foreach ($words as $key => $word)
    {
    // If this word is the first, or it's not one of our small words, capitalise it
    // with ucwords().
    if ($key == 0 or !in_array($word, $smallwordsarray))
    $words[$key] = ucwords($word);
    }

    // Join the words back into a string
    $newtitle = implode(' ', $words);

    return $newtitle;
}

?>