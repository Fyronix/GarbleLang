
import styled from "styled-components"

export default styled.div`
    border: 2px solid #000;
    border-radius: 5px;
    box-shadow: rgb(0 0 0) 5px 5px 0px 0px;

    overflow: hidden;

    padding: 15px 25px;
    transition: .2s;
    cursor: pointer;

    &:hover {
        box-shadow: none;
    }
`
