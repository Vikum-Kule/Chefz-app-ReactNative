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
    font-size: 16px;
    font-family:'Lato-Regular';
    margin-left:15px;

`;

export const PostImg = styled.Image`
    width: 100%;
    height: 150px;
    margin-top:15px;
    border-radius: 8px;
    
`;


export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: left;
    width:90%;
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 2px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;
export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #2e64e515;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: #2e64e5;
`;