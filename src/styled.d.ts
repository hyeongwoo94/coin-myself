import "styled-components";

declare module "styled-components"{
  export interface DefaultTheme {
    textColor:string;
    bgColor:string;
    accentColor:string;
  }
}
//추가하고 싶은것을 아래로 쭉 추가하면됨.