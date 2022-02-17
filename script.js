const inp = document.getElementById('inp');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const banner = document.querySelector(".banner");
let imgPixels;


inp.oninput = () => {
    if (inp.value) {
        banner.style.display = "block   ";
        [ctx.textBaseline, ctx.textAlign, ctx.font, ctx.fillStyle] = ['bottom', 'center', '45px Georgia', "#000000"];
        ctx.fillText(inp.value, (canvas.width / 2) - 20, (canvas.height / 2) + 5);
        canvasToImage();
        imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const imgMatrix = printImg().map((el) => el.join('')).join('\n'); 
        banner.innerHTML = imgMatrix;
        

    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        banner.style.display = "none";
    }

}


function canvasToImage () {
    const img = new Image();
    img.src = canvas.toDataURL();
}


function printImg() {
    const matrix = []
    for (let i = 0; i < canvas.height; i++) {
        const width = canvas.width * 4
        matrix[i] = imgPixels.data.slice(width * i, width * i + width).reduce((acc, next, idx, arr) => {
            if (idx && idx % 4 === 0) acc.push(+arr.slice(idx - 4, idx).join('')?  inp.value : "``");
            return acc;

        }, [])
       
    }
   return matrix;

}

