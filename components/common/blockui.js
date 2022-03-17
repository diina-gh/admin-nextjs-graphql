import React from "react";

const BlockUI = props => {
  if (!props.blocking) {
    return "";
  } else {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-center z-50 blockui-bg rounded-lg">
          <div className="self-center w-10 h-10">
            <img className="w-full h-full" src="../spinner.gif" />
          </div>
      </div>
    );
  }
};

BlockUI.defaultProps = {
  blocking: false,
};

export default BlockUI;
