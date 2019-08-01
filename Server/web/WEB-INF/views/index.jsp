<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-07-08
  Time: 오후 1:04
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <h3>Dhash insert test</h3>

  <div>
    <table>
      <tr>
        <td>number</td>
        <td>image</td>
        <td>request_depart</td>
        <td>status</td>
        <td>submit test</td>
      </tr>

      <c:forEach var="imageInfo" items = "${imageInfoList}">
      <tr>
        <td>${imageInfo.getId()}</td>
        <td><img src="${imageInfo.getImagePath()}" width="100" height="100"></td>
        <td>${imageInfo.getRequestDepart()}</td>
        <td>${imageInfo.getStatus()}</td>
        <td><a href = "${pageContext.request.contextPath}/imageRequestProcess?index=${imageInfo.getId()}"> check </a></td>
      </tr>
      </c:forEach>
    </table>
  </div>

</body>
</html>
