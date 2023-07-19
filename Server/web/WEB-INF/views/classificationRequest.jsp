<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
            <li class="active">
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
            <c:forEach var="imageInfo" items="${imageInfoList}" varStatus="loop">
                <form action = "dhashRegistration" method="Post" onsubmit="_submit(this);"> <%--test--%>
                    <div class="from-group form-row align-center">
                        <div class="col-1"></div>
                        <div class="col-10 border">
                            <div class="form-row m-1 pt-2">
                                <div class="from-group col text-right">
                                    <button type="button" class="btn btn-danger">취소</button>
                                    <button type="submit" class="btn btn-primary">확인</button>
                                </div>
                            </div>
                            <div class="form-row pt-2 pb-2 m-1">
                                <div class="from-group col-3 position-relative border">
                                    <img src="${imageInfo.imagePath}" style="max-height: 100%; max-width: 100%;">
                                    <input type ="text" class="form-control" id="imagePath${loop.index}" name="imagePath" value="${imageInfo.imagePath}" style="display: none"/>
                                    <a href="#" onclick="window.open('${imageInfo.imagePath}','','scrollbars=yes,width=417,height=385,top=10,left=20');" class="stretched-link"></a>
                                </div>
                                <div class="col-4 border p-2">
                                    문 의 내 용 : ${imageInfo.comment}
                                </div>
                                <div class="form-col col-5 border p-2">
                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">번호</span>
                                        </div>
                                        <input type="text" class="form-control" id="index${loop.index}" name="index" value="${imageInfo.id}" readonly/>
                                    </div>
                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">IP 주소</span>
                                        </div>
                                        <input type="text" class="form-control" id="ip${loop.index}" name="ip" value="${imageInfo.ip}" readonly/>
                                    </div>
                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">요청부서</span>
                                        </div>
                                        <input type="text" class="form-control" id="depart${loop.index}" name="depart" value="${imageInfo.requestDepart}"readonly/>
                                    </div>
                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">요청일</span>
                                        </div>
                                        <input type="text" class="form-control" id="requestTime${loop.index}" name="requestTime" value="${imageInfo.requestTime}"readonly/>
                                    </div>
                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">이미지 분류 명칭</span>
                                        </div>
                                        <input type="text" class="form-control" id="formName${loop.index}" name="formName" placeholder="입력해주세요">
                                    </div>

                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">보유 적합 부서 선택</span>
                                        </div>
                                        <input type="checkbox" class="form-control" id="check1_${loop.index}" name="departCheck" value="HR"> 인사과
                                        <input type="checkbox" class="form-control" id="check2_${loop.index}" name="departCheck" value="DEV"> 개발과
                                        <input type="checkbox" class="form-control" id="check3_${loop.index}" name="departCheck" value="INFORMATION"> 전산과
                                    </div>

                                    <div class="form-group input-group input-group-sm mt-2 mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">문서 권한 설정</span>
                                        </div>
                                        <select class="form-control" id="formLevel${loop.index}" name="formLevel">
                                            <option value="">select</option>
                                            <option value="공개"> 공개 </option>
                                            <option value="사내한">사내한</option>
                                            <option value="대외비">대외비</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </c:forEach>
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