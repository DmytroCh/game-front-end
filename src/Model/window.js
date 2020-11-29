export const getBoardSize = () => {
    if(window.innerHeight <= window.innerWidth)
        return window.innerHeight;
    else
        return window.innerWidth;
}

export const getLeftMargin = () => {
    if(window.innerHeight <= window.innerWidth)
        return (window.innerWidth - window.innerHeight) / 2;
    else
        return 0;
}

export const getTopMargin = () => {
    if(window.innerHeight <= window.innerWidth)
        return 0;
    else
        return (window.innerHeight - window.innerWidth) / 2;
}