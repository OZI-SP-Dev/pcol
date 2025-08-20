import { useParams } from "react-router-dom";

const usePCOLParams = () => {
  const { program, pcolId } = useParams();
  const params = {
    program: String(program),
    pcolId: Number(pcolId),
  };

  return params;
};

export default usePCOLParams;
