<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-07-22
  Time: 오전 9:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Title</title>
    <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
</head>
<body>

<script>
    $(document).ready(function(){
        $("#FORMLEVEL").val("${recommendFormLevel}").attr("selected", true);
    });
</script>

<form action = "dhashRegistration" method="Post">
    <table>
        <tr>
            <td><input type="text" name="index" value="${viewData.getId()}" readonly/></td>
        </tr>
        <tr>
            <td><input type="text" name="depart" value="${viewData.getRequestDepart()}"readonly/></td>
        </tr>
        <tr>
            <td><input type="text" name="status" value="${viewData.getStatus()}"readonly/></td>
        </tr>
        <tr>
            <td><img src = "${viewData.getImagePath()}"></td>
        </tr>
        <tr>
            <td><input type="text" name="formName" value="${recommendFormName}"></td>
        </tr>
        <tr>
            <td><input type ="text" name="imagePath" value="${viewData.getImagePath()}" style="display: none"/></td>
        </tr>
        <tr>
            <td>
                <select name="formLevel" id="FORMLEVEL">
                    <option value="">select</option>
                    <option value="공개"> 공개 </option>
                    <option value="사내한">사내한</option>
                    <option value="대외비">대외비</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><button type="submit">이미지 등록</button></td>
        </tr>
    </table>
</form>

</body>
</html>
