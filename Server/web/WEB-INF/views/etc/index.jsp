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
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
  <h3>Form test</h3>

  <form action = "test" method = "Post">
      <div class="from-group form-row align-center">
          <div class="col-1"></div>
          <div class="col-10 border">
              <div class="form-row m-1 pt-2">
                  <%--<form action = "test" method = "Post">--%>
                  <div class="from-group col text-right">
                      <button type="button" class="btn btn-danger">취소</button>
                      <button type="submit" class="btn btn-primary">확인</button>
                  </div>
              </div>

              <div class="form-row pt-2 pb-2 m-1">
                  <%--<form action = "test" method = "Post">--%>
                  <%--<div class="from-group col text-right">--%>
                      <%--<button type="button" class="btn btn-danger">취소</button>--%>
                      <%--<button type="submit" class="btn btn-primary">확인</button>--%>
                  <%--</div>--%>
                  <div class="from-group col-3 position-relative border">
                      <img src="/1.jpg" style="max-height: 100%; max-width: 100%;">
                      <input type ="text" class="form-control" id="imagePath0" name="imagePath" value="test/testPath" style="display: none"/>
                      <a href="#" onclick="window.open('/1.jpg','','scrollbars=yes,width=417,height=385,top=10,left=20');" class="stretched-link"></a>
                  </div>
                  <div class="col-4 border p-2">
                      문 의 내 용 : 테스트
                  </div>
                  <div class="form-group form-col col-5 border p-2">
                      <div class="form-group form-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">번호</span>
                          </div>
                          <input type="text" class="form-control" id="index0" name="index" value="1" readonly/>
                      </div>
                      <div class="form-group form-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">IP 주소</span>
                          </div>
                          <input type="text" class="form-control" id="ip0" name="ip" value="111.111.111.111" readonly/>
                      </div>
                      <div class="form-group input-group input-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">요청부서</span>
                          </div>
                          <input type="text" class="form-control" id="depart0" name="depart" value="HR"readonly/>
                      </div>
                      <div class="form-group input-group input-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">요청일</span>
                          </div>
                          <input type="text" class="form-control" id="requestTime0" name="requestTime" value="19/12/01/ 12:00:00"readonly/>
                      </div>
                      <div class="form-group input-group input-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">이미지 분류 명칭</span>
                          </div>
                          <input type="text" class="form-control" id="formName0" name="formName" value="입력해주세요">
                      </div>
                      <div class="form-group input-group input-group-sm mt-2 mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text">문서 권한 설정</span>
                          </div>
                          <select class="form-control" id="formLevel0" name="formLevel">
                              <option value="">select</option>
                              <option value="공개"> 공개 </option>
                              <option value="사내한">사내한</option>
                              <option value="대외비">대외비</option>
                          </select>
                      </div>
                  </div>
                  <%--</form>--%>
              </div>
          </div>
      </div>
  </form>

</body>
</html>
