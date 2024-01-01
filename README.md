# 알고리즘 스터디 GPGT 내부 사이트 [Randps](https://randps.kr) <img src="https://github.com/klloo/react-randps-client/assets/53117014/7f72440b-af19-4d8a-a92c-35b836e2cd55">

**백준 온라인 저지와 solved.ac를 활용한 알고리즘 스터디의 운영 효율성 증대를 위해 제작한 웹서비스 클라이언트**

### 사용 기술

<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/emotion-CA61B7?style=for-the-badge&logo=emotion&logoColor=white"> 
</div>
<div>
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"> 
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> 
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"> 
<img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white"> 
</div>
<div>
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"> 
</div>

## 서비스 소개

![스크린샷 2023-10-05 오후 2 47 12](https://github.com/klloo/react-randps-client/assets/53117014/fd439c30-2b90-4d04-b634-be360c2525ff)

### 개발 동기

알고리즘 스터디에 참여하던 친구와 알고리즘 스터디를 효율적으로 관리할 수 있는 서비스를 개발하면 좋겠다는 생각에서 시작한 서비스입니다.

진행중이던 알고리즘 스터디의 규칙은 다음과 같았습니다

1. 매일 최소 1문제 해결
2. 주당 최소 5문제 풀이 작성 (노션으로 관리)
3. 위 두 규칙 중 하나라도 위반 시 경고 1회 부여
4. 경고가 4회 누적되면 강퇴
 
그다지 복잡한 규칙은 아니었지만 스터디 인원이 늘어남에 따라 스터디원의 활동을 확인하고 경고를 부여하는 작업이 어려워졌습니다.
이에 따라 초기에는 스터디원의 문제 풀이 현황을 한눈에 파악할 수 있는 몇 가지 기능을 추가하기 시작했습니다. 그 후, 스터디원들의 동기 부여를 위해 다양한 부가 기능을 고려하며 서비스를 계속 확장해 나가게 되었습니다.

### 제공 기능

기본적으로 기존의 알고리즘 스터디를 효율적으로 관리하기 위해 사용자들이 오늘 어떤 문제를 풀었는지 확인할 수 있도록 합니다. 스터디 관리자는 이를 기반으로 경고를 관리하고 사용자를 추가 및 삭제할 수 있는 기능을 제공하고 있습니다.
그리고 스터디원의 동기 부여를 위해 포인트 제도를 도입하고 몇 가지 추가 기능을 제공하고 있습니다.

**1. 랜덤 문제 추천 및 스트릭**

사용자가 마이페이지에서 랜덤 문제 난이도를 설정하면, 해당 난의도의 문제를 매일 하나씩 추천해줍니다. 그리고 이 문제를 풀면, 사용자 정보 하단에 있는 스트릭이 채워지게 됩니다.

<img width="472" alt="스크린샷 2023-10-05 오전 12 42 06" src="https://github.com/klloo/react-randps-client/assets/53117014/3be395dd-d61f-4663-aecc-6e971e810c6f">

<br/>

<br/>

**2. 팀 대항**

매주 사용자들이 무작위로 두 팀으로 나뉘어 대결하는데, 이 때 팀의 점수는 팀원들이 해결한 문제의 난이도를 기반으로 책정됩니다. 일주일이 지난 후에는 새로운 팀이 구성되며, 지난 주에 승리한 팀에 추가 포인트가 주어집니다.

![스크린샷 2023-10-05 오전 12 42 20](https://github.com/klloo/react-randps-client/assets/53117014/2b28c9d3-69cb-44b4-878f-3274e9460050)

<br/>

**3. 통계**

사용자의 문제 풀이 현황, 포인트 등의 지표를 통해 스터디의 전반적인 상황을 시각적으로 확인할 수 있는 통계 기능을 제공합니다.


<img width="1438" alt="스크린샷 2023-10-05 오전 12 42 55" src="https://github.com/klloo/react-randps-client/assets/53117014/b4e8dea9-969b-4e9d-84e8-930c6bc5e6c9">
<img width="1440" alt="스크린샷 2023-10-05 오전 12 43 10" src="https://github.com/klloo/react-randps-client/assets/53117014/e1b0a7f7-8f17-41ad-a863-db9ae46c8a9b">

<br/>

<br/>

**4. 마크다운 게시판**

마크다운 게시판 기능을 제공합니다. 문제풀이와 질문 게시판에서는 문제 번호를 입력하면 자동으로 해당 문제의 정보와 링크가 제공됩니다.

<div>
<img width="1429" alt="스크린샷 2023-10-05 오후 3 17 20" src="https://github.com/klloo/react-randps-client/assets/53117014/d2edca4f-badf-44ac-8e8d-3d71f98686c9">
<img width="1439" alt="스크린샷 2023-10-05 오전 12 44 02" src="https://github.com/klloo/react-randps-client/assets/53117014/c37efcfa-aebd-4131-b5e2-41873234dc87">
</div>

<br/>


**5. 아이템**

아이템과 상점 기능을 제공합니다. 문제를 풀어 획득한 포인트로 상점에서 아이템을 구매하고 마이페이지에서 사용할 수 있습니다.

<div>
<img width="1440" alt="스크린샷 2023-10-05 오후 3 17 20" src="https://github.com/klloo/react-randps-client/assets/53117014/1d25a91c-b472-4ee4-b802-da95cdab2f95">
 
![스크린샷 2023-10-05 오후 3 28 01](https://github.com/klloo/react-randps-client/assets/53117014/952f7875-11eb-4087-af57-4a9383fe5879)
</div>

<br/>


## 서비스 아키텍처

**배포 환경**

![스크린샷 2023-10-05 오후 4 05 52](https://github.com/klloo/react-randps-client/assets/53117014/f20933c0-cea4-43d0-8307-d22f1e3d9ed7)

**CI/CD Workflow**

![스크린샷 2023-10-05 오후 4 05 56](https://github.com/klloo/react-randps-client/assets/53117014/97b70409-b182-4cb2-92ca-fd7c3b30adef)

