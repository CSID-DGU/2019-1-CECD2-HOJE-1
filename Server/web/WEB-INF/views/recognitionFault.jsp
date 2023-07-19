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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
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
            <li>
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
            <li class="active">
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
        <div class="container-fluid overflow-auto">
            <div class="row pb-5"><div class="col-md- mr-auto"><button class="btn btn-lg" onclick="location.href='${pageContext.request.contextPath}/imageDownload'" style="color: #33691e; border-color: #33691e;">일괄다운로드</button></div></div>
            <div class="row">
                <c:forEach var="viewList" items="${requestImageList}">
                <div class="col-4 p-4">
                    <div class="row position-relative border border-dark">
                        <c:forEach var="thumbNail" items="${viewList.imagePath}">
                            <div class="col-6">
                                <div class="row align-items-center" style="height: 100px;">
                                    <div class="col align-self-center">
                                        <img class="border d-block mr-auto ml-auto" src="${thumbNail}" style="max-height: 100px; max-width: 100%;">
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                        <a href="${pageContext.request.contextPath}/singleOCRRequestView?folderPath=${viewList.folderPath}&ip=${viewList.ip}&reqTime=${viewList.requestTime}" class="stretched-link" class="stretched-link"></a>
                    </div>
                    <div class="row border-left border-right border-bottom border-dark pt-2 pb-2">
                        <div class="col-6 text-left">${viewList.ip}</div>
                        <div class="col-6 text-right">${viewList.requestTime}</div>
                    </div>
                </div>
                </c:forEach>
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