
import styled from "styled-components";
import { PAGE_PADDING } from "./constants";

const PADDING_EXTRA = '10px';

export const AppWrapper = styled.div`

    height: calc(100vh - (${PAGE_PADDING} * 2 + ${PADDING_EXTRA}));

    overflow: hidden;
    display: flex;

    padding: ${PAGE_PADDING} ${PAGE_PADDING} calc(${PAGE_PADDING} + ${PADDING_EXTRA}) ${PAGE_PADDING};
`
