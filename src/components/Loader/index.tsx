import styled from "styled-components";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { RootState } from "../../store/rootReducer";
import { colors } from "../../shared/colors";

const LoaderStyle = styled.div`
  opacity: 0;
  visibility: hidden;
  width: 100%;
  display: flex;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background: rgba(255, 255, 255, 0.8);

  @keyframes s3 {
    to {
      transform: rotate(1turn);
    }
  }
  .loader-wrapper {
    max-width: 376px;
    width: 100%;
    display: flex;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  .spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: conic-gradient(#0000 10%, ${colors.brandRed});
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 8px),
      #000 0
    );
    mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: s3 1s infinite linear;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const Loader: React.FC = () => {
  const loader = useSelector((state: RootState) => state.general.loader);

  return (
    <LoaderStyle
      className={classNames({
        active: !!loader.length,
      })}
    >
      <div className="loader-wrapper">
        <div className="spinner" />
      </div>
    </LoaderStyle>
  );
};

export default Loader;
