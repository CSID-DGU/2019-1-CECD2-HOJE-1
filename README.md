# 2019-1-CECD2-HOJE-1
### 컴퓨터공학종합설계1_02_HOJE
##### 프로젝트 주제 : OCR를 이용한 개인정보 검출

Client Application
----------------------
![클라이언트Application](https://user-images.githubusercontent.com/26684848/68988738-58171d00-087f-11ea-819a-1aa345e1f1ef.JPG)
	
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
	역할 :  1. 학습 앱에서 받은 문자 학습 결과물 및 새롭게 추가된 정규표현식을 클라이언트 앱에 배포
	        2. 이미지 분류
		3. 클라이언트에서 검출된 개인정보 및 이미지 보유 적합도 모니터링
	
학습 Application 플랫폼
-------------------
![학습application](https://user-images.githubusercontent.com/26684848/68988745-741abe80-087f-11ea-8887-cb2b530589e9.JPG)

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
