<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-08-01
  Time: 오후 4:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
    <script type="text/javascript">
        window.onload = function() {

            var dps = [[]];
            var chart = new CanvasJS.Chart("chartContainer", {
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
                    dataPoints: dps[0]
                }]
            });

            var xValue;
            var yValue;

            <c:forEach items="${dataPointsList}" var="dataPoints" varStatus="loop">
                <c:forEach items="${dataPoints}" var="dataPoint">
                    xValue = parseInt("${dataPoint.x}");
                    yValue = parseFloat("${dataPoint.y}");
                    label = "${dataPoint.label}";
                    indexLabel = "${dataPoint.indexLabel}";
                    dps[parseInt("${loop.index}")].push({
                        x : xValue,
                        y : yValue
                    });
                </c:forEach>
            </c:forEach>

            chart.render();

        }
    </script>
    <title>Title</title>
</head>
<body>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
</body>
</html>
