import imgList from "../public/images";

const imgRgba2Bg = (url: string) => {
  const image = new Image();
  image.src = url;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const pixelData = imageData.data;
    const rowSize = canvas.width * 4; // 每行像素数据的长度为 width * 4
    const numRows = canvas.height;

    const rowColors = [];

    for (let i = 0; i < numRows; i++) {
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let totalA = 0;

      for (let j = 0; j < rowSize; j += 4) {
        // 从像素数据中获取 rgba 值
        const r = pixelData[i * rowSize + j];
        const g = pixelData[i * rowSize + j + 1];
        const b = pixelData[i * rowSize + j + 2];
        const a = pixelData[i * rowSize + j + 3];

        // 将 rgba 值累加到总值中
        totalR += r;
        totalG += g;
        totalB += b;
        totalA += a;
      }

      // 计算 rgba 平均值
      const avgR = Math.round(totalR / (rowSize / 4));
      const avgG = Math.round(totalG / (rowSize / 4));
      const avgB = Math.round(totalB / (rowSize / 4));
      const avgA = Math.round(totalA / (rowSize / 4));

      // 将平均值存储到数组中
      rowColors.push(`rgba(${avgR}, ${avgG}, ${avgB}, ${avgA})`);
    }

    // 将每行的平均值作为背景颜色设置给包裹图片的元素
    const bg = document.querySelector("#bg");
    if (!bg) return;
    for (let i = 0; i < numRows; i++) {
      bg.style.background = `linear-gradient(to bottom, ${rowColors.join(",")}`;
    }
  };
};
export function App() {
  function handleMouseEnter(image: string) {
    imgRgba2Bg(image);
  }
  function handleMouseLeave() {
    //
  }
  console.log(imgList);
  return (
    <div id="bg" className="h-full w-full flex items-center justify-center ">
      <div className="grid gap-20 grid-cols-3 cursor-pointer">
        {imgList.map((v: string, index: number) => {
          return (
            <img
              onMouseEnter={() => handleMouseEnter(v)}
              onMouseLeave={handleMouseLeave}
              style={{
                height: "400px",
                width: "300px",
              }}
              key={index}
              alt="图片"
              src={v}
            />
          );
        })}
      </div>
    </div>
  );
}
