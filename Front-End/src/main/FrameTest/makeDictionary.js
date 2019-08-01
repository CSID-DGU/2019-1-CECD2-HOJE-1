export default function (classResult,fileName,filePath,result){
    var classResultObj = JSON.parse(classResult);
    var classification = 
    {
        fitness : 'None',
        filePath : filePath, //파일 경로
        fileName : fileName, //파일 이름
        classification : 'None',
        sentence : result.sentence,
        detectList : result.key,
        detectCount : result.count,
        formLevel : 'None'
    };

    //추후 항목의 개수에 따라 위험도 표시 추가

    for (var key in classResultObj){
        switch(key){
            case 'majorClass':
                classification.classification = classResultObj[key];
                break;
            case 'fitness':
                classification.fitness = classResultObj[key];
                break;
            default:
                classification.formLevel = classResultObj[key];
                break;
        }
    }
    return classification
};