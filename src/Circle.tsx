import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor:string;
  borderColor:string;
}

const Container = styled.div<ContainerProps>`
height: 100px;
width: 100px;
background-color: ${(props) => props.bgColor};
border-radius: 100px;
color: #888;
border : 5px solid ${(props) => props.borderColor};
`;
//interface로 속성을 지정해줬다면 해당 컴포넌트에 지정한 속성을 넣어줘야 리턴이 되고 화면에 나온다.
//왜냐하면 하나의 객체이기 때문에 객체에 무엇이 들어가야하는지 기초셋팅이 있어야한다. 만약 이것이 없다면 아무것도없이 이름만 지어준것이기
//때문이다. ====css에서는 props가 옵션인 상태가 아니고 circleprops에서는 옵션이기 때문이다.

interface CircleProps {
  bgColor:string;
  borderColor?:string;
  text?: string;
}
//?:를 붙여주면 있어도 되고 없어도 된다. :만 있으면 무조건 속성을 지정해줘야 한다.
//text는 노멀한 ES6자바스크립트 문구이다.
const Circle = ({bgColor, borderColor, text ="텍스트 없음"}:CircleProps) =>{

  // const [counter,setCounter] = useState(1);
  // const [value,setValue] = useState<string|number>();
  //두번째 줄은 타입을 두가지를 사용할수 있도록 만드는 방법, 첫번째: 예측하여 타입을 지정해준다.
  
  return(
    <Container bgColor = {bgColor} borderColor = {borderColor ?? "blue"}>
      {text}
    </Container>

  )
} 
//CircleProps의 테두리는 선택이지만 ContainerProps의 테두리는 무조건이라서 App.tsx에서 하나의 Circle에만 테두리값을 준다면 오류가 난다.
//그래서 초기값을 설정해준다. 초기값을 설정하는 방법은 ?? 만 쓰면 된다.
export default Circle;