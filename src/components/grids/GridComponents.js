import styled, { css } from "styled-components";

export const DashGridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`

export const DashGridItem = styled.div`
    background: white;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
`

export const DashItemTitle = styled.h3`
    margin:0px;
`