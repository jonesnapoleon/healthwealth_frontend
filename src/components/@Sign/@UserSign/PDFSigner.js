import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
// import { getImageSize } from "../../../helpers/transformer";

// import FieldBox from "./FieldBox";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;
const QR_CODE_RELATIVE_SIZE = 0.15;

const Page = ({ data, pageNum, setFields, currentSigner }) => {
  // const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  // const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: "field",
  //     drop: (item, monitor) => {
  //       console.log(monitor);
  //       return addFieldToWorkspace(
  //         item.type,
  //         monitor.getClientOffset(),
  //         pageNum
  //       );
  //     },
  //     // collect: (monitor) => ({
  //     //   position: monitor.getClientOffset(),
  //     // }),
  //   }),
  //   [currentSigner, fields, stateStack]
  // );

  // useEffect(() => {
  //   const x = getImageSize(data, (_, height) => console.log(height));
  //   console.log(x);
  // }, [data]);

  // useEffect(() => {
  //   console.log(height);
  // }, [height]);

  return (
    <div className="one-image-area" id={`one-image-area-${pageNum}`}>
      <div style={{ backgroundImage: `url(${data})` }} className="one-image">
        <img src={data} alt="" className="invisible" />
        {/* {divPosition === undefined ? */}
        {/* : null} */}
      </div>
    </div>
  );
};

const PDFSigner = ({ fields, setFields, currentSigner }) => {
  const num = [0, 0, 0].map((_) => image);

  return (
    <div id="main-workspace">
      {num?.map((data, i) => {
        return (
          <Page
            data={data}
            pageNum={i + 1}
            fields={fields}
            setFields={setFields}
            currentSigner={currentSigner}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default PDFSigner;
