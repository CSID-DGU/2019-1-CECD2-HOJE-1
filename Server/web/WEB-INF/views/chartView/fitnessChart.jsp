<%--
  Created by IntelliJ IDEA.
  User: GIGABYTE
  Date: 2019-08-01
  Time: 오후 1:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <script type="text/javascript">
        window.onload = function() {

            var dataPoints = [[],[],[]];
            var chart = new CanvasJS.Chart("chartContainer", {
                zoomEnabled: true,
                theme: "light2",
                title: {
                    text: "Image Fitness Status"
                },
                axisX: {
                    title: "test",
                    includeZero: false
                },
                axisY:{
                    title: "test",
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
                    dataPoints: dataPoints[0]
                },
                {
                    type: "line",
                    color:"green",
                    xValueType: "dateTime",
                    yValueFormatString: "#,###",
                    showInLegend: true,
                    name: "적합" ,
                    dataPoints: dataPoints[1]
                },
                {
                    type: "line",
                    color:"orange",
                    xValueType: "dateTime",
                    yValueFormatString: "#,###",
                    showInLegend: true,
                    name: "보통" ,
                    dataPoints: dataPoints[2]
                }]
            });

            var yValue;
            var xValue;

            <c:forEach items="${dataPointsList}" var="dataPoints" varStatus="loop">
                <c:forEach items="${dataPoints}" var="dataPoint">
                    yValue = parseInt("${dataPoint.y}");
                    xValue = parseFloat("${dataPoint.x}");
                    dataPoints["${loop.index}"].push({
                        x : xValue,
                        y : yValue,
                    });
                </c:forEach>
            </c:forEach>

            chart.render();
        }
    </script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>

</body>
</html>