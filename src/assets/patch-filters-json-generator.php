<?php
header('Content-Type: application/json');

$dir          = "./audio/"; //path

$categories = array();
$subcategories = array();
$patches = array();

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

                array_push($categories, $arry[0]);
                array_push($subcategories, array($arry[0], $arry[1]));
                array_push($patches, array($arry[0], $arry[1], $arry[2]));

            }
        }
    }

    $return_array = array('categories'=>array_values(array_unique($categories)), 'subcategories'=>array_values(array_unique($subcategories)), 'patches'=>array_values(array_unique($patches)));

    echo json_encode($return_array);

    if (file_put_contents("./data/sample-filters.json", json_encode($return_array))) {
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