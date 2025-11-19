import React from "react";


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

export default function ImageAtom(props) {
    return (
        <div className="p-4 flex justify-center items-center">
        <img
            src={props.imgSrc+'.png'}
            alt={props.imgSrc}
            className="max-w-xs" />
        </div>
    );
}
