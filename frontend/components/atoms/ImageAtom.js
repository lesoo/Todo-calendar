import React from 'react';


function importAll(r) {
    const imgs = {};
    r.keys().forEach((key) => {
        const filename = key.replace('./', '').split('.')[0];
        imgs[filename] = r(key);
    });
    return imgs;
}

const images = importAll(
    require.context('../../public', false, /\.(png|jpe?g|svg)$/)
);

const ImageAtom = (props) => {
    return (
        <div className='p-4 flex justify-center items-center'>
        <img
            src={props.imgSrc+'.png'}
            alt={props.imgSrc}
            className='max-w-xs' />
        </div>
    );
}

const Icon = (props) => {
    const svgPath = `icons/${props.icon}.svg`;
    return (
        <div className={props.className ? props.className : 'p-2'}>
            <img
                src={svgPath}
                alt='Custom Icon'
                // 크기는 CSS나 style 속성으로 지정합니다.
                width={props.size}
                height={props.size}
                fill={props.color ? props.color : 'currentColor'}
            />
        </div>
    );
}

export { ImageAtom, Icon };