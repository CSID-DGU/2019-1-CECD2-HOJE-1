<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-08-06
  Time: 오후 1:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<c:forEach var="ImageList" items="${pathList}" varStatus="status">
    <div>
        <div>
            <img src = ${ImageList}>
        </div>
        <div>
            ${textList.get(status.index)}
        </div>
    </div>
</c:forEach>

</body>
</html>
