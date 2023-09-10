import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import CursorProvider from '../components/Cursor';
import { observer, useLocalObservable } from 'mobx-react';
import * as Image from '../../global-components/Images';
import { CursorContext } from '../components/Cursor';
import MovePart from './Main';
import {PageData} from '../../global-components/utils'

const LargeFrame = memo(styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  cursor: url(${Image.Cursor}), auto;
  animation: ${(props) => {
      return keyframes`

            0%{
              opacity: 0;
              transform:translateX(-20%);
              filter: blur(20px)
            }

            100%{
              opacity: 1;
              transform:translateY(0);
              filter: blur(0);
            }

           `;
    }}
    ease-out ${BasicData.PCBlurTime} forwards;
`);

const FixedFrame = styled.div`
  //background-color: aquamarine;
  width: 100vw;
  display: flex;
  z-index: 10;
  position: absolute;
  pointer-events: none;
`;



const pages = new PageData();

export default observer(function (props) {
  
  const store = useLocalObservable(() => ({
    firstShowPlayground: true,
    jumpTo: undefined,
  }));
  
  return (
    <LargeFrame>
      <CursorProvider>
        <CursorContext.Consumer>
          {(value) => (
            <>
              <FixedFrame>
                <TopBar {...props} pushElement={value} store={store}/>
              </FixedFrame>
              <MovePart {...props} pushElement={value} pages={pages} store={store}/>
            </>
          )}
        </CursorContext.Consumer>
      </CursorProvider>
    </LargeFrame>
  );
})
