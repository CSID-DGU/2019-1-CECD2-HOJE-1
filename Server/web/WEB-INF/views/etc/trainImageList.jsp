<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-08-06
  Time: 오전 10:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet" />
</head>
<body>

<c:forEach var="viewList" items="${requestImageList}">
    <div>
        <a href = "${pageContext.request.contextPath}/singleOCRRequestView?folderPath=${viewList.folderPath}">
            <div class="container">
                <c:forEach var="thumbNail" items="${viewList.imagePath}">
                    <div class="box"><img src="${thumbNail}" width="100", height="50"></div>
                </c:forEach>
            </div>
            <div>
                <div>${viewList.ip}</div>
                <div>${viewList.requestTime}</div>
            </div>
        </a>
    </div>
</c:forEach>

</body>
</html>
