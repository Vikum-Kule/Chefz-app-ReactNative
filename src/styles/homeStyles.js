import styled from "styled-components";

export const Container = styled.View`
    background-color: #fff;
    flex: 1;
    alignItems: center;
    padding: 5px;
`;

export const Card = styled.View`
    background-color: #eeeeee;
    width: 100%;
    margin-bottom:20px;
    border-radius: 8px;

`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin: 10px;
    
`;
export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    font-family: 'Lato-Regular';
    
`;

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    
`;

export const PostDate = styled.Text`
    font-size:12px;
    font-family: 'Lato-Regular';
    color: #666;
    
`;

export const PostTitle = styled.Text`
    font-size: 14px;
    font-family:'Lato-Regular';
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 150px;
    margin-top:15px;
    border-radius: 8px;
    
`;