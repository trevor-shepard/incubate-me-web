import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import {IncubateMeLogo} from 'assets/images'
const MobilePrePurchase: FunctionComponent = () => {
    return (
       <Logo src={IncubateMeLogo} />
    )
}

const Logo = styled.img`
    position: absolute;
    width: 87px;
    height: 17px;
    left: 11px;
    top: 10px;
`

export default  MobilePrePurchase