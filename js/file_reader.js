/**
 * Created by Andreas on 27.02.2017.
 */
exports.readfile = readAllfiles;

searchCategoriesAndWords =  [];
searchFiles = ["Oberlandesgerichte", "Oberverwaltungsgerichte","Arbeitsgerichte"];

function readAllfiles(callBackToIndex) {

    for(var i = 0; i<searchFiles.length; i++){
        readfile(searchFiles[i],callBackAfterAllIsRead);
    }
    var docAmount = searchFiles.length;

    //Callback after all Files are read
    function callBackAfterAllIsRead(result){
        callBackToIndex(result);
    }
}

function readfile(txtname,callBackAfterAllIsRead) {
    var LineByLineReader = require('line-by-line'),
        lr = new LineByLineReader("./Suchlisten/"+txtname+".txt",{ encoding: 'utf8', skipEmptyLines: true});
    var linearray =[];
    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        // 'line' contains the current line without the trailing newline character.
        linearray.push(line)
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.

        saveResults(linearray,txtname,callBackAfterAllIsRead);
    });
}

function saveResults(linearray,txtname,callBackAfterAllIsRead){

    var searchfile = {};
    searchfile.txtname = txtname;
    searchfile.linearray = linearray;
    searchCategoriesAndWords.push(searchfile);

    if(searchCategoriesAndWords.length == searchFiles.length){
        callBackAfterAllIsRead(searchCategoriesAndWords);
    }
}


