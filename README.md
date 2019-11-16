# 2019-1-CECD2-HOJE-1
컴퓨터공학종합설계1_02_HOJE
----
프로젝트 주제 : OCR를 이용한 개인정보 검출

서버 플랫폼 
--------------
	플랫폼 : Window 10
	개발환경 : Intellj
	프레임워크 : Spring 4.2
	사용언어: Java, jsp, javaScript
	역할 :  1. 학습 앱에서 받은 문자 학습 결과물 및 새롭게 추가된 정규표현식을 클라이언트 앱에 배포
	        2. 이미지 분류
		3. 클라이언트에서 검출된 개인정보 및 이미지 보유 적합도 모니터링

Client Application 플랫폼
----------------------
	플랫폼 : Window 10
	개발환경 : VS, Node.js 10.16.0, IntellJ
	프레임워크 : 일렉트론, 리엑트
	사용언어 : JavaScript(node.js) 
	역할 : 사용자에게 서비스를 제공하는 애플리케이션 형태

분류 Application
----------------------
![분류Application](https://user-images.githubusercontent.com/26684848/68988701-cdceb900-087e-11ea-948e-aebdb14921db.JPG)

	개발환경 : Visual studio 2017
	프레임워크 : Tessearct OCR, OpenCV, jsoncpp 
	사용언어 : C/C++
	역할 :  1)사용자가 클라이언트 Application을 통해 검사를 수행하면 이미지 전처리
		2)이미지 내 텍스트 추출/마스킹/서브텍스트 추출 등의 기능 수행
	

	
학습 Application 플랫폼
-------------------
	플랫폼 : 리눅스, 우분투
	개발환경 : Qt Creator, Vs Code
	프레임워크 : Qt	
	사용언어 : bash script, c++, 
	역할 : 문자 학습 

역할 분담
---------
	은종혁 : Tesseract OCR 학습 서버
	장민석 : Back-end 와 front-end 연결 및 UI
	오택완 : Back-end 및 서버 구현
	황영식 : 이미지 전처리 및 UI
	
실행 방법
---------
* [클라이언트 앱](https://github.com/CSID-DGU/2019-1-CECD2-HOJE-1/wiki/ExecuteClientApp)
* [학습 앱](https://github.com/CSID-DGU/2019-1-CECD2-HOJE-1/wiki/ExecuteQt)


애플리케이션(프로토 타입) 조건
------------------------
	1. 항상 서버는 실행되고 있는 상황으로 간주한다. 
	2. 이미지(jpg,png,bmp)의 파일을 입력값으로 받는다. 단, 이미지 같은 경우, 정상적으로 찍혀진 사진을 대상으로 한다.



