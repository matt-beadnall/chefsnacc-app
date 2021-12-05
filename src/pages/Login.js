import React from 'react';
import styled from "styled-components";
import { AccountBox } from '../components/accountBox';


// Created as part of a login tutorial

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default function Login() {
    return <AppContainer>
        <AccountBox />
    </AppContainer>;
    
}
