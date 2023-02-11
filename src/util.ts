export const swiper = (begin:number, end:number) => {
    let idx = 0;
    return function swipe (prevOrNext: -1 | 1) {
        switch(prevOrNext) {
            case 1:
                if(idx === end) {
                    idx = begin
                } else {
                    idx += 1;
                }
                return idx;
            case -1:
                if(idx === begin) {
                    idx = end 
                } else {
                    idx -= 1;
                }
                return idx;
            default:
                return -1;
        }
    }
}