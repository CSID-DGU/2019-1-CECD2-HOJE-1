<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>HOJE OCR Admin Dashboard</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" />
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    </script>

    <script>
        function onClick(e){
            alert(e.dataPoint.label);
        }

        $(document).ready(function () {
            $.ajax({
                method: "GET",
                url: 'http://192.168.40.206:8080/getTotalFormLevelChartData',
                processData:false,
                contentType: false,
                dataType: 'json',
                success: function(res){
                    var formLevelDataPoints = [[]];
                    var totalFormLevelChart = new CanvasJS.Chart("totalFormLevelChart", {
                        theme: "light2", // "light1", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: "보유 이미지 권한 상태"
                        },
                        data: [{
                            type: "pie",
                            showInLegend: "true",
                            legendText: "{label}",
                            click: onClick,
                            yValueFormatString: "#,###.##",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: formLevelDataPoints[0]
                        }]
                    });

                    var formLevel_yValue;
                    var formLevel_label;

                    $.each(res, function(LoopIndex, dataPoints) {
                        $.each($(dataPoints), function(Index, dataPoint) {
                            formLevel_yValue = parseFloat(dataPoint.y);
                            formLevel_label = dataPoint.label;
                            formLevelDataPoints[parseInt(LoopIndex)].push({
                                label : formLevel_label,
                                y : formLevel_yValue
                            });
                        });
                    });

                    totalFormLevelChart.render();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus=="timeout") {
                        alert("시간이 초과되어 데이터를 수신하지 못하였습니다.");
                    } else {
                        alert("데이터 전송에 실패했습니다. 다시 시도해 주세요");
                    }
                }
            });
        });

        $(document).ready(function () {
            $.ajax({
                method: "GET",
                url: 'http://192.168.40.206:8080/getRegistrationChartData',
                processData:false,
                contentType: false,
                dataType: 'json',
                success: function(res){
                    var registrationStatusDataPoint = [[]];
                    var registrationStatusChart = new CanvasJS.Chart("registrationStatusChart", {
                        theme: "light2", // "light1", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: "분류 이미지 등록 상태"
                        },
                        data: [{
                            type: "pie",
                            showInLegend: "true",
                            legendText: "{label}",
                            click: onClick,
                            yValueFormatString: "#,###.##\"%\"",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: registrationStatusDataPoint[0]
                        }]
                    });

                    var imageRegistration_yValue;
                    var imageRegistration_label;
                    $.each(res, function(LoopIndex, dataPoints) {
                        $.each($(dataPoints), function(Index, dataPoint) {
                            imageRegistration_yValue = parseFloat(dataPoint.y);
                            imageRegistration_label = dataPoint.label;
                            registrationStatusDataPoint[parseInt(LoopIndex)].push({
                                label : imageRegistration_label,
                                y : imageRegistration_yValue
                            });
                        });
                    });

                    registrationStatusChart.render();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus=="timeout") {
                        alert("시간이 초과되어 데이터를 수신하지 못하였습니다.");
                    } else {
                        alert("데이터 전송에 실패했습니다. 다시 시도해 주세요");
                    }
                }
            });
        });

        $(document).ready(function () {
            $.ajax({
                method: "GET",
                url: 'http://192.168.40.206:8080/getFitnessChartData', //192.168.40.206
                processData:false,
                contentType: false,
                dataType: 'json',
                success: function(res){
                    var fitnessDataPoints = [[],[],[]];
                    var fitnessChart = new CanvasJS.Chart("fitnessChart", {
                        zoomEnabled: true,
                        animationEnabled: true,
                        theme: "light2",
                        title: {
                            text: "이미지 문서 보유 적합도 현황"
                        },
                        axisX: {
                            title: "갯수",
                            includeZero: false
                        },
                        axisY:{
                            title: "일자",
                            includeZero: true
                        },
                        toolTip: {
                            shared: true
                        },
                        legend: {
                            cursor:"pointer",
                            verticalAlign: "top",
                            fontSize: 20,
                            fontColor: "dimGrey"
                        },
                        data: [{
                            type: "line",
                            color:"red",
                            xValueType: "dateTime",
                            yValueFormatString: "#,###",
                            xValueFormatString: "DD MMM YYYY",
                            showInLegend: true,
                            name: "부적합",
                            dataPoints: fitnessDataPoints[0]
                        },
                            {
                                type: "line",
                                color:"green",
                                xValueType: "dateTime",
                                yValueFormatString: "#,###",
                                showInLegend: true,
                                name: "적합" ,
                                dataPoints: fitnessDataPoints[1]
                            },
                            {
                                type: "line",
                                color:"orange",
                                xValueType: "dateTime",
                                yValueFormatString: "#,###",
                                showInLegend: true,
                                name: "보통" ,
                                dataPoints: fitnessDataPoints[2]
                            }]
                    });

                    var fit_yValue;
                    var fit_xValue;

                    $.each(res, function(LoopIndex, dataPoints) {
                        $.each($(dataPoints), function(Index, dataPoint) {
                            fit_yValue = parseInt(dataPoint.y);
                            fit_xValue = parseFloat(dataPoint.x);
                            fitnessDataPoints[LoopIndex].push({
                                x : fit_xValue,
                                y : fit_yValue
                            });
                        });
                    });
                    fitnessChart.render();
                },
                complete:function(){
                    $("#fitnessChartLoading").removeClass('spinner-grow');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus=="timeout") {
                        alert("시간이 초과되어 데이터를 수신하지 못하였습니다.");
                    } else {
                        alert("데이터 전송에 실패했습니다. 다시 시도해 주세요");
                    }
                }
            });
        });

        $(document).ready(function () {
            $.ajax({
                method: "GET",
                url: 'http://192.168.40.206:8080/getInspectionCountChartData',
                processData:false,
                contentType: false,
                dataType: 'json',
                success: function(res){
                    var inspectionDataPoints = [[]];
                    var InspectionCountChart = new CanvasJS.Chart("InspectionCountChart", {
                        theme: "light2", //"light1", "dark1", "dark2"
                        animationEnabled: true,
                        title: {
                            text: "일자별 검사 pc 현황"
                        },
                        axisX: {
                            valueFormatString: "DD MM YYYY"
                        },
                        axisY: {
                            title: "검사한 pc",
                            includeZero: false,
                            //maximum: 250
                        },
                        data: [{
                            type: "column",
                            xValueType: "dateTime",
                            xValueFormatString: "DD MM YYYY",
                            yValueFormatString: "#,##",
                            dataPoints: inspectionDataPoints[0]
                        }]
                    });

                    var inspection_xValue;
                    var inspection_yValue;

                    $.each(res, function(LoopIndex, dataPoints) {
                        $.each($(dataPoints), function(Index, dataPoint) {
                            inspection_xValue = parseInt(dataPoint.x);
                            inspection_yValue = parseFloat(dataPoint.y);
                            label = dataPoint.label;
                            indexLabel = dataPoint.indexLabel;
                            inspectionDataPoints[parseInt(LoopIndex)].push({
                                x : inspection_xValue,
                                y : inspection_yValue
                            });
                        });
                    });

                    InspectionCountChart.render();
                },
                complete:function(){
                    $("#InspectionCountChartLoading").removeClass('spinner-grow');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus=="timeout") {
                        alert("시간이 초과되어 데이터를 수신하지 못하였습니다.");
                    } else {
                        alert("데이터 전송에 실패했습니다. 다시 시도해 주세요");
                    }
                }
            });
        });


    </script>
