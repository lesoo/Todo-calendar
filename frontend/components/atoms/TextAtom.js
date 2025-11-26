// atom/TextAtom.js

import React from 'react';

/**
 * 범용 텍스트 컴포넌트
 * @param {string} tag - 렌더링할 HTML 태그 (예: 'p', 'span', 'h1', 'div'). 기본값은 'p'.
 * @param {string} size - 미리 정의된 텍스트 크기 (예: 'sm', 'md', 'lg').
 * @param {string} weight - 텍스트 굵기 (예: 'normal', 'bold', 'medium').
 * @param {string} color - 텍스트 색상 (예: 'text-gray-800').
 * @param {string} className - 추가적인 Tailwind CSS 또는 사용자 정의 클래스.
 * @param {React.ReactNode} children - 텍스트 내용.
 */

// 크기(Size) 매핑
const sizeClasses = {
    'xs': 'text-xs',      // 12px
    'sm': 'text-sm',      // 14px
    'md': 'text-base',    // 16px (기본)
    'lg': 'text-lg',      // 18px
    'xl': 'text-xl',      // 20px
    '2xl': 'text-2xl',    // 24px
    '3xl': 'text-3xl',    // 30px (제목용)
};

// 굵기(Weight) 매핑
const weightClasses = {
    'thin': 'font-thin',
    'extralight': 'font-extralight',
    'light': 'font-light',
    'normal': 'font-normal', // 400
    'medium': 'font-medium', // 500
    'semibold': 'font-semibold', // 600
    'bold': 'font-bold',     // 700
    'extrabold': 'font-extrabold',
    'black': 'font-black',
};

const Text = ({
    tag: Tag = 'p',
    size = 'md',
    weight = 'normal',
    color = 'text-gray-800',
    className = '',
    children,
    ...rest
}) => {

    const finalClassName = [
        sizeClasses[size] || sizeClasses['md'], // 정의된 크기가 없으면 'md' 사용
        weightClasses[weight] || weightClasses['normal'], // 정의된 굵기가 없으면 'normal' 사용
        color,
        className,
    ].join(' ');

    return (
        <Tag className={finalClassName} {...rest}>
            {children}
        </Tag>
    );
};

const InputText = (props) => {

    return (
        <input
            type={props.type} className={props.className}
            value={props.value} placeholder={props.placeholder}
            onChange={props.onChange}>
            {props.children}
        </input>
    );
};



export {Text, InputText};