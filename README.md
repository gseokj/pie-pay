<div style="text-align:center;">
  <img src="README.assets/piepaylogo.svg" width="80%"/>
</div>

# :page_facing_up:목차
1. [서비스 소개](#서비스-소개)
2. [기획 배경](#기획-배경)
3. [화면소개](#-화면-소개)
4. [기술 스택](#-기술-스택)
5. [서비스 아키텍처](#-서비스-아키텍처)
6. [시퀸스 다이어그램](#-시퀸스-다이어그램)
7. [프로젝트 산출물](#-프로젝트-산출물)
<br/><br/>

# :dollar:서비스 소개
## 서비스 설명
### 개요
- 빠른 N분배 정산 가능한 Pay
### 대상:family:
- 정기적으로 모이는 모임이 있는 사람들
- 모임 후 정산 요청을 보내기 귀찮은 사람들
- 모임 후 정산해야 한다는 사실을 잘 잊는 사람들
- 모임에서 어떤 활동을 했는지 추억을 남기고 싶은 사람들
<img src="assets/페르소나.jpg" width="80%" height="20%"/>

## UCC🎞️

**↓ 클릭 후 UCC 페이지로 이동**

[![Video Label](썸네일)](링크)

<br/>
[Top](#목차)
<br/><br/>

# :yen:기획 배경
## 배경
친구들과 즐거운 시간을 보내고 나면 반드시 해야하는 귀찮은 과정이 있습니다. 바로 정산!

하지만 카카오톡 정산을 활용하면 상대가 돈을 보내줄 때까지 눈치보며 기다려야 했습니다. :cry:

이를 위해 정산 과정에서 기다릴 필요도, 눈치볼 필요도 없도록 **파이페이**가 탄생했습니다!

## 목적

**정산을 위해 일일이 찾아다니지 말고, 결제하면서 정산하자!**

## 의의
- 정산 과정 간소화
- 개별 계산 or 개별 이체의 과정을 생략
- 결제 내역을 통한 모임의 추억 저장
[Top](#목차)
<br/><br/>

# :iphone: 화면 소개
<details>
<summary> 회원가입</summary>
<img src="./assets/화면소개/회원가입.gif" width="200">
</details>

<details>
<summary>모임만들기</summary>
<img src="./assets/화면소개/모임만들기.gif" width="200">
</details>

<details>
<summary>모임입장</summary>
<img src="./assets/화면소개/모임입장.gif" width="200">
</details>

<details>
<summary>결제</summary>
<img src="./assets/화면소개/결제.gif" width="300">
</details>


<details>
<summary>모임상세</summary>
<img src="./assets/화면소개/모임상세.gif" width="200">
</details>


<details>
<summary>정산</summary>
<img src="./assets/화면소개/정산.gif" width="200">
</details>
[Top](#목차)
<br/><br/>

# :floppy_disk:기술 스택
## 코드 컨벤션
<details>
<summary>BE</summary>

###### Intelij Formatter 적용
- 네이버 핵데이 java 코딩 컨벤션 <https://naver.github.io/hackday-conventions-java/>
- Actions on Save 자동 적용
</details>


<details>
<summary>FE</summary>

##### 파일 및 폴더 구조

```bash
-src
  -app              # Next.js 페이지
    -assets           # 이미지,아이콘 폴더
    -_component
    -hooks            # custom hooks
    -api              # 백엔드와 통신하는 api 서비스
    -utils            # 유틸리티 함수 및 상수
    -mocks            # MSW
  -model                # interface
  -store                # zustand
```

##### 폴더 및 파일 네이밍

페이지는 `src/app` 폴더에 작성

- **폴더 네이밍**: `카멜 케이스`를 기본으로 하며, 컴포넌트 폴더일 경우에는 _component로 작성한다.
- *파일 네이밍*: component, layout, page 파일일 경우에만 .tsx 확장자를 사용하며, 그 외에는 .ts를 사용한다.
- **Custom hook**: `use` + 함수명으로 작성한다.

##### 문장 종료

반드시 세미콜론을 사용

##### 명명 규칙

- 상수는 영문 대문자, 스네이크 표기법을 사용

```jsx
const NAME_ROLE;
```

##### 스타일 속성 선언 순서

[NHN 코딩 컨벤션](https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf)에 따라 속성을 선언할 때는 레이아웃과 관련이 큰 것부터 시작하여 레이아웃과 무관한 것 순서로 선언한다.
https://archuive.tistory.com/72

1. 레이아웃
2. Box
3. 배경
4. 폰트
5. other

##### Eslint Prettier

- [Airbnb](https://github.com/airbnb/javascript) 스타일 가이드를 사용.

##### 함수

함수 표현식을 사용하며, Arrow function을 사용한다.

```tsx
// Bad
function fnName() {}; Array.map(function(x){ retrun {}; })

// Good
const fnName = () => {}; Array.map(x => x);

```

##### 함수 컴포넌트와 Props

함수 컴포넌트를 작성할 때에는 `React.FC<Props>` 대신에, 인자로 받은 Props를 중괄호로 감싸서 사용한다.

```tsx
// Bad
const Component: React.FC<Props> = ({ item }) => {
  return <div>{item}</div>;
};

// Good
const Component = ({ item }: Props) => {
  return <div>{item}</div>;
};
```

##### Typescript

1. 모든 파일은 TypeScript로 작성되어야 하며, 타입 선언은 명시적이게 한다.
2. any는 가급적 사용하지 않는다.

```tsx
function calculateTotal(price: number, quantity: number): Props {
  return price * quantity;
}
```

##### Styled Components

반복되는 태그는 Styled Components를 사용하여 컴포넌트별로 스타일링할 때, 컴포넌트와 스타일이 함께 정의되어야 한다.

```tsx
import styled from 'styled-components';

const Button = styled.button`};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid blue;
  border-radius: 4px;
`;

export default Button;
```

##### Tailwind CSS

반복되지 않는 태그는 가능하다면 Tailwind CSS를 사용한다.

```tsx
// 예시: Tailwind CSS 클래스 사용
<div className="flex justify-center items-center bg-gray-200 p-4">
  <p className="text-lg font-bold text-blue-500">Welcome!</p>
</div>
```
</details>

[Top](#목차)
<br/><br/>


# :open_file_folder:서비스 아키텍처

<img src="/assets/architecture.png" width="80%"/>

# :chart_with_upwards_trend:시퀀스 다이어그램
### 회원가입 시퀀스
![signup](assets/signup_sequence.png)


### 휴대폰 본인인증 시퀀스
<img src="/assets/phone_certification_sequence.png" width="80%"/>

### 계좌 본인인증 시퀀스
<img src="/assets/account_certification_sequence.png" width="80%"/>

### 로그인 시퀀스
<img src="/assets/login_sequence.png" width="80%"/>

### 모임 생성 및 참여 시퀀스
<img src="/assets/meet_sequence.png" width="80%"/>

### 결제 참여자 선택 시퀀스
<img src="/assets/participant_sequence.png" width="80%"/>

### 결제 및 정산 시퀀스
<img src="/assets/pay_sequence.png" width="80%"/>

[Top](#목차)
<br/><br/>

# :scroll:프로젝트 산출물

### 요구사항 명세서
[<img src="assets/요구사항명세서.PNG" width="80%"/>)](https://www.notion.so/c75d4b66f4304098822f0dfa1fcffc2e)

### 기능 명세서
[<img src="assets/기능명세서.PNG" width="80%"/>](https://www.notion.so/dd29f25471bf4ee3878a19eb92e355aa)

### API 명세서
[<img src="assets/API명세서.PNG" width="80%"/>](https://www.notion.so/API-e4dc78cf4bb24312b34de0a942938512)

###  Figma
<img src="assets/피그마.PNG" width="80%"/>

### ERD
<img src="assets/erd.PNG" width="80%"/>


# :raising_hand:팀원
<div align="center">



|**류지수(팀장)**<br>|**고석주**<br>|**김준수**<br>|**이성목**<br>|**함승찬**<br>|**황재언**<br>|
| :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://secure.gravatar.com/avatar/30796a5ca36f86621d9e7abe1ad15221?s=192&d=identicon" height=150 width=150> <br/> @onassis793](https://lab.ssafy.com/onassis793) | [<img src="assets/profile/goseokju.jpg" height=150 width=150> <br/> @hgoa2000](https://lab.ssafy.com/hgoa2000) | [<img src="https://secure.gravatar.com/avatar/c5adcea95c51bc60dc7f36b183716250?s=192&d=identicon" height=150 width=150> <br/> @pittuarez](https://lab.ssafy.com/pittuarez) | [<img src="assets/profile/leeseongmok_profile.jpeg" height=150 width=150> <br/> @CocoisCat](https://lab.ssafy.com/CocoisCat) | [<img src="https://secure.gravatar.com/avatar/8f209ad61e9e72afa3c4dc5a3e5634e9?s=192&d=identicon" height=150 width=150> <br/> @head0618](https://lab.ssafy.com/head0618) | [<img src="https://secure.gravatar.com/avatar/1b8d41d61dbe17bdf60b770edc8c8124?s=192&d=identicon" height=150 width=150> <br/> @hju753](https://lab.ssafy.com/hju753) |

</div>

[Top](#목차)