</head>

<body>
<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>HOJE OCR Dashboard</h3>
            <strong>HOJE</strong>
        </div>

        <ul class="list-unstyled components">
            <li class="active">
                <a href="${pageContext.request.contextPath}/">
                    <i class="fas fa-home"></i>
                    메인
                </a>
            </li>
            <li>
                <a href="${pageContext.request.contextPath}/classificationRequest">
                    <i class="fas fa-copy"></i>
                    문서등록
                </a>
            </li>
            <li>
                <a href="${pageContext.request.contextPath}/OCRTrainImageList?pageNum=1">
                    <i class="fas fa-image"></i>
                    에러처리
                </a>
            </li>
        </ul>
    </nav>

    <!-- Page Content  -->
    <div id="content" class="bg-white">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                </button>

                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav ml-auto">
                        <div class="row ">
                            <div class="col- m-1">Lastest version:</div>
                            <div class="col- m-1">정규표현식 1.0 ver</div>
                            <div class="col- m-1">학습데이터 ${trainedFileVersion} ver</div>
                            <div class="col- m-1">Agent 1.0 ver</div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="border col-8 p-2 m-2 ">
                    <div id="fitnessChart" style="height: 370px; width: 100%;">
                        <div id="fitnessChartLoading" class="spinner-grow" role="status"></div>
                    </div>
                </div>
                <div class="border col p-2 m-2">
                    <div id="InspectionCountChart" style="height: 370px; width: 100%;">
                        <div id="InspectionCountChartLoading" class="spinner-grow ml-auto" role="status"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="border col   p-2 m-2">
                    <div id="registrationStatusChart" style="height: 370px; width: 100%;"></div>
                </div>
                <div class="border col p-2 m-2">
                    <div id="totalFormLevelChart" style="height: 370px; width: 100%;"></div>
                </div>
                <div class="border col p-2 m-2">
                    <h4 class="font-weight-bold text-center bg-light">최근 검사 내역</h4>
                    <table class="table text-center">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">IP address</th>
                            <th scope="col">개인정보<br>검출 수<br></th>
                            <th scope="col">최근검사일</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${detectCountList}" var="detectInfo" varStatus="info">
                            <tr>
                                <th scope="row">${info.index}</th>
                                <td>${detectInfo.ip}</td>
                                <td>${detectInfo.detectCount}</td>
                                <td>${detectInfo.inspectionDate}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<footer style="height: 50px">
    <div class="container-fluid">
        <div class="row" style="height: 50px">
            <div class="col-2"></div>
            <div class="col align-self-center text-center">@made by HOJE & made in Korea</div>
            <div class="col-2"></div>
        </div>
    </div>
</footer>


</body>

</html>