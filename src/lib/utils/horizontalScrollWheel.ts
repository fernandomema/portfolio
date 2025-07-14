export function horizontalWheelScroll(node: any) {
    node.addEventListener("wheel", (event: any) => {
        
        let [x, y] = [event.deltaX, event.deltaY];
        let magnitude;

        if (x === 0) {
            magnitude = y > 0 ? 30 : -30;
        } else {
            magnitude = x;
        }
        console.log(magnitude, node.scrollLeft, node.scrollWidth, window.innerWidth, node.innerWidth - window.innerWidth);
        if (magnitude < 0 && node.scrollLeft != 0) {
            event.preventDefault();
        } else if (magnitude > 0 && Math.ceil(node.clientWidth + node.scrollLeft) != node.scrollWidth) {
            event.preventDefault();
            console.log(Math.ceil(node.clientWidth + node.scrollLeft), node.scrollWidth);
        }

        

        console.log({ x, y, magnitude });
        node.scrollBy({
            left: magnitude
        });
        return false;
    });
};