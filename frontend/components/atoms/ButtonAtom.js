// atom/ButtonAtom.js

import React from 'react';
import {Icon} from './ImageAtom';

/**
 * 범용 버튼 컴포넌트
 * @param {string} variant - 버튼 스타일 (예: 'primary', 'secondary', 'ghost'). 기본값은 'primary'.
 * @param {string} size - 버튼 크기 (예: 'sm', 'md', 'lg'). 패딩과 폰트 크기 결정.
 * @param {boolean} fullWidth - 너비를 부모 요소에 꽉 채울지 여부.
 * @param {string} className - 추가적인 Tailwind CSS 또는 사용자 정의 클래스.
 * @param {React.ReactNode} children - 버튼 내부의 내용 (텍스트 또는 아이콘 등).
 * @param {object} rest - 기타 표준 <button> 속성 (onClick, type, disabled 등).
 */


const TextButton = (props) => {

    return (
        <a onClick={props.onClick} className={`flex justify-center ${props.className}`}>
            <button
                type={props.type}
            >
                {props.children}
            </button>
        </a>
    );
};

const IconButton = (props) => {

    return (
        <a onClick={props.onClick} className={props.className}>
            <Icon icon={props.icon} size={20}/>
            <button
                type={props.type}
                className={props.className}
            >
                {props.children}
            </button>
        </a>
    );
};

export {TextButton, IconButton
};